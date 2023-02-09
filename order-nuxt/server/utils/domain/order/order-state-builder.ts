import {DefaultHandler, DomainEvent, EventHandler} from "@serialized/serialized-client";
import {OrderPlaced} from "~/server/utils/domain/order/order-placed";
import {OrderState} from "~/server/utils/domain/order/order-state";
import {OrderShipped} from "~/server/utils/domain/order/order-shipped";
import {OrderFullyPaid} from "~/server/utils/domain/order/order-fully-paid";
import {OrderCanceled} from "~/server/utils/domain/order/order-canceled";
import {OrderStatus} from "~/server/utils/domain/order/order";

export class OrderStateBuilder {

  get initialState() {
    return () => ({})
  }

  @EventHandler(OrderPlaced)
  handleOrderPlaced(state: OrderState, event: DomainEvent<OrderPlaced>): OrderState {
    return {
      orderId: event.data.orderId,
      customerId: event.data.customerId,
      orderAmount: event.data.orderAmount,
      status: OrderStatus.PLACED
    };
  }

  @EventHandler(OrderFullyPaid)
  handleOrderFullyPaid(state: OrderState, _event: DomainEvent<OrderFullyPaid>): OrderState {
    return {...state, status: OrderStatus.FULLY_PAID};
  }

  @EventHandler(OrderCanceled)
  handleOrderCanceled(state: OrderState, _event: DomainEvent<OrderCanceled>): OrderState {
    return {...state, status: OrderStatus.CANCELED};
  }

  @EventHandler(OrderShipped)
  handleOrderShipped(state: OrderState, _event: DomainEvent<OrderShipped>): OrderState {
    return {...state, status: OrderStatus.SHIPPED};
  }

  @DefaultHandler()
  handle(state: OrderState, event: DomainEvent<any>): OrderState {
    console.log('Default handler called for', event.eventType)
    return state
  }

}
