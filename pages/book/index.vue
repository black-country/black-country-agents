<template>
  <div class="min-h-screen">
    <!-- Header -->
    <div class="sticky top-0 z-40 backdrop-blur-xl bg-white/80 border-b border-slate-200/60 shadow-sm">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-xl font-bold bg-gray-800 bg-clip-text text-transparent">
              Book Appointment
            </h1>
            <p class="text-sm text-slate-600 mt-0.5">{{ stepDescriptions[currentStep - 1] }}</p>
          </div>
          <div class="flex items-center gap-2 text-sm font-medium text-slate-600">
            <span class="hidden sm:inline">Step</span>
            <span class="text-blue-600 text-lg">{{ currentStep }}</span>
            <span class="text-slate-400">/</span>
            <span class="text-slate-400">3</span>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-5xl">
      <!-- Doctor Card -->
      <div class="bg-white rounded-3xl shadow-xl p-6 mb-6 border border-gray-100 animate-fadeIn">
        <div class="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div class="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-4xl shadow-lg">
            👨‍⚕️
          </div>
          <div class="flex-1">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-2xl font-bold text-slate-900">{{ doctorName }}</h2>
                <p class="text-slate-600 mt-1">{{ doctorSpecialty }}</p>
                <div class="flex items-center gap-4 mt-3">
                  <div class="flex items-center gap-1">
                    <span class="text-yellow-500">⭐</span>
                    <span class="font-semibold text-slate-900">{{ doctorRating }}</span>
                  </div>
                  <span class="text-sm text-slate-500">{{ doctorExperience }}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            @click="showBiography = !showBiography"
            class="px-6 py-3 bg-blue-50 text-blue-600 rounded-xl font-semibold hover:bg-blue-100 transition-all duration-300 whitespace-nowrap"
          >
            {{ showBiography ? 'Hide Bio' : 'View Bio' }}
          </button>
        </div>

        <!-- Biography Section -->
        <transition name="slide-down">
          <div v-if="showBiography" class="mt-6 p-6 bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl border border-slate-200">
            <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span class="text-2xl">📋</span>
              About the Doctor
            </h3>
            <p class="text-slate-600 leading-relaxed">{{ doctorBio }}</p>
          </div>
        </transition>
      </div>

      <!-- Step Indicator -->
      <div class="flex items-center justify-center gap-2 mb-8">
        <div v-for="s in 3" :key="s" class="flex items-center">
          <div :class="[
            'w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500',
            currentStep >= s
              ? 'bg-gray-800 text-white shadow-lg scale-110'
              : 'bg-gray-200 text-gray-400'
          ]">
            <svg v-if="currentStep > s" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
            </svg>
            <span v-else>{{ s }}</span>
          </div>
          <div v-if="s < 3" :class="[
            'w-16 h-1 mx-2 rounded transition-all duration-500',
            currentStep > s ? 'bg-gray-800' : 'bg-gray-200'
          ]" />
        </div>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-100">
        <!-- Step 1: Consultation Type -->
        <transition name="fade" mode="out-in">
          <div v-if="currentStep === 1" key="step1" class="space-y-8">
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-slate-900 mb-3">Choose Consultation Type</h2>
              <p class="text-slate-600">Select how you'd like to consult</p>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <!-- Physical -->
              <button
                @click="selectType('physical')"
                :class="[
                  'relative p-8 rounded-3xl border-2 transition-all duration-300 text-left',
                  selectedType === 'physical'
                    ? 'border-blue-600 bg-gradient-to-br from-blue-50 to-blue-100 shadow-2xl scale-105'
                    : 'border-slate-200 hover:border-blue-300 hover:shadow-lg'
                ]"
              >
                <div class="flex items-start gap-4">
                  <div :class="[
                    'w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all',
                    selectedType === 'physical' ? 'bg-blue-200' : 'bg-slate-100'
                  ]">
                    🏥
                  </div>
                  <div class="flex-1">
                    <h3 class="font-bold text-xl text-slate-900 mb-2">Physical Visit</h3>
                    <p class="text-sm text-slate-600 mb-4">In-person consultation at clinic</p>
                    <p class="text-3xl font-black text-blue-600">
                      ₦{{ settings?.physicalConsultationFee?.toLocaleString() || '—' }}
                    </p>
                  </div>
                  <transition name="scale">
                    <svg v-if="selectedType === 'physical'" class="w-8 h-8 text-blue-600 absolute top-6 right-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </transition>
                </div>
              </button>

              <!-- Virtual -->
              <button
                @click="selectType('virtual')"
                :class="[
                  'relative p-8 rounded-3xl border-2 transition-all duration-300 text-left',
                  selectedType === 'virtual'
                    ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 shadow-2xl scale-105'
                    : 'border-slate-200 hover:border-purple-300 hover:shadow-lg'
                ]"
              >
                <div class="flex items-start gap-4">
                  <div :class="[
                    'w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all',
                    selectedType === 'virtual' ? 'bg-purple-200' : 'bg-slate-100'
                  ]">
                    💻
                  </div>
                  <div class="flex-1">
                    <h3 class="font-bold text-xl text-slate-900 mb-2">Virtual Call</h3>
                    <p class="text-sm text-slate-600 mb-4">Video/Voice consultation online</p>
                    <p class="text-3xl font-black text-purple-600">
                      ₦{{ settings?.virtualConsultationFee?.toLocaleString() || '—' }}
                    </p>
                  </div>
                  <transition name="scale">
                    <svg v-if="selectedType === 'virtual'" class="w-8 h-8 text-purple-600 absolute top-6 right-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </transition>
                </div>
              </button>
            </div>
          </div>

          <!-- Step 2: Date & Time -->
          <div v-else-if="currentStep === 2" key="step2" class="space-y-8">
            <div class="text-center mb-6">
              <h2 class="text-2xl font-bold text-slate-900 mb-3">Select Date & Time</h2>
              <p class="text-slate-600">Choose your preferred appointment slot</p>
            </div>

            <!-- Calendar -->
            <div>
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-lg text-slate-900">{{ currentMonthYear }}</h3>
                <div class="flex gap-2">
                  <button
                    @click="previousMonth"
                    class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                  </button>
                  <button
                    @click="nextMonth"
                    class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="grid grid-cols-7 gap-2 mb-2">
                <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day" class="text-center text-sm font-semibold text-slate-600 py-2">
                  {{ day }}
                </div>
              </div>

              <div class="grid grid-cols-7 gap-2">
                <button
                  v-for="(day, idx) in calendarDays"
                  :key="idx"
                  @click="selectDate(day)"
                  :disabled="!day || day.isPast || !day.isEnabled"
                  :class="[
                    'aspect-square rounded-xl text-sm font-medium transition-all duration-300',
                    !day ? 'invisible' :
                    day.isPast || !day.isEnabled ? 'bg-slate-50 text-slate-300 cursor-not-allowed' :
                    selectedDate === day.dateString ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg scale-110' :
                    'bg-slate-50 hover:bg-blue-50 hover:text-blue-600 hover:scale-105'
                  ]"
                >
                  {{ day?.day }}
                </button>
              </div>
            </div>

            <!-- Time Period Selection -->
            <transition name="slide-down">
              <div v-if="selectedDate" class="space-y-4">
                <h3 class="font-bold text-lg text-slate-900">Choose Time Period</h3>
                <div class="grid grid-cols-3 gap-3">
                  <button
                    v-for="period in ['morning', 'afternoon', 'evening']"
                    :key="period"
                    @click="selectPeriod(period)"
                    :class="[
                      'py-3 px-4 rounded-xl font-semibold capitalize transition-all duration-300',
                      selectedPeriod === period
                        ? 'bg-gray-800 text-white shadow-lg scale-105'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    ]"
                  >
                    {{ period }}
                  </button>
                </div>

                <!-- Time Slots -->
                <div v-if="availLoading" class="flex justify-center py-12">
                  <div class="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                </div>

                <div v-else-if="filteredTimeSlots.length === 0" class="text-center py-12">
                  <div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <p class="text-slate-600">No available slots for this period</p>
                </div>

                <div v-else>
                  <h3 class="font-bold text-lg text-slate-900 mb-3">Available Slots</h3>
                  <div class="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-80 overflow-y-auto">
                    <button
                      v-for="slot in filteredTimeSlots"
                      :key="slot.startTime"
                      @click="selectTimeSlot(slot)"
                      :class="[
                        'py-3 px-2 rounded-xl font-medium transition-all duration-300',
                        selectedSlot?.startTime === slot.startTime
                          ? 'bg-gray-800 text-white shadow-lg scale-105'
                          : 'bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                      ]"
                    >
                      <div class="text-xs">{{ formatTimeSlot(slot.startTime) }}</div>
                    </button>
                  </div>
                </div>

                <!-- Virtual Mode Selection -->
                <div v-if="selectedType === 'virtual' && selectedSlot" class="pt-6 border-t border-slate-200">
                  <h3 class="font-bold text-lg text-slate-900 mb-4">Consultation Mode</h3>
                  <div class="grid grid-cols-2 gap-4">
                    <button
                      @click="consultationMode = 'video'"
                      :class="[
                        'p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3',
                        consultationMode === 'video'
                          ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg scale-105'
                          : 'border-slate-200 hover:border-purple-300 hover:shadow-md'
                      ]"
                    >
                      <div class="text-3xl">📹</div>
                      <span class="font-semibold text-slate-900">Video Call</span>
                    </button>
                    <button
                      @click="consultationMode = 'voice'"
                      :class="[
                        'p-6 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-3',
                        consultationMode === 'voice'
                          ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg scale-105'
                          : 'border-slate-200 hover:border-purple-300 hover:shadow-md'
                      ]"
                    >
                      <div class="text-3xl">🎤</div>
                      <span class="font-semibold text-slate-900">Voice Call</span>
                    </button>
                  </div>
                </div>
              </div>
            </transition>
          </div>

          <!-- Step 3: Confirmation -->
          <div v-else-if="currentStep === 3" key="step3" class="space-y-8">
            <div class="text-center mb-6">
              <div class="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h2 class="text-2xl font-bold text-slate-900 mb-2">Confirm Appointment</h2>
              <p class="text-slate-600">Review your booking details</p>
            </div>

            <div class="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
              <div class="grid gap-6">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm text-2xl">
                    {{ selectedType === 'physical' ? '🏥' : '💻' }}
                  </div>
                  <div>
                    <p class="text-xs text-slate-600 font-medium uppercase tracking-wide">Type</p>
                    <p class="font-bold text-slate-900 capitalize">{{ selectedType }} Visit</p>
                  </div>
                </div>

                <div v-if="selectedType === 'virtual'" class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm text-2xl">
                    {{ consultationMode === 'video' ? '📹' : '🎤' }}
                  </div>
                  <div>
                    <p class="text-xs text-slate-600 font-medium uppercase tracking-wide">Mode</p>
                    <p class="font-bold text-slate-900 capitalize">{{ consultationMode }} Call</p>
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
                    <p class="font-bold text-slate-900">{{ formattedSelectedDate }}</p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <svg class="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="text-xs text-slate-600 font-medium uppercase tracking-wide">Time</p>
                    <p class="font-bold text-slate-900">{{ formatTimeSlot(selectedSlot?.startTime) }} - {{ formatTimeSlot(selectedSlot?.endTime) }}</p>
                  </div>
                </div>

                <div v-if="selectedType === 'physical'" class="flex items-center gap-4">
                  <div class="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-sm text-2xl">
                    📍
                  </div>
                  <div class="flex-1">
                    <p class="text-xs text-slate-600 font-medium uppercase tracking-wide">Location</p>
                    <p class="font-semibold text-slate-900">{{ settings?.clinicLocation || 'Address not available' }}</p>
                  </div>
                </div>

                <div class="pt-6 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <p class="text-sm text-slate-600 font-medium mb-1">Total Amount</p>
                    <p class="text-4xl font-black bg-gray-800 bg-clip-text text-transparent">
                      ₦{{ consultationPrice.toLocaleString() }}
                    </p>
                  </div>
                  <div class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    Secure Payment
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-blue-50 rounded-2xl p-6 border border-blue-200">
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
                  <span>Payment confirmation will be shown after transaction</span>
                </li>
                <li v-if="selectedType === 'virtual'" class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Meeting link will be generated after payment</span>
                </li>
                <li v-if="selectedType === 'physical'" class="flex items-start gap-2">
                  <svg class="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                  </svg>
                  <span>Please arrive 10 minutes early for physical consultations</span>
                </li>
              </ul>
            </div>
          </div>
        </transition>

        <!-- Navigation Buttons -->
        <div class="flex gap-4 mt-8">
          <button
            v-if="currentStep > 1"
            @click="previousStep"
            :disabled="bookingLoading || initiating"
            class="flex-1 py-4 border-2 border-slate-300 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            Back
          </button>

          <button
            v-if="currentStep < 3"
            @click="nextStep"
            :disabled="!canProceed"
            class="flex-1 py-4 bg-gray-800 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
          >
            Continue
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>

          <button
            v-else
            @click="handleBooking"
            :disabled="bookingLoading || initiating"
            class="flex-1 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg v-if="bookingLoading || initiating" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            <span v-if="bookingLoading">Creating...</span>
            <span v-else-if="initiating">Processing...</span>
            <span v-else>
              <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              Proceed to Payment
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <transition name="modal">
      <div v-if="showSuccessModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="closeSuccessModal">
        <div class="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 animate-scaleIn" @click.stop>
          <div class="flex justify-center mb-6">
            <div class="relative">
              <div class="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                <span class="text-slate-600 font-medium">Type</span>
                <span class="font-bold text-slate-900 capitalize">{{ selectedType }}</span>
              </div>
              <div class="flex justify-between items-center text-sm">
                <span class="text-slate-600 font-medium">Date & Time</span>
                <span class="font-bold text-slate-900 text-right">
                  {{ formattedSelectedDate }}<br />
                  {{ formatTimeSlot(selectedSlot?.startTime) }}
                </span>
              </div>
              <div class="pt-3 border-t border-green-200 flex justify-between items-center">
                <span class="font-bold text-slate-900">Amount Paid</span>
                <span class="text-2xl font-bold text-green-600">₦{{ consultationPrice.toLocaleString() }}</span>
              </div>
            </div>
          </div>

          <div v-if="paymentCallbackData.meetLink && selectedType === 'virtual'" class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 mb-6 border border-purple-200">
            <h4 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span class="text-2xl">💻</span>
              Join Your Virtual Consultation
            </h4>
            <a
              :href="paymentCallbackData.meetLink"
              target="_blank"
              rel="noopener noreferrer"
              class="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold text-center hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg"
            >
              Join Google Meet
            </a>
          </div>

          <button
            @click="closeSuccessModal"
            class="w-full py-4 bg-gray-800 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View My Appointments
          </button>
        </div>
      </div>
    </transition>

    <!-- Processing Modal -->
    <transition name="modal">
      <div v-if="processingPayment" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 text-center">
          <div class="relative mb-6">
            <div class="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          </div>
          <h3 class="text-2xl font-bold text-slate-900 mb-3">Verifying Payment</h3>
          <p class="text-slate-600">Please wait while we confirm your transaction...</p>
        </div>
      </div>
    </transition>

    <!-- Error Modal -->
    <transition name="modal">
      <div v-if="showErrorModal" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" @click="closeErrorModal">
        <div class="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10" @click.stop>
          <div class="flex justify-center mb-6">
            <div class="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
          </div>

          <h3 class="text-2xl font-bold text-slate-900 text-center mb-3">Payment Failed</h3>
          <p class="text-slate-600 text-center mb-8">{{ errorMessage || 'Your payment could not be processed.' }}</p>

          <div class="space-y-3">
            <button
              @click="retryPayment"
              class="w-full py-4 bg-gray-800 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Try Again
            </button>
            <button
              @click="closeErrorModal"
              class="w-full py-4 border-2 border-slate-300 text-slate-700 rounded-2xl font-semibold hover:bg-slate-50 transition-all duration-300"
            >
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
import { useInitiatePayment } from '@/composables/modules/payments/useInitiatePayment'
import { useUser } from '@/composables/modules/auth/user'

