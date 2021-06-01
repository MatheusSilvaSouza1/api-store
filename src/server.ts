import "reflect-metadata";
import express from 'express'
import cors from 'cors'
import Routes from './routes'
import './database/Connection'

const server = express()

server.use(express.json())
server.use(cors())
server.use(Routes)

server.listen(3333)