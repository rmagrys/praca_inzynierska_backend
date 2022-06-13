import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { Logger } from "../config/Logger";
import { LoggerLevel } from "../enum/LoggerLevel";
import * as config from "config";
import { Service } from "typedi";

@Service()
@Middleware({ type: "after" })
export class RequestLogMiddleware implements ExpressMiddlewareInterface {
  async use(context: any, next: (err?: any) => Promise<any>): Promise<any> {
    const isLoggerActive = config.get("logger.loggerActive");

    if (isLoggerActive) {
      try {
        await next();
        Logger.log(
          `${context.method} ${context.url} | ${context.status} ${context.message}`
        );
      } catch (error) {
        Logger.log(`Error: ${error}`, LoggerLevel.WARN);
      }
    }
  }
}