definePageMeta({
  middleware: 'auth',
  layout: 'user'
})

const router = useRouter()
const route = useRoute()
const { user } = useUser()
const { loading: initiating, initiatePayment } = useInitiatePayment()
const { settings, loading: settingsLoading } = useGetSettings()
const { createAppointment, loading: bookingLoading } = useCreateAppointment()
const { availability, loading: availLoading, getAvailabilityByDate } = useGetAvailabilityByDate()

// Doctor info (from settings or hardcoded)
const doctorName = computed(() => 'Dr. Nwachi Patrick')
const doctorSpecialty = computed(() => 'General Practitioner')
const doctorRating = computed(() => '4.8')
const doctorExperience = computed(() => '15+ years')
const doctorBio = computed(() => 'Dr. Nwachi Patrick is a dedicated healthcare professional with over 15 years of experience in providing comprehensive medical care. He specializes in preventive medicine and patient-centered care.')

// State
const currentStep = ref(1)
const selectedType = ref<'physical' | 'virtual' | null>(null)
const selectedDate = ref<string | null>(null)
const selectedSlot = ref<{ startTime: string; endTime: string } | null>(null)
const selectedPeriod = ref<'morning' | 'afternoon' | 'evening'>('morning')
const consultationMode = ref<'video' | 'voice'>('video')
const showBiography = ref(false)
const currentMonthDate = ref(new Date())

