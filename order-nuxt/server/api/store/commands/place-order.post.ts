import {defineEventHandler, readBody} from "h3";
import {Order} from "~/server/utils/domain/order/order";
import {v4 as uuidv4} from 'uuid'
import {productDatabase} from "~/server/utils/helpers";

export default defineEventHandler(async (request) => {
  try {
    const {sku, customerId} = await readBody(request)
    const orderId = uuidv4()
    const product = productDatabase.getProduct(sku)!
    const orderAmount = product.price
    const itemPrice = product.price
    const placedAt = new Date().getTime()

    const client = request.context.serialized.aggregateClient(Order);
    await client.create({aggregateId: orderId}, (order: Order) => {
      return order.place({orderId, customerId, sku, itemPrice, orderAmount, placedAt})
    })
    console.info({message: 'Order placed', orderId})
    return {orderId}
  } catch (e) {
    console.error(e)
    throw createError({statusCode: 500, message: 'Failed to place order'})
  }
})
