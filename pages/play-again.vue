<template>
    <div class="min-h-screen max-w-3xl mx-auto">
        <!-- Floating Header -->
        <div class="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b-[0.5px] border-slate-200/60 shadow-sm">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div class="flex items-center justify-between">
                    <div>
                        <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Book Consultation
                        </h1>
                        <p class="text-sm text-slate-600 mt-0.5">{{ stepDescriptions[currentStep] }}</p>
                    </div>
                    <div class="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <span class="hidden sm:inline">Step</span>
                        <span class="text-blue-600 text-lg">{{ currentStep + 1 }}</span>
                        <span class="text-slate-400">/</span>
                        <span class="text-slate-400">{{ steps.length }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-32">
            <!-- Progress Bar -->
            <div class="mb-12">
                <div class="relative">
                    <!-- Background Line -->
                    <div class="absolute top-6 left-0 right-0 h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div class="h-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 rounded-full transition-all duration-700 ease-out"
                            :style="{ width: `${((currentStep + 1) / steps.length) * 100}%` }"></div>
                    </div>

                    <!-- Steps -->
                    <div class="relative flex justify-between">
                        <div v-for="(step, idx) in steps" :key="idx" class="flex flex-col items-center group">
                            <!-- Circle -->
                            <div :class="[
                                'w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 relative z-10',
                                currentStep > idx
                                    ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30 scale-100'
                                    : currentStep === idx
                                        ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-xl shadow-purple-500/40 scale-110 ring-4 ring-blue-100'
                                        : 'bg-white text-slate-400 border-[0.5px] border-slate-200 scale-90'
                            ]">
                                <svg v-if="currentStep > idx" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span v-else>{{ idx + 1 }}</span>
                            </div>

                            <!-- Label -->
                            <span :class="[
                                'text-xs sm:text-sm font-medium mt-3 transition-all duration-300 whitespace-nowrap',
                                currentStep >= idx ? 'text-slate-900' : 'text-slate-400'
                            ]">
                                {{ step }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Content Card with Transition -->
            <div class="relative min-h-[500px]">
                <transition :name="transitionName" mode="out-in">
                    <div :key="currentStep" class="absolute inset-0">
                        <!-- STEP 1: TYPE SELECTION -->
                        <div v-if="currentStep === 0" class="space-y-8 pb-10">
                            <div class="text-center mb-8">
                                <h2 class="text-xl font-bold text-slate-900 mb-3">Choose Your Consultation</h2>
                                <p class="text-slate-600 max-w-2xl text-sm mx-auto">Select the consultation type that best fits your needs</p>
                            </div>

                            <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                                <!-- Physical -->
                                <button @click="selectType('physical')" :class="[
                                    'group relative outline-none border-[0.5px] overflow-hidden rounded-3xl p-8 text-left transition-all duration-500',
                                    selectedType === 'physical'
                                        ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-2xl shadow-blue-500/40 scale-105'
                                        : 'bg-white hover:bg-slate-50 border-[0.5px] border-slate-200 hover:border-blue-200 shadow-lg hover:shadow-xl hover:scale-102'
                                ]">
                                    <div class="absolute inset-0 opacity-10">
                                        <div class="absolute -right-8 -top-8 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                                        <div class="absolute -left-8 -bottom-8 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                                    </div>

                                    <div class="relative">
                                        <div :class="[
                                            'w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500',
                                            selectedType === 'physical' ? 'bg-white/20 backdrop-blur-sm' : 'bg-blue-50 group-hover:bg-blue-100'
                                        ]">
                                            <span class="text-4xl">🏥</span>
                                        </div>

                                        <h3 :class="['text-xl font-bold mb-2', selectedType === 'physical' ? 'text-white' : 'text-slate-900']">
                                            Physical Visit
                                        </h3>
                                        <p :class="['text-sm mb-6', selectedType === 'physical' ? 'text-blue-100' : 'text-slate-600']">
                                            In-person consultation at our clinic with comprehensive care
                                        </p>

                                        <div class="flex items-baseline gap-2">
                                            <span :class="['text-2xl font-black', selectedType === 'physical' ? 'text-white' : 'text-blue-600']">
                                                ₦{{ settings?.physicalConsultationFee?.toLocaleString() ?? '—' }}
                                            </span>
                                            <span :class="['text-sm', selectedType === 'physical' ? 'text-blue-100' : 'text-slate-500']">
                                                per session
                                            </span>
                                        </div>

                                        <div class="mt-6 space-y-2">
                                            <div class="flex items-center gap-2 text-sm">
                                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                                </svg>
                                                <span :class="selectedType === 'physical' ? 'text-blue-100' : 'text-slate-700'">
                                                    Face-to-face examination
                                                </span>
                                            </div>
                                            <div class="flex items-center gap-2 text-sm">
                                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                                </svg>
                                                <span :class="selectedType === 'physical' ? 'text-blue-100' : 'text-slate-700'">
                                                    Complete diagnostic tests
                                                </span>
                                            </div>
                                        </div>

                                        <transition name="scale">
                                            <div v-if="selectedType === 'physical'" class="absolute top-6 right-6">
                                                <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </transition>
                                    </div>
                                </button>

                                <!-- Virtual -->
                                <button @click="selectType('virtual')" :class="[
                                    'group relative outline-none border-[0.5px] overflow-hidden rounded-3xl p-8 text-left transition-all duration-500',
                                    selectedType === 'virtual'
                                        ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-2xl shadow-purple-500/40 scale-105'
                                        : 'bg-white hover:bg-slate-50 border-[0.5px] border-slate-200 hover:border-purple-200 shadow-lg hover:shadow-xl hover:scale-102'
                                ]">
                                    <div class="absolute inset-0 opacity-10">
                                        <div class="absolute -right-8 -top-8 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                                        <div class="absolute -left-8 -bottom-8 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                                    </div>

                                    <div class="relative">
                                        <div :class="[
                                            'w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500',
                                            selectedType === 'virtual' ? 'bg-white/20 backdrop-blur-sm' : 'bg-purple-50 group-hover:bg-purple-100'
                                        ]">
                                            <span class="text-4xl">💻</span>
                                        </div>

                                        <h3 :class="['text-xl font-bold mb-2', selectedType === 'virtual' ? 'text-white' : 'text-slate-900']">
                                            Virtual Call
                                        </h3>
                                        <p :class="['text-sm mb-6', selectedType === 'virtual' ? 'text-purple-100' : 'text-slate-600']">
                                            Convenient video or voice consultation from anywhere
                                        </p>

                                        <div class="flex items-baseline gap-2">
                                            <span :class="['text-2xl font-black', selectedType === 'virtual' ? 'text-white' : 'text-purple-600']">
                                                ₦{{ settings?.virtualConsultationFee?.toLocaleString() ?? '—' }}
                                            </span>
                                            <span :class="['text-sm', selectedType === 'virtual' ? 'text-purple-100' : 'text-slate-500']">
                                                per session
                                            </span>
                                        </div>

                                        <div class="mt-6 space-y-2">
                                            <div class="flex items-center gap-2 text-sm">
                                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                                </svg>
                                                <span :class="selectedType === 'virtual' ? 'text-purple-100' : 'text-slate-700'">
                                                    Connect from home
                                                </span>
                                            </div>
                                            <div class="flex items-center gap-2 text-sm">
                                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                                </svg>
                                                <span :class="selectedType === 'virtual' ? 'text-purple-100' : 'text-slate-700'">
                                                    Flexible scheduling
                                                </span>
                                            </div>
                                        </div>

                                        <transition name="scale">
                                            <div v-if="selectedType === 'virtual'" class="absolute top-6 right-6">
                                                <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                    <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </transition>
                                    </div>
                                </button>
                            </div>

                            <div class="flex justify-center mt-12">
                                <button @click="nextStep" :disabled="!selectedType"
                                    class="px-12 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-xl flex items-center gap-3 group">
                                    <span>Continue</span>
                                    <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- STEP 2: DATE & TIME -->
                        <div v-if="currentStep === 1" class="space-y-8 pb-10">
                            <div class="bg-white">
                                <h2 class="text-lg font-black text-slate-900 mb-6">Select Date & Time</h2>

                                <div class="mb-8">
                                    <label class="block text-sm font-semibold text-slate-700 mb-3">Choose a Date</label>
                                    <div class="relative">
                                        <input v-model="selectedDate" type="date" :min="minDate"
                                            class="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                                    </div>
                                </div>

                                <div v-if="selectedDate">
                                    <label class="block text-sm font-semibold text-slate-700 mb-4">Available Time Slots</label>

                                    <div v-if="availLoading" class="flex flex-col items-center justify-center py-16">
                                        <div class="relative">
                                            <div class="w-14 h-14 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                                            <div class="absolute inset-0 flex items-center justify-center">
                                                <div class="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
                                            </div>
                                        </div>
                                        <p class="text-slate-600 mt-4 font-medium">Finding available slots...</p>
                                    </div>

                                    <div v-else-if="availableSlotsForSelectedDate.length === 0" class="text-center py-16">
                                        <div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg class="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                            </svg>
                                        </div>
                                        <h3 class="text-lg font-bold text-slate-900 mb-2">No Slots Available</h3>
                                        <p class="text-slate-600 text-sm">Please try selecting a different date</p>
                                    </div>

                                    <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                        <button v-for="(slot, idx) in availableSlotsForSelectedDate" :key="slotKey(slot)" @click="selectedSlot = slot" :class="[
                                                'relative p-4 rounded-2xl border-[0.5px] font-medium transition-all duration-300',
                                                selectedSlot && isSameSlot(selectedSlot, slot)
                                                    ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 shadow-lg scale-105'
                                                    : 'border-slate-200 hover:border-blue-300 text-slate-700 hover:shadow-md hover:scale-102 bg-white'
                                            ]" :style="{ animationDelay: `${idx * 30}ms` }" class="slot-item">
                                            <div class="text-center flex items-center gap-x-2">
                                                <div class="text-sm inline font-bold">{{ formatTime(slot.startTime) }}</div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#e8e8e8" viewBox="0 0 256 256">
                                                    <path d="M222,48V96a6,6,0,0,1-6,6H168a6,6,0,0,1,0-12h33.52L183.47,72a81.51,81.51,0,0,0-57.53-24h-.46A81.5,81.5,0,0,0,68.19,71.28a6,6,0,1,1-8.38-8.58,93.38,93.38,0,0,1,65.67-26.76H126a93.45,93.45,0,0,1,66,27.53l18,18V48a6,6,0,0,1,12,0ZM187.81,184.72a81.5,81.5,0,0,1-57.29,23.34h-.46a81.51,81.51,0,0,1-57.53-24L54.48,166H88a6,6,0,0,0,0-12H40a6,6,0,0,0-6,6v48a6,6,0,0,0,12,0V174.48l18,18.05a93.45,93.45,0,0,0,66,27.53h.52a93.38,93.38,0,0,0,65.67-26.76,6,6,0,1,0-8.38-8.58Z"></path>
                                                </svg>
                                                <div class="text-xs inline text-slate-500 mt-1">{{ formatTime(slot.endTime) }}</div>
                                            </div>

                                            <transition name="scale">
                                                <div v-if="selectedSlot && isSameSlot(selectedSlot, slot)" class="absolute -top-2 -right-2">
                                                    <div class="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                                        <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </transition>
                                        </button>
                                    </div>
                                </div>

                                <div v-if="selectedType === 'virtual' && selectedSlot" class="mt-8 pt-8 border-t border-slate-200">
                                    <label class="block text-sm font-semibold text-slate-700 mb-4">Consultation Mode</label>
                                    <div class="grid grid-cols-2 gap-4">
                                        <button @click="consultationMode = 'video'" :class="[
                                            'p-6 rounded-2xl border-[0.5px] font-medium transition-all duration-300 flex flex-col items-center gap-3',
                                            consultationMode === 'video'
                                                ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 shadow-lg scale-105'
                                                : 'border-slate-200 hover:border-purple-300 text-slate-700 hover:shadow-md bg-white'
                                        ]">
                                            <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', consultationMode === 'video' ? 'bg-purple-200' : 'bg-slate-100']">
                                                <span class="text-2xl">📹</span>
                                            </div>
                                            <span class="font-semibold">Video Call</span>
                                        </button>
                                        <button @click="consultationMode = 'voice'" :class="[
                                            'p-6 rounded-2xl border-[0.5px] font-medium transition-all duration-300 flex flex-col items-center gap-3',
                                            consultationMode === 'voice'
                                                ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 text-purple-700 shadow-lg scale-105'
                                                : 'border-slate-200 hover:border-purple-300 text-slate-700 hover:shadow-md bg-white'
                                        ]">
                                            <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', consultationMode === 'voice' ? 'bg-purple-200' : 'bg-slate-100']">
                                                <span class="text-2xl">🎤</span>
                                            </div>
                                            <span class="font-semibold">Voice Call</span>
                                        </button>
                                    </div>
                                </div>

                                <div v-if="selectedType === 'physical' && selectedSlot" class="mt-8 pt-8 border-t border-slate-200">
                                    <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                                        <div class="flex gap-4">
                                            <div class="flex-shrink-0">
                                                <div class="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center">
                                                    <span class="text-2xl">📍</span>
                                                </div>
                                            </div>
                                            <!-- <div class="flex-1">
                                                <h4 class="font-bold text-slate-900 mb-2">Clinic Location</h4>
                                                <p class="text-slate-700 text-sm mb-3">{{ clinicAddress || 'Address not available' }}</p>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="flex gap-4 justify-center">
                                <button @click="previousStep"
                                    class="px-8 py-2.5 border-[0.5px] border-slate-300 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-300 flex items-center gap-2 group">
                                    <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
                                    </svg>
                                    <span>Back</span>
                                </button>
                                <button @click="nextStep" :disabled="!selectedDate || !selectedSlot"
                                    class="px-12 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-3 group">
                                    <span>Continue</span>
                                    <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <!-- STEP 3: REVIEW -->
                        <div v-if="currentStep === 2" class="space-y-8 pb-10">
                            <div class="bg-white">
                                <div class="text-center mb-8">
                                    <div class="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <h2 class="text-xl font-bold text-slate-900 mb-2">Review Your Booking</h2>
                                    <p class="text-slate-600 text-sm">Please confirm your appointment details</p>
                                </div>

                                <div class="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border-[0.5px] border-slate-200 mb-8">
                                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div class="flex items-center gap-4">
                                            <div class="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                                <span class="text-2xl">{{ selectedType === 'physical' ? '🏥' : '💻' }}</span>
                                            </div>
                                            <div>
                                                <p class="text-xs text-slate-600 font-medium uppercase tracking-wide">Consultation Type</p>
                                                <p class="text-sm font-bold text-slate-900">
                                                    {{ selectedType === 'physical' ? 'Physical Visit' : 'Virtual Call' }}
                                                </p>
                                            </div>
                                        </div>

                                        <div v-if="selectedType === 'virtual'" class="flex items-center gap-4">
                                            <div class="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                                <span class="text-2xl">{{ consultationMode === 'video' ? '📹' : '🎤' }}</span>
                                            </div>
                                            <div>
                                                <p class="text-xs text-slate-600 font-medium uppercase tracking-wide">Mode</p>
                                                <p class="text-sm font-bold text-slate-900">
                                                    {{ consultationMode === 'video' ? 'Video Call' : 'Voice Call' }}
                                                </p>
                                            </div>
                                        </div>

                                        <div class="flex items-center gap-4">
                                            <div class="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                                <svg class="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-xs text-slate-600 font-medium uppercase tracking-wide">Date</p>
                                                <p class="text-sm font-bold text-slate-900">{{ formatDate(selectedDate) }}</p>
                                            </div>
                                        </div>

                                        <div class="flex items-center gap-4">
                                            <div class="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                                <svg class="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <p class="text-xs text-slate-600 font-medium uppercase tracking-wide">Time Slot</p>
                                                <p class="text-sm font-bold text-slate-900">
                                                    {{ formatTime(selectedSlot?.startTime) }} - {{ formatTime(selectedSlot?.endTime) }}
                                                </p>
                                            </div>
                                        </div>

                                        <div v-if="selectedType === 'physical'" class="lg:col-span-2 flex items-center gap-4">
                                            <div class="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                                <span class="text-2xl">📍</span>
                                            </div>
                                            <div class="flex-1">
                                                <p class="text-xs text-slate-600 font-medium uppercase tracking-wide">Location</p>
                                                <p class="text-sm font-semibold text-slate-900 leading-relaxed">{{ clinicAddress || 'Address not available' }}</p>
                                            </div>
                                        </div>

                                        <div class="lg:col-span-2 flex items-center justify-between pt-6 border-t border-slate-200">
                                            <div>
                                                <p class="text-sm text-slate-600 font-medium mb-1">Total Amount</p>
                                                <p class="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                    ₦{{ consultationPrice.toLocaleString() }}
                                                </p>
                                            </div>
                                            <div class="text-right">
                                                <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                                    </svg>
                                                    <span>Secure Payment</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="bg-blue-50 rounded-2xl p-6 border border-blue-200 mb-8">
                                    <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                                        <svg class="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                                        </svg>
                                        Important Information
                                    </h4>
                                    <ul class="space-y-2 text-sm text-slate-700">
                                        <li class="flex items-start gap-2">
                                            <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                            </svg>
                                            <span>Payment confirmation will be displayed after successful transaction</span>
                                        </li>
                                        <li v-if="selectedType === 'virtual'" class="flex items-start gap-2">
                                            <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                            </svg>
                                            <span>Google Meet link will be generated after payment confirmation</span>
                                        </li>
                                        <li v-if="selectedType === 'physical'" class="flex items-start gap-2">
                                            <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                            </svg>
                                            <span>Please arrive 10 minutes early for physical consultations</span>
                                        </li>
                                        <li class="flex items-start gap-2">
                                            <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                                            </svg>
                                            <span>Cancellation must be done at least 24 hours in advance</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div class="lg:flex gap-4 justify-center px-6 lg:px-0 space-y-3 lg:space-y-0">
                                <button @click="previousStep" :disabled="bookingLoading || initiating"
                                    class="px-8 py-3 w-full border-[0.5px] flex justify-center items-center border-slate-300 rounded-2xl font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed gap-2 group">
                                    <svg class="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12"></path>
                                    </svg>
                                    <span>Back</span>
                                </button>
                                <button @click="handleBooking" :disabled="bookingLoading || initiating"
                                    class="px-12 py-3 w-full bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-semibold shadow-xl hover:shadow-2xl hover:from-green-700 hover:to-green-800 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-3 group min-w-[240px] justify-center">
                                    <svg v-if="bookingLoading || initiating" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                    </svg>
                                    <span v-if="bookingLoading">Creating...</span>
                                    <span v-else-if="initiating">Processing...</span>
                                    <span v-else class="flex items-center gap-2">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                                        </svg>
                                        Proceed to Payment
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>

        <!-- Success Modal -->
        <transition name="modal">
            <div v-if="showSuccessModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="closeSuccessModal">
                <div class="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 transform scale-100" @click.stop>
                    <div class="flex justify-center mb-6">
                        <div class="relative">
                            <div class="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                                <svg class="w-12 h-12 text-white animate-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <div class="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-20"></div>
                        </div>
                    </div>

                    <h3 class="text-2xl font-bold text-slate-900 text-center mb-3">Payment Successful!</h3>
                    <p class="text-slate-600 text-center mb-8">Your consultation has been booked and confirmed.</p>

                    <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 mb-6 border border-green-200">
                        <div class="space-y-3">
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-slate-600 font-medium">Consultation</span>
                                <span class="font-bold text-slate-900">
                                    {{ selectedType === 'physical' ? '🏥 Physical' : '💻 Virtual' }}
                                </span>
                            </div>
                            <div class="flex justify-between items-center text-sm">
                                <span class="text-slate-600 font-medium">Date & Time</span>
                                <span class="font-bold text-slate-900 text-right">
                                    {{ formatDate(selectedDate).split(',')[0] }}<br />
                                    {{ formatTime(selectedSlot?.startTime) }}
                                </span>
                            </div>
                            <div class="pt-3 border-t border-green-200 flex justify-between items-center">
                                <span class="font-bold text-slate-900">Amount Paid</span>
                                <span class="text-2xl font-bold text-green-600">₦{{ consultationPrice.toLocaleString() }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- ✅ Google Meet Link Section -->
                    <div v-if="paymentCallbackData.meetLink && selectedType === 'virtual'" class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 mb-6 border border-purple-200">
                        <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <span class="text-2xl">💻</span>
                            Join Your Virtual Consultation
                        </h4>
                        <p class="text-sm text-slate-600 mb-4">Click the link below to join your consultation at the scheduled time:</p>
                        
                            :href="paymentCallbackData.meetLink"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold text-center hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                            </svg>
                            <span>Join Google Meet</span>
                            <!-- <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
</svg>
</a> -->
<p class="text-xs text-slate-500 text-center mt-3">You can also find this link in your appointments page</p>
</div>

<button @click="closeSuccessModal"
                    class="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2 group">
                    <span>View My Appointments</span>
                    <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                    </svg>
                </button>
            </div>
        </div>
        </transition>

    <!-- Payment Processing Overlay -->
    <transition name="modal">
        <div v-if="processingPayment" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 text-center">
                <div class="relative mb-6">
                    <div class="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-10 h-10 bg-blue-600 rounded-full animate-pulse"></div>
                    </div>
                </div>
                <h3 class="text-2xl font-bold text-slate-900 mb-3">Verifying Payment</h3>
                <p class="text-slate-600">Please wait while we confirm your transaction...</p>
                <div class="mt-6 flex justify-center gap-2">
                    <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 0ms"></div>
                    <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 150ms"></div>
                    <div class="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style="animation-delay: 300ms"></div>
                </div>
            </div>
        </div>
    </transition>

    <!-- Error Modal -->
    <transition name="modal">
        <div v-if="showErrorModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="closeErrorModal">
            <div class="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 transform scale-100" @click.stop>
                <div class="flex justify-center mb-6">
                    <div class="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                        <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </div>
                </div>

                <h3 class="text-2xl font-bold text-slate-900 text-center mb-3">Payment Failed</h3>
                <p class="text-slate-600 text-center mb-8">
                    {{ errorMessage || 'Your payment could not be processed. Please try again.' }}
                </p>

                <div class="space-y-3">
                    <button @click="retryPayment"
                        class="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                        </svg>
                        <span>Try Again</span>
                    </button>
                    <button @click="closeErrorModal"
                        class="w-full py-4 border-2 border-slate-300 text-slate-700 rounded-2xl font-semibold hover:bg-slate-50 transition-all duration-300">
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    </transition>
</div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useGetSettings } from '@/composables/modules/public/useGetSettings'
import { useCreateAppointment } from '@/composables/modules/appointments/useCreateAppointment'
import { useGetAvailabilityByDate } from '@/composables/modules/public/useGetAvailabilityByDate'
import { useInitiatePayment } from "@/composables/modules/payments/useInitiatePayment"
import { useUser } from "@/composables/modules/auth/user"
import { formatDate } from "@/utils/formatDate"

