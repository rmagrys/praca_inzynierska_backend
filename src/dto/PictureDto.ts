import { validateOrReject } from "class-validator";
import { AuctionDto } from "./AuctionDto";

export class PictureDto {
  id: number;
  url: string;
  createdAt: Date;
  auction: AuctionDto;

  async validate() {
    await validateOrReject(this);
  }
}
