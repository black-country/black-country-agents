// utils/constants.ts
export const PROPERTY_TYPES = ['buy', 'rent', 'shortlet'] as const
export const APARTMENT_TYPES = ['duplex', 'apartment', 'villa', 'bungalow', 'penthouse'] as const
export const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
  'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe', 'Imo',
  'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
  'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
  'Yobe', 'Zamfara'
] as const

export const MAJOR_CITIES = [
  { value: 'abuja', label: 'Abuja', state: 'FCT' },
  { value: 'lagos', label: 'Lagos', state: 'Lagos' },
  { value: 'kano', label: 'Kano', state: 'Kano' },
  { value: 'ibadan', label: 'Ibadan', state: 'Oyo' },
  { value: 'port-harcourt', label: 'Port Harcourt', state: 'Rivers' },
  { value: 'benin', label: 'Benin City', state: 'Edo' },
  { value: 'maiduguri', label: 'Maiduguri', state: 'Borno' },
  { value: 'zaria', label: 'Zaria', state: 'Kaduna' },
  { value: 'aba', label: 'Aba', state: 'Abia' },
  { value: 'jos', label: 'Jos', state: 'Plateau' },
  { value: 'ilorin', label: 'Ilorin', state: 'Kwara' },
  { value: 'onitsha', label: 'Onitsha', state: 'Anambra' },
  { value: 'warri', label: 'Warri', state: 'Delta' },
  { value: 'okene', label: 'Okene', state: 'Kogi' },
  { value: 'calabar', label: 'Calabar', state: 'Cross River' },
  { value: 'uyo', label: 'Uyo', state: 'Akwa Ibom' },
  { value: 'abeokuta', label: 'Abeokuta', state: 'Ogun' },
  { value: 'akure', label: 'Akure', state: 'Ondo' },
  { value: 'enugu', label: 'Enugu', state: 'Enugu' },
  { value: 'lekki', label: 'Lekki', state: 'Lagos' },
  { value: 'ikeja', label: 'Ikeja', state: 'Lagos' },
  { value: 'victoria-island', label: 'Victoria Island', state: 'Lagos' },
  { value: 'yaba', label: 'Yaba', state: 'Lagos' },
  { value: 'ijebu-ode', label: 'Ijebu-Ode', state: 'Ogun' },
  { value: 'ogbomosho', label: 'Ogbomosho', state: 'Oyo' },
  { value: 'ondo-town', label: 'Ondo Town', state: 'Ondo' },
  { value: 'ibeju-lekki', label: 'Ibeju-Lekki', state: 'Lagos' }
] as const

export const AMENITIES = [
  'Swimming Pool',
  'Gym/Fitness Center',
  '24/7 Security',
  'Parking Space',
  'Generator/Power Supply',
  'Water Supply',
  'Air Conditioning',
  'Internet/WiFi',
  'Elevator',
  'Balcony/Terrace',
  'Garden/Green Area',
  'Playground',
  'Shopping Mall Nearby',
  'School Nearby',
  'Hospital Nearby',
  'Public Transport',
  'Servant Quarters',
  'Study Room',
  'Dining Area',
  'Laundry Room',
  'Storage Room',
  'Fence/Gate',
  'CCTV',
  'Intercom System',
  'Fire Safety'
] as const

