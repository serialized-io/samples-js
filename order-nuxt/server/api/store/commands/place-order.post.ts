import {defineEventHandler, readBody} from "h3";
import {Order} from "~/server/utils/domain/order/order";
import {v4 as uuidv4} from 'uuid'

export default defineEventHandler(async (request) => {
  const {sku, customerId} = await readBody(request)
  const orderId = uuidv4()
  const orderAmount = 2000
  const itemPrice = 120
  const placedAt = new Date().getTime()

  const client = request.context.serialized.aggregateClient(Order);
  await client.create({aggregateId: orderId}, (order: Order) => {
    return order.place({orderId, customerId, itemPrice, sku, orderAmount, placedAt})
  })
  console.info({message: 'Order placed', orderId})
  return {orderId}
})
