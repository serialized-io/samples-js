import {Aggregate, DomainEvent} from "@serialized/serialized-client";
import {OrderStateBuilder} from "~/server/utils/domain/order/order-state-builder";
import {OrderState} from "~/server/utils/domain/order/order-state";
import {OrderPlaced} from "~/server/utils/domain/order/order-placed";
import {OrderShipped} from "~/server/utils/domain/order/order-shipped";

@Aggregate('order', OrderStateBuilder)
export class Order {

  constructor(private readonly state: OrderState) {
  }

  create(orderId: string, placedAt: number) {
    return [DomainEvent.create(new OrderPlaced(orderId, placedAt))];
  }

  ship(shippedAt: number): DomainEvent<OrderShipped>[] {
    return [DomainEvent.create(new OrderShipped(this.state.orderId!, shippedAt))];
  }

}
