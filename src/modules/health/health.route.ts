import { Router } from 'express'
import { Inject, Service } from 'typedi'
import { AppRoute } from '../../app'
import path from 'path'
import { transformAndValidate } from '../../utils/validator'
import {
    ApplePayStartSessionCreateReqDTO,
    ApplePayVelidateDomainCreateReqDTO,
} from './dtos/apple-pay-start-session-req-dto'
import { ApplePayController } from './health.controller'

@Service()
export class HealthRoute implements AppRoute {
    route?: string = ''
    router: Router = Router()

    constructor(@Inject() private applePayController: ApplePayController) {
        this.router.get(
            '/.well-known/apple-developer-merchantid-domain-association',
            (req, res) => {
                const filePath = path.join(
                    __dirname,
                    '../.well-known/apple-developer-merchantid-domain-association'
                )
                res.sendFile(filePath)
            }
        )

        this.router.post(
            '/apple-pay/validate-domain',
            transformAndValidate(ApplePayVelidateDomainCreateReqDTO),
            this.applePayController.validateDomainApplePay.bind(
                this.applePayController
            )
        )

        this.router.post(
            '/apple-pay/validate-merchant',
            transformAndValidate(ApplePayStartSessionCreateReqDTO),
            this.applePayController.validateMerchantApplePay.bind(
                this.applePayController
            )
        )

        this.router.get('/', (req, res) => {
            res.send('Server is running')
        })
    }
}
