import { AuctionDto } from "./AuctionDto";

export class PictureDto {
  id: number;
  url: string;
  createdAt: Date;
  auction: AuctionDto;
}
