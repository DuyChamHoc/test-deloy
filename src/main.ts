import 'reflect-metadata'
import Container from 'typedi'
import { App } from './app'
import { config } from './configs'
import { HealthRoute } from './modules/health/health.route'
import { UserRoute } from './modules/users/user.route'

const app = new App(config, [
    Container.get(HealthRoute),
    Container.get(UserRoute),
])
app.start()
