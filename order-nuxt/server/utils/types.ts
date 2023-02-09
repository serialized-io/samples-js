export interface Projection<D> {
  data: D
}

export interface Feed<D> {
  entries: {
    sequenceNumber: number
    timestamp: number
    events: {
      eventId: string
      eventType: string
      data: D
    }[]
  }[]
}

export interface OrderEvent {
  readonly orderId: string
  readonly customerId: string
  readonly sku: string
  readonly orderAmount: number
  readonly placedAt: number
  readonly canceledAt?: number
  readonly paidAt?: number
}

export interface CompleteOrderProjection {
  readonly orderId: string
  readonly customerId: string
  readonly sku: string
  readonly orderAmount: number
  readonly status: string
  readonly placedAt: number
  readonly shippedAt?: number
  readonly canceledAt?: number
}
export interface OrdersByCustomerProjection {
  readonly orders: CompleteOrderProjection[]
}

export interface ShippableOrderProjection {
  readonly orderId: string
  readonly customerId: string
  readonly orderAmount: number
  readonly paidAt: number
}
