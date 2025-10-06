<template>
  <div>
    <NuxtLayout name="auth">
      <!-- Progress indicator -->
      <div class="mb-8">
        <p class="text-sm text-gray-500 text-center mb-4">STEP {{ currentStep }} OF {{ totalSteps }}</p>
        <div class="flex justify-center">
          <div class="flex space-x-2">
            <div 
              v-for="step in totalSteps" 
              :key="step"
              class="w-2 h-2 rounded-full"
              :class="step <= currentStep ? 'bg-[#2970FF]' : 'bg-gray-300'"
            ></div>
          </div>
        </div>
      </div>

      <!-- Step 1: Owner Information -->
      <div v-if="currentStep === 1">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ formData.ownerType === 'business' ? 'Sign up as a business owner' : 'Sign up as an owner' }}
          </h2>
          <p class="text-[#525866]">
            {{ formData.ownerType === 'business' ? 'Add a new business property owner to the database' : 'Add a new property owner to the database' }}
          </p>
        </div>

        <form @submit.prevent="handleStep1Submit" class="space-y-6">
          <!-- Owner Type -->
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-3">Owner Type</label>
            <div class="flex space-x-4">
              <label class="flex items-center cursor-pointer">
                <input 
                  v-model="formData.ownerType" 
                  type="radio" 
                  value="individual" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  @change="resetFormErrors"
                />
                <span class="ml-2 text-sm text-gray-900">Individual</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input 
                  v-model="formData.ownerType" 
                  type="radio" 
                  value="business" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  @change="resetFormErrors"
                />
                <span class="ml-2 text-sm text-gray-900">Business</span>
              </label>
            </div>
          </div>

          <!-- Individual Fields -->
          <div v-if="formData.ownerType === 'individual'" class="space-y-6">
            <!-- Legal Name -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Legal Name</label>
              <input 
                v-model="formData.legalName"
                type="text" 
                placeholder="Enter Legal Name"
                :class="[
                  'custom-input',
                  errors.legalName ? 'border-red-500' : 'border-gray-300'
                ]"
                @blur="validateField('legalName')"
                @input="clearFieldError('legalName')"
              />
              <p v-if="errors.legalName" class="mt-1 text-sm text-red-500 flex items-center">
                <span class="mr-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 9.8V11H8.6V9.8H7.4ZM7.4 5V8.6H8.6V5H7.4Z" fill="#DF1C41"/>
</svg>

                </span>{{ errors.legalName }}
              </p>
            </div>

            <!-- Email Address -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Email Address</label>
              <input 
                v-model="formData.email"
                type="email" 
                placeholder="Enter email address"
                :class="[
                  'custom-input',
                  errors.email ? 'border-red-500' : 'border-gray-300'
                ]"
                @blur="validateField('email')"
                @input="clearFieldError('email')"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-500 flex items-center">
                <span class="mr-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 9.8V11H8.6V9.8H7.4ZM7.4 5V8.6H8.6V5H7.4Z" fill="#DF1C41"/>
</svg>

                </span>{{ errors.email }}
              </p>
            </div>

            <!-- Address -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Current residential address</label>
              <input 
                v-model="formData.address"
                type="text" 
                placeholder="Enter Address"
                :class="[
                  'custom-input',
                  errors.address ? 'border-red-500' : 'border-gray-300'
                ]"
                @blur="validateField('address')"
                @input="clearFieldError('address')"
              />
              <p v-if="errors.address" class="mt-1 text-sm text-red-500 flex items-center">
                <span class="mr-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 9.8V11H8.6V9.8H7.4ZM7.4 5V8.6H8.6V5H7.4Z" fill="#DF1C41"/>
