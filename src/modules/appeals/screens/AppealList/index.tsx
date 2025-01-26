import {Button, PageLayout, PageTitle, Restricted, Status, Tab, Table} from "@app/components";
import {arrayToString, convertDateFormat, ROLE_LIST, STATUS_LIST, statusTabOptions} from "@app/shared";
import {Add} from "@app/assets";
import {Column} from "react-table";
import {useMemo} from "react";
import {useTranslation} from "react-i18next";
import {AppealListFilter} from "@modules/appeals/components";
import {useAppeals} from "@modules/appeals/hooks";
import {IAppealList} from "@app/interfaces";
import {useNavigate} from "react-router-dom";
import {useAppContext} from "@app/hooks";

const Index = () => {
    const {t} = useTranslation();
    const {appeals, isPending, total, totalPages, currentPage} = useAppeals()
    const navigate = useNavigate()
    const {user} = useAppContext()

    const columns: Column<IAppealList>[] = useMemo(
        () => [
            {
                Header: t("WMF name"),
                accessor: row => arrayToString(row.sxo_objects)
            },
            {
                Header: t("WMF type"),
                accessor: row => arrayToString(row.object_types)
            },
            ...(
                [ROLE_LIST.APPLICANT].includes(user.role) ?
                    [
                        {
                            Header: t("Balance holding organization"),
                            accessor: (row: IAppealList) => row?.owner_organization
                        }
                    ] :
                    []
            ),
            {
                Header: t("Date"),
                accessor: row => convertDateFormat(row?.created_at)
            },
            {
                Header: t("Request status"),
                accessor: row => (<Status status={row.status}/>)
            },
            ...(
                [ROLE_LIST.OPERATOR, ROLE_LIST.HEAD].includes(user.role) ?
                    [
                        {
                            Header: t("Reply letter"),
                            accessor: (row: IAppealList) => (
                                <Status status={row.answer_type ?? STATUS_LIST.INCOMPLETE}/>)
                        },
                        {
                            Header: t("Type of request"),
                            accessor: (row: IAppealList) => (<Status status={row.type}/>)
                        }
                    ] :
                    []
            ),
        ], [t, user.role]
    );

    const handleRow = (id: string | number): void => {
        navigate(`/appeals/${id}`)
    }

    return (
        <PageLayout>
            <PageTitle title="Appeals">
                <Restricted permittedRole={ROLE_LIST.APPLICANT}>
                    <Button
                        icon={<Add/>}
                        navigate='add'
                    >
                        Create appeal
                    </Button>
                </Restricted>
            </PageTitle>
            <AppealListFilter/>
            <Tab tabs={statusTabOptions} query="status" fallbackValue="all"/>
            <Table
                total={total}
                currentPage={currentPage}
                totalPages={totalPages}
                isLoading={isPending}
                columns={columns}
                handleRow={handleRow}
                data={appeals}
                screen={true}
            />
        </PageLayout>
    )
}

export default Index;