import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ModalComponent} from "../misc/modal-component";
import {ActivatedRoute, Router} from "@angular/router";
import {JustificationService} from "../../../service/justification.service";
import {JustificationImageService} from "../../../service/justification-image.service";
import {faCheck, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";
import {NgForOf, NgIf} from "@angular/common";
import {Justification} from "../../../model/justification";
import {FormsModule} from "@angular/forms";
import {JustificationImage} from "../../../model/justification-image";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {TimeTable} from "../../../model/time-table";
import {generateRandomString} from "../misc/functions";
import {Observable} from "rxjs";
import {HttpErrorResponse} from "@angular/common/http";
import {UploadStatus} from "../misc/form-component";

@Component({
  selector: 'app-add-justification-modal',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgForOf,
    FaIconComponent
  ],
  templateUrl: './add-justification-modal.component.html',
  styleUrl: './add-justification-modal.component.scss'
})
export class AddJustificationModalComponent extends ModalComponent {
  @Input() override isModalOpen = false
  @Output() override onModalChangeEmitter = new EventEmitter<boolean>();

  @ViewChild("imageInput") imageInput!: ElementRef;

  @Input() justification!: Justification;
  @Input() selectedTimeTable!: TimeTable;

  faCheck = faCheck;
  faTrash = faTrash;
  faXmark = faXmark;

  private readonly maxSize: number = 100000000;
  private readonly maxImages: number = 4;

  images: File[] = [];
  imagesStatusMsg: string = "";
  isImagesSuccess: boolean = false;

  constructor(protected override justificationService: JustificationService,
              protected override justificationImageService: JustificationImageService,
              protected override router: Router, protected override route: ActivatedRoute) {
    super();
  }

  isFormValid(): boolean {
    let checkedFileTypes: boolean = true;

    for (let i = 0; i < this.images.length; i++) {
      checkedFileTypes = this.images[i].type == 'image/png' || this.images[i].type == 'image/jpeg';
      if (!checkedFileTypes) break;
    }

    return this.justification.reason.length > 0 && checkedFileTypes
  }

  getFilesSize(files: File[]): number {
    let size = 0;

    for (let i = 0; i < files.length; i++) {
      size += files[i].size;
    }

    console.log(size)
    return size;
  }

  onImageAttached(event: any) {
    this.imagesStatusMsg = "";

    if ((this.images.length + event.target.files.length) > this.maxImages) {
      this.imagesStatusMsg = `You can only upload ${this.maxImages} images!`;
    } else if (this.getFilesSize(this.images) + this.getFilesSize(event.target.files) > this.maxSize) {
      this.imagesStatusMsg = `Image size is too big! Max is 100MB`;
    } else {
      for (let i = 0; i < event.target.files.length; i++) {
        this.images.push(event.target.files[i]);
        let name = `${generateRandomString(10)}-${i}-${this.images[i].name}`

        let justificationImage = new JustificationImage(name, this.images[i].name, this.justification.justificationId!);
        justificationImage.imageUrl = URL.createObjectURL(event.target.files[i]);

        this.justification.justificationImageList.push(justificationImage);
      }
    }

    this.imageInput.nativeElement.value = "";
  }

  onDeleteImage(justificationImage: JustificationImage) {
    // REMOVE FROM JUSTIFICATION IMAGE LIST
    this.justification?.justificationImageList.splice(this.justification?.justificationImageList
      .findIndex((justificationImage1: JustificationImage) => justificationImage1.imageUrl == justificationImage.imageUrl), 1);

    // REMOVE FROM FILES
    let indexFiles = this.images.findIndex((file: File) => URL.createObjectURL(file) == justificationImage.imageUrl);
    this.images.splice(indexFiles, 1);
  }

  onAcceptClick() {
    if (!this.isFormValid()) {
      this.imagesStatusMsg = "Invalid form data!";
      return;
    }

    let justificationImagesToAdd = this.justification.justificationImageList
    this.justification.justificationImageList = [];

    new Observable<boolean>(observer => {
      this.justificationService.addEntity(this.justification).subscribe({
        next: (jsonJustification: Justification) => {
          let justification = Justification.fromJson(jsonJustification);
          this.justification.justificationId = justification.justificationId;

          new Observable<number>((observer) => {
            let count = 1;
            if (justificationImagesToAdd.length == 0) observer.next(0);

            justificationImagesToAdd.forEach((justificationImage: JustificationImage) => {
              justificationImage.justificationId = justification.justificationId!;
              this.justificationImageService.addEntity(justificationImage).subscribe({
                next: (jsonJustificationImage: JustificationImage) => {
                  let justificationImage = JustificationImage.fromJson(jsonJustificationImage);
                  console.log("Added post image with id: " + justificationImage.justificationImageId);
                  this.justification.justificationImageList.push(justificationImage);
                  observer.next(count++);
                },
                error: (error: HttpErrorResponse) => {
                  observer.error(error);
                  console.error(error);
                }
              });
            });
          }).subscribe({
            next: (count: number) => {
              if (count === justificationImagesToAdd.length) {
                console.log("Added all justification images")
                this.uploadJustificationImages().then((isSuccess: boolean) => {
                  this.isImagesSuccess = isSuccess;
                  observer.next(isSuccess);
                });
              }
            },
            error: (error: HttpErrorResponse) => {
              console.error(error);
              observer.next(false);
            }
          });

        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          observer.next(false);
        }
      });
    }).subscribe({
      next: (isSuccess: boolean) => {
        if (isSuccess) {
          this.selectedTimeTable.justification = this.justification;
          this.closeModal();
        }
      }
    });
  }

  uploadJustificationImages() {
    return new Promise<boolean>((resolve, reject) => {
      let formData = new FormData();

      for (let i = 0; i < this.images.length; i++) {
        let justificationImage = this.justification.justificationImageList
          .find((justificationImage: JustificationImage) => justificationImage.fileName === this.images[i].name)!;

        formData.append('files', this.images[i], justificationImage.name);
      }

      if (this.images.length > 0) {
        this.uploadFiles(this.justificationImageService, formData).subscribe({
          next: (uploadStatus: UploadStatus) => {
            this.imagesStatusMsg = uploadStatus.statusMsg;
            if (uploadStatus.isSuccessful && uploadStatus.isDone) {
              console.log("Successfully uploaded justification images")
              resolve(true);
            } else if (!uploadStatus.isSuccessful && uploadStatus.isDone) {
              console.log("Failed to upload justification images")
              resolve(false);
            }
          },
          error: (error: HttpErrorResponse) => {
            resolve(false)
            console.error(error);
          }
        });
      } else {
        resolve(true);
      }
    })
  }

  override closeModal() {
    this.images = [];
    this.imagesStatusMsg = "";
    this.isImagesSuccess = false;
    super.closeModal();
  }

}
