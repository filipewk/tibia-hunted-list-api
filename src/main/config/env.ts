export default {
  postgresUrl: process.env.DATABASE_URL || 'postgres://postgres:filipe50@172.28.0.2:5432/tibia-hunted-list',
  port: process.env.PORT || 5050
}
