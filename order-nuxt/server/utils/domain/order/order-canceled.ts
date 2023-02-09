export class OrderCanceled {
  constructor(readonly orderId: string,
              readonly canceledAt: number) {
  };
}

