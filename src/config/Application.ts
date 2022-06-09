import "reflect-metadata";
import {
  createConnection,
  useContainer as useTypeOrmContainer,
  Connection,
} from "typeorm";
import { Action, useContainer, createExpressServer } from "routing-controllers";
import { Container } from "typedi";
import { DatabaseConfig } from "./DatabaseConfig";
import * as config from "config";
import { Logger } from "./Logger";
import { LoggerLevel } from "../enum/LoggerLevel";
import { InjectConnection } from "typeorm-typedi-extensions";

export class Application {
  @InjectConnection()
  public databaseConnection: Connection;
  public appContext: any;

  public async start(): Promise<void> {
    const databaseConfig = DatabaseConfig.getDatabaseConnectionConfiguration();

    useContainer(Container);
    useTypeOrmContainer(Container);

    await createConnection(databaseConfig)
      .then(async (connection: Connection) => {
        this.databaseConnection = connection;

        const port = config.get("app.port");
        const appName = config.get("app.name");
        const app = createExpressServer({
          controllers: [__dirname + "./../controller/*.ts"],
          middlewares: [__dirname + "./../middleware/*.ts"],
          defaultErrorHandler: false,
          cors: {
            origin: "*",
          },
        });

        this.appContext = app.listen(port, () => {
          Logger.log(`${appName} server runs on port ${port}`);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  public async close(): Promise<void> {
    const appName = config.get("app.name");

    await this.databaseConnection.close();
    await this.appContext.close();

    Logger.log(`${appName} server stopped`);
  }
}
