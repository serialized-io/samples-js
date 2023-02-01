import {defineEventHandler} from "h3";
import {dollarAmount} from "~/server/utils/helpers";

export default defineEventHandler(async (event) => {
  return {
    items: [
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
  }
})