</svg>

                </span>{{ errors.address }}
              </p>
            </div>

            <!-- Phone Number -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
              <div class="flex">
                <!-- Country Selector -->
                <div class="relative">
                  <button 
                    type="button"
                    @click="showCountryDropdown = !showCountryDropdown"
                    :class="[
                      'flex items-center px-3 py-3 border border-r-0 rounded-l-lg bg-gray-50 min-w-[80px]',
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    ]"
                  >
                    <span class="text-lg mr-2">{{ selectedCountry.flag }}</span>
                    <span class="text-sm text-gray-700">{{ selectedCountry.code }}</span>
                    <ChevronDown class="w-4 h-4 ml-1 text-gray-400" />
                  </button>
                  
                  <!-- Country Dropdown -->
                  <div v-if="showCountryDropdown" class="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    <div class="p-2">
                      <input 
                        v-model="countrySearch"
                        type="text"
                        placeholder="Search countries..."
                        class="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div class="max-h-48 overflow-y-auto">
                      <button 
                        v-for="country in filteredCountries" 
                        :key="country.code"
                        type="button"
                        @click="selectCountry(country)"
                        class="w-full flex items-center px-3 py-2 hover:bg-gray-50 text-left"
                      >
                        <span class="text-lg mr-3">{{ country.flag }}</span>
                        <div class="flex-1">
                          <div class="text-sm text-gray-900">{{ country.name }}</div>
                          <div class="text-xs text-gray-500">{{ country.code }}</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Phone Input -->
                <input 
                  v-model="formData.phone"
                  type="tel" 
                  placeholder="(555) 000-0000"
                  :class="[
                    'flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  ]"
                  @blur="validateField('phone')"
                  @input="clearFieldError('phone')"
                />
              </div>
              <p v-if="errors.phone" class="mt-1 text-sm text-red-500 flex items-center">
                <span class="mr-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 9.8V11H8.6V9.8H7.4ZM7.4 5V8.6H8.6V5H7.4Z" fill="#DF1C41"/>
</svg>

                </span>{{ errors.phone }}
              </p>
            </div>
          </div>

          <!-- Business Fields -->
          <div v-else-if="formData.ownerType === 'business'" class="space-y-6">
            <!-- Business Name -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Business Name</label>
              <input 
                v-model="formData.businessName"
                type="text" 
                placeholder="Enter Business Name"
                :class="[
                  'custom-input',
                  errors.businessName ? 'border-red-500' : 'border-gray-300'
                ]"
                @blur="validateField('businessName')"
                @input="clearFieldError('businessName')"
              />
              <p v-if="errors.businessName" class="mt-1 text-sm text-red-500 flex items-center">
                <span class="mr-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 9.8V11H8.6V9.8H7.4ZM7.4 5V8.6H8.6V5H7.4Z" fill="#DF1C41"/>
</svg>

                </span>{{ errors.businessName }}
              </p>
            </div>

            <!-- Business Email -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Business Email</label>
              <input 
                v-model="formData.businessEmail"
                type="email" 
                placeholder="Enter Business Email"
                :class="[
                  'custom-input',
                  errors.businessEmail ? 'border-red-500' : 'border-gray-300'
                ]"
                @blur="validateField('businessEmail')"
                @input="clearFieldError('businessEmail')"
              />
              <p v-if="errors.businessEmail" class="mt-1 text-sm text-red-500 flex items-center">
                <span class="mr-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 9.8V11H8.6V9.8H7.4ZM7.4 5V8.6H8.6V5H7.4Z" fill="#DF1C41"/>
</svg>

                </span>{{ errors.businessEmail }}
              </p>
            </div>

            <!-- Business Address -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Current Business address</label>
              <input 
                v-model="formData.businessAddress"
                type="text" 
                placeholder="Enter Current Business address"
                :class="[
                  'custom-input',
                  errors.businessAddress ? 'border-red-500' : 'border-gray-300'
                ]"
                @blur="validateField('businessAddress')"
                @input="clearFieldError('businessAddress')"
              />
              <p v-if="errors.businessAddress" class="mt-1 text-sm text-red-500 flex items-center">
                <span class="mr-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 9.8V11H8.6V9.8H7.4ZM7.4 5V8.6H8.6V5H7.4Z" fill="#DF1C41"/>
