export default {
  secret: ')(*&^%$%^&*(bsalt)KjdjnUyReqfd%',
  postgresUrl: process.env.DATABASE_URL || 'postgres://postgres:filipe50@192.168.32.3:5432/api-tibia',
  port: process.env.PORT || 5050
}
