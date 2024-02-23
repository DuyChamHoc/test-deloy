import cors from 'cors'
import express, {
    NextFunction,
    Request,
    Response,
    Router,
    json,
    urlencoded,
} from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import 'reflect-metadata'
import { Config, validateEnv } from './configs'
import { handleError } from './utils/error'
import { logger } from './utils/logger'

export interface AppRoute {
    route?: string
    router: Router
}

export class App {
    private app = express()

    constructor(private config: Config, routes: AppRoute[]) {
        this.initMiddlewares()
        this.initRoutes(routes)
    }

    private initMiddlewares() {
        // cross-origin resource sharing
        this.app.use(cors())

        // http headers to improve security
        this.app.use(helmet())

        // body parser
        this.app.use(json())
        this.app.use(urlencoded({ extended: true }))

        // http request logger
        this.app.use(
            morgan('short', {
                skip: (req) => {
                    return (
                        req.url.startsWith('/api/queues') ||
                        req.url.startsWith('/admin/queues') ||
                        req.url.startsWith('/healthcheck')
                    )
                },
            })
        )
    }

    private initRoutes(routes: AppRoute[]) {
        routes.forEach((route) => {
            this.app.use('/' + route.route ?? '', route.router)
        })

        this.app.use(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (err: Error, req: Request, res: Response, next: NextFunction) => {
                handleError(err, res)
            }
        )
    }

    async start() {
        const start = Date.now()

        validateEnv(this.config)

        this.app.listen(3000, () => {
            return logger.info(
                `Server is listening at port ${3000} - Elapsed time: ${
                    (Date.now() - start) / 1000
                }s`
            )
        })

        process.on('uncaughtException', (err) => {
            logger.error(err)
        })

        process.on('unhandledRejection', (reason, promise) => {
            logger.error(
                `Unhandled Rejection at: Promise ${JSON.stringify({
                    promise,
                    reason,
                })}`
            )
        })
    }
}