const router = useRouter()
const route = useRoute()
const config = useRuntimeConfig()
const { user } = useUser()
const { loading: initiating, initiatePayment } = useInitiatePayment()

const { settings, loading: settingsLoading } = useGetSettings()
const { createAppointment, loading: bookingLoading } = useCreateAppointment()
const { availability, loading: availLoading, getAvailabilityByDate } = useGetAvailabilityByDate()

const createdAppointmentId = ref<string | null>(null)
const paymentTransactionRef = ref<string | null>(null)
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const errorMessage = ref<string>('')
const processingPayment = ref(false)
const paymentCallbackData = ref<{
    status: string
    reference: string
    appointmentId: string
    meetLink?: string
}>({
    status: '',
    reference: '',
    appointmentId: '',
    meetLink: undefined
})

const steps = ['Choose Type', 'Schedule', 'Confirm & Pay']
const stepDescriptions = [
    'Select your preferred consultation type',
    'Pick a date and time that works for you',
    'Review and complete your booking'
]
const currentStep = ref(0)
const selectedType = ref<'physical' | 'virtual' | null>(null)
const selectedDate = ref<string>('')
const selectedSlot = ref<{ startTime: string; endTime: string } | null>(null)
const consultationMode = ref<'video' | 'voice'>('video')

const transitionName = ref('slide-left')

