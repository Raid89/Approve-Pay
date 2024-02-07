export interface DocumentResponse {
  amountFinance:      number;
  fees:               number;
  rateApprobeAnnual:  number;
  rateApprobeMonth:   number;
  fGA:                number;
  platform:           number;
  validationStrategy: string;
  documents:          Document[];
}

export interface Document {
  name: string;
  pag:  number;
  data: string;
}