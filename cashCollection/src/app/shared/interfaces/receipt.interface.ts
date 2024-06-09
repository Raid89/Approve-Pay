export interface CreditData {
    id: string,
    saldoCredito: number,
    nextPaid: number,
    nextFeesDate: string,
    feesPaid: number,
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
}

export interface IClientCredit {
    idCredit: string;
    amount: number;
  }
  
  export interface ICashier {
    id: string;
  }
  
  export interface ICashPayment {
    cashier: ICashier;
    customer: string;
    totalAmmount: number;
    wLstCredits: IClientCredit[];
  }
  
  export interface ITransaction {
    actionStrategyPattern: string;
    cashPayment: ICashPayment;
  }
  