export interface PlaceOrder {
  orderId: string;
  customerId: string;
  sku: string;
  itemPrice: number;
  orderAmount: number;
  placedAt: number;
}

export interface PayOrderFully {
  orderId: string;
  paidAt: number;
}
