import { Expose } from 'class-transformer'
import { PaymentTransactionCreateReqDTO } from '../../dtos/payment-transaction-create-req-dts'
import { IsNotEmpty, IsString } from 'class-validator'

export class ApplePayTransactionCreateReqDTO extends PaymentTransactionCreateReqDTO {
    @Expose()
    @IsNotEmpty()
    @IsString()
    type: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    paymentData: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    version: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    signature: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    ephemeralPublicKey: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    publicKeyHash: string

    @Expose()
    @IsNotEmpty()
    @IsString()
    transactionId: string
}