</svg>

                </span>{{ errors.businessAddress }}
              </p>
            </div>

            <!-- Business Phone Number -->
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">Phone Number</label>
              <div class="flex">
                <!-- Country Selector -->
                <div class="relative">
                  <button 
                    type="button"
                    @click="showCountryDropdown = !showCountryDropdown"
                    :class="[
                      'flex items-center px-3 py-3 border border-r-0 rounded-l-lg bg-gray-50 min-w-[80px]',
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    ]"
                  >
                    <span class="text-lg mr-2">{{ selectedCountry.flag }}</span>
                    <span class="text-sm text-gray-700">{{ selectedCountry.code }}</span>
                    <ChevronDown class="w-4 h-4 ml-1 text-gray-400" />
                  </button>
                  
                  <!-- Country Dropdown -->
                  <div v-if="showCountryDropdown" class="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    <div class="p-2">
                      <input 
                        v-model="countrySearch"
                        type="text"
                        placeholder="Search countries..."
                        class="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                      />
                    </div>
                    <div class="max-h-48 overflow-y-auto">
                      <button 
                        v-for="country in filteredCountries" 
                        :key="country.code"
                        type="button"
                        @click="selectCountry(country)"
                        class="w-full flex items-center px-3 py-2 hover:bg-gray-50 text-left"
                      >
                        <span class="text-lg mr-3">{{ country.flag }}</span>
                        <div class="flex-1">
                          <div class="text-sm text-gray-900">{{ country.name }}</div>
                          <div class="text-xs text-gray-500">{{ country.code }}</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                
                <!-- Phone Input -->
                <input 
                  v-model="formData.phone"
                  type="tel" 
                  placeholder="Enter Phone Number"
                  :class="[
                    'flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  ]"
                  @blur="validateField('phone')"
                  @input="clearFieldError('phone')"
                />
              </div>
              <p v-if="errors.phone" class="mt-1 text-sm text-red-500 flex items-center">
                <span class="mr-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8 14C4.6862 14 2 11.3138 2 8C2 4.6862 4.6862 2 8 2C11.3138 2 14 4.6862 14 8C14 11.3138 11.3138 14 8 14ZM7.4 9.8V11H8.6V9.8H7.4ZM7.4 5V8.6H8.6V5H7.4Z" fill="#DF1C41"/>
