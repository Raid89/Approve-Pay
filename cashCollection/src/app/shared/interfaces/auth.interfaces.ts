export interface IFinancialData{
    amountFinance: number;
    fees: number;
    rateApprobeAnnual: number;
    mail: string;
    fechaCreacion?: "2024-06-10T19:09:41-05:00",
    name: string;
    phone : string;
    rateApprobeMonth: number;
    fGA: number;
    id?: string;
    url?: string;
    platform: number;
    validationStrategy: string;
}

export interface IUserValidData extends IFinancialData {
    token: string;
    accessList: string;
}