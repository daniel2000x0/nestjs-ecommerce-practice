declare namespace NodeJS {
  export interface ProcessEnv {
    DB_HOST?: string;
    DB_PORT?: string;
    DB_USER?: string;
    DB_PASS?: string;
    DB_NAME?: string;
    PORT?: string;
    ENVIRONMENT: Environment;
  }
  export type Environment = 'DEVELOPMENT' | 'PRODUCTION' | 'TEST';
}
