import { Request } from 'express'

export interface DataRequest<T> extends Request {
    userId: number
    data: T
}
