import {DefaultHandler, DomainEvent, EventHandler} from "@serialized/serialized-client";
import {OrderPlaced} from "~/server/utils/domain/order/order-placed";
import {OrderState} from "~/server/utils/domain/order/order-state";
import {OrderShipped} from "~/server/utils/domain/order/order-shipped";

export class OrderStateBuilder {

  get initialState() {
    return () => ({})
  }

  @EventHandler(OrderPlaced)
  handleOrderPlaced(state: OrderState, event: DomainEvent<OrderPlaced>): OrderState {
    return {orderId: event.data.orderId, customerId: event.data.customerId, orderAmount: event.data.orderAmount};
  }

  @EventHandler(OrderShipped)
  handleOrderShipped(state: OrderState, event: DomainEvent<OrderShipped>): OrderState {
    return {...state};
  }

  @DefaultHandler()
  handle(state: OrderState, event: DomainEvent<any>): OrderState {
    console.log('Default handler called for', event.eventType)
    return state
  }

}
