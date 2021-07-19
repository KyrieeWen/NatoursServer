const mongoose = require('mongoose')
const dotenv = require('dotenv')

process.on('uncaughtException', (err) => {
  console.log('Uncaught Rejection Shutting down....')
  console.log(err.name, err.message)
  process.exit(1)
})

dotenv.config({ path: './config.env' })
const app = require('./app')

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
)

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successful')
  })

// Server
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})

process.on('unhandledRejection', (err) => {
  console.log('Unhandler Rejection Shutting down....')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})

process.on('uncaughtException', (err) => {
  console.log('Uncaught Rejection Shutting down....')
  console.log(err.name, err.message)
  server.close(() => {
    process.exit(1)
  })
})
