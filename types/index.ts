// export interface Property {
//   id: string
//   name: string
//   owner: PropertyOwner
//   propertyType: "Duplex" | "Bungalow" | "Apartment"
//   location: PropertyLocation
//   specs: PropertySpecs
//   status: "Rent" | "Purchase"
//   description?: string
//   amenities: string[]
//   photos: PropertyPhoto[]
//   applications: Application[]
//   createdAt: string
//   updatedAt: string
// }

// export interface PropertyOwner {
//   id: string
//   name: string
//   email: string
//   phone: string
//   avatar?: string
// }

// export interface PropertyLocation {
//   country: string
//   state: string
//   city: string
//   localGovernment: string
//   zipcode: string
//   address?: string
//   flag?: string
// }

// export interface PropertySpecs {
//   bedrooms: number
//   sittingRooms: number
//   kitchens: number
//   bathrooms: number
// }

// export interface PropertyPhoto {
//   id: string
//   url: string
//   label: string
//   isCover: boolean
// }

// export interface Application {
//   id: string
//   applicant: Applicant
//   dateApplied: string
//   status: "In Review" | "Shortlisted" | "Rejected" | "Accepted" | "Under Review"
//   offerPrice?: number
//   documents: ApplicationDocument[]
//   letterOfIntent?: string
// }

// export interface Applicant {
//   id: string
//   name: string
//   email: string
//   phone: string
//   avatar?: string
//   joinedDate?: string
// }

// export interface ApplicationDocument {
//   id: string
//   name: string
//   type: string
//   url: string
// }

// export interface PropertyFilter {
//   category: string[]
//   propertyType: string[]
//   propertyOwner?: string
//   country?: string
//   state?: string
//   city?: string
//   localGovernment?: string
//   zipcode?: string
// }


export interface Property {
  id: string
  name: string
  owner: Owner
  propertyType: 'Duplex' | 'Bungalow' | 'Apartment'
  location: string
  country: string
  specs: {
    bedrooms: number
    bathrooms: number
    area: number
  }
  applications: Application[]
  price: number
  status: 'Rent' | 'Purchase' | 'Draft' | 'Short-let'
  amenities: Amenity[]
  photos: PropertyPhoto[]
  description?: string
}

export interface Owner {
  id: string
  name: string
  avatar: string
  email: string
  phone: string
  joinedDate: string
}

export interface Application {
  id: string
  applicantName: string
  applicantEmail: string
  applicantPhone: string
  dateApplied: string
  status: 'In Review' | 'Shortlisted' | 'Rejected' | 'Accepted' | 'Under Review'
  avatar: string
  documents: Document[]
  offerPrice: number
  personalDetails: {
    name: string
    email: string
    phone: string
    currentAddress: string
    country: string
    state: string
    city: string
    localGovernment: string
    zipCode: string
  }
  letterOfIntent: string
}

export interface Document {
  id: string
  name: string
  type: string
  url: string
}

export interface Amenity {
  id: string
  name: string
  category: string
  selected: boolean
}

export interface PropertyPhoto {
  id: string
  url: string
  alt: string
  room: string
  isCover: boolean
}

export interface FilterOptions {
  category: 'Rent' | 'Sell' | null
  propertyType: string[]
  propertyOwner: string | null
  country: string | null
  state: string | null
  city: string | null
  localGovernment: string | null
  zipcode: string | null
}




export interface User {
  id: string
  name: string
  email: string
  phone: string
  location: string
  country: string
  lastLogin: string
  avatar: string
  status: "active" | "archived" | "blocked"
  joinedOn: string
  username: string
  password: string
  dateOfBirth: string
  currentAddress: string
  preferredLocation: string
  ninNumber: string
  totalApplicationsSent: number
  totalBrowsingTime: string
  totalMoneySpent: number
  viewedProperty: number
}

export interface Property {
  id: string
  name: string
  owner: User
  propertyType: "Duplex" | "Bungalow" | "Apartment"
  location: string
  country: string
  specs: {
    bedrooms: number
    bathrooms: number
    parking: number
  }
  status?: "In review" | "Rejected" | "Shortlisted"
  dateApplied?: string
  price?: number
}

export interface Application {
  id: string
  property: Property
  user: User
  status: "In review" | "Rejected" | "Shortlisted"
  dateApplied: string
  offerPrice: number
  personalDetails: {
    name: string
    email: string
    phone: string
    dateApplied: string
  }
  documents: {
    ninNumber: string
    ninDocument: string
    payslip: string
  }
  locationDetails: {
    currentAddress: string
    country: string
    state: string
    city: string
    localGovernment: string
    zipCode: string
  }
  letterOfIntent: string
}

export interface FilterOptions {
  location: string
  previousHistory: "rented" | "purchased" | null
}


export interface Application {
  id: string
  applicant: {
    name: string
    email: string
    phone: string
    avatar: string
  }
  property: {
    name: string
    price: string
    image: string
    bedrooms: number
    bathrooms: number
    area: number
  }
  status: "in_review" | "shortlisted" | "rejected"
  location: {
    country: string
    state: string
    city: string
    localGovernment: string
    zipCode: string
    currentAddress: string
    flag: string
  }
  dateApplied: string
  documents: {
    ninNumber: string
    ninDocument: string
    payslip: string
  }
  letterOfIntent: string
  offerPrice: string
  owner: {
    name: string
    joinedDate: string
    avatar: string
  }
}
