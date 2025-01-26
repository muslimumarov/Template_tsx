import {IFIle} from "@interfaces/form.interface.ts";

interface ILoginForm {
    username: string;
    password: string;
}

interface IAppealForm {
    lastName: string;
    firstName: string;
    middleName: string;
    idNumber: string;
    region: string;
    wmfRegion: string;
    address: string;
    organization: string;
    tin: string;
    bankAccount: string;
    balanceHolder: string;
    phone: string;
    email: string;
    wmfType: string[];
    objects: string[];
    content: string;
    attachment?: string | number;
    files: IFIle[];
}

interface IReplyAppealForm {
    responseType: string;
    // responseDate: string;
    responseText: string;
    files: IFIle[];
}

interface IOperatorReturnAppealForm {
    responseText: string;
    files?: IFIle[] | null;
}

interface ISentForm {
    files?: IFIle[] | null;
}

interface IReturnAppealForm {
    comment: string;
}

// Applications
interface IApplicationForm {
    name: string;
    cost: string;
    startDate: string;
    endDate: string;
    files: IFIle[];
    content: string;
}

// Investments
interface IAddInvestmentForm {
    foracast_electricity_cost: string; // Forecast electricity cost
    exploitation_cost: string; // Exploitation cost
    exploitation_salary: string; // Exploitation salary
    exploitation_electricity_cost: string; // Exploitation electricity cost
    exploitation_full_repair: string; // Full repair cost
    exploitation_current_repair: string; // Current repair cost
    exploitation_other_cost: string; // Other exploitation costs
    investment_funds: string; // Investment funds
    year: string; // Year as a string
}

interface IAddReportForm {
    cost: string;
    description: string;
    files: IFIle[];
}

// Electricity

interface IAddElectricity {
    electricity_capacity: string | number;
    year: string | number;
}


interface IAddElectricityReportForm {
    electricity_capacity: string | number;
    description: string;
    files: IFIle[];
}

export type {
    ILoginForm,
    IAppealForm,
    IReplyAppealForm,
    IReturnAppealForm,
    IOperatorReturnAppealForm,
    IApplicationForm,
    ISentForm,
    IAddInvestmentForm,
    IAddReportForm,
    IAddElectricity,
    IAddElectricityReportForm
}