</svg>

                </span>{{ errors.phone }}
              </p>
            </div>
          </div>

          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full bg-[#2970FF] text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Processing...' : 'Continue' }}
          </button>
        </form>
      </div>

      <!-- Step 2: Email Verification -->
      <div v-else-if="currentStep === 2">
        <div class="text-center mb-8">
          <!-- Email icon illustration -->
          <div class="flex justify-center mb-6">
            <img src="@/assets/img/email-sent-illustration.png" class="h-[150px] w-[200px]" />
          </div>
          
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Email Sent</h2>
          <p class="text-[#525866] mb-4">A verification code has been sent to</p>
          <p class="font-medium text-gray-900">{{ formData.email || formData.businessEmail }}</p>
        </div>

        <!-- Verification Code Input -->
          <div class="mb-8">
                <!-- <OtpInput 
                v-model="otp" 
                :length="6" 
                @complete="handleOtpComplete" 
              /> -->

          <div class="flex justify-center items-center space-x-2 mb-6">
            <!-- First group of 3 digits -->
            <div class="flex space-x-2">
              <input 
                v-for="index in 3" 
                :key="index - 1"
                v-model="verificationCode[index - 1]"
                type="text" 
                maxlength="1"
                class="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                @input="handleCodeInput($event, index - 1)"
                @keydown="handleKeyDown($event, index - 1)"
              />
            </div>
            
            <!-- Dash separator -->
            <div class="text-2xl font-bold text-gray-400 px-2">–</div>
            
            <!-- Second group of 3 digits -->
            <div class="flex space-x-2">
              <input 
                v-for="index in 3" 
                :key="index + 2"
                v-model="verificationCode[index + 2]"
                type="text" 
                maxlength="1"
                class="w-16 h-16 text-center text-2xl font-bold border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
                @input="handleCodeInput($event, index + 2)"
                @keydown="handleKeyDown($event, index + 2)"
              />
            </div>
          </div>
    
    <div class="text-center">
      <button 
        @click="handleVerifyEmail"
        :disabled="isLoading || verificationCode.join('').length !== 6"
        class="w-full bg-[#2970FF] text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4 transition-colors duration-200"
      >
        {{ isLoading ? 'Verifying...' : 'Verify Email' }}
      </button>
      
      <p class="text-sm text-[#525866]">
        Didn't receive the code? 
        <button 
          @click="resendCode" 
          class="text-blue-600 hover:text-blue-700 underline font-medium"
        >
          Resend Code
        </button>
      </p>
    </div>
  </div>
        <!-- <div class="mb-8">
          <div class="flex justify-center space-x-3 mb-6">
            <input 
              v-for="(digit, index) in verificationCode" 
              :key="index"
              v-model="verificationCode[index]"
              type="text" 
              maxlength="1"
              class="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @input="handleCodeInput($event, index)"
              @keydown="handleKeyDown($event, index)"
            />
          </div>
          
          <div class="text-center">
            <button 
              @click="handleVerifyEmail"
              :disabled="isLoading || verificationCode.join('').length !== 6"
              class="w-full bg-[#2970FF] text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {{ isLoading ? 'Verifying...' : 'Verify Email' }}
            </button>
            
            <p class="text-sm text-[#525866]">
              Didn't receive the code? 
              <button @click="resendCode" class="text-blue-600 hover:text-blue-700">Resend Code</button>
            </p>
          </div>
        </div> -->
      </div>

      <!-- Step 3: KYC Information -->
      <div v-else-if="currentStep === 3">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">KYC Information</h2>
          <p class="text-[#525866]">Add a new property owner to the database</p>
        </div>

        <form @submit.prevent="handleStep3Submit" class="space-y-6">
          <div class="space-y-4" v-if="formData.ownerType === 'individual'">
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">NIN Number</label>
              <input 
                v-model="formData.ninNumber"
                type="text" 
                placeholder="Enter number here..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxlength="11"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">National ID/Passport</label>
               <FileUpload 
                v-model="formData.ninDocument" 
                accept="image/*,.pdf"
                @upload="onFileUpload('ninDocument', $event)" 
              />
            </div>
          </div>

          <div class="space-y-3" v-else>
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">CAC Number</label>
              <input 
                v-model="formData.cacNumber"
                type="text" 
                placeholder="Enter number here..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-900 mb-2">CAC Documents</label>
                <FileUpload 
                v-model="formData.cacDocument" 
                accept="image/*,.pdf"
                @upload="onFileUpload('cacDocument', $event)" 
              />
              <!-- <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <Upload class="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <p class="text-sm text-[#525866] mb-2">Choose a file or drag & drop it here.</p>
                <p class="text-xs text-gray-500 mb-4">JPEG, PNG, PDF, and MP4 formats, up to 50 MB.</p>
                <button 
                  type="button"
                  class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Browse File
                </button>
              </div> -->
            </div>
          </div>

          <div class="flex space-x-4">
            <button 
              type="submit"
              :disabled="isLoading"
              class="flex-1 bg-[#2970FF] text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? 'Processing...' : 'Continue' }}
            </button>
          </div>
          
          <div class="text-center">
            <button 
              type="button"
              @click="skipKYC"
              class="text-blue-600 hover:text-blue-700 text-sm"
            >
              Don't have it now. Skip
            </button>
          </div>
        </form>
      </div>

      <!-- Step 4: Signature -->
      <div v-else-if="currentStep === 4">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Signature</h2>
          <p class="text-[#525866]">Set up signature that would attached to document</p>
        </div>

        <form @submit.prevent="handleStep4Submit" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Name</label>
            <input 
              v-model="formData.signatureName"
              type="text" 
              placeholder="Enter Signatory Name"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-900 mb-2">Upload Signature</label>
            <FileUpload 
              v-model="formData.signatureFile" 
              accept="image/*,.pdf"
              @upload="onFileUpload('signatureFile', $event)" 
            />
            <!-- <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
              <Upload class="w-8 h-8 text-gray-400 mx-auto mb-4" />
              <p class="text-sm text-[#525866] mb-4">JPEG, PNG, PDF, and MP4 formats, up to 50 MB.</p>
              <button 
                type="button"
                class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Browse File
              </button>
            </div> -->
          </div>

          <button 
            type="submit"
            :disabled="isLoading"
            class="w-full bg-[#2970FF] text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Completing...' : 'Complete' }}
          </button>
          
          <div class="text-center">
            <button 
              type="button"
              @click="skipSignature"
              class="text-blue-600 hover:text-blue-700 text-sm"
            >
              Don't have it now. Skip
            </button>
          </div>
        </form>
      </div>

      <!-- Verification in Progress Modal -->
      <div v-if="showVerificationModal" class="fixed inset-0 bg-blue-400 backdrop-blur-0 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div class="text-center">
            <div class="flex justify-center mb-4">
             <img src="@/assets/img/progress-illustration.png" class="h-32 w-32" />
            </div>
            
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Verification in progress</h3>
            <p class="text-[#525866] mb-6">
              We are currently reviewing your information at this time. It would take a 24 hours
            </p>
            
            <button 
              @click="closeVerificationModal"
              class="w-full bg-[#2970FF] text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <!-- Click outside to close dropdown -->
      <div 
        v-if="showCountryDropdown" 
        @click="showCountryDropdown = false"
        class="fixed inset-0 z-5"
      ></div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useRegisterPropertyOwnerBusiness } from "@/composables/modules/auth/useRegisterPropertyOwnerBusiness"
import { useRegisterPropertyOwnerIndividual } from "@/composables/modules/auth/useRegisterPropertyOwnerIndividual"
import { useVerifyOtpEmail } from "@/composables/modules/auth/useVerifyOtpEmail"
import { useAttachSignature } from "@/composables/modules/kyc/useAttachSignature"
import { useSubmitKYC } from "@/composables/modules/kyc/useSubmitKYC"

const { loading: savingBusiness, registerPropertyOwnerBusiness } = useRegisterPropertyOwnerBusiness()
const { loading: savingIndividual, registerPropertyOwnerIndividual } = useRegisterPropertyOwnerIndividual()
const { loading, verifyOtpEmail } = useVerifyOtpEmail()
const { loading: submittingKyc, submitKY: handleSubmitKyc } = useSubmitKYC()
const { loading: attachingSignture,
    attachSignature } = useAttachSignature()
import { Home, Mail, Upload, FileCheck, ChevronDown } from 'lucide-vue-next'

definePageMeta({
  layout: false
})

const otp = ref("");

// Mock composables - you can replace these with your actual composables
const useOnboarding = () => ({
  currentStep: ref(1),
  totalSteps: ref(4),
  formData: ref({
    ownerType: 'individual',
    legalName: '',
    email: '',
    address: '',
    phone: '',
    businessName: '',
    businessEmail: '',
    businessAddress: '',
    ninNumber: '',
    ninDocument: null,  
    cacNumber: '',
    cacDocument: null, 
    signatureName: '',
    signatureFile: null 

  }),
  isLoading: ref(false),
  updateFormData: (data: any) => {},
  submitStep: async () => ({ success: true }),
  completeOnboarding: async () => ({ success: true })
})

const onFileUpload = (field: string, file: File) => {
  formData.value[field as keyof typeof formData.value] = file
}


const useAuth = () => ({
  verifyEmail: async (code: string) => ({ success: true })
})

function handleOtpComplete(value) {
  console.log("Completed OTP:", value);
  // auto-submit logic or API call
}

function verifyOtp() {
  console.log("Verifying OTP:", otp.value);
}

const { currentStep, totalSteps, formData, isLoading, updateFormData, submitStep, completeOnboarding } = useOnboarding()

// Form validation
const errors = ref<Record<string, string>>({})

// Country selection
const showCountryDropdown = ref(false)
const countrySearch = ref('')

const countries = ref([
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'Ghana', code: '+233', flag: '🇬🇭' }
])

