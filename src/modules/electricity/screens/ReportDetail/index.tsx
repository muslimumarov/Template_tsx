import {
    Button,
    FileUpLoader,
    PageLayout,
    PageTitle,
    Restricted,
    ShowIf,
    Tag,
    HR,
    Wrapper
} from "@app/components";
import {BUTTON_THEME, convertDateFormat, getSearchParamsAsObject, ROLE_LIST, STATUS_LIST} from "@app/shared";
import {useReportDetail} from "@modules/electricity/hooks";
import {useTranslation} from "react-i18next";
import {useOperatorApprove} from "@modules/appeals/hooks";
import {useNavigate, useSearchParams} from "react-router-dom";

const ReportDetail = () => {
    const [searchParams] = useSearchParams();
    const {data} = useReportDetail();
    const {t} = useTranslation()
    const {year = ''} = getSearchParamsAsObject(searchParams);
    const {isPending: isOperatorApprovePending, operatorApproveAppeal} = useOperatorApprove(false, false, true);
    const navigate = useNavigate();

    return (
        <PageLayout>
            <PageTitle title={`${t("Send report")} -  ${year ? `${t(year)} ${t('year')}` : ""}`}/>
            <Wrapper>
                <div className="flex gap--5xl items-center">
                    <Tag title="Action" string>
                        {data?.electricity_capacity}
                    </Tag>
                    <Tag title="Date" string>
                        {convertDateFormat(data?.created_at)}
                    </Tag>
                </div>
                <HR/>
                <Tag title="Comment" type="vertical" string>
                    <div className="grid grid--cols-3 gap--lg">
                        {data?.description}
                    </div>
                </Tag>
                <HR/>
                <Tag title="Documents" type="vertical">
                    <div className="grid grid--cols-3 gap--lg">
                        {data?.files?.map((file) => (
                            <FileUpLoader key={file.id} value={file} id={file.id as string}/>
                        ))}
                    </div>
                </Tag>
                <ShowIf show={data?.status === STATUS_LIST.REJECTED}>
                    <HR/>
                    <Tag title="Reason for return" type="vertical" string>
                        <div className="grid grid--cols-3 gap--lg">
                            {data?.operator_note}
                        </div>
                    </Tag>
                </ShowIf>
            </Wrapper>

            <div className="flex gap--lg items-center justify-between">
                <Button onClick={() => navigate(-1)} theme={BUTTON_THEME.OUTLINE}>
                    Back
                </Button>
                <Restricted permittedRole={[ROLE_LIST.OPERATOR]}>
                    <ShowIf show={data?.status === STATUS_LIST.NEW}>
                        <div className='flex gap--lg items-center'>
                            <Button onClick={() => navigate('return')} theme={BUTTON_THEME.DANGER_OUTLINE}>
                                Return
                            </Button>
                            <Button
                                onClick={() => operatorApproveAppeal()}
                                theme={BUTTON_THEME.PRIMARY}
                                disabled={isOperatorApprovePending}
                            >
                                Confirm
                            </Button>
                        </div>
                    </ShowIf>
                </Restricted>
            </div>
        </PageLayout>
    );
};

export default ReportDetail;
