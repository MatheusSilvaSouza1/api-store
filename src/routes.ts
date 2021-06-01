import { Router } from 'express'

const Routes = Router()

Routes.get('/', (res, req) => {
    return req.send('hello')
})

export default Routes