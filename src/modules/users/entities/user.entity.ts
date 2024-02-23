import Container from 'typedi'
import { Column, Entity, Generated, Index } from 'typeorm'
import { AppBaseEntity } from '../../../base/base.entity'
import { execProc, Procs } from '../../../database/procs'
import { CacheKeys, CacheManager } from '../../../utils/cache'
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

    static async getProfile(userId: string) {
        const cacheManager = Container.get(CacheManager)
        const cachedUser = await cacheManager.getObject(
            UserDTO,
            CacheKeys.user(userId)
        )
        if (cachedUser) {
            return cachedUser
        }

        const users = await execProc(UserDTO, Procs.UserGetProfile, [userId])
        if (users[0]) {
            await cacheManager.setObject(CacheKeys.user(userId), users[0])
            return users[0]
        }
        throw Errors.UserNotFound
    }
}
