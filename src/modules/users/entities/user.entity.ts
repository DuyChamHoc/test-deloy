import Container from 'typedi'
import { Column, Entity, Generated, Index } from 'typeorm'
import { AppBaseEntity } from '../../../base/base.entity'
import { Errors } from '../../../utils/error'
import { UserDTO } from '../dtos/user.dto'

@Entity()
export class User extends AppBaseEntity {
    @Generated('uuid')
    @Column({ unique: true })
    userId: string

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Index()
    @Column({ length: 6 })
    salt: string
}
