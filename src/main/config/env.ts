export default {
  secret: ')(*&^%$%^&*(bsalt)KjdjnUyReqfd%',
  postgresUrl: process.env.DATABASE_URL || 'postgres://postgres:filipe50@172.28.0.3:5432/api-tibia',
  port: process.env.PORT || 5050
}