// Modals
const showSuccessModal = ref(false)
const showErrorModal = ref(false)
const processingPayment = ref(false)
const errorMessage = ref('')
const paymentCallbackData = ref<any>({})

const stepDescriptions = [
  'Select your preferred consultation type',
  'Pick a date and time that works for you',
  'Review and complete your booking'
]

// Calendar computation
const currentMonthYear = computed(() => {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentMonthDate.value)
})

const calendarDays = computed(() => {
  const year = currentMonthDate.value.getFullYear()
  const month = currentMonthDate.value.getMonth()
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days: any[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null)
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day)
    const dateString = date.toISOString().split('T')[0]
    const isPast = date < today
    const isEnabled = !isPast

    days.push({
      day,
      date,
      dateString,
      isPast,
      isEnabled
    })
  }

  return days
})

const filteredTimeSlots = computed(() => {
  if (!availability.value || !Array.isArray(availability.value.availability)) return []

  const match = availability.value.availability.find(
    (a: any) => a.consultationType === selectedType.value && a.isAvailable === true
  )

  if (!match || !Array.isArray(match.timeSlots)) return []

  const allSlots = match.timeSlots.filter((ts: any) => ts.isAvailable)

  // Filter by period
  return allSlots.filter((slot: any) => {
    const hour = parseInt(slot.startTime.split(':')[0])
    if (selectedPeriod.value === 'morning') return hour >= 8 && hour < 12
    if (selectedPeriod.value === 'afternoon') return hour >= 12 && hour < 17
    if (selectedPeriod.value === 'evening') return hour >= 17 && hour < 21
    return true
  })
})

