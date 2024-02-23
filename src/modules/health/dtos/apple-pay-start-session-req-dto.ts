import { Expose } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class ApplePayStartSessionCreateReqDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    url: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    merchantIdentifier: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    displayName: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    initiative: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    initiativeContext: string
}

export class ApplePayVelidateDomainCreateReqDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    domain: string
}
