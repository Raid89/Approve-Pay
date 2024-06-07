export interface IFinancialData{
    amountFinance: number;
    fees: number;
    rateApprobeAnnual: number;
    mail: string;
    name: string;
    phone : string;
    rateApprobeMonth: number;
    fGA: number;
    platform: number;
    validationStrategy: string;
}

export interface IUserValidData extends IFinancialData {
    token: string;
    accessList: string;
}