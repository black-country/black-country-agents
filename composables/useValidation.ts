export const useValidation = () => {
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
    return phoneRegex.test(phone)
  }

  const validatePassword = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasMinLength = password.length >= 8
    
    return {
      hasUppercase,
      hasNumber,
      hasMinLength,
      isValid: hasUppercase && hasNumber && hasMinLength
    }
  }

  const validateRequired = (value: string): boolean => {
    return value.trim().length > 0
  }

  const validateNIN = (nin: string): boolean => {
    return /^\d{11}$/.test(nin)
  }

  const validateCAC = (cac: string): boolean => {
    return /^RC\d{6,7}$/.test(cac.toUpperCase())
  }

  return {
    validateEmail,
    validatePhone,
    validatePassword,
    validateRequired,
    validateNIN,
    validateCAC
  }
}