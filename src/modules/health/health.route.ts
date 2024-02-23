import { Router } from 'express'
import { Service } from 'typedi'
import { AppRoute } from '../../app'

@Service()
export class HealthRoute implements AppRoute {
    route?: string = 'healthcheck'
    router: Router = Router()

    constructor() {
        this.router.get('/', (req, res) => {
            res.send('Server is running')
        })
    }
}
