import {ROLE_LIST} from "@app/shared";
import {IAuthentication, ILogin, IRole} from "@app/interfaces";

function buildUser(userData: ILogin | undefined, status: "error" | "success" | "pending" = "pending"): IAuthentication | null {
    if (status !== "success") return null
    return {
        fullName: `${userData?.data?.first_name} ${userData?.data?.last_name} `,
        role: userData?.data?.role ?? ROLE_LIST.APPLICANT
    }
}

const routeByRole = (role: IRole = ROLE_LIST.APPLICANT): string => {
    switch (role) {
        case ROLE_LIST.HEAD:
            return "/monitoring";
        case ROLE_LIST.OPERATOR:
        case ROLE_LIST.APPLICANT:
            return "/appeals";
        case ROLE_LIST.FINANCE_EMPLOYEE:
            return "/applications";
        default:
            return "/";
    }
}

export {
    buildUser,
    routeByRole
}