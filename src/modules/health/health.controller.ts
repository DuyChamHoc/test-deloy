import { Inject, Service } from 'typedi'
import { ApplePayService } from './health.services'
import {
    ApplePayStartSessionCreateReqDTO,
    ApplePayVelidateDomainCreateReqDTO,
} from './dtos/apple-pay-start-session-req-dto'
import { DataRequest } from '../../base/base.request'
import { NextFunction, Response } from 'express'
import { ResponseWrapper } from '../../utils/response'

@Service()
export class ApplePayController {
    constructor(@Inject() public applePayService: ApplePayService) {}
    async validateDomainApplePay(
        req: DataRequest<ApplePayVelidateDomainCreateReqDTO>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result = await this.applePayService.validateDomainApplePay(
                req.data
            )
            res.send(new ResponseWrapper(result))
        } catch (err) {
            next(err)
        }
    }

    async validateMerchantApplePay(
        req: DataRequest<ApplePayStartSessionCreateReqDTO>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const result = await this.applePayService.validateMerchantApplePay(
                req.data
            )
            res.send(new ResponseWrapper(result))
        } catch (err) {
            next(err)
        }
    }
}
