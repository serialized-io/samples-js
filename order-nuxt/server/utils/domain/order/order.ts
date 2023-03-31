import {OrderState} from "~/server/utils/domain/order/order-state";
import {PayOrderFully, PlaceOrder} from "~/server/utils/domain/order/commands";
import {
  OrderCanceled,
  OrderFullyPaid,
  OrderPlaced,
  OrderShipped,
  PaymentReceived
} from "~/server/utils/domain/order/events";

export enum OrderStatus {
  PLACED = 'PLACED',
  FULLY_PAID = 'FULLY_PAID',
  SHIPPED = 'SHIPPED',
  CANCELED = 'CANCELED'
}

export class Order {

  constructor(private readonly state: OrderState) {
  }

  place(command: PlaceOrder): [OrderPlaced] | [] {
    if (!this.state.status) {
      return [{
        eventType: 'OrderPlaced',
        data: {
          orderId: command.orderId,
          customerId: command.customerId,
          sku: command.sku,
          orderAmount: command.orderAmount,
          placedAt: command.placedAt
        }
      }];
    } else if (this.state.status === OrderStatus.PLACED) {
      return []
    } else {
      throw new Error('Cannot place order with status ' + this.state.status)
    }
  }

  payFully(command: PayOrderFully): [PaymentReceived, OrderFullyPaid] | [] {
    if (this.state.status === OrderStatus.PLACED || this.state.status === OrderStatus.SHIPPED) {
      return [
        {
          eventType: 'PaymentReceived',
          data: {
            orderId: this.state.orderId!,
            customerId: this.state.customerId!,
            amountPaid: this.state.orderAmount!,
            paidAt: command.paidAt,
            receivedAt: command.paidAt
          }
        },
        {
          eventType: 'OrderFullyPaid',
          data: {
            orderId: this.state.orderId!,
            customerId: this.state.customerId!,
            orderAmount: this.state.orderAmount!,
            paidAt: command.paidAt
          }
        }
      ];
    } else if (this.state.status === OrderStatus.FULLY_PAID) {
      return []
    } else {
      throw new Error('Cannot pay order with status ' + this.state.status)
    }
  }

  ship(shippedAt: number): [OrderShipped] | [] {
    if (this.state.status === OrderStatus.PLACED || this.state.status === OrderStatus.FULLY_PAID) {
      return [{
        eventType: 'OrderShipped',
        data: {
          orderId: this.state.orderId!,
          shippedAt: shippedAt
        }
      }];
    } else if (this.state.status === OrderStatus.SHIPPED) {
      return []
    } else {
      throw new Error('Cannot ship order with status ' + this.state.status)
    }
  }

  cancel(canceledAt: number): [OrderCanceled] | [] {
    if (this.state.status === OrderStatus.PLACED) {
      return [{
        eventType: 'OrderCanceled',
        data: {
          orderId: this.state.orderId!,
          canceledAt: canceledAt
        }
      }]
    } else if (this.state.status === OrderStatus.CANCELED) {
      return []
    } else {
      throw new Error('Cannot cancel order with status ' + this.state.status)
    }
  }
}
