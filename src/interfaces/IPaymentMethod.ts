export interface IPaymentMethod{
    tax(amount: number): number
}