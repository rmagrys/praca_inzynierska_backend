import {
  JsonController,
  Param,
  Post,
  HttpCode,
  Body,
  QueryParam,
} from "routing-controllers";
import { Service } from "typedi";
import * as S3 from "aws-sdk/clients/s3";
import { S3config } from "../config/S3.config";
import { FileAwsInput } from "../dto/FileAwsInput";

const config = {
  region: S3config.AWS_S3_REGION,
  accessKeyId: S3config.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: S3config.AWS_S3_SECRET_ACCESS_KEY,
  signatureVersion: "v4",
};

@Service()
@JsonController("/api/s3")
export class AwsController {
  s3 = new S3({ ...config });

  @Post()
  @HttpCode(200)
  public async getUploadLink(@Body() fileData: FileAwsInput): Promise<string> {
    const { type, name } = fileData;
    const fileParams = {
      Bucket: S3config.AWS_S3_BUCKET_NAME,
      Key: name,
      Expires: 1200,
      ContentType: type,
    };

    return await this.s3.getSignedUrlPromise("putObject", fileParams);
  }
}