const clinicAddress = computed(() => settings.value?.clinicLocation || '')
const consultationPrice = computed(() => {
    if (!settings.value || !selectedType.value) return 0
    return selectedType.value === 'physical'
        ? settings.value.physicalConsultationFee
        : settings.value.virtualConsultationFee
})

const minDate = computed(() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().split('T')[0]
})

const availableSlotsForSelectedDate = computed(() => {
    if (!availability.value || !selectedDate.value || !selectedType.value) return []

    const availabilityData = availability.value

    if (!availabilityData.availability || !Array.isArray(availabilityData.availability)) {
        return []
    }

    const match = availabilityData.availability.find(
        (a: any) => a.consultationType === selectedType.value && a.isAvailable === true
    )

    if (!match || !Array.isArray(match.timeSlots)) {
        return []
    }

    return match.timeSlots.filter((ts: any) => ts.isAvailable)
})

const slotKey = (slot: { startTime: string; endTime: string }) => `${slot.startTime}-${slot.endTime}`
const isSameSlot = (a: { startTime: string; endTime: string }, b: { startTime: string; endTime: string }) =>
    a && b && a.startTime === b.startTime && a.endTime === b.endTime

const formatTime = (time?: string) => {
    if (!time) return ''
    const [h, m] = time.split(':')
    const hh = parseInt(h, 10)
    const am = hh >= 12 ? 'PM' : 'AM'
    const display = hh % 12 || 12
    return `${display}:${m} ${am}`
}

