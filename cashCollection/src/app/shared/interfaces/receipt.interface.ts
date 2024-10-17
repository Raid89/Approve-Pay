export interface CreditData {
  id: string,
  saldoCredito: number,
  client?: string,
  nextPaid: number,
  nextFeesDate: string,
  feesPaid: number,
  comercio: string,
  configId: string,
  simpleDaysPastDue: number,
  principal: number,
  interest: number,
  deliquency_interest: number,
  installment_fee: number,
  late_fee: number,
  unpaid: number,
  selected?: boolean,
  typePaid?: string,
  otherValue: string,
  valueToSend: number,
  showPayments?: boolean,
  showDetails?: boolean,
  origination_date: string,
  amount_financed: number,
  fees: number,
  payments: IPaymentDetails[]
}

export interface IClientCredit {
  idCredit: string;
  ammount: number;
}

export interface ICashier {
  id: string;
}

export interface ICashPayment {
  casheer: ICashier;
  customer: string;
  totalAmmount: number;
  wLstCredits: IClientCredit[];
}

export interface ITransaction {
  actionStrategyPattern: string;
  cashPayment: ICashPayment;
}

export interface IPaymentDetails {
  daily_fee: number;
  delinquency_interest: number;
  effective_date: string;
  installment_fee: number;
  interest: number;
  late_fee: number;
  payment_id: string;
  principal: number;
  total: number;
}