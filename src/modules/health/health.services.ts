import { Service } from 'typedi'
import {
    ApplePayStartSessionCreateReqDTO,
    ApplePayVelidateDomainCreateReqDTO,
} from './dtos/apple-pay-start-session-req-dto'
import axios, { AxiosRequestConfig } from 'axios'

@Service()
export class ApplePayService {
    constructor() {}

    async validateDomainApplePay(data: ApplePayVelidateDomainCreateReqDTO) {
        try {
            const url = `https://gateway.pmnts-sandbox.io/v1.0/utilities/apple_pay/domains/${data.domain}`
            const axiosConfig: AxiosRequestConfig = {
                method: 'POST',
                url: url,
                auth: {
                    username: 'TESTprojectsdp',
                    password: '86446a2f67f8443cb117ffd28571e8223b9f9e38',
                },
            }

            const res = await axios(axiosConfig)
            return res.data
        } catch (error) {
            throw error
        }
    }

    async validateMerchantApplePay(data: ApplePayStartSessionCreateReqDTO) {
        try {
            const axiosConfig: AxiosRequestConfig = {
                method: 'POST',
                url: data.url,
                data: {
                    merchantIdentifier: data.merchantIdentifier,
                    initiative: data.initiative,
                    initiativeContext: data.initiativeContext,
                    displayName: data.displayName,
                },
            }

            const res = await axios(axiosConfig)
            return res.data
        } catch (error) {
            throw error
        }
    }
}
