import { PictureDto } from "../dto/PictureDto";
import { Picture } from "../entity/Picture";

export class PictureDtoConverter {
  public static toDto(picture: Picture): PictureDto {
    const newPictureDto = new PictureDto();

    newPictureDto.url = picture.url;
    newPictureDto.createdAt = picture.createdAt;

    return newPictureDto;
  }

  public static toEntity(pictureDto: PictureDto): Picture {
    const newPicture = new Picture();

    newPicture.url = pictureDto.url;
    newPicture.createdAt = pictureDto.createdAt;

    return newPicture;
  }

  public static picturesListToDtos(pictures: Picture[]): PictureDto[] {
    return pictures.map((picture) => this.toDto(picture));
  }
}
