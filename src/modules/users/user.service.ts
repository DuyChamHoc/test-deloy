import { Inject, Service } from 'typedi'
import { Config } from '../../configs'

@Service()
export class UserService {
    constructor(@Inject() private config: Config) {}
}
