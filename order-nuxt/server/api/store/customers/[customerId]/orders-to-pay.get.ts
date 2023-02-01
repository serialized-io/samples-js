import {defineEventHandler} from "h3";
import {OrdersByCustomerProjection} from "~/server/utils/types";
import {dollarAmount, timestampToDatetime} from "~/server/utils/helpers";

export default defineEventHandler(async (event) => {
  const projectionsClient = event.context.serialized.projectionsClient();
  try {
    const response = await projectionsClient.getSingleProjection({
      projectionName: 'orders-per-customer',
      projectionId: event.context.params.customerId
    });
    const projection = (response.data as OrdersByCustomerProjection);
    const orders = projection.orders.map((order) => ({
      ...order,
      orderAmountFormatted: dollarAmount(order.orderAmount),
      placedAtDate: timestampToDatetime(order.placedAt)
    })).filter((order) => order.status === 'PLACED');
    return {orders}
  } catch (e) {
    console.error(e)
    return {orders: []}
  }
})
