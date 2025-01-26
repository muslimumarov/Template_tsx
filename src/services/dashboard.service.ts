import {interceptor} from "@app/shared";
import {ISearchParams, Statistics} from "@app/interfaces";

export const DashboardService = {
    async getCommonStatistics(params: ISearchParams): Promise<Statistics> {
        const res = await interceptor<Statistics>('common/statistic', {params: params});
        return res.data;
    },
}