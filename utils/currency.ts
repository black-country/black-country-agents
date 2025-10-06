export const formatCurrency = (price: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(price)
}

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num)
}
