export class PaymentReceived {
  constructor(readonly orderId: string,
              readonly customerId: string,
              readonly amountPaid: number,
              readonly receivedAt: number,
              readonly paidAt: number) {
  };
}

