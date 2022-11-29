import {defineEventHandler, readBody} from "h3";
import {Order} from "~/server/utils/domain/order/order";

export default defineEventHandler(async (request) => {
  const {orderId} = await readBody(request)
  const client = request.context.serialized.aggregateClient(Order);
  await client.update(orderId, (order: Order) => {
    return order.ship(new Date().getTime())
  })
  console.log({message: 'Order shipped', orderId})
  return {}
})