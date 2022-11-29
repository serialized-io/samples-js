import {defineEventHandler} from "h3";
import {Order, Projection} from "~/server/utils/types";

export default defineEventHandler(async (event) => {
  const projectionsClient = event.context.serialized.projectionsClient();
  const response = await projectionsClient.listSingleProjections({projectionName: 'orders-by-id'});
  const orders = response.projections.map((projection: Projection<Order>) => {
    return {
      orderId: projection.data.orderId,
      orderAmount: projection.data.orderAmount
    }
  })
  return {orders}
})