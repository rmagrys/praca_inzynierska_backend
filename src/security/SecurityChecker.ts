import { verify } from "jsonwebtoken";
import { Action } from "routing-controllers";
import { Connection } from "typeorm";
import { User } from "../entity/User";
import * as config from "config";
import { JsonWebToken } from "../config/JsonWebToken";

export class SecurityChecker {
  public static async handleAuthorizationCheckForGivenUser(
    user: User
  ): Promise<boolean> {
    return user !== undefined;
  }

  public static async findUserFromAction(
    action: Action,
    connection: Connection
  ): Promise<User> {
    const applicationSecret: string = config.get("security.secret");
    const authorizationHeader: string = action.request.header.authorization;

    try {
      const token = authorizationHeader.replace("Bearer ", "");
      const tokenBody: JsonWebToken = verify(
        token,
        applicationSecret
      ) as JsonWebToken;
      const isTokenNotExpired: boolean = Date.now() / 1000 < tokenBody.expire;

      if (isTokenNotExpired) {
        return await connection.getRepository(User).findOne(tokenBody.user);
      } else {
        return undefined;
      }
    } catch (error) {
      return undefined;
    }
  }
}
