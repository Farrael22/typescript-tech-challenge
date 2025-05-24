import { registerAs } from '@nestjs/config'
import * as parseUrl from 'redis-url-parse'
import { Redis, RedisOptions } from 'ioredis'

let client: Redis
let subscriber: Redis

const normalizeReusableConnectionOptions = (options: RedisOptions) =>
  Object.assign({}, options, {
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  })

export default registerAs('REDIS_CONFIG', () => {
  const { host, port, password, username } = parseUrl(process.env.REDISCLOUD_URL)

  return {
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: true,
    },
    createClient: (type: string, options: RedisOptions) => {
      switch (type) {
        case 'client':
          if (!client) {
            client = new Redis(options)
          }
          return client
        case 'subscriber':
          if (!subscriber) {
            subscriber = new Redis(normalizeReusableConnectionOptions(options))
          }
          return subscriber
        case 'bclient':
          return new Redis(normalizeReusableConnectionOptions(options))

        default:
          throw new Error('Unexpected connection type: ' + type)
      }
    },
    redis: {
      name: 'default-bull-redis',
      maxRetriesPerRequest: 15,
      password,
      username,
      host,
      port: Number(port),
    },
  }
})
