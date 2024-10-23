export interface IDateFilter {
    startDate: string;
    endDate: string;
    userId: string;
    start: number;
    end: number;
    casheer?: string;
}
  
export interface IResponseTotales {
    startDate: string,
    start: number,
    end: number,
    ammount: number,
    totalAmmount: number,
}