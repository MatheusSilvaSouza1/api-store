import { Router } from 'express'
import ProductController from './controllers/ProductController'


const Routes = Router()

Routes.get('/product', ProductController.selectAll)
Routes.post('/product', ProductController.create)
Routes.put('/product/:id', ProductController.update)
Routes.delete('/product/:id', ProductController.delete)

export default Routes