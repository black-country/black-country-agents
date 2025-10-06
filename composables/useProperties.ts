import { ref, onMounted, readonly } from "vue"
import type { Property, PropertyFilter } from "~/types/property"

export const useProperties = () => {
  const properties = ref<Property[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Load properties from localStorage on initialization
  const loadProperties = () => {
    if (process.client) {
      const stored = localStorage.getItem("properties")
      if (stored) {
        properties.value = JSON.parse(stored)
      } else {
        // Initialize with sample data
        properties.value = getSampleProperties()
        saveProperties()
      }
    }
  }

  // Save properties to localStorage
  const saveProperties = () => {
    if (process.client) {
      localStorage.setItem("properties", JSON.stringify(properties.value))
    }
  }

  // Add new property
  const addProperty = (property: Omit<Property, "id" | "createdAt" | "updatedAt">) => {
    const newProperty: Property = {
      ...property,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    properties.value.push(newProperty)
    saveProperties()
    return newProperty
  }

  // Update property
  const updateProperty = (id: string, updates: Partial<Property>) => {
    const index = properties.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      properties.value[index] = {
        ...properties.value[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      }
      saveProperties()
      return properties.value[index]
    }
    return null
  }

  // Delete property
  const deleteProperty = (id: string) => {
    const index = properties.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      properties.value.splice(index, 1)
      saveProperties()
      return true
    }
    return false
  }

  // Get property by ID
  const getProperty = (id: string) => {
    return properties.value.find((p) => p.id === id)
  }

  // Filter properties
  const filterProperties = (filters: PropertyFilter) => {
    return properties.value.filter((property) => {
      // Category filter
      if (filters.category.length > 0) {
        if (!filters.category.includes(property.status)) {
          return false
        }
      }

      // Property type filter
      if (filters.propertyType.length > 0) {
        if (!filters.propertyType.includes(property.propertyType)) {
          return false
        }
      }

      // Location filters
      if (filters.country && property.location.country !== filters.country) {
        return false
      }
      if (filters.state && property.location.state !== filters.state) {
        return false
      }
      if (filters.city && property.location.city !== filters.city) {
        return false
      }
      if (filters.localGovernment && property.location.localGovernment !== filters.localGovernment) {
        return false
      }
      if (filters.zipcode && property.location.zipcode !== filters.zipcode) {
        return false
      }

      return true
    })
  }

  // Initialize on mount
  onMounted(() => {
    loadProperties()
  })

  return {
    properties: readonly(properties),
    loading: readonly(loading),
    error: readonly(error),
    addProperty,
    updateProperty,
    deleteProperty,
    getProperty,
    filterProperties,
    loadProperties,
  }
}

// Helper function to generate unique IDs
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Sample data
const getSampleProperties = (): Property[] => [
  {
    id: "1",
    name: "New Property at Lagos Road",
    owner: {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+234 123 4567",
    },
    propertyType: "Duplex",
    location: {
      country: "Nigeria",
      state: "Lagos",
      city: "Bajulaiye",
      localGovernment: "Somolu",
      zipcode: "122302",
      flag: "🇳🇬",
    },
    specs: {
      bedrooms: 2,
      sittingRooms: 2,
      kitchens: 2,
      bathrooms: 3,
    },
    status: "Rent",
    amenities: [
      "Toilet paper",
      "Shower",
      "Hair Dryer",
      "Washer",
      "Books",
      "Dedicated Workspace",
      "Free Parking",
      "EV Charger",
      "Smoking Allowed",
    ],
    photos: [
      { id: "1", url: "/modern-living-room.png", label: "Sitting Room", isCover: true },
      { id: "2", url: "/modern-kitchen.png", label: "Kitchen", isCover: false },
      { id: "3", url: "/modern-bedroom.png", label: "Bedroom", isCover: false },
      { id: "4", url: "/modern-bathroom.png", label: "Toilet", isCover: false },
    ],
    applications: [
      {
        id: "1",
        applicant: {
          id: "1",
          name: "John Doe",
          email: "johndoe@gmail.com",
          phone: "+23470938739",
          joinedDate: "Jul 2, 2024",
        },
        dateApplied: "19 Nov. 23",
        status: "Rejected",
        offerPrice: 200000,
        documents: [
          { id: "1", name: "NIN_front.jpg", type: "image/jpeg", url: "#" },
          { id: "2", name: "NIN_back.jpg", type: "image/jpeg", url: "#" },
          { id: "3", name: "Payslip_qth.pdf", type: "application/pdf", url: "#" },
        ],
        letterOfIntent:
          "Figma ipsum component variant main layer. Effect layer arrange slice flatten shadow mask bullet. Pen shadow resizing frame selection arrange. Scale overflow resizing export invite device. Blur flows thumbnail variant duplicate bullet. Horizontal variant shadow mask prototype union stroke union. Rotate overflow slice duplicate layout. Draft fill export vertical hand slice comment bold scrolling mask. Shadow font content layer slice plugin underline figma hand flows. Rotate background ellipse flows background shadow auto library select comment.",
      },
    ],
    createdAt: "2023-11-19T00:00:00Z",
    updatedAt: "2023-11-19T00:00:00Z",
  },
]
