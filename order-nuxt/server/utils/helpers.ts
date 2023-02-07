export const dollarAmount = (amount: number) => {
  return `$${(amount / 100).toFixed(2)}`
}

export const timestampToDatetime = (timestamp: number) => {
  return new Date(timestamp).toLocaleString()
}


export const productDatabase = {
  listAll() {
    return [
      {
        sku: '001',
        name: 'Elvis White',
        description: 'White t-shirt',
        price: 1999,
        formattedPrice: dollarAmount(1999),
      },
      {
        sku: '002',
        name: 'Blue Flex 101',
        description: 'Blue shoes for the summer',
        price: 24990,
        formattedPrice: dollarAmount(24990),
      },
      {
        sku: '003',
        name: 'Max Sneaker 270',
        description: 'Cool sneakers',
        price: 14890,
        formattedPrice: dollarAmount(14890),
      },
      {
        sku: '004',
        name: 'Tommy Blue Shirt',
        description: 'Checkered blue shirt',
        price: 6699,
        formattedPrice: dollarAmount(6699),
      }
    ]

  },
  getProduct(sku: any) {
    return this.listAll().find((product) => product.sku === sku)
  }
}
