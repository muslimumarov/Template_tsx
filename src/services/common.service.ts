import {ISearchParams, ISelectOption} from "@app/interfaces";
import {interceptor} from "@app/shared";

export const CommonService = {
    async getSelectList(type: string, queryParams?: ISearchParams, id?: string): Promise<ISelectOption[]> {
        const res = await interceptor<ISelectOption[]>(`common/${type}${id ? `/${id}` : ``}`, {params: queryParams})
        return res.data
    }
}