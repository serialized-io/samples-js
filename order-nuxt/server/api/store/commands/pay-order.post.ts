import {defineEventHandler, readBody} from "h3";
import {Order} from "~/server/utils/domain/order/order";

export default defineEventHandler(async (request) => {
  const {orderId} = await readBody(request)
  const paidAt = new Date().getTime()
  const client = request.context.serialized.aggregateClient(Order);
  await client.update({aggregateId: orderId}, (order: Order) => {
    return order.payFully({orderId, paidAt})
  })
  console.info({message: 'Order fully paid', orderId})
  return {}
})
