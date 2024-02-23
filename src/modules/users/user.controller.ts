import { NextFunction, Response } from 'express'
import { Inject, Service } from 'typedi'
import { DataRequest } from '../../base/base.request'
import { UserSignInDTO } from './dtos/user-signin.dto'
import { UserService } from './user.service'

@Service()
export class UserController {
    constructor(@Inject() public userService: UserService) {}

    async signIn(
        req: DataRequest<UserSignInDTO>,
        res: Response,
        next: NextFunction
    ) {
        try {
            res.send('success')
        } catch (err) {
            next(err)
        }
    }
}
