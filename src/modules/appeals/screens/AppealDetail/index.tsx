import {
    Button,
    FileUpLoader,
    GridWrapper,
    PageLayout,
    PageTitle,
    Restricted,
    Row, ShowIf,
    Status,
    Tag,
    Wrapper
} from "@app/components";
import {BUTTON_THEME, convertDateFormat, formatString, ROLE_LIST, STATUS_LIST} from "@app/shared";
import HR from "@components/HR";
import {useAppealDetail, useApprove, useOperatorApprove} from "@modules/appeals/hooks";
import {useAppContext} from "@app/hooks";
import {useNavigate, useParams} from "react-router-dom";

const Index = () => {
    const {data} = useAppealDetail()
    const {user} = useAppContext()
    const {id = ''} = useParams()
    const navigate = useNavigate()
    const {isPending, approveAppeal} = useApprove()
    const {isPending: isOperatorApprovePending, operatorApproveAppeal} = useOperatorApprove()

    return (
        <PageLayout>
            <PageTitle title="Appeal"/>
            <Wrapper>
                <div className="flex gap--5xl items-center">
                    <Tag title="Request status">
                        {
                            data?.status &&
                            <Status status={data.status}/>
                        }
                    </Tag>

                    {
                        [ROLE_LIST.OPERATOR, ROLE_LIST.HEAD, ROLE_LIST.FINANCE_EMPLOYEE].includes(user.role) &&
                        <>
                            <Tag title="Reply letter">
                                {
                                    <Status status={data?.answer_type ?? STATUS_LIST.INCOMPLETE}/>
                                }
                            </Tag>
                            <Tag title="Type of request">
                                {
                                    data?.type &&
                                    <Status status={data.type}/>
                                }
                            </Tag>
                        </>
                    }
                    <Tag title="Date" string>
                        {convertDateFormat(data?.created_at)}
                    </Tag>
                    <Tag title="WMF area" string>
                        {data?.sxo_region?.label ?? ""}
                    </Tag>
                </div>
                <HR/>
                <div className="grid grid--cols-2  gap--lg">
                    <GridWrapper>
                        <Row label="Applicant's last name" value={data?.lastname}/>
                        <Row label="Applicant's first name" value={data?.firstname} background/>
                        <Row label="Applicant's middle name" value={data?.patronymic}/>
                        <Row label="Applicant ID or Tax ID number" value={data?.id_number} background/>
                        <Row label="Region" value={data?.region?.label}/>
                        <Row label="Address" value={data?.address} background/>
                        <Row label="Organization name" value={data?.organization}/>
                    </GridWrapper>
                    <GridWrapper>
                        <Row label="Taxpayer Identification Number (TIN)" value={data?.inn_number} background/>
                        <Row label="Bank account number" value={data?.bank_account}/>
                        <Row label="Phone number" value={data?.phone} background/>
                        <Row label="Email address" value={data?.email}/>
                        <Row label="Balance holding organization" value={data?.owner_organization?.label} background/>
                        <Row label="WMF type" value={formatString(data?.object_types)}/>
                        <Row label="Objects" value={formatString(data?.sxo_objects)} background/>
                    </GridWrapper>
                </div>
                <HR/>
                <Tag title="Additional documents" type="vertical">
                    <div className="grid grid--cols-3 gap--lg">
                        {
                            data?.files?.map((file) => {
                                return (
                                    <FileUpLoader
                                        key={file.id}
                                        value={file}
                                        id={file.id as string}
                                    />
                                )
                            })
                        }
                    </div>
                </Tag>
                <HR/>
                <Tag title="Appeal content" string type="vertical">
                    {data?.description ?? ""}
                </Tag>
                {
                    data?.status && data?.answers.length > 0 &&
                    <>
                        <Restricted permittedRole={[ROLE_LIST.APPLICANT]}>
                            <ShowIf
                                show={
                                    data?.status === STATUS_LIST.RETURNED ||
                                    data?.status === STATUS_LIST.APPROVED ||
                                    data?.status === STATUS_LIST.REJECTED
                                }
                            >
                                <Tag
                                    title={data?.status === STATUS_LIST.RETURNED ? "Reason for return" : "Reply letter"}
                                    string
                                    type="vertical">
                                    {data?.answers?.[data?.answers?.length - 1]?.text ?? ""}
                                </Tag>
                                <Tag title="Documents" type="vertical">
                                    <div className="grid grid--cols-3 gap--lg">
                                        {
                                            data?.answers?.[data?.answers?.length - 1]?.files?.map((file) => {
                                                return (
                                                    <FileUpLoader
                                                        key={file.id}
                                                        value={file}
                                                        id={file.id as string}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                </Tag>
                            </ShowIf>
                        </Restricted>
                        <Restricted permittedRole={[ROLE_LIST.HEAD, ROLE_LIST.OPERATOR]}>
                            <ShowIf
                                show={
                                    data?.status === STATUS_LIST.IN_PROGRESS ||
                                    data?.status === STATUS_LIST.APPROVED ||
                                    data?.status === STATUS_LIST.REJECTED
                                }
                            >
                                <Tag
                                    title="Reply letter"
                                    string
                                    type="vertical"
                                >
                                    {data?.answers?.[data?.answers?.length - 1]?.text ?? ""}
                                </Tag>
                                <Tag title="Documents" type="vertical">
                                    <div className="grid grid--cols-3 gap--lg">
                                        {
                                            data?.answers?.[data?.answers?.length - 1]?.files?.map((file) => {
                                                return (
                                                    <FileUpLoader
                                                        key={file.id}
                                                        value={file}
                                                        id={file.id as string}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                </Tag>
                            </ShowIf>
                            <ShowIf
                                show={
                                    data?.answer_status === STATUS_LIST.RETURNED && data?.status === STATUS_LIST.IN_PROGRESS
                                }
                            >
                                <Tag
                                    title="Manager's return comment"
                                    string
                                    type="vertical"
                                >
                                    {data?.answers?.[data?.answers?.length - 1]?.note ?? ""}
                                </Tag>
                            </ShowIf>
                        </Restricted>
                    </>
                }
            </Wrapper>
            <div className="flex gap--lg items-center justify-between">
                <Button onClick={() => navigate(-1)} theme={BUTTON_THEME.OUTLINE}>
                    Back
                </Button>
                <Restricted permittedRole={[ROLE_LIST.OPERATOR]}>
                    <ShowIf
                        show={
                            data?.status === STATUS_LIST.NEW ||
                            (
                                data?.answer_status === STATUS_LIST.RETURNED &&
                                data?.status === STATUS_LIST.IN_PROGRESS
                            )
                        }
                    >
                        <div className='flex gap--lg items-center'>
                            <Button onClick={() => navigate('return')} theme={BUTTON_THEME.DANGER_OUTLINE}>
                                Return
                            </Button>
                            <Button onClick={() => navigate('reply')} theme={BUTTON_THEME.PRIMARY}>
                                Send reply letter
                            </Button>
                        </div>
                    </ShowIf>
                    <ShowIf
                        show={
                            data?.status === STATUS_LIST.IN_PROGRESS &&
                            data?.answer_status === STATUS_LIST.APPROVED
                        }
                    >
                        <div className='flex gap--lg items-center'>
                            <Button
                                onClick={() => operatorApproveAppeal()}
                                theme={BUTTON_THEME.PRIMARY}
                                disabled={isOperatorApprovePending}
                            >
                                Send reply letter
                            </Button>
                        </div>
                    </ShowIf>
                </Restricted>
                <Restricted permittedRole={[ROLE_LIST.HEAD]}>
                    <ShowIf
                        show={
                            data?.status === STATUS_LIST.IN_PROGRESS &&
                            data?.answer_status === STATUS_LIST.IN_PROGRESS
                        }
                    >
                        <div className='flex gap--lg items-center'>
                            <Button onClick={() => navigate('return')} theme={BUTTON_THEME.DANGER_OUTLINE}>
                                Return
                            </Button>
                            <Button onClick={() => approveAppeal()} theme={BUTTON_THEME.PRIMARY} disabled={isPending}>
                                Confirm
                            </Button>
                        </div>
                    </ShowIf>
                </Restricted>
                <Restricted permittedRole={[ROLE_LIST.APPLICANT]}>
                    <ShowIf show={data?.status === STATUS_LIST.RETURNED}>
                        <div className='flex gap--lg items-center'>
                            <Button onClick={() => navigate('edit')} theme={BUTTON_THEME.PRIMARY}>
                                Edit
                            </Button>
                        </div>
                    </ShowIf>
                    <ShowIf show={data?.status === STATUS_LIST.APPROVED}>
                        <div className='flex gap--lg items-center'>
                            <Button onClick={() => navigate(`/applications/${id}/add`)} theme={BUTTON_THEME.PRIMARY}>
                                Submit application
                            </Button>
                        </div>
                    </ShowIf>
                </Restricted>
            </div>
        </PageLayout>
    );
};

export default Index;