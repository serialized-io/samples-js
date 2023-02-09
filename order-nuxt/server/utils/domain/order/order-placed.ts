export class OrderPlaced {
  constructor(readonly orderId: string,
              readonly customerId: string,
              readonly sku: string,
              readonly orderAmount: number,
              readonly placedAt: number) {
  };
}

