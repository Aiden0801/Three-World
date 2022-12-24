import pino, { Logger, LoggerOptions } from 'pino'

/**
 * @WIP - multistream to get warn|error and higher to file for actual debugging
 * and error management. not implemented yet.
 * @docs
 * https://getpino.io/#/docs/help?id=log-to-different-streams
 */
var streams = [
  { level: 'debug', stream: process.stdout },
  { level: 'error', stream: process.stderr },
  { level: 'fatal', stream: process.stderr },
]

const transport: LoggerOptions['transport'] = {
  target: 'pino-pretty',
  options: {
    colorize: true,
    ignore: 'pid,hostname',
    translateTime: true,
  },
}

// we want everything on development, but on production we want to use the
// environment variable PINO_LOG_LEVEL or default to 'notice' so we suppress most
// of the stuff
const minLevel =
  process.env.NODE_ENV === 'development'
    ? 'debug'
    : process.env.PINO_LOG_LEVEL || 'info'

/**
 * Logging utility.
 * @docs https://getpino.io/#/docs/
 *
 * By default it logs EVERYTHING on development and only 'notice' and higher on
 * production.
 * Use the correct logging method when using it.
 */
export const logger: Logger = pino({
  name: 'dashboard',
  level: minLevel,
  // customLevels: levels,
  // useOnlyCustomLevels: true,
  browser: {
    asObject: true,
  },
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }),
  },
  /**
   * @fixme - this is not working. can't resolve 'worker_threads'
   * should be used in place of the transport options.
   * @docs https://getpino.io/#/docs/pretty?id=api-example
   */
  // prettifier: require('pino-pretty'),
  transport: transport,
})
