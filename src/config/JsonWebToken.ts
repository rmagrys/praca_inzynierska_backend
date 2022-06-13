import * as config from "config";

export class JsonWebToken {
  public user: string;
  public app: string;
  public createdAt: number;
  public expire: number;

  setupAuthenticationToken(userId: string): void {
    const dayInSeconds = 86400;
    const appName: string = config.get("app.name");

    this.user = userId;
    this.app = appName;
    this.createdAt = Date.now() / 1000;
    this.expire = this.createdAt + dayInSeconds;
  }
}
