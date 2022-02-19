import { Logger, ISettingsParam, ILogObject } from 'tslog';
import { appendFileSync } from 'fs';
import { config } from '../config/config';

const loggerSettings: ISettingsParam = {
  name: 'tslog',
  minLevel: config.isDev ? 'silly' : 'warn',
  displayFilePath: config.isDev ? 'hidden' : 'hideNodeModulesOnly',
  hostname: 'tslog',
};

function logToTransport(logObject: ILogObject) {
  appendFileSync('log.txt', `${JSON.stringify(logObject)}\n`);
}

export const logger: Logger = new Logger(loggerSettings);

logger.attachTransport(
  {
    silly: logToTransport,
    debug: logToTransport,
    trace: logToTransport,
    info: logToTransport,
    warn: logToTransport,
    error: logToTransport,
    fatal: logToTransport,
  },
  'debug'
);
