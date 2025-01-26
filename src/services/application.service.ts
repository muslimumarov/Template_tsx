import {
    IApplicationDetail, IApplicationFileGenerate,
    IApplicationForm,
    IApplicationList, IAttachmentResponse,
    IListResponse,
    IOperatorReturnAppealForm,
    IReplyAppealForm,
    ISearchParams,
    ISentForm
} from "@app/interfaces";
import {extractIds, interceptor} from "@app/shared";

export const ApplicationService = {
    async getApplications(queryParams: ISearchParams, isOperator: boolean = false, isDirector: boolean = false, isMOF: boolean = false) {
        const res = await interceptor<IListResponse<IApplicationList>>(`application/${isMOF ? 'mof/appeal/list' : isDirector ? 'director/appeal/list' : isOperator ? 'operator/appeal/list' : 'business-owner'}`, {params: queryParams})
        return res.data
    },

    async getApplication(id: number | string) {
        const res = await interceptor<IApplicationDetail>(`application/business-owner/${id}`)
        return res.data
    },

    async addApplication(data: IApplicationForm, id: string) {
        const newData = {
            appeal: +id,
            project_name: data.name,
            cost: data.cost,
            from_date: +data.startDate,
            to_date: +data.endDate,
            files: extractIds(data.files),
            description: data.content,
        }
        const res = await interceptor.post('application/business-owner', newData)
        return res.data
    },

    async applicationFileGenerate(data: IApplicationFileGenerate) {
        const newData = {
            company_name: data.company_name,
            object_region: data.object_region,
            object_name: data.object_name,
            object_type: data.object_type,
            fullname: data.fullName,
            day: data.day,
            month: data.month,
            project_cost: data.project_cost,
            from_date: data.from_date,
            to_date: data.to_date,
            bank_account: data.bank_account,
            mfo: 1011
        }
        const res = await interceptor.post<IAttachmentResponse>('contract-file-generate', newData)
        return res.data
    },

    async editApplication(data: IApplicationForm, id: string) {
        const newData = {
            project_name: data.name,
            cost: data.cost,
            from_date: +data.startDate,
            to_date: +data.endDate,
            files: extractIds(data.files),
            description: data.content,
        }
        const res = await interceptor.patch(`application/business-owner/${id}`, newData)
        return res.data
    },

    async editApplicationFiles(data: string | number, id: string | number) {
        const newData = {
            file: data,
        }
        const res = await interceptor.patch(`application/director/${id}/add_file`, newData)
        return res.data
    },

    async returnAppeal(data: IOperatorReturnAppealForm, id: string, path: 'director' | 'operator' | 'mof') {
        const newData = {
            application: id,
            text: data.responseText,
            files: extractIds(data.files),
        }
        const res = await interceptor.post(`application/${path}/${path === "director" ? "reject" : "return"}`, newData)
        return res.data
    },

    async sentAppeal(data: ISentForm, id: string) {
        const newData = {
            sxo_files: extractIds(data.files)
        }
        const res = await interceptor.patch(`application/operator/${id}/send-mof`, newData)
        return res.data
    },

    async replyAppeal(data: IReplyAppealForm, id: string) {
        const newData = {
            application: id,
            text: data.responseText,
            files: extractIds(data.files),
        }
        const res = await interceptor.post(`application/mof/${data.responseType}`, newData)
        return res.data
    },

    async operatorApproveAppeal(id: string) {
        const res = await interceptor(`application/operator/${id}/send-user`)
        return res.data
    },

    async approveAppeal(id: string) {
        const res = await interceptor(`application/director/${id}/approve`)
        return res.data
    }
}