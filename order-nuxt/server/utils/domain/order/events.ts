import {DomainEvent} from "@serialized/serialized-client";

export type OrderCanceled = DomainEvent<'OrderCanceled', {
  readonly orderId: string,
  readonly canceledAt: number
}>

export type OrderFullyPaid = DomainEvent<'OrderFullyPaid', {
  readonly orderId: string,
  readonly customerId: string,
  readonly orderAmount: number,
  readonly paidAt: number
}>

export type OrderPlaced = DomainEvent<'OrderPlaced', {
  readonly orderId: string,
  readonly customerId: string,
  readonly sku: string,
  readonly orderAmount: number,
  readonly placedAt: number
}>

export type OrderShipped = DomainEvent<'OrderShipped', {
  readonly orderId: string,
  readonly shippedAt: number
}>

export type PaymentReceived = DomainEvent<'PaymentReceived', {
  readonly orderId: string,
  readonly customerId: string,
  readonly amountPaid: number,
  readonly receivedAt: number,
  readonly paidAt: number
}>

export type OrderEvent = OrderCanceled | OrderFullyPaid | OrderPlaced | OrderShipped | PaymentReceived;

