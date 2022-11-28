export interface Content {
    id: number
    orderNumber: number
    date: string | Date
    finalPrice: number
    status: Status
    //products: Product[]
}
 export enum Status{
     Pending = 'Pending',
     InProgress = "InProgress",
     Completed = 'Completed'
 }
