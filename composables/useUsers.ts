import { ref, computed, onMounted } from "vue"
import type { User, UserStatus, UserFilter } from "~/types"

export const useUsers = () => {
  // State
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const currentPage = ref(1)
  const itemsPerPage = ref(10)
  const totalUsers = ref(0)
  const selectedStatus = ref<UserStatus>("active")
  const searchQuery = ref("")
  const filters = ref<UserFilter>({
    location: "",
    previousHistory: "",
  })

  // Mock data - replace with actual API calls
  const mockUsers: User[] = [
    {
      id: "1",
      name: "John Doe",
      email: "michelle.rivera@example.com",
      phone: "(808) 555-0111",
      location: "Nigeria",
      lastLogin: "19 Nov. 23",
      status: "active",
      avatar: "/diverse-user-avatars.png",
    },
    {
      id: "2",
      name: "Jenny Wilson",
      email: "jackson.graham@example.com",
      phone: "(629) 555-0129",
      location: "Nigeria",
      lastLogin: "19 Nov. 23",
      status: "active",
      avatar: "/diverse-user-avatars.png",
    },
    {
      id: "3",
      name: "Cody Fisher",
      email: "michael.mitc@example.com",
      phone: "(808) 555-0111",
      location: "Nigeria",
      lastLogin: "19 Nov. 23",
      status: "active",
      avatar: "/diverse-user-avatars.png",
    },
    {
      id: "4",
      name: "Ronald Richards",
      email: "alma.lawson@example.com",
      phone: "(406) 555-0120",
      location: "Nigeria",
      lastLogin: "19 Nov. 23",
      status: "active",
      avatar: "/diverse-user-avatars.png",
    },
    {
      id: "5",
      name: "Jane Cooper",
      email: "jessica.hanson@example.com",
      phone: "(209) 555-0104",
      location: "Nigeria",
      lastLogin: "19 Nov. 23",
      status: "active",
      avatar: "/diverse-user-avatars.png",
    },
    {
      id: "6",
      name: "Esther Howard",
      email: "dolores.chambers@example.com",
      phone: "(405) 555-0128",
      location: "Nigeria",
      lastLogin: "19 Nov. 23",
      status: "active",
      avatar: "/diverse-user-avatars.png",
    },
    {
      id: "7",
      name: "Robert Fox",
      email: "felicia.reid@example.com",
      phone: "(603) 555-0123",
      location: "Nigeria",
      lastLogin: "19 Nov. 23",
      status: "active",
      avatar: "/diverse-user-avatars.png",
    },
    {
      id: "8",
      name: "Cameron Williams",
      email: "kenzi.lawson@example.com",
      phone: "(208) 555-0112",
      location: "Nigeria",
      lastLogin: "19 Nov. 23",
      status: "active",
      avatar: "/diverse-user-avatars.png",
    },
    {
      id: "9",
      name: "Savannah Nguyen",
      email: "bill.sanders@example.com",
      phone: "(702) 555-0122",
      location: "Nigeria",
      lastLogin: "19 Nov. 23",
      status: "active",
      avatar: "/diverse-user-avatars.png",
    },
    {
      id: "10",
      name: "Jerome Bell",
      email: "willie.jennings@example.com",
      phone: "(205) 555-0100",
      location: "Nigeria",
      lastLogin: "19 Nov. 23",
      status: "active",
      avatar: "/diverse-user-avatars.png",
    },
    {
      id: "11",
      name: "Leslie Alexander",
      email: "nevaeh.simmons@example.com",
      phone: "(270) 555-0117",
      location: "Nigeria",
      lastLogin: "19 Nov. 23",
      status: "active",
      avatar: "/diverse-user-avatars.png",
    },
  ]

  // Computed
  const filteredUsers = computed(() => {
    let filtered = mockUsers.filter((user) => user.status === selectedStatus.value)

    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.phone.includes(query) ||
          user.location.toLowerCase().includes(query),
      )
    }

    // Apply location filter
    if (filters.value.location) {
      filtered = filtered.filter((user) => user.location.toLowerCase().includes(filters.value.location.toLowerCase()))
    }

    return filtered
  })

  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredUsers.value.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredUsers.value.length / itemsPerPage.value)
  })

  const statusCounts = computed(() => {
    const counts = {
      active: mockUsers.filter((u) => u.status === "active").length,
      archived: mockUsers.filter((u) => u.status === "archived").length,
      blocked: mockUsers.filter((u) => u.status === "blocked").length,
    }
    return counts
  })

  // Methods
  const fetchUsers = async () => {
    loading.value = true
    error.value = null

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))
      users.value = mockUsers
      totalUsers.value = mockUsers.length
    } catch (err) {
      error.value = "Failed to fetch users"
      console.error("Error fetching users:", err)
    } finally {
      loading.value = false
    }
  }

  const getUserById = (id: string): User | undefined => {
    return mockUsers.find((user) => user.id === id)
  }

  const updateUserStatus = async (userId: string, status: UserStatus) => {
    loading.value = true

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      const userIndex = mockUsers.findIndex((u) => u.id === userId)
      if (userIndex !== -1) {
        mockUsers[userIndex].status = status
      }

      // Refresh users list
      users.value = [...mockUsers]
    } catch (err) {
      error.value = "Failed to update user status"
      console.error("Error updating user status:", err)
    } finally {
      loading.value = false
    }
  }

  const blockUser = async (userId: string) => {
    await updateUserStatus(userId, "blocked")
  }

  const archiveUser = async (userId: string) => {
    await updateUserStatus(userId, "archived")
  }

  const deleteUser = async (userId: string) => {
    loading.value = true

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      const userIndex = mockUsers.findIndex((u) => u.id === userId)
      if (userIndex !== -1) {
        mockUsers.splice(userIndex, 1)
      }

      users.value = [...mockUsers]
      totalUsers.value = mockUsers.length
    } catch (err) {
      error.value = "Failed to delete user"
      console.error("Error deleting user:", err)
    } finally {
      loading.value = false
    }
  }

  const clearSensitiveInfo = async (userId: string) => {
    loading.value = true

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      const userIndex = mockUsers.findIndex((u) => u.id === userId)
      if (userIndex !== -1) {
        // Clear sensitive information
        mockUsers[userIndex].phone = "***-***-****"
        mockUsers[userIndex].email = "***@***.***"
      }

      users.value = [...mockUsers]
    } catch (err) {
      error.value = "Failed to clear sensitive information"
      console.error("Error clearing sensitive info:", err)
    } finally {
      loading.value = false
    }
  }

  const setStatus = (status: UserStatus) => {
    selectedStatus.value = status
    currentPage.value = 1 // Reset to first page when changing status
  }

  const setSearch = (query: string) => {
    searchQuery.value = query
    currentPage.value = 1 // Reset to first page when searching
  }

  const setFilters = (newFilters: Partial<UserFilter>) => {
    filters.value = { ...filters.value, ...newFilters }
    currentPage.value = 1 // Reset to first page when filtering
  }

  const clearFilters = () => {
    filters.value = {
      location: "",
      previousHistory: "",
    }
    searchQuery.value = ""
    currentPage.value = 1
  }

  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  // Initialize on first use
  onMounted(() => {
    fetchUsers()
  })

  return {
    // State
    users: users,
    loading: loading,
    error: error,
    currentPage: currentPage,
    itemsPerPage: itemsPerPage,
    totalUsers: totalUsers,
    selectedStatus: selectedStatus,
    searchQuery: searchQuery,
    filters: filters,

    // Computed
    filteredUsers: filteredUsers,
    paginatedUsers: paginatedUsers,
    totalPages: totalPages,
    statusCounts: statusCounts,

    // Methods
    fetchUsers: fetchUsers,
    getUserById: getUserById,
    blockUser: blockUser,
    archiveUser: archiveUser,
    deleteUser: deleteUser,
    clearSensitiveInfo: clearSensitiveInfo,
    setStatus: setStatus,
    setSearch: setSearch,
    setFilters: setFilters,
    clearFilters: clearFilters,
    setPage: setPage,
    nextPage: nextPage,
    prevPage: prevPage,
  }
}
