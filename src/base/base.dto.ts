import { Expose } from 'class-transformer'

export class BaseDTO {
    @Expose()
    createdAt: Date

    @Expose()
    updatedAt: Date
}
