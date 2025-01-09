<template>
    <div class="bg-white rounded-md overflow-x-auto">
        <div>
            <table class="min-w-full text-left border-separate border-spacing-y-2">
                <thead>
                    <tr class="text-[#1D2739] text-sm">
                        <th class="px-4 py-3 font-medium">Full name</th>
                        <th class="px-4 py-3 font-medium">Property interested in</th>
                        <th class="px-4 py-3 font-medium">Date</th>
                        <th class="px-4 py-3 font-medium">Time</th>
                        <th class="px-4 py-3 font-medium">Status</th>
                        <th class="px-4 py-3 font-medium sr-only">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(visit, index) in visits" :key="index" class="rounded-md">
                        <td class="px-4 py-6 text-[#667185] font-light text-sm"> {{ `${ visit.tenant.firstName} ${ visit.tenant.lastName}` ?? 'Nil' }}</td>
                        <td class="px-4 py-6 text-[#667185] font-light text-sm">{{ visit?.house?.name ?? 'Nil' }}</td>
                        <td class="px-4 py-6 text-[#667185] font-light text-sm"> {{ moment(visit.date).format("MMMM Do YYYY") }}</td>
                        <td class="px-4 py-6 text-[#667185] font-light text-sm">{{ visit.time }}</td>
                        <td class="px-4 py-3.5 text-[#1D2739] font-medium gap-x-2 text-sm flex items-center space-x-2">
                            {{ visit.status == 'no_show' ? 'No show' : visit.status }}
                            <button class="text-gray-400 hover:text-gray-600">
                                <img src="@/assets/icons/info-icon.svg" alt="Info" />
                            </button>
                        </td>
                        <td class="px-4 py-3.5 text-[#667185] font-light text-sm">
                            <button class="text-gray-400 hover:text-gray-600">
                                <img src="@/assets/icons/arrow-down.svg" alt="Expand" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
  import moment from 'moment';
import { PropType } from "vue";

interface Visit {
    name: string;
    property: string;
    date: string;
    time: string;
    status: string;
}

const props = defineProps({
    visits: {
        type: Array as PropType<Visit[]>,
        required: true,
    },
})
</script>
