import {IUserData, IFIle, ISelectOption} from "@app/interfaces";

interface IAppealList {
    id: number;
    sxo_objects: string[];
    object_types: string[];
    owner_organization?: string;
    created_at?: string;
    status: string;
    answer_type: 'returned' | 'positive' | 'negative' | null;
    type: 'first' | 'repetitive';
}

interface IAppealAnswer {
    id: number;
    text: string | null;
    note: string | null;
    created_by: IUserData;
    created_at: string;
    files: IFIle[];
}

interface IAppealDetail {
    id: number;
    firstname: string;
    inn_number: string;
    lastname: string;
    patronymic?: string | null;
    id_number: string;
    description: string;
    address: string;
    organization: string;
    bank_account: string;
    phone: string;
    region: ISelectOption;
    sxo_region: ISelectOption;
    email: string;
    sxo_objects: ISelectOption[];
    object_types: ISelectOption[];
    owner_organization: ISelectOption;
    created_at: string;
    status: "new" | "in_progress" | "returned" | "approved" | "rejected";
    answer_status: "in_progress" | "returned" | "approved";
    answer_type?: "returned" | "positive" | "negative" | null;
    type: "first" | "repetitive";
    answers: IAppealAnswer[];
    files: IFIle[];
}

interface IContractFileGenerate {
    company_name: string;
    object_region: string;
    object_name: string;
    object_type: string;
    day: number;
    month: string;
    project_cost: string;
    from_date: string;
    to_date: string;
    bank_account: string;
    mfo?: string | null;
}

interface IAppealFileGenerate {
    owner_organization: string;
    object_region: string;
    object_name: string;
    object_type: string;
    company_name: string;
    fullName: string;
}

interface IAttachmentResponse {
    attachment: number;
    file_path: string;
    message: string;
}

export type {
    IAppealList,
    IAppealDetail,
    IAppealAnswer,
    IContractFileGenerate,
    IAppealFileGenerate,
    IAttachmentResponse
}