const selectType = (type: 'physical' | 'virtual') => {
    selectedType.value = type
    selectedDate.value = ''
    selectedSlot.value = null
}

const fetchAvailability = async () => {
    if (!selectedDate.value || !selectedType.value) return

    await getAvailabilityByDate({
        date: selectedDate.value,
        consultationType: selectedType.value
    })

    selectedSlot.value = null
}

const nextStep = () => {
    if (currentStep.value < steps.length - 1) {
        transitionName.value = 'slide-left'
        currentStep.value++
    }
}

const previousStep = () => {
    if (currentStep.value > 0) {
        transitionName.value = 'slide-right'
        currentStep.value--
    }
}

const handleBooking = async () => {
    if (!selectedType.value || !selectedDate.value || !selectedSlot.value) return

    try {
        const timeSlot = `${selectedSlot.value.startTime} - ${selectedSlot.value.endTime}`

        const appointmentPayload: any = {
            consultationType: selectedType.value,
            date: selectedDate.value,
            timeSlot: timeSlot,
            price: consultationPrice.value
        }

        if (selectedType.value === 'virtual') {
            appointmentPayload.consultationMode = consultationMode.value
        }

        if (selectedType.value === 'physical' && clinicAddress.value) {
            appointmentPayload.location = clinicAddress.value
        }

        console.log('Creating appointment:', appointmentPayload)
        const appointmentResult = await createAppointment(appointmentPayload)

        if (!appointmentResult || !appointmentResult._id) {
            throw new Error('Failed to create appointment. The time slot may no longer be available.')
        }

        createdAppointmentId.value = appointmentResult._id
        console.log('✅ Appointment created:', appointmentResult._id)

        const paymentPayload = {
            appointmentId: appointmentResult._id,
            amount: consultationPrice.value,
            paymentMethod: "Paystack" as const,
            email: user?.value?.email || '',
            phone: user?.value?.phone || '+2348012345678',
            address: user?.value?.address || clinicAddress.value || 'Not provided',
            customerName: `${user?.value?.firstName || ''} ${user?.value?.lastName || ''}`.trim() || 'Customer',
            description: `Payment for ${selectedType.value} consultation on ${formatDate(selectedDate.value)}`
        }

        console.log('Initiating payment:', paymentPayload)
        const paymentResult = await initiatePayment(paymentPayload)

        if (!paymentResult || !paymentResult.authorization_url || !paymentResult.transactionRef) {
            throw new Error('Failed to initiate payment')
        }

        paymentTransactionRef.value = paymentResult.transactionRef
        console.log('✅ Payment initiated:', paymentResult.transactionRef)

        window.location.href = paymentResult.authorization_url

    } catch (error: any) {
        console.error('Booking/Payment error:', error)
        errorMessage.value = error.message || 'Failed to process booking. Please try again.'
        showErrorModal.value = true
    }
}

