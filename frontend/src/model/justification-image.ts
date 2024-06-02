export class JustificationImage {
  justificationImageId: number | undefined;
  name: string;
  justificationId: number;

  fileName: string;

  imageUrl: string | undefined;
  mightDelete: boolean = false;

  constructor(name: string, fileName: string, justificationId: number, justificationImageId?: number) {
    this.justificationId = justificationId;
    this.name = name;
    this.fileName = fileName;
    this.justificationImageId = justificationImageId;
  }

  static fromJson(json: JustificationImage): JustificationImage {
    return new JustificationImage(json.name, json.fileName, json.justificationId, json.justificationImageId);
  }

  static initializeJustificationImages(json: JustificationImage[]): JustificationImage[] {
    let justificationImages: JustificationImage[] = [];
    if(json != undefined) {
      for (let i = 0; i < json.length; i++) {
        justificationImages.push(JustificationImage.fromJson(json[i]));
      }
    }
    return justificationImages;
  }

  setImageUrl(imageUrl: string) {
    this.imageUrl = imageUrl;
  }
}
