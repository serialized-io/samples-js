import {defineEventHandler} from "h3";
import {CompleteOrderProjection, Projection} from "~/server/utils/types";

export default defineEventHandler(async (event) => {
  const projectionsClient = event.context.serialized.projectionsClient();
  const response = await projectionsClient.getSingleProjection({
    projectionName: 'orders-by-id',
    projectionId: event.context.params.orderId
  });
  return {order: response.data as Projection<CompleteOrderProjection>}
})
