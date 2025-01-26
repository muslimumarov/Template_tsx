enum ROLE_LIST {
    APPLICANT = "user",
    OPERATOR = "operator",
    HEAD = "director",
    FINANCE_EMPLOYEE = "finance_operator",
}

const ROLE_LABEL: Record<ROLE_LIST, string> = {
    [ROLE_LIST.APPLICANT]: "User",
    [ROLE_LIST.OPERATOR]: "Operator",
    [ROLE_LIST.HEAD]: "Head",
    [ROLE_LIST.FINANCE_EMPLOYEE]: "Finance employee",
};


export {
    ROLE_LIST,
    ROLE_LABEL
}