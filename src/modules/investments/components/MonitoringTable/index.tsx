import {Table} from "@app/components";
import {Column} from "react-table";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";
import {IInvestmentList} from "@app/interfaces";
import {useInvestments} from "@modules/investments/hooks";
import {useNavigate} from "react-router-dom";

const InvestmentList = () => {
    const {t} = useTranslation();
    const {investments, isPending, total, totalPages, currentPage} = useInvestments();
    const navigate = useNavigate();

    const columns: Column<IInvestmentList>[] = useMemo(
        () => [
            {
                Header: t("Project name"),
                accessor: (row) => row?.project_name,
            },
            {
                Header: t("Organization name"),
                accessor: (row: IInvestmentList) => row.organization
            },
            {
                Header: t("Amount (in sum)"),
                accessor: (row) => row?.cost,
            },
            {
                Header: t("Duration (from)"),
                accessor: row => `${row?.from_date} ${t('year')}`
            },
            {
                Header: t("Duration (to)"),
                accessor: row => `${row?.to_date} ${t('year')}`
            }
        ],
        [t]
    );

    const handleRow = (id: string | number): void => {
        navigate(`/investments/${id}`);
    };

    return (
        <Table
            total={total}
            currentPage={currentPage}
            totalPages={totalPages}
            isLoading={isPending}
            columns={columns}
            handleRow={handleRow}
            data={investments}
            screen={true}
        />
    );
};

export default InvestmentList;
