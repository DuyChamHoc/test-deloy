import { plainToInstance } from 'class-transformer'
import { IsNotEmpty, IsString, validateSync } from 'class-validator'
import Container, { Service } from 'typedi'

@Service()
export class Config {
    @IsString()
    @IsNotEmpty()
    nodeEnv: string

    constructor() {
        const env = process.env
        this.nodeEnv = env.NODE_ENV
    }

    isProduction() {
        return this.nodeEnv === 'production'
    }
}

export const validateEnv = (config: Config) => {
    const errors = validateSync(plainToInstance(Config, config))
    if (errors.length) {
        const childErrors = errors.map((e) => e.children).flat()
        const constraints = [...errors, ...childErrors].map(
            (e) => e.constraints
        )
        throw new Error(`Env validation error: ${JSON.stringify(constraints)}`)
    }
}

export const config = Container.get(Config)
