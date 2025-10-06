import { ref, watch, onMounted } from "vue"

export const usePropertyForm = () => {
  const formData = ref({
    name: "",
    description: "",
    propertyType: "Duplex" as "Duplex" | "Bungalow" | "Apartment",
    status: "Rent" as "Rent" | "Purchase",
    location: {
      country: "",
      state: "",
      city: "",
      localGovernment: "",
      zipcode: "",
    },
    specs: {
      bedrooms: 2,
      sittingRooms: 2,
      kitchens: 2,
      bathrooms: 2,
    },
    owner: {
      id: "1",
      name: "Dianne Russell",
      email: "dianne.russell@example.com",
      phone: "+234 123 4567",
    },
    amenities: [] as string[],
    photos: [] as any[],
  })

  // Save form data to localStorage
  const saveFormData = () => {
    if (process.client) {
      localStorage.setItem("propertyFormData", JSON.stringify(formData.value))
    }
  }

  // Load form data from localStorage
  const loadFormData = () => {
    if (process.client) {
      const stored = localStorage.getItem("propertyFormData")
      if (stored) {
        formData.value = { ...formData.value, ...JSON.parse(stored) }
      }
    }
  }

  // Clear form data
  const clearFormData = () => {
    formData.value = {
      name: "",
      description: "",
      propertyType: "Duplex",
      status: "Rent",
      location: {
        country: "",
        state: "",
        city: "",
        localGovernment: "",
        zipcode: "",
      },
      specs: {
        bedrooms: 2,
        sittingRooms: 2,
        kitchens: 2,
        bathrooms: 2,
      },
      owner: {
        id: "1",
        name: "Dianne Russell",
        email: "dianne.russell@example.com",
        phone: "+234 123 4567",
      },
      amenities: [],
      photos: [],
    }
    if (process.client) {
      localStorage.removeItem("propertyFormData")
    }
  }

  // Watch for changes and save to localStorage
  watch(formData, saveFormData, { deep: true })

  // Load data on mount
  onMounted(() => {
    loadFormData()
  })

  return {
    formData,
    saveFormData,
    loadFormData,
    clearFormData,
  }
}
