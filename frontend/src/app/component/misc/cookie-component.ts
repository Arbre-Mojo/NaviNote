import {StorageKeys} from "./storage-keys";
import {CookieService} from "ngx-cookie-service";
import {generateRandomToken} from "./functions";
import {HttpErrorResponse, HttpEvent, HttpEventType, HttpResponse} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {EditableElement, editableElements, firstNameElement, passwordElement} from "./editable-element";
import {StudentService} from "../../../service/user/student.service";
import {ProfessorService} from "../../../service/user/professor.service";
import {AdminService} from "../../../service/user/admin.service";
import {UserService} from "../../../service/user/user.service";
import {adminCategory, professorCategory, studentCategory, UserCategory} from "../../../service/user/userCategories";
import {User} from "../../../model/user/user";
import {Admin} from "../../../model/user/admin";
import {CurrentUserService} from "../../../service/user/current-user.service";
import {Professor} from "../../../model/user/professor";
import {Student} from "../../../model/user/student";
import {TokenByEmail} from "../../../model/query/update/token-by-email";
import {MessageService} from "../../../service/message.service";
import {ConversationService} from "../../../service/conversation.service";
import {ManageUsersService} from "../../../service/misc/manage-users.service";
import {logout, MenuItem} from "../user-account/profile-menu-item/menu-item";
import {TimeTableService} from "../../../service/time-table.service";
import {JustificationService} from "../../../service/justification.service";
import {JustificationImageService} from "../../../service/justification-image.service";
import {Justification} from "../../../model/justification";
import {JustificationImage} from "../../../model/justification-image";
import {TimeTable} from "../../../model/time-table";

export abstract class CookieComponent {
  // Services
  protected cookieService!: CookieService;

  protected manageUsersService!: ManageUsersService;
  protected currentUserService!: CurrentUserService;
  protected studentService!: StudentService;
  protected professorService!: ProfessorService;
  protected adminService!: AdminService;
  protected messageService!: MessageService;
  protected conversationService!: ConversationService
  protected timeTableService!: TimeTableService;
  protected justificationService!: JustificationService;
  protected justificationImageService!: JustificationImageService;

  protected router!: Router;
  protected route!: ActivatedRoute;

  // User Categories
  protected readonly professorCategory = professorCategory;
  protected readonly studentCategory = studentCategory;
  protected readonly adminCategory = adminCategory;

  // Footer variable
  protected footerTopMinValue: number = 0;
  protected position: string = "static";

  constructor() {
  }

  fetchUserService(): UserService<any> {
    return this.fetchUserServiceByCategory(this.getCurrentUserCategory());
  }

  fetchUserServiceByCategory(userCategory: UserCategory): UserService<any> {
    switch (userCategory.name) {
      case(adminCategory.name):
        return this.adminService;
      case(professorCategory.name):
        return this.professorService;
      case(studentCategory.name):
        return this.studentService;
    }
    return this.studentService;
  }

  private setCurrentUser(user: User) {
    switch (this.getCurrentUserCategory().name) {
      case(adminCategory.name):
        this.currentUserService.admin = user as Admin;
        this.initializeAllUsers();
        break;
      case(professorCategory.name):
        this.currentUserService.professor = user as Professor;
        break;
      case(studentCategory.name):
        this.currentUserService.student = user as Student;
        break;
    }
  }

  loggedInPage() {
    if (!this.currentUserService.isLoggedIn()) {
      this.router.navigate(['/login']).then();
    }
  }

