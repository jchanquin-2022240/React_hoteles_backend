'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbConnection } from './mongo.js'
import userRoutes from '../src/user/user.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import hotelRoutes from '../src/hoteles/hotel.routes.js'
import habitacionesRoutes from '../src/bedrooms/bedrooms.routes.js'

class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.userPath = '/hoteles/v1/user'
        this.authPath = '/hoteles/v1/auth'
        this.hotelPath = '/hoteles/v1/hotel'
        this.habitacionPath = '/hoteles/v1/habitaciones'

        this.middlewares()
        this.conectarDB()
        this.routes()
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}))
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(helmet())
        this.app.use(morgan('dev'))
    }

    routes(){
        this.app.use(this.userPath, userRoutes )
        this.app.use(this.authPath, authRoutes)
        this.app.use(this.hotelPath, hotelRoutes)
        this.app.use(this.habitacionPath, habitacionesRoutes)
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port)
        })
    }
}

export default Server