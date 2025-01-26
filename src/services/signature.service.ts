import {interceptor} from "@app/shared";
import {IChallenge} from "@app/interfaces";

export const SignatureService = {

    async getChallenge() {
        const res = await interceptor<IChallenge>(`frontend/challenge`)
        return res.data
    },

    async login(credentials: string) {
        const response = await interceptor.post('accounts/e-imzo-login', {token: credentials})
        return response.data
    },


}