import {Aggregate, DomainEvent} from "@serialized/serialized-client";
import {OrderStateBuilder} from "~/server/utils/domain/order/order-state-builder";
import {OrderState} from "~/server/utils/domain/order/order-state";
import {OrderPlaced} from "~/server/utils/domain/order/order-placed";
import {OrderShipped} from "~/server/utils/domain/order/order-shipped";
import {PayOrderFully, PlaceOrder} from "~/server/utils/domain/order/commands";
import {PaymentReceived} from "./payment-received";
import {OrderFullyPaid} from "./order-fully-paid";
import {OrderCanceled} from "~/server/utils/domain/order/order-canceled";

export enum OrderStatus {
  PLACED = 'PLACED',
  FULLY_PAID = 'FULLY_PAID',
  SHIPPED = 'SHIPPED',
  CANCELED = 'CANCELED'
}

@Aggregate('order', OrderStateBuilder)
export class Order {

  constructor(private readonly state: OrderState) {
  }

  place(command: PlaceOrder): DomainEvent<OrderPlaced>[] {
    if (!this.state.status) {
      return [DomainEvent.create(new OrderPlaced(command.orderId, command.customerId, command.sku, command.orderAmount, command.placedAt))];
    } else if (this.state.status === OrderStatus.PLACED) {
      return []
    } else {
      throw new Error('Cannot place order with status ' + this.state.status)
    }
  }

  payFully(command: PayOrderFully): DomainEvent<PaymentReceived | OrderFullyPaid>[] {
    if (this.state.status === OrderStatus.PLACED || this.state.status === OrderStatus.SHIPPED) {
      return [
        DomainEvent.create(new PaymentReceived(this.state.orderId!, this.state.customerId!, this.state.orderAmount!, command.paidAt, command.paidAt)),
        DomainEvent.create(new OrderFullyPaid(this.state.orderId!, this.state.customerId!, this.state.orderAmount!, command.paidAt))
      ];
    } else if (this.state.status === OrderStatus.FULLY_PAID) {
      return []
    } else {
      throw new Error('Cannot pay order with status ' + this.state.status)
    }
  }

  ship(shippedAt: number): DomainEvent<OrderShipped>[] {
    if (this.state.status === OrderStatus.PLACED || this.state.status === OrderStatus.FULLY_PAID) {
      return [DomainEvent.create(new OrderShipped(this.state.orderId!, shippedAt))];
    } else if (this.state.status === OrderStatus.SHIPPED) {
      return []
    } else {
      throw new Error('Cannot ship order with status ' + this.state.status)
    }
  }

  cancel(canceledAt: number) {
    if (this.state.status === OrderStatus.PLACED) {
      return [DomainEvent.create(new OrderCanceled(this.state.orderId!, canceledAt))];
    } else if (this.state.status === OrderStatus.CANCELED) {
      return []
    } else {
      throw new Error('Cannot cancel order with status ' + this.state.status)
    }
  }
}