const handlePaymentCallback = async () => {
    const status = route.query.status as string
    const reference = route.query.reference as string || route.query.trxref as string
    const appointmentId = route.query.appointmentId as string
    const meetLink = route.query.meetLink as string
    const message = route.query.message as string

    console.log('Payment callback received:', { status, reference, appointmentId, meetLink })

    if (!status || !reference) {
        console.error('Missing required callback parameters')
        router.push('/booking')
        return
    }

    try {
        processingPayment.value = true

        if (status === 'success') {
            console.log('✅ Payment successful')

            paymentCallbackData.value = {
                status,
                reference,
                appointmentId,
                meetLink: meetLink ? decodeURIComponent(meetLink) : undefined
            }

            showSuccessModal.value = true

        } else if (status === 'failed') {
            console.error('❌ Payment failed:', message)
            errorMessage.value = message || 'Payment verification failed. Please try again.'
            showErrorModal.value = true

        } else {
            console.error('❌ Payment error:', message)
            errorMessage.value = message || 'An error occurred during payment processing.'
            showErrorModal.value = true
        }

    } catch (error: any) {
        console.error('Payment callback error:', error)
        errorMessage.value = error.message || 'Failed to process payment callback'
        showErrorModal.value = true
    } finally {
        processingPayment.value = false
    }
}