const selectedCountry = ref(countries.value[0])

const filteredCountries = computed(() => {
  if (!countrySearch.value) return countries.value
  return countries.value.filter(country => 
    country.name.toLowerCase().includes(countrySearch.value.toLowerCase()) ||
    country.code.includes(countrySearch.value)
  )
})

const selectCountry = (country: typeof selectedCountry.value) => {
  selectedCountry.value = country
  showCountryDropdown.value = false
  countrySearch.value = ''
}

// Email verification
const verificationCode = ref(['', '', '', '', '', ''])
const showVerificationModal = ref(false)

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\(\)]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

const validateField = (fieldName: string) => {
  const value = formData.value[fieldName as keyof typeof formData.value]
  
  switch (fieldName) {
    case 'legalName':
    case 'businessName':
      if (!value || value.trim().length < 2) {
        errors.value[fieldName] = 'Please enter a valid name (minimum 2 characters)'
        return false
      }
      break
      
    case 'email':
    case 'businessEmail':
      if (!value) {
        errors.value[fieldName] = 'Email address is required'
        return false
      }
      if (!validateEmail(value)) {
        errors.value[fieldName] = 'Please enter a valid email address'
        return false
      }
      break
      
    case 'address':
    case 'businessAddress':
      if (!value || value.trim().length < 5) {
        errors.value[fieldName] = 'Please enter a valid address (minimum 5 characters)'
        return false
      }
      break
      
    case 'phone':
      if (!value) {
        errors.value[fieldName] = 'Phone number is required'
        return false
      }
      if (!validatePhone(value)) {
        errors.value[fieldName] = 'Please enter a valid phone number'
        return false
      }
      break
  }
  
  delete errors.value[fieldName]
  return true
}

