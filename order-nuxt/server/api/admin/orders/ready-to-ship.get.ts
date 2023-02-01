import {defineEventHandler} from "h3";
import {Projection, ShippableOrderProjection} from "~/server/utils/types";
import {dollarAmount, timestampToDatetime} from "~/server/utils/helpers";

export default defineEventHandler(async (event) => {
  const projectionsClient = event.context.serialized.projectionsClient();
  const response = await projectionsClient.listSingleProjections({projectionName: 'orders-to-ship'});
  const orders = response.projections.map((projection: Projection<ShippableOrderProjection>) => {
    return {
      ...projection.data,
      orderAmountFormatted: dollarAmount(projection.data.orderAmount),
      paidAtDate: timestampToDatetime(projection.data.paidAt)
    }
  })
  return {orders}
})