  specificUserPage(...userCategories: UserCategory[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.includesCurrentCategory(...userCategories) || !this.currentUserService.isLoggedIn()) {
        this.routeToSite().then();
        resolve(false);
      } else {
        resolve(true);
      }
    });
  }

  includesCurrentCategory(...userCategories: UserCategory[]): boolean {
    return userCategories.includes(this.getCurrentUserCategory());
  }

  routeToSite(): Promise<boolean> {
    if(this.isStudentCategory() && this.currentUserService.isLoggedIn()) {
      return this.router.navigate(['/absences-and-tardiness'], {relativeTo: this.route})
    } else if(this.isAdminCategory() && this.currentUserService.isLoggedIn()) {
      return this.router.navigate(['/manage-justifications'], {relativeTo: this.route})
    } else if(this.isProfessorCategory() && this.currentUserService.isLoggedIn()) {
      return this.router.navigate(['/time-table'], {relativeTo: this.route})
    } else {
      return this.router.navigate(['/login'], {relativeTo: this.route})
    }
  }

  routeTo(path: string) {
    this.router.navigate([path], {relativeTo: this.route}).then();
  }

  isProfessorCategory() {
    return this.getCurrentUserCategory().name === professorCategory.name;
  }

  isStudentCategory() {
    return this.getCurrentUserCategory().name === studentCategory.name;
  }

  isAdminCategory() {
    return this.getCurrentUserCategory().name === adminCategory.name;
  }

  getCurrentUserCategory(): UserCategory {
    try {
      return UserCategory.fromJson(this.cookieService.get(StorageKeys.USER_CATEGORY));
    } catch (e: any) {
    }
    return this.setCurrentUserCategory(studentCategory);
  }

  setCurrentUserCategory(userCategory: any): UserCategory {
    if (userCategory instanceof UserCategory) {
      this.setUserCategory(userCategory);
      return userCategory;
    } else {
      let realUserCategory = UserCategory.fromJson(userCategory);
      this.setUserCategory(realUserCategory);
      return realUserCategory;
    }
  }

  private setUserCategory(userCategory: UserCategory): void {
    this.cookieService.set(StorageKeys.USER_CATEGORY, JSON.stringify(userCategory), 1, '/');
  }

  setUserToken(token: string): void {
    this.cookieService.set(StorageKeys.USER_TOKEN, token, 1, '/');
  }

  getUserToken(): string {
    return this.cookieService.get(StorageKeys.USER_TOKEN);
  }

  hasUserToken(): boolean {
    return this.cookieService.check(StorageKeys.USER_TOKEN);
  }

  deleteUserToken(): void {
    this.cookieService.delete(StorageKeys.USER_TOKEN, '/');
  }

  resetUserCategoryToStudent(): void {
    this.cookieService.set(StorageKeys.USER_CATEGORY, JSON.stringify(studentCategory), 1, '/');
  }

  isEditableElementRelevant(editableElement: EditableElement, userCategory: UserCategory): boolean {
    return editableElement.userCategories.includes(userCategory);
  }

  initializeUserByToken(): Promise<boolean> {
    this.currentUserService.incrementCounter();
    return new Promise<boolean>((resolve, reject) => {
      if (this.currentUserService.user != undefined) {
        resolve(true)
      } else if (this.hasUserToken() && this.currentUserService.getCounter() == 1) {
        this.currentUserService.setMainPromise(new Promise<boolean>((resolve_sub, reject) => {
          this.fetchUserService().findUserByToken({token: this.getUserToken()})
            .subscribe({
              next: (jsonUser: User) => {
                if (jsonUser != null) {
                  this.initializeUser(jsonUser);

                  resolve_sub(true);
                  resolve(true);
                } else {
                  console.log('User not found');
                  resolve_sub(false);
                  resolve(false);
                }
              },
              error: (error: HttpErrorResponse) => {
                resolve_sub(false);
                resolve(false);
                console.log('HTTP Error: User not found');
              }
            });
        }));
      } else if (this.hasUserToken() && this.currentUserService.getCounter() > 1) {
        this.currentUserService.getMainPromise()?.then((success) => {
          resolve(success);
        });
      } else {
        resolve(false);
      }
    });
  }

  initializeUser(jsonUser: User) {
    this.currentUserService.user = User.fromJson(jsonUser);
    this.initializeUserPfpImgUrl().then();
    this.setCurrentUser(this.currentUserService.user);

    console.log(this.currentUserService.user!)
  }

  resetTokenByOldToken(): Promise<boolean> {
    let currentToken = this.cookieService.get(StorageKeys.USER_TOKEN);
    return new Promise<boolean>((resolve, reject) => {
      this.fetchUserService().updateTokenByOldToken({oldToken: currentToken, newToken: generateRandomToken()})
        .subscribe({
          next: (success: number) => {
            if (success == 1) {
              console.log('Token updated');
              this.setUserToken(generateRandomToken());
              resolve(true);
            } else {
              console.error('Token not updated');
              resolve(false);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error('HTTP Error: Token not updated');
            resolve(false);
          }
        });
    });
  }

  resetTokenByEmail(email: string, newToken?: string): Promise<boolean> {
    let thisToken = "";
    if (newToken == null) {
      thisToken = generateRandomToken();
    } else {
      thisToken = newToken;
    }
    return new Promise<boolean>((resolve, reject) => {
      this.fetchUserService().updateTokenByEmail(new TokenByEmail(email, thisToken)).subscribe({
        next: (success: number) => {
          if (success == 1) {
            this.setUserToken(thisToken);
            console.log('Token updated');
            resolve(true);
          } else {
            console.error('Token not updated');
            resolve(false);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('HTTP Error: Token not updated');
          resolve(false);
        }
      });
    });
  }

  getUserByEmail(email: string, userService: UserService<any>): Promise<User | null> {
    return new Promise<User | null>((resolve, reject) => {
      userService.findUserByEmail(email).subscribe({
        next: (jsonUser: User) => {
          resolve(jsonUser);
        },
        error: (error: HttpErrorResponse) => {
          resolve(null);
        }
      });
    });
  }

  handleFooterTopMinValue(entry: ResizeObserverEntry, staticVal: number = 0) {
    let calculatedValue = entry.contentRect.height + staticVal;

    if (calculatedValue > window.innerHeight) {
      this.position = 'static';
    } else {
      this.position = 'absolute';
      this.footerTopMinValue = Math.max(calculatedValue, window.innerHeight);
    }
  }

  private initializeUserPfpImgUrl(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (this.currentUserService.user?.hasPfpImg()) {
        this.fetchUserService().downloadFiles(this.currentUserService.user?.pfpImgPath!).subscribe({
          next: (httpEvent: HttpEvent<Blob>) => {
            if (httpEvent.type === HttpEventType.Response) {
              const file: File = new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
                {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`});
              this.currentUserService.user?.setPfpImgUrl(URL.createObjectURL(file));
              resolve(true);
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log("Error downloading file");
            resolve(false);
          }
        });
      } else {
        console.log("User does not have pfp img");
        resolve(false);
      }
    });
  }

  initializeUsersPfpImgUrl(users: User[] | undefined, userService: UserService<any>): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      new Observable<number>((observer) => {
        let count = 0;
        if (users == undefined || users.length == 0) observer.next(count)

        for (let user of users!) {
          if (user != undefined && user.pfpImgPath! != undefined && user.pfpImgPath.length > 0) {
            userService.downloadFiles(user.pfpImgPath).subscribe({
              next: (httpEvent: HttpEvent<Blob>) => {
                if (httpEvent.type === HttpEventType.Response) {
                  const file: File = this.getFile(httpEvent);
                  user.setPfpImgUrl(URL.createObjectURL(file));
                  observer.next(count++);
                }
              },
              error: (error: HttpErrorResponse) => {
                console.log("Error downloading file");
                observer.next(count++);
              }
            });
          } else {
            console.log("User does not have pfp img");
            observer.next(count++);
          }
        }
      }).subscribe({
        next: (count: number) => {
          if (count == users?.length || users == undefined) {
            resolve(true);
          }
        }
      });
    });
  }

  initializeJustificationImages(justifications: Justification[]) {
    return new Promise<boolean>( (resolve, reject) =>{
      if(justifications != undefined) {
        let count = 0;

        new Observable<number>((observer) => {
          for (let justification of justifications) {
            this.initializePostImages(justification.justificationImageList).then(() => {
              observer.next(++count);
            });
          }
        }).subscribe({
          next: (count: number) => {
            if (count == 2) {
              resolve(true);
            }
          }
        });

      } else {
        resolve(true)
      }
    })
  }

  private initializePostImages(justificationsImages: JustificationImage[]) {
    return new Promise<boolean>((resolve, reject) => {
      if(justificationsImages.length > 0) {
        let count = 0;

        new Observable<number>((observer) => {
          for (let justificationsImage of justificationsImages) {
            this.justificationImageService.downloadFiles(justificationsImage.name).subscribe({
              next: (httpEvent: HttpEvent<Blob>) => {
                if (httpEvent.type === HttpEventType.Response) {
                  const file: File = this.getFile(httpEvent);
                  justificationsImage.setImageUrl(URL.createObjectURL(file));
                  observer.next(++count);
                }
              },
              error: (error: HttpErrorResponse) => {
                observer.next(++count);
              }
            });
          }
        }).subscribe({
          next: (count: number) => {
            if (count == justificationsImages.length) {
              resolve(true);
            }
          }
        });
      } else {
        resolve(true);
      }
    });
  }

  private getFile(httpEvent: HttpResponse<Blob>) {
    return new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
      {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`});
  }

  getJustifications(timeTables: TimeTable[]) {
    return new Promise<boolean>((resolve, reject) => {
      let count = 0;

      new Observable<number>((observer) => {
        for (let justification of timeTables) {
          this.getJustification(justification).then(() => {
            observer.next(++count);
          });
        }
      }).subscribe({
        next: (count: number) => {
          if (count == timeTables.length) {
            resolve(true);
          }
        }
      });
    });
  }

  getJustification(timeTable: TimeTable) {
    return new Promise<boolean>((resolve, reject) => {
      this.justificationService.findJustificationByTimeTableId(timeTable?.timeTableId!).subscribe({
        next: (jsonJustification: Justification) => {
          if (jsonJustification != null) timeTable.justification = Justification.fromJson(jsonJustification);
          resolve(true);
        },
        error: (error: HttpErrorResponse) => {
          resolve(false);
        }
      });
    });
  }

  logoutOnClick() {
    this.deleteUserToken();
    this.resetUserCategoryToStudent();
    this.currentUserService.setUsersToNull();
    this.routeToSite().then(() => {
      window.location.reload();
    });
  }

  private initializeStudents(jsonStudents: Student[]) {
    let students: Student[] = [];
    for (let jsonStudent of jsonStudents) {
      students.push(Student.fromJson(jsonStudent));
    }
    this.currentUserService.user?.setStudents(students);
    this.initializeUsersPfpImgUrl(this.currentUserService.user?.students, this.studentService).then();
  }

  private initializeProfessors(jsonProfessors: Professor[]) {
    let professors: Professor[] = [];
    for (let jsonProfessor of jsonProfessors) {
      professors.push(Professor.fromJson(jsonProfessor));
    }
    this.currentUserService.user?.setProfessors(professors);
    this.initializeUsersPfpImgUrl(this.currentUserService.user?.professors, this.professorService).then();
  }

  private initializeAdmins(jsonAdmins: Admin[]) {
    let admins: Admin[] = [];
    for (let admin of jsonAdmins) {
      admins.push(Admin.fromJson(admin));
    }
    this.currentUserService.user?.setAdmins(admins);
    if (this.isAdminCategory()) {
      let currentAdmin = this.currentUserService.user?.admins?.find(admin => admin.getUserId() == this.currentUserService.user?.getUserId());
      if (currentAdmin !== undefined) {
        this.currentUserService.user?.admins?.splice(this.currentUserService.user?.admins?.indexOf(currentAdmin), 1)
      }
    }

    this.initializeUsersPfpImgUrl(this.currentUserService.user?.admins, this.adminService).then();
  }

  private initializeAllUsers() {
    this.studentService.getAllEntities().subscribe({
      next: (jsonStudents: Student[]) => {
        this.initializeStudents(jsonStudents);
      }
    });

    this.professorService.getAllEntities().subscribe({
      next: (jsonProfessors: Professor[]) => {
        this.initializeProfessors(jsonProfessors)
      }
    });

    this.adminService.getAllEntities().subscribe({
      next: (jsonAdmins: Admin[]) => {
        this.initializeAdmins(jsonAdmins);
      }
    });
  }

  onProfileMenuItemClick(profileMenuItem: MenuItem) {
    if (profileMenuItem.editingUserCategory !== undefined && profileMenuItem.registrationType !== undefined) {
      this.manageUsersService.editingUserCategory = profileMenuItem.editingUserCategory!;
      this.manageUsersService.registrationType = profileMenuItem.registrationType!;
      this.manageUsersService.editingUserService = this.fetchUserServiceByCategory(profileMenuItem.editingUserCategory!);
      this.manageUsersService.editableElements = this.getEditableElements(profileMenuItem.editingUserCategory!);
      this.manageUsersService.fieldFilter = firstNameElement.name;
      this.manageUsersService.searchInput = '';
    }

    if (profileMenuItem == logout) {
      this.logoutOnClick();
    } else {
      this.routeTo(profileMenuItem.link)
    }
  }

  private getEditableElements(userCategory: UserCategory) {
    let editableElementsChosen: EditableElement[] = [];
    editableElements.forEach(element => {
      if (element.userCategories.includes(userCategory) &&
        element !== passwordElement) {
        editableElementsChosen.push(element);
      }
    });

    return editableElementsChosen;
  }
}
