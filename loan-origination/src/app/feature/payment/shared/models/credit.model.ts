export interface Credit {
  id: string;
  client: string;
  creditType: string;
  saldoCredito: number;
  nextPaid: number;
  nextFeesDate: string;
}