import {Aggregate, DomainEvent} from "@serialized/serialized-client";
import {OrderStateBuilder} from "~/server/utils/domain/order/order-state-builder";
import {OrderState} from "~/server/utils/domain/order/order-state";
import {OrderPlaced} from "~/server/utils/domain/order/order-placed";
import {OrderShipped} from "~/server/utils/domain/order/order-shipped";
import {PayOrderFully, PlaceOrder} from "~/server/utils/domain/order/commands";
import {PaymentReceived} from "./payment-received";
import {OrderFullyPaid} from "./order-fully-paid";
import {OrderCanceled} from "~/server/utils/domain/order/order-canceled";

@Aggregate('order', OrderStateBuilder)
export class Order {

  constructor(private readonly state: OrderState) {
  }

  place(command: PlaceOrder): DomainEvent<OrderPlaced>[] {
    return [DomainEvent.create(new OrderPlaced(command.orderId, command.customerId, command.sku, command.orderAmount, command.placedAt))];
  }

  payFully(command: PayOrderFully): DomainEvent<PaymentReceived | OrderFullyPaid>[] {
    return [
      DomainEvent.create(new PaymentReceived(this.state.orderId!, this.state.customerId!, this.state.orderAmount!, command.paidAt, command.paidAt)),
      DomainEvent.create(new OrderFullyPaid(this.state.orderId!, this.state.customerId!, this.state.orderAmount!, command.paidAt))
    ];
  }

  ship(shippedAt: number): DomainEvent<OrderShipped>[] {
    return [DomainEvent.create(new OrderShipped(this.state.orderId!, shippedAt))];
  }

  cancel(canceledAt: number) {
    return [DomainEvent.create(new OrderCanceled(this.state.orderId!, canceledAt))];
  }
}
