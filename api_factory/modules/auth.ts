import { GATEWAY_ENDPOINT } from '../axios.config'

export const auth_api = {
  // User Login
  $_login: (payload: { email: string; password: string; app: 'admin' | 'customer' | 'property-owner' }) => {
    const url = '/auth/login'
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  // Customer Registration
  $_register_customer: (payload: {
    app: 'customer'
    email: string
    firstName: string
    lastName: string
    phone: string
    password: string
  }) => {
    const url = '/auth/register'
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  // Property Owner Registration - Individual
  $_register_property_owner_individual: (payload: {
    app: 'property-owner'
    email: string
    phone: string
    password: string
    address: string
    propertyOwnerType: 'individual'
    legalName: string
  }) => {
    const url = '/auth/register'
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  // Property Owner Registration - Business
  $_register_property_owner_business: (payload: {
    app: 'property-owner'
    email: string
    phone: string
    password: string
    propertyOwnerType: 'business'
    businessName: string
    address: string
  }) => {
    const url = '/auth/register'
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  // Forgot Password - Request OTP
  $_forgot_password: (payload: { email: string; app: 'customer' | 'property-owner' | 'admin' }) => {
    const url = '/auth/forgot-password'
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  // Verify OTP - Password Reset
  $_verify_otp_password_reset: (payload: {
    email: string
    otp: string
    type: 'password_reset'
    app: 'customer' | 'property-owner' | 'admin'
  }) => {
    const url = '/auth/verify-otp'
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  // Verify OTP - Email Verification
  $_verify_otp_email: (payload: {
    email: string
    otp: string
    type: 'email_verification'
    app: 'customer' | 'property-owner' | 'admin'
  }) => {
    const url = '/auth/verify-otp'
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  // Reset Password
  $_reset_password: (payload: {
    email: string
    otp: string
    newPassword: string
    app: 'customer' | 'property-owner' | 'admin'
  }) => {
    const url = '/auth/reset-password'
    return GATEWAY_ENDPOINT.post(url, payload)
  },

  // Verify Email via Query Parameters (GET)
  $_verify_email_get: (email: string, otp: string) => {
    const url = '/auth/verify-email'
    return GATEWAY_ENDPOINT.get(url, { params: { email, otp } })
  },

  //Social signin
  	$_social_signin: (credential: any) => {
		const url = '/auth/social-signin'
		return GATEWAY_ENDPOINT.post(url, credential)
	},
	$_social_signup: (credential: any) => {
		const url = '/auth/social-signup'
		return GATEWAY_ENDPOINT.post(url, credential)
	},
}