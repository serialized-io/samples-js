import {OrderStatus} from "~/server/utils/domain/order/order";

export type OrderState = {
  readonly orderId?: string;
  readonly customerId?: string;
  readonly orderAmount?: number;
  readonly status?: OrderStatus;
}
