export const config = () => ({
  server_mode: process.env.mode,
  server_version: process.env.npm_package_version,
  redis_host: process.env.REDIS_HOST,
  redis_port: process.env.REDIS_PORT,
  redis_url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});
