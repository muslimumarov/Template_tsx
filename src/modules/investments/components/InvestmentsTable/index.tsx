import {Status, Table} from "@app/components";
import {STATUS_LIST} from "@app/shared";
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
            },
            {
                Header: t("Application status"),
                accessor: (row: IInvestmentList) => <Status status={row.status}/>,
            },
            {
                Header: t("MOF conclusion"),
                accessor: (row: IInvestmentList) => (
                    <Status status={row.answer_type ?? STATUS_LIST.INCOMPLETE}/>
                ),
            },
            {
                Header: t("Application type"),
                accessor: (row: IInvestmentList) => <Status status={row.type}/>,
            },
        ],
        [t]
    );

    const handleRow = (id: string | number): void => {
        navigate(`/investments/${id}/add`);
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
