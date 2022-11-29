import {defineEventHandler} from "h3";
import {Projection, ShippableOrderProjection} from "~/server/utils/types";

export default defineEventHandler(async (event) => {
  const projectionsClient = event.context.serialized.projectionsClient();
  const response = await projectionsClient.listSingleProjections({projectionName: 'orders-to-ship'});
  const orders = response.projections.map((projection: Projection<ShippableOrderProjection>) => {
    return {
      orderId: projection.data.orderId,
      orderAmount: projection.data.orderAmount
    }
  })
  return {orders}
})
