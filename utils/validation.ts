// utils/validation.ts
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateNigerianPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+234|234|0)(70|80|81|90|91|70|71)\d{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const validatePrice = (price: string): boolean => {
  const numPrice = parseFloat(price.replace(/[^\d.]/g, ''))
  return !isNaN(numPrice) && numPrice > 0
}