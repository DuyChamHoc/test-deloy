import { Router } from 'express'
import { Inject, Service } from 'typedi'
import { AppRoute } from '../../app'
import { UserController } from './user.controller'

@Service()
export class UserRoute implements AppRoute {
    route?: string = 'user'
    router: Router = Router()

    constructor(@Inject() private userController: UserController) {
        this.initRoutes()
    }

    private initRoutes() {
        this.router.get(
            '/sign-in',
            this.userController.signIn.bind(this.userController)
        )
    }
}
