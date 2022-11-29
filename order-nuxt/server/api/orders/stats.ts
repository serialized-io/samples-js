import {defineEventHandler} from "h3";

export default defineEventHandler(async (event) => {
  const projectionsClient = event.context.serialized.projectionsClient();
  const revenueResponse = await projectionsClient.getAggregatedProjection({projectionName: 'total-revenue'});
  const shippedOrdersResponse = await projectionsClient.getAggregatedProjection({projectionName: 'shipped-orders-count'});
  return {
    totalRevenue: revenueResponse.data.revenue as number,
    shippedOrders: shippedOrdersResponse.data.shippedOrdersCount as number
  }
})
