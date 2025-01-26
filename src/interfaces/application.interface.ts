import {IAppealAnswer, IAppealDetail} from "@interfaces/appeal.interface.ts";
import {IFIle} from "@interfaces/form.interface.ts";

interface IApplicationList {
    id: number;
    appeal: IAppealDetail;
    project_name: string;
    cost: string;
    from_date: string;
    to_date: string;
    created_at: string;
    status: "new" | "negotiated" | "returned" | "in_MoF" | "approved" | "rejected";
    answer_type?: "returned" | "positive" | "negative";
    type: "first" | "repetitive";
}

interface IApplicationDetail {
    id: number;
    appeal: IAppealDetail;
    project_name: string;
    answer_status: "in_progress" | "returned" | "approved" | "rejected";
    cost: string;
    from_date: number;
    to_date: number;
    description: string;
    created_at: string;
    status: "new" | "negotiated" | "returned" | "in_MoF" | "approved" | "rejected";
    answer_type?: "returned" | "positive" | "negative";
    type: "first" | "repetitive";
    answers: IAppealAnswer[];
    files: IFIle[];
    sxo_files: IFIle[] | null;
}

interface IApplicationFileGenerate {
    company_name: string;
    object_region: string;
    fullName: string;
    object_name: string;
    object_type: string;
    day: number;
    month: string;
    project_cost: string;
    from_date: string;
    to_date: string;
    bank_account?: string;
    mfo: string;
}


export type {
    IApplicationList,
    IApplicationDetail,
    IApplicationFileGenerate
}