const consultationPrice = computed(() => {
  if (!settings.value || !selectedType.value) return 0
  return selectedType.value === 'physical'
    ? settings.value.physicalConsultationFee
    : settings.value.virtualConsultationFee
})

const formattedSelectedDate = computed(() => {
  if (!selectedDate.value) return ''
  const date = new Date(selectedDate.value)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
})

const canProceed = computed(() => {
  if (currentStep.value === 1) return selectedType.value !== null
  if (currentStep.value === 2) return selectedDate.value !== null && selectedSlot.value !== null
  return true
})

// Methods
const selectType = (type: 'physical' | 'virtual') => {
  selectedType.value = type
  selectedDate.value = null
  selectedSlot.value = null
}

const previousMonth = () => {
  currentMonthDate.value = new Date(currentMonthDate.value.getFullYear(), currentMonthDate.value.getMonth() - 1)
}

const nextMonth = () => {
  currentMonthDate.value = new Date(currentMonthDate.value.getFullYear(), currentMonthDate.value.getMonth() + 1)
}

const selectDate = (day: any) => {
  if (!day || !day.isEnabled) return
  selectedDate.value = day.dateString
  selectedSlot.value = null
}

const selectPeriod = (period: 'morning' | 'afternoon' | 'evening') => {
  selectedPeriod.value = period
  selectedSlot.value = null
}

