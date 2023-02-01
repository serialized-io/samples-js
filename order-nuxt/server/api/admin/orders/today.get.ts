import {defineEventHandler} from "h3";
import {CompleteOrderProjection, Projection} from "~/server/utils/types";
import {dollarAmount, timestampToDatetime} from "~/server/utils/helpers";

export default defineEventHandler(async (event) => {
  const projectionsClient = event.context.serialized.projectionsClient();
  const response = await projectionsClient.listSingleProjections({
    projectionName: 'orders-by-id',
    from: `${new Date().setHours(0, 0, 0, 0).valueOf()}`,
    to: `${new Date().valueOf()}`
  });
  const orders = response.projections.map((projection: Projection<CompleteOrderProjection>) => {
    return {
      ...projection.data,
      orderAmountFormatted: dollarAmount(projection.data.orderAmount),
      placedAtDate: timestampToDatetime(projection.data.placedAt)
    }
  })
  return {orders}
})
