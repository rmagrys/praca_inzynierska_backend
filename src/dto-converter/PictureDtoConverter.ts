import { PictureDto } from "../dto/PictureDto";
import { Picture } from "../entity/Picture";

export class PictureDtoConverter {
  public static toDto(picture: Picture): PictureDto {
    const newPictureDto = new PictureDto();

    newPictureDto.id = picture.id ? picture.id : 0;
    newPictureDto.url = picture.url;
    newPictureDto.createdAt = picture.createdAt;

    return newPictureDto;
  }

  public static toEntity(pictureDto: PictureDto): Picture {
    const newPicture = new Picture();

    newPicture.id = pictureDto.id ? pictureDto.id : 0;
    newPicture.url = pictureDto.url;
    newPicture.createdAt = pictureDto.createdAt;

    return newPicture;
  }

  public static picturesListToDtos(pictures: Picture[]): PictureDto[] {
    return pictures.map((picture) => this.toDto(picture));
  }
}
