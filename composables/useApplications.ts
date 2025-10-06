import { ref, readonly } from "vue"

interface Applicant {
  name: string
  email: string
  phone: string
  avatar: string
}

interface Property {
  name: string
  price: string
  image: string
  bedrooms: number
  bathrooms: number
  area: number
}

interface Location {
  country: string
  state: string
  city: string
  localGovernment: string
  zipCode: string
  currentAddress: string
  flag: string
}

interface Documents {
  ninNumber: string
  ninDocument: string
  payslip: string
}

interface Owner {
  name: string
  joinedDate: string
  avatar: string
}

interface Application {
  id: string
  applicant: Applicant
  property: Property
  status: string
  location: Location
  dateApplied: string
  documents: Documents
  letterOfIntent: string
  offerPrice: string
  owner: Owner
}

export const useApplications = () => {
  const applications = ref<Application[]>([
    {
      id: "1",
      applicant: {
        name: "John Doe",
        email: "johndoe@gmail.com",
        phone: "+2347093387392",
        avatar: "/generic-person-avatar.png",
      },
      property: {
        name: "Luxury Home in Bali",
        price: "₦350,000/night",
        image: "/luxury-home-bali.png",
        bedrooms: 2,
        bathrooms: 2,
        area: 3,
      },
      status: "in_review",
      location: {
        country: "Nigeria",
        state: "Lagos",
        city: "Bajulaiye",
        localGovernment: "Somolu",
        zipCode: "122302",
        currentAddress: "8502 Preston Rd. Inglewood, Maine 98380",
        flag: "🇳🇬",
      },
      dateApplied: "19 Nov, 23",
      documents: {
        ninNumber: "12345678910",
        ninDocument: "NIN_front.jpg",
        payslip: "Payslip_qth.pdf",
      },
      letterOfIntent:
        "Figma ipsum component variant main layer. Effect layer arrange slice flatten shadow mask bullet. Pen shadow resizing frame selection arrange. Scale overflow resizing export invite device. Blur flows thumbnail variant duplicate bullet. Horizontal variant shadow mask prototype union stroke union. Rotate overflow slice duplicate layout. Draft fill export vertical hand slice comment bold scrolling mask. Shadow font content layer slice plugin underline figma hand flows. Rotate background ellipse flows background shadow auto library select comment. Layout layer duplicate layer boolean layout image flatten. Pixel draft distribute after effect editor font scrolling create share outline. Editor share fill mask project. Stroke align thumbnail create edit underline follower pencil frame mask. Subtract list inspect horizontal create. Export flatten distribute hand share bold. Create asset community asset follower scrolling variant auto. Image align select figma scale overflow. Object comment vector slice project background duplicate shadow project. Subtract outline pencil rectangle plugin edit scrolling ipsum object. Background move team rotate select. Project stroke edit component distribute background line fill group stroke. Pencil thumbnail frame ellipse edit shadow resizing component. Flatten link layout select slice stroke boolean. Create editor strikethrough bold outline ipsum object bullet. Rotate scale clip text asset draft. List boolean selection frame content subtract stroke selection pencil inspect. Asset scrolling background object effect outline.",
      offerPrice: "₦200,000",
      owner: {
        name: "John Doe",
        joinedDate: "Jul 2, 2024",
        avatar: "/owner-avatar.png",
      },
    },
    {
      id: "2",
      applicant: {
        name: "Jenny Wilson",
        email: "jenny.wilson@gmail.com",
        phone: "+2347093387392",
        avatar: "/jenny-wilson-avatar.png",
      },
      property: {
        name: "New Property at Lagos Road",
        price: "₦250,000/night",
        image: "/lagos-property.png",
        bedrooms: 3,
        bathrooms: 2,
        area: 4,
      },
      status: "shortlisted",
      location: {
        country: "Nigeria",
        state: "Lagos",
        city: "Victoria Island",
        localGovernment: "Lagos Island",
        zipCode: "101001",
        currentAddress: "15 Ahmadu Bello Way, Victoria Island, Lagos",
        flag: "🇳🇬",
      },
      dateApplied: "19 Nov, 23",
      documents: {
        ninNumber: "98765432101",
        ninDocument: "NIN_front.jpg",
        payslip: "Payslip_qth.pdf",
      },
      letterOfIntent: "Application letter content here...",
      offerPrice: "₦180,000",
      owner: {
        name: "Jenny Wilson",
        joinedDate: "Jun 15, 2024",
        avatar: "/jenny-owner-avatar.png",
      },
    },
  ])

  const getApplicationById = (id: string) => {
    return applications.value.find((app) => app.id === id)
  }

  const deleteApplication = (id: string) => {
    const index = applications.value.findIndex((app) => app.id === id)
    if (index > -1) {
      applications.value.splice(index, 1)
    }
  }

  const updateApplicationStatus = (id: string, status: Application["status"]) => {
    const application = applications.value.find((app) => app.id === id)
    if (application) {
      application.status = status
    }
  }

  return {
    applications: readonly(applications),
    getApplicationById,
    deleteApplication,
    updateApplicationStatus,
  }
}
