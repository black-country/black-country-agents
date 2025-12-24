import { ref, onMounted, watch } from 'vue'
import { property_api } from '@/api_factory/modules/property'
import { useUser } from '@/composables/auth/user'
import { debounce } from 'lodash'
const route = useRoute()

export const useGetProperties = () => {
    const loadingProperties = ref(false) // Loading state for general properties
    const loadingSearch = ref(false) // Loading state for search operations
    const propertiesList = ref([] as any) // Array to hold all properties
    const searchResults = ref([] as any) // Array to hold search results
    const searchQuery = ref('')
    const currentPage = ref(1)
    const perPage = ref(20)
    const segmentId = ref(route.query.tab || ''); // Segment ID obtained from the query parameter
    const totalPages = ref(1) // To store total pages
    const sortBy = ref('all') // To store the sort type
    const { user } = useUser()

    const { $_fetch_properties } = property_api

    const getProperties = async () => {
        loadingProperties.value = true

        // Pass page, perPage, and searchQuery to the API factory
        const res = await $_fetch_properties(currentPage.value, perPage.value, searchQuery.value, user.value.id, segmentId.value) as any

        if (res.type !== 'ERROR') {
            propertiesList.value = res?.data?.result ?? [];
            totalPages.value = Math.ceil(res?.data?.metadata?.total / perPage.value) || 1;
        }
        loadingProperties.value = false
    }

    const searchProperties = async () => {
        loadingSearch.value = true // Set loading state for search

        // Perform search operation with the current search query
        const res = await $_fetch_properties(1, perPage.value, searchQuery.value) as any // Always start from page 1 for search

        if (res.type !== 'ERROR') {
            let results = res?.data?.result ?? [];
            searchResults.value = sortProperties(results); // Sort search results before setting them
        }
        loadingSearch.value = false // Reset loading state
    }

    // Debounced version of searchProperties to avoid multiple API calls
    const debouncedSearchProperties = debounce(searchProperties, 300)

    // Watch searchQuery to trigger the search when it changes
    watch(searchQuery, () => {
        currentPage.value = 1 // Reset to page 1 for new search
        debouncedSearchProperties() // Call the debounced version
    })

    // Watch currentPage for pagination
    watch(currentPage, () => {
        if (!searchQuery.value) {
            getProperties() // Fetch properties if no search query
        }
    })

    // Watch sortBy to refetch and apply sorting
    watch(sortBy, () => {
        currentPage.value = 1 // Reset page for new sort
        if (!searchQuery.value) {
            getProperties() // Refetch properties on sort change if no search
        } else {
            debouncedSearchProperties() // Refetch search results on sort change
        }
    })

    watch(() => route.query.tab, (newTab, oldTab) => {
        if (newTab !== oldTab) {
          segmentId.value = newTab || ''; // Update segmentId with the new tab value
          currentPage.value = 1; // Reset to page 1
          getProperties(); // Refetch properties
        }
      });

      onMounted(() => {
        segmentId.value = route.query.tab || ''; // Initialize segmentId from the query parameter
        getProperties();
      });
    

    const clearSearch = () => {
        searchQuery.value = '';
        searchResults.value = []; // Clear search results when search is cleared
    }

    return {
        getProperties,
        debouncedSearchProperties,
        loadingProperties,
        loadingSearch, // Expose loading state for search
        propertiesList,
        searchResults, // Expose search results
        searchQuery,
        currentPage,
        perPage,
        totalPages,
        clearSearch,
        sortBy, // Return sortBy to allow changing the sort type from a component
    }
}
