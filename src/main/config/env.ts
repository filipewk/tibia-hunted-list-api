export default {
  secret: ')(*&^%$%^&*(bsalt)KjdjnUyReqfd%',
  postgresUrl: process.env.DATABASE_URL || 'postgres://postgres:filipe50@172.25.0.2:5432/api-tibia',
  port: process.env.PORT || 5050
}
