export default {
  postgresUrl: process.env.DATABASE_URL || 'postgres://postgres:filipe50@172.25.0.3:5432/tibia-hunted-list',
  port: process.env.PORT || 5050
}