const selectTimeSlot = (slot: any) => {
  selectedSlot.value = slot
}

const formatTimeSlot = (time?: string) => {
  if (!time) return ''
  const [h, m] = time.split(':')
  const hh = parseInt(h, 10)
  const am = hh >= 12 ? 'PM' : 'AM'
  const display = hh % 12 || 12
  return `${display}:${m} ${am}`
}

const nextStep = () => {
  if (canProceed.value && currentStep.value < 3) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
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

    if (selectedType.value === 'physical' && settings.value?.clinicLocation) {
      appointmentPayload.location = settings.value.clinicLocation
    }

    const appointmentResult = await createAppointment(appointmentPayload)

    if (!appointmentResult || !appointmentResult._id) {
      throw new Error('Failed to create appointment')
    }

    const paymentPayload = {
      appointmentId: appointmentResult._id,
      amount: consultationPrice.value,
      paymentMethod: 'Paystack' as const,
      email: user?.value?.email || '',
      phone: user?.value?.phone || '+2348012345678',
      address: user?.value?.address || settings.value?.clinicLocation || 'Not provided',
      customerName: `${user?.value?.firstName || ''} ${user?.value?.lastName || ''}`.trim() || 'Customer',
      description: `Payment for ${selectedType.value} consultation`
    }

    const paymentResult = await initiatePayment(paymentPayload)

    if (!paymentResult || !paymentResult.authorization_url) {
      throw new Error('Failed to initiate payment')
    }

    window.location.href = paymentResult.authorization_url

  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to process booking'
    showErrorModal.value = true
  }
}

const handlePaymentCallback = async () => {
  const status = route.query.status as string
  const reference = route.query.reference as string || route.query.trxref as string
  const appointmentId = route.query.appointmentId as string
  const meetLink = route.query.meetLink as string

  if (!status || !reference) {
    router.push('/booking')
    return
  }

  try {
    processingPayment.value = true

    if (status === 'success') {
      paymentCallbackData.value = {
        status,
        reference,
        appointmentId,
        meetLink: meetLink ? decodeURIComponent(meetLink) : undefined
      }
      showSuccessModal.value = true
    } else {
      errorMessage.value = 'Payment failed. Please try again.'
      showErrorModal.value = true
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Failed to process payment'
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
  currentStep.value = 3
}

// Fetch availability when date/type changes
watch([selectedDate, selectedType], async () => {
  if (selectedDate.value && selectedType.value) {
    await getAvailabilityByDate({
      date: selectedDate.value,
      consultationType: selectedType.value
    })
  }
})

onMounted(() => {
  if (route.query.status && (route.query.reference || route.query.trxref)) {
    handlePaymentCallback()
  }
})
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}

.animate-scaleIn {
  animation: scaleIn 0.3s ease-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}

.slide-down-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.9);
}
</style>