const closeSuccessModal = () => {
    showSuccessModal.value = false
    router.push('/appointments')
}

const closeErrorModal = () => {
    showErrorModal.value = false
    router.push('/booking')
}

const retryPayment = () => {
    showErrorModal.value = false
    currentStep.value = 2
}

watch([selectedDate, selectedType], () => {
    fetchAvailability()
})

definePageMeta({
    middleware: 'auth',
    layout: 'user'
})

onMounted(() => {
    if (route.query.status && (route.query.reference || route.query.trxref)) {
        console.log('Payment callback detected')
        handlePaymentCallback()
    }
})
</script>
<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-left-enter-from {
    opacity: 0;
    transform: translateX(30px);
}

.slide-left-leave-to {
    opacity: 0;
    transform: translateX(-30px);
}

.slide-right-enter-from {
    opacity: 0;
    transform: translateX(-30px);
}

.slide-right-leave-to {
    opacity: 0;
    transform: translateX(30px);
}

.scale-enter-active,
.scale-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    transform: scale(0.8);
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from>div,
.modal-leave-to>div {
    transform: scale(0.9);
}

@keyframes slideUpFade {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.slot-item {
    animation: slideUpFade 0.4s ease-out forwards;
    opacity: 0;
}

@keyframes checkDraw {
    0% {
        stroke-dashoffset: 100;
    }

    100% {
        stroke-dashoffset: 0;
    }
}

.animate-check {
    stroke-dasharray: 100;
    animation: checkDraw 0.6s ease-out forwards;
}

.hover\:scale-102:hover {
    transform: scale(1.02);
}
</style>
