import { Expose } from 'class-transformer'
import { BaseDTO } from '../../../base/base.dto'

export class UserDTO extends BaseDTO {
    @Expose()
    userId: string

    @Expose()
    username: string

    @Expose()
    fullName: string

    @Expose()
    salt: string
}
