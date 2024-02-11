export interface OtpResponse {
    amountFinance:      number;
    fees:               number;
    rateApprobeAnnual:  number;
    rateApprobeMonth:   number;
    fGA:                number;
    platform:           number;
    token:              string;
    validationStrategy: string;
    credits:            any[];
}
