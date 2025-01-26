import {createBrowserRouter, Navigate} from "react-router-dom";
import {Error} from "@app/components";
import App from "@app/App.tsx";

// screens
import {
    AddAppeal,
    AppealDetail,
    Appeals,
    Applications,
    ReplyAppeal,
    Login,
    ReturnAppeal,
    AddApplication,
    ApplicationDetail,
    ReturnApplication,
    SentToMOF,
    ReplyMOFApplication,
    InvestmentList,
    AddInvestment,
    InvestmentDetail,
    AddReport,
    ReportDetail,
    ReportReturn,
    ElectricityAddPlan,
    ElectricityAddReport,
    ElectricityObjectDetail,
    ElectricityObjectsList,
    ElectricityReportDetail,
    ElectricityReportReturn,
    Dashboard
} from "@app/modules";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: 'appeals',
                children: [
                    {
                        index: true,
                        element: <Appeals/>,
                    },
                    {
                        path: 'add',
                        element: <AddAppeal/>,
                    },
                    {
                        path: ':id',
                        children: [
                            {
                                index: true,
                                element: <AppealDetail/>,
                            },
                            {
                                path: 'reply',
                                element: <ReplyAppeal/>,
                            },
                            {
                                path: 'return',
                                element: <ReturnAppeal/>,
                            },
                            {
                                path: 'edit',
                                element: <AddAppeal edit={true}/>,
                            }
                        ]
                    }
                ]
            },
            {
                path: 'applications',
                children: [
                    {
                        index: true,
                        element: <Applications/>,
                    },
                    {
                        path: ':id',
                        children: [
                            {
                                index: true,
                                element: <ApplicationDetail/>,
                            },
                            {
                                path: 'add',
                                element: <AddApplication/>,
                            },
                            {
                                path: 'edit',
                                element: <AddApplication edit={true}/>,
                            },
                            {
                                path: 'return',
                                element: <ReturnApplication/>,
                            },
                            {
                                path: 'sent',
                                element: <SentToMOF/>,
                            },
                            {
                                path: 'reply',
                                element: <ReplyMOFApplication/>,
                            }
                        ]
                    },
                ],
            },
            {
                path: 'investments',
                children: [
                    {
                        index: true,
                        element: <InvestmentList/>,
                    },
                    {
                        path: ':id',
                        children: [
                            {
                                index: true,
                                element: <InvestmentDetail/>,
                            },
                            {
                                path: 'add',
                                element: <AddInvestment/>,
                            },
                            {
                                path: 'edit',
                                element: <AddInvestment edit={true}/>,
                            },
                            {
                                path: 'report',
                                children: [
                                    {
                                        index: true,
                                        element: <ReportDetail/>,
                                    },
                                    {
                                        path: 'add',
                                        element: <AddReport/>,
                                    },
                                    {
                                        path: 'edit',
                                        element: <AddReport edit={true}/>,
                                    },
                                    {
                                        path: 'return',
                                        element: <ReportReturn/>,
                                    }
                                ],
                            },
                        ]
                    }
                ],
            },
            {
                path: 'electricity',
                children: [
                    {
                        index: true,
                        element: <ElectricityObjectsList/>,
                    },
                    {
                        path: ':id',
                        children: [
                            {
                                index: true,
                                element: <ElectricityObjectDetail/>,
                            },
                            {
                                path: 'add',
                                element: <ElectricityAddPlan/>,
                            },
                            {
                                path: 'edit',
                                element: <ElectricityAddPlan edit={true}/>,
                            },
                            {
                                path: 'report',
                                children: [
                                    {
                                        index: true,
                                        element: <ElectricityReportDetail/>,
                                    },
                                    {
                                        path: 'add',
                                        element: <ElectricityAddReport/>,
                                    },
                                    {
                                        path: 'edit',
                                        element: <ElectricityAddReport edit={true}/>,
                                    },
                                    {
                                        path: 'return',
                                        element: <ElectricityReportReturn/>,
                                    }
                                ],
                            },
                        ]
                    }
                ],
            },
            {
                path: 'monitoring',
                children: [
                    {
                        index: true,
                        element: <Dashboard/>,
                    }
                ],
            }
        ],
        errorElement: <Error/>
    },
    {
        path: "/login",
        element: <Login/>,
        errorElement: <Error/>
    },
    {
        path: "*",
        element: <Navigate to='/appeals'/>,
        errorElement: <Error/>
    }
])

