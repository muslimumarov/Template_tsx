import {ROLE_LIST} from "@app/shared";
import {Appeals, Applications, Investment, Monitoring, Reports} from "@app/assets";
import {IMenuItem} from "@app/interfaces";

export const menu: IMenuItem[] = [
    {
        id: "/appeals",
        label: "Appeals",
        icon: Appeals,
        href: "/appeals",
        allowedRoles: [
            ROLE_LIST.HEAD,
            ROLE_LIST.OPERATOR,
            ROLE_LIST.APPLICANT,
        ],
        order: {
            [ROLE_LIST.HEAD]: 2,
            [ROLE_LIST.OPERATOR]: 1,
            [ROLE_LIST.APPLICANT]: 1,
        }
    },
    {
        id: "/applications",
        label: "Applications",
        icon: Applications,
        href: "/applications",
        allowedRoles: [
            ROLE_LIST.HEAD,
            ROLE_LIST.OPERATOR,
            ROLE_LIST.APPLICANT,
            ROLE_LIST.FINANCE_EMPLOYEE
        ],
        order: {
            [ROLE_LIST.HEAD]: 3,
            [ROLE_LIST.OPERATOR]: 2,
            [ROLE_LIST.APPLICANT]: 2,
            [ROLE_LIST.FINANCE_EMPLOYEE]: 1
        }
    },
    {
        id: "/investments",
        label: "Investment obligation",
        icon: Investment,
        href: "/investments",
        allowedRoles: [
            ROLE_LIST.HEAD,
            ROLE_LIST.OPERATOR,
            ROLE_LIST.APPLICANT
        ],
        order: {
            [ROLE_LIST.HEAD]: 4,
            [ROLE_LIST.OPERATOR]: 3,
            [ROLE_LIST.APPLICANT]: 3
        }
    },
    {
        id: "/electricity",
        label: "Reports",
        icon: Reports,
        href: "/electricity",
        allowedRoles: [
            ROLE_LIST.HEAD,
            ROLE_LIST.OPERATOR,
            ROLE_LIST.APPLICANT
        ],
        order: {
            [ROLE_LIST.HEAD]: 5,
            [ROLE_LIST.OPERATOR]: 4,
            [ROLE_LIST.APPLICANT]: 4
        }
    },
    {
        id: "/monitoring",
        label: "Monitoring",
        icon: Monitoring,
        href: "/monitoring",
        allowedRoles: [
            ROLE_LIST.HEAD,
        ],
        order: {
            [ROLE_LIST.HEAD]: 1,
        }
    }
]
