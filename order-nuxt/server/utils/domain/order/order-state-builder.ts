import {StateBuilder} from "@serialized/serialized-client";
import {OrderStatus} from "~/server/utils/domain/order/order";
import {OrderState} from "~/server/utils/domain/order/order-state";
import {OrderEvent} from "~/server/utils/domain/order/events";

export const orderStateBuilder: StateBuilder<OrderState, OrderEvent> = {
  initialState: () => {
    return {
      orderId: '',
      customerId: '',
      status: undefined,
      orderAmount: 0
    }
  },

  applyOrderPlaced(state, event): OrderState {
    return {
      orderId: event.data!.orderId,
      customerId: event.data!.customerId,
      orderAmount: event.data!.orderAmount,
      status: OrderStatus.PLACED
    };
  },

  applyOrderFullyPaid(state: OrderState, _event): OrderState {
    return {...state, status: OrderStatus.FULLY_PAID};
  },

  applyOrderCanceled(state: OrderState, _event): OrderState {
    return {...state, status: OrderStatus.CANCELED};
  },

  applyOrderShipped(state: OrderState, _event): OrderState {
    return {...state, status: OrderStatus.SHIPPED};
  },

  applyPaymentReceived(state: OrderState, _event): OrderState {
    return {...state, status: OrderStatus.SHIPPED};
  }
}
