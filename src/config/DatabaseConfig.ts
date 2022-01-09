import { ConnectionOptions } from "typeorm";
import * as config from "config";

export class DatabaseConfig {
  public static getDatabaseConnectionConfiguration(): ConnectionOptions {
    const host = config.get("mongodb.host");
    const port = config.get("mongodb.port");
    const name = config.get("mongodb.name");
    const dropSchema = config.get("mongodb.dropSchema");

    return <ConnectionOptions>{
      type: "mongodb",
      host: host,
      port: port,
      database: name,
      dropSchema: dropSchema,
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