const clearFieldError = (fieldName: string) => {
  if (errors.value[fieldName]) {
    delete errors.value[fieldName]
  }
}

const resetFormErrors = () => {
  errors.value = {}
}

const validateStep1Form = (): boolean => {
  const fieldsToValidate = formData.value.ownerType === 'individual' 
    ? ['legalName', 'email', 'address', 'phone']
    : ['businessName', 'businessEmail', 'businessAddress', 'phone']
  
  let isValid = true
  
  fieldsToValidate.forEach(field => {
    if (!validateField(field)) {
      isValid = false
    }
  })
  
  return isValid
}

const handleStep1Submit = async () => {
  if (!validateStep1Form()) {
    return
  }
  
  isLoading.value = true
  try {
    const result = await submitStep()
    if (result.success) {
      currentStep.value = 2
    }
  } catch (error) {
    console.error('Step 1 submission failed:', error)
  } finally {
    isLoading.value = false
  }
}

const handleVerifyEmail = async () => {
  const code = verificationCode.value.join('')
  if (code.length !== 6) return
  
  isLoading.value = true
  try {
    const { verifyEmail } = useAuth()
    const result = await verifyEmail(code)
    
    if (result.success) {
      currentStep.value = 3
    }
  } catch (error) {
    console.error('Email verification failed:', error)
  } finally {
    isLoading.value = false
  }
}

// const handleCodeInput = (event: Event, index: number) => {
//   const target = event.target as HTMLInputElement
//   const value = target.value.replace(/\D/g, '') // Only allow digits
  
//   if (value) {
//     verificationCode.value[index] = value
//     // Move to next input
//     if (index < 5) {
//       const nextInput = target.parentElement?.children[index + 1] as HTMLInputElement
//       nextInput?.focus()
//     }
//   } else {
//     verificationCode.value[index] = ''
//   }
// }

// const handleKeyDown = (event: KeyboardEvent, index: number) => {
//   if (event.key === 'Backspace' && !verificationCode.value[index] && index > 0) {
//     const prevInput = (event.target as HTMLInputElement).parentElement?.children[index - 1] as HTMLInputElement
//     prevInput?.focus()
//   }
// }

const handleCodeInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/[^0-9]/g, '') // Only allow numbers
  
  if (value.length > 0) {
    verificationCode.value[index] = value.slice(-1) // Take only the last character
    
    // Auto-focus next input
    if (index < 5) {
      const nextInput = target.parentElement?.parentElement?.querySelector(`input:nth-child(${index < 3 ? index + 2 : index - 1})`) as HTMLInputElement
      if (nextInput) {
        nextInput.focus()
      }
    }
  } else {
    verificationCode.value[index] = ''
  }
}


const handleKeyDown = (event: KeyboardEvent, index: number) => {
  const target = event.target as HTMLInputElement
  
  if (event.key === 'Backspace' && !target.value && index > 0) {
    // Focus previous input on backspace
    const prevInput = target.parentElement?.parentElement?.querySelector(`input:nth-child(${index < 3 ? index : index})`) as HTMLInputElement
    if (prevInput) {
      prevInput.focus()
    }
  }
  
  // Allow only numbers, backspace, delete, tab, and arrow keys
  if (!/[0-9]/.test(event.key) && !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault()
  }
}

const resendCode = async () => {
  // Simulate resending code
  console.log('Resending verification code...')
}

const handleStep3Submit = async () => {
  isLoading.value = true
  try {
    showVerificationModal.value = true
  } finally {
    isLoading.value = false
  }
}

const handleStep4Submit = async () => {
  isLoading.value = true
  try {
    const result = await completeOnboarding()
    if (result.success) {
      // Redirect handled by composable
    }
  } catch (error) {
    console.error('Step 4 submission failed:', error)
  } finally {
    isLoading.value = false
  }
}

const skipKYC = () => {
  currentStep.value = 4
}

const skipSignature = async () => {
  await completeOnboarding()
}

const closeVerificationModal = () => {
  showVerificationModal.value = false
  currentStep.value = 4
}
</script>