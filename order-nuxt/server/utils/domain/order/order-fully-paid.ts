export class OrderFullyPaid {
  constructor(readonly orderId: string,
              readonly customerId: string,
              readonly orderAmount: number,
              readonly paidAt: number) {
  };
}

