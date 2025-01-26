import {interceptor} from "@app/shared";
import {ILogin, ILoginForm, IUserData} from "@app/interfaces";

export const AuthenticationService = {
    async login(credentials: ILoginForm) {
        const response = await interceptor.post<ILogin>('accounts/login', credentials)
        return response.data
    },

    async me() {
        return await interceptor.get<IUserData>('accounts/whoami')
    },

    async logout() {
        return await interceptor.get('accounts/logout')
    }
}