export const dollarAmount = (amount: number) => {
  return `$${(amount / 100).toFixed(2)}`
}

export const timestampToDatetime = (timestamp: number) => {
  return new Date(timestamp).toLocaleString()
}
