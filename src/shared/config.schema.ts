import { LogLevel } from "@nestjs/common";

export interface ConfigSchema {
  //  # Globals
  LISTENING_PORT: number;
  LOG_LEVEL: LogLevel;
  WEB_API_PREFIX: string;
  PAGE_SIZE: number;

  // # DB Connection
  DB_NAME: string;
  PRIMARY_CONNECTION_STRING: string;
}
