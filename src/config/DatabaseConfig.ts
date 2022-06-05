import { ConnectionOptions } from "typeorm";
import * as config from "config";

export class DatabaseConfig {
  public static getDatabaseConnectionConfiguration(): ConnectionOptions {
    const host = config.get("mysql.host");
    const port = config.get("mysql.port");
    const name = config.get("mysql.name");
    const dropSchema = config.get("mysql.dropSchema");
    const username = config.get("mysql.login");
    const password = config.get("mysql.password");

    return <ConnectionOptions>{
      type: "mysql",
      host: host,
      port: port,
      database: name,
      dropSchema: dropSchema,
      username: username,
      password: password,
      synchronize: true,
      logging: true,
      entities: ["src/entity/**/*.ts"],
      migrations: ["src/migration/**/*.ts"],
      subscribers: ["src/subscriber/**/*.ts"],
      cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/migration",
        subscribersDir: "src/subscriber",
      },
      useUnifiedTopology: true,
    };
  }
}
