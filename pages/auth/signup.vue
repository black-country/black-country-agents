<template>
  <div>
    <NuxtLayout name="auth">
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

      <div v-if="currentStep === 1">
        <div class="text-center mb-8">
          <h2 class="text-2xl font-bold text-[#0C111D] mb-2">
            {{ formData.ownerType === 'business' ? 'Sign up as a business owner' : 'Sign up as an owner' }}
          </h2>
          <p class="text-[#525866]">
            {{ formData.ownerType === 'business' ? 'Add a new business property owner to the database' : 'Add a new property owner to the database' }}
          </p>
        </div>

        <form @submit.prevent="handleStep1Submit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-[#0C111D] mb-3">Owner Type</label>
            <div class="flex space-x-4">
              <label class="flex items-center cursor-pointer">
                <input 
                  v-model="formData.ownerType" 
                  type="radio" 
                  value="individual" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  @change="resetFormErrors"
                />
                <span class="ml-2 text-sm text-[#0C111D]">Individual</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input 
                  v-model="formData.ownerType" 
                  type="radio" 
                  value="business" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  @change="resetFormErrors"
                />
                <span class="ml-2 text-sm text-[#0C111D]">Business</span>
              </label>
            </div>
          </div>

           
          <div v-if="formData.ownerType === 'individual'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-[#0C111D] mb-2">Legal Name</label>
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
                <span class="mr-1">⚠️</span>{{ errors.legalName }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-[#0C111D] mb-2">Email Address</label>
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
                <span class="mr-1">⚠️</span>{{ errors.email }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-[#0C111D] mb-2">Current residential address</label>
              <input 
                ref="addressInput"
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
                <span class="mr-1">⚠️</span>{{ errors.address }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-[#0C111D] mb-2">Phone Number</label>
              <div class="flex">
                <div class="relative">
                  <button 
                    type="button"
                    @click="showCountryDropdown = !showCountryDropdown"
                    :class="[
                      'flex items-center outline-none px-4 py-3.5 focus:border focus:border-[#2970FF] rounded-l-xl bg-[#1A1A1B09]  focus:bg-whit min-w-[80px]',
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    ]"
                  >
                    <span class="text-lg mr-2">{{ selectedCountry.flag }}</span>
                    <span class="text-sm text-gray-700">{{ selectedCountry.code }}</span>
                    <ChevronDown class="w-4 h-4 ml-1 text-gray-400" />
                  </button>
                  
                  <div v-if="showCountryDropdown" class="absolute top-full left-0 mt-1 w-64 bg-white border-[0.5px] border-gray-100 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    <div class="p-2">
                      <input 
                        v-model="countrySearch"
                        type="text"
                        placeholder="Search countries..."
                        class="w-full px-3 py-2 border-[0.5px] border-gray-100 rounded text-sm"
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
                          <div class="text-sm text-[#0C111D]">{{ country.name }}</div>
                          <div class="text-xs text-gray-500">{{ country.code }}</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                
                <input 
                  v-model="formData.phone"
                  type="tel" 
                  placeholder="(555) 000-0000"
                  :class="[
                    'flex-1 outline-none focus:border focus:border-[#2970FF] rounded-r-xl bg-[#1A1A1B09]  focus:bg-white pl-4',
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  ]"
                  @blur="validateField('phone')"
                  @input="clearFieldError('phone')"
                />
              </div>
              <p v-if="errors.phone" class="mt-1 text-sm text-red-500 flex items-center">
                <span class="mr-1">⚠️</span>{{ errors.phone }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-[#0C111D] mb-2">Password</label>
              <input 
                v-model="formData.password"
                type="password" 
                placeholder="Enter password"
                :class="[
                  'custom-input',
                  errors.password ? 'border-red-500' : 'border-gray-300'
                ]"
                @blur="validateField('password')"
                @input="clearFieldError('password')"
              />
              <p v-if="errors.password" class="mt-1 text-sm text-red-500 flex items-center">
                <span class="mr-1">⚠️</span>{{ errors.password }}
              </p>
            </div>
          </div>

           <!-- Business Fields  -->
          <div v-else-if="formData.ownerType === 'business'" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-[#0C111D] mb-2">Business Name</label>
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
                <span class="mr-1">⚠️</span>{{ errors.businessName }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-[#0C111D] mb-2">Business Email</label>
              <input 
                v-model="formData.email"
                type="email" 
                placeholder="Enter Business Email"
                :class="[
                  'custom-input',
                  errors.email ? 'border-red-500' : 'border-gray-300'
                ]"
                @blur="validateField('email')"
                @input="clearFieldError('email')"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-500 flex items-center">
                <span class="mr-1">⚠️</span>{{ errors.email }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-[#0C111D] mb-2">Current Business address</label>
              <input 
                ref="businessAddressInput"
                v-model="formData.address"
                type="text" 
                placeholder="Enter Current Business address"
                :class="[
                  'custom-input',
                  errors.address ? 'border-red-500' : 'border-gray-300'
                ]"
                @blur="validateField('address')"
                @input="clearFieldError('address')"
              />
              <p v-if="errors.address" class="mt-1 text-sm text-red-500 flex items-center">
                <span class="mr-1">⚠️</span>{{ errors.address }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-[#0C111D] mb-2">Phone Number</label>
              <div class="flex">
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
                          <div class="text-sm text-[#0C111D]">{{ country.name }}</div>
                          <div class="text-xs text-gray-500">{{ country.code }}</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
                
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
                <span class="mr-1">⚠️</span>{{ errors.phone }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-[#0C111D] mb-2">Password</label>
              <input 
                v-model="formData.password"
                type="password" 
                placeholder="Enter password"
                :class="[
                  'custom-input',
                  errors.password ? 'border-red-500' : 'border-gray-300'
                ]"
                @blur="validateField('password')"
                @input="clearFieldError('password')"
              />
              <p v-if="errors.password" class="mt-1 text-sm text-red-500 flex items-center">
                <span class="mr-1">⚠️</span>{{ errors.password }}
              </p>
            </div>
          </div>

          <button 
            type="submit"
            :disabled="savingBusiness || savingIndividual"
            class="w-full bg-[#2970FF] text-white py-3 px-4 text-sm rounded-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ (savingBusiness || savingIndividual) ? 'Processing...' : 'Continue' }}
          </button>
        </form>
      </div>

      <div v-else-if="currentStep === 2">
        <div class="text-center mb-8">
          <div class="flex justify-center mb-6">
            <div class="h-32 w-32  flex items-center justify-center">
              <img src="@/assets/img/email-verification.png" class="h-[120px] w-[160px]" />
            </div>
          </div>
          
          <h2 class="text-xl font-bold text-[#0C111D] mb-2">Email Sent</h2>
          <p class="text-[#525866] text-sm mb-4">A verification code has been sent to</p>
          <p class="font-medium text-[#0C111D]">{{ formData.email }}</p>
        </div>

        <div class="mb-8">
          <div class="flex justify-center items-center space-x-2 mb-6">
            <div class="flex space-x-2">
              <input 
                v-for="index in 3" 
                :key="index - 1"
                v-model="verificationCode[index - 1]"
                type="text" 
                maxlength="1"
                class="w-16 h-16 text-center text-2xl font-bold border-[0.5px] border-[#E2E4E9] rounded-2xl focus:border  focus:border-primary outline-none transition-all duration-200"
                @input="handleCodeInput($event, index - 1)"
                @keydown="handleKeyDown($event, index - 1)"
              />
            </div>
            
            <div class="text-2xl font-bold text-gray-400 px-2">–</div>
            
            <div class="flex space-x-2">
              <input 
                v-for="index in 3" 
                :key="index + 2"
                v-model="verificationCode[index + 2]"
                type="text" 
                maxlength="1"
                class="w-16 h-16 text-center text-2xl font-bold border-[0.5px] border-[#E2E4E9] rounded-2xl focus:border  focus:border-primary outline-none transition-all duration-200"
                @input="handleCodeInput($event, index + 2)"
                @keydown="handleKeyDown($event, index + 2)"
              />
            </div>
          </div>
    
          <div class="text-center pt-4">
            <button 
              @click="handleVerifyEmail"
              :disabled="loading || verificationCode.join('').length !== 6"
              class="w-full bg-[#2970FF] text-white py-3 px-4 text-sm rounded-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed mb-4 transition-colors duration-200"
            >
              {{ loading ? 'Verifying...' : 'Verify Email' }}
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
      </div>

      <div v-else-if="currentStep === 3">
        <div class="text-center mb-8">
          <h2 class="text-xl font-bold text-[#0C111D] mb-2">KYC Information</h2>
          <p class="text-[#525866] text-sm">Add a new property owner to the database</p>
        </div>

        <form @submit.prevent="handleStep3Submit" class="space-y-4">
          <div class="space-y-4" v-if="formData.ownerType === 'individual'">
            <div>
              <label class="block text-sm font-medium text-[#0C111D] mb-2">NIN Number</label>
              <input 
                v-model="formData.ninNumber"
                type="text" 
                placeholder="Enter number here..."
                class="custom-input"
                maxlength="11"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-[#0C111D] mb-2">National ID/Passport</label>
              <div class="border-[0.5px] border-dashed border-[#CDD0D5] rounded-xl p-8 text-center transition-colors">
                <input 
                  ref="ninFileInput"
                  type="file" 
                  accept="image/*,.pdf"
                  class="hidden"
                  @change="handleFileUpload($event, 'ninDocument')"
                />
                <Upload class="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <p v-if="!formData.ninDocument" class="text-sm text-[#525866] mb-2">Choose a file or drag & drop it here.</p>
                <p v-else class="text-sm text-green-600 mb-2">✓ {{ formData.ninDocument.name }}</p>
                <p class="text-xs text-[#868C98] mb-4">JPEG, PNG, PDF formats, up to 50 MB.</p>
                <button 
                  type="button"
                  @click="$refs.ninFileInput.click()"
                  class="px-4 py-2 bg-white border border-[#E2E4E9] rounded-lg text-sm font-medium text-[#525866] hover:bg-gray-50"
                >
                  Browse File
                </button>
              </div>
            </div>
          </div>

          <div class="space-y-3" v-else>
            <div>
              <label class="block text-sm font-medium text-[#0C111D] mb-2">CAC Number</label>
              <input 
                v-model="formData.cacNumber"
                type="text" 
                placeholder="Enter number here..."
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-[#0C111D] mb-2">CAC Documents</label>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                <input 
                  ref="cacFileInput"
                  type="file" 
                  accept="image/*,.pdf"
                  class="hidden"
                  @change="handleFileUpload($event, 'cacDocument')"
                />
                <Upload class="w-8 h-8 text-gray-400 mx-auto mb-4" />
                <p v-if="!formData.cacDocument" class="text-sm text-[#525866] mb-2">Choose a file or drag & drop it here.</p>
                <p v-else class="text-sm text-green-600 mb-2">✓ {{ formData.cacDocument.name }}</p>
                <p class="text-xs text-gray-500 mb-4">JPEG, PNG, PDF formats, up to 50 MB.</p>
                <button 
                  type="button"
                  @click="$refs.cacFileInput.click()"
                  class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Browse File
                </button>
              </div>
            </div>
          </div>

          <div class="flex space-x-4">
            <button 
              type="submit"
              :disabled="submittingKyc"
              class="flex-1 bg-[#2970FF] text-white py-3 px-4 text-sm rounded-xl font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ submittingKyc ? 'Processing...' : 'Continue' }}
            </button>
          </div>
          
          <div class="text-center">
            <button 
              type="button"
              @click="skipKYC"
              class="text-blue-600 hover:text-blue-700 text-sm"
            >
              <span class="text-[#31353F]">Don't have it now</span>. Skip
            </button>
          </div>
        </form>
      </div>

      <div v-else-if="currentStep === 4">
        <div class="text-center mb-8">
          <h2 class="text-xl font-bold text-[#0C111D] mb-2">Signature</h2>
          <p class="text-[#525866] text-sm">Set up signature that would attached to document</p>
        </div>

        <form @submit.prevent="handleStep4Submit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-[#0C111D] mb-2">Name</label>
            <input 
              v-model="formData.signatureName"
              type="text" 
              placeholder="Enter Signatory Name"
              class="custom-input"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-[#0C111D] mb-3">Signature Method</label>
            <div class="flex space-x-4 mb-4">
              <label class="flex items-center cursor-pointer">
                <input 
                  v-model="signatureMethod" 
                  type="radio" 
                  value="upload" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span class="ml-2 text-sm text-[#0C111D]">Upload File</span>
              </label>
              <label class="flex items-center cursor-pointer">
                <input 
                  v-model="signatureMethod" 
                  type="radio" 
                  value="draw" 
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <span class="ml-2 text-sm text-[#0C111D]">Draw Signature</span>
              </label>
            </div>

            <div v-if="signatureMethod === 'upload'">
              <div class="border-[0.5px] border-dashed border-[#CDD0D5] rounded-xl p-8 text-center transition-colors">
                <input 
                  ref="signatureFileInput"
                  type="file" 
                  accept="image/*,.pdf"
                  class="hidden"
                  @change="handleFileUpload($event, 'signatureFile')"
                />
           <div class="flex justify-center items-center">
                 <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 12.5274L16.3187 16.3452L15.0452 17.6187L13.4 15.9735V21H11.6V15.9717L9.95479 17.6187L8.68129 16.3452L12.5 12.5274ZM12.5 3C14.0453 3.00007 15.5366 3.568 16.6906 4.59581C17.8445 5.62361 18.5805 7.03962 18.7586 8.5746C19.8784 8.87998 20.8553 9.56919 21.5186 10.5218C22.1818 11.4744 22.4892 12.6297 22.387 13.786C22.2849 14.9422 21.7796 16.0257 20.9596 16.8472C20.1396 17.6687 19.0569 18.1759 17.9009 18.2802V16.4676C18.315 16.4085 18.7133 16.2674 19.0723 16.0527C19.4314 15.8379 19.744 15.5539 19.9921 15.217C20.2402 14.8801 20.4186 14.4972 20.5171 14.0906C20.6155 13.6839 20.632 13.2618 20.5655 12.8488C20.4991 12.4357 20.351 12.0401 20.1299 11.6849C19.9089 11.3297 19.6193 11.0221 19.2781 10.78C18.9369 10.538 18.5508 10.3663 18.1425 10.2751C17.7343 10.1838 17.3119 10.1748 16.9001 10.2486C17.041 9.5924 17.0334 8.91297 16.8778 8.2601C16.7222 7.60722 16.4224 6.99743 16.0006 6.47538C15.5788 5.95333 15.0455 5.53225 14.4399 5.24298C13.8343 4.9537 13.1716 4.80357 12.5004 4.80357C11.8293 4.80357 11.1666 4.9537 10.561 5.24298C9.95533 5.53225 9.42207 5.95333 9.00025 6.47538C8.57843 6.99743 8.27873 7.60722 8.12309 8.2601C7.96746 8.91297 7.95984 9.5924 8.10079 10.2486C7.27968 10.0944 6.43095 10.2727 5.7413 10.7443C5.05165 11.2159 4.57759 11.9421 4.42339 12.7632C4.26919 13.5843 4.4475 14.433 4.91908 15.1227C5.39065 15.8123 6.11688 16.2864 6.93799 16.4406L7.09999 16.4676V18.2802C5.9439 18.1761 4.86116 17.669 4.04101 16.8476C3.22087 16.0261 2.71548 14.9426 2.6132 13.7863C2.51091 12.6301 2.81822 11.4747 3.48142 10.522C4.14462 9.56934 5.12153 8.88005 6.24139 8.5746C6.41933 7.03954 7.15525 5.62342 8.30921 4.59558C9.46317 3.56774 10.9546 2.99988 12.5 3Z" fill="#525866"/>
                    </svg>
           </div>
                <p v-if="!formData.signatureFile" class="text-sm font-medium text-[#525866] mt-4 mb-2">Upload Signature</p>
                <p v-if="!formData.signatureFile" class="text-xs text-[#525866] mb-4">JPEG, PNG, PDF formats, up to 50 MB.</p>
                <p v-else class="text-sm text-green-600 mb-4">✓ {{ formData.signatureFile.name }}</p>
                <button 
                  type="button"
                  @click="$refs.signatureFileInput.click()"
                  class="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Browse File
                </button>
              </div>
            </div>

            <div v-else-if="signatureMethod === 'draw'">
              <div class="border-[0.5px] border-gray-100 rounded-lg p-4 bg-white">
                <canvas 
                  ref="signatureCanvas"
                  width="600"
                  height="200"
                  class="w-full border-[0.5px] border-gray-100 rounded cursor-crosshair"
                  @mousedown="startDrawing"
                  @mousemove="draw"
                  @mouseup="stopDrawing"
                  @mouseleave="stopDrawing"
                  @touchstart="startDrawing"
                  @touchmove="draw"
                  @touchend="stopDrawing"
                ></canvas>
                <div class="flex justify-end mt-2">
                  <button 
                    type="button"
                    @click="clearSignature"
                    class="px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-300 rounded hover:bg-red-50"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            :disabled="attachingSignture"
            class="w-full bg-[#2970FF] text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ attachingSignture ? 'Completing...' : 'Complete' }}
          </button>
          
          <div class="text-center">
            <button 
              type="button"
              @click="skipSignature"
              class="text-blue-600 hover:text-blue-700 text-sm"
            >
              <span class="text-[#31353F] font-medium">Don't have it now.</span> Skip
            </button>
          </div>
        </form>
      </div>

      <div v-if="showVerificationModal" class="fixed inset-0 bg-blue-400 backdrop-blur-0 bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
          <div class="text-center">
            <div class="flex justify-center mb-4">
              <div class="h-32 w-32 bg-green-100 rounded-full flex items-center justify-center">
                <img src="@/assets/img/success.png" class="h-[160px] w-[160px]" />
              </div>
            </div>
            
            <h3 class="text-lg font-semibold text-[#0C111D] mb-2">Verification in progress</h3>
            <p class="text-[#525866] text-sm mb-6">
              We are currently reviewing your information at this time. It would take a 24 hours
            </p>
            
            <button 
              @click="closeVerificationModal"
              class="w-full bg-[#2970FF] text-white text-sm py-3 px-4 rounded-xl font-medium hover:bg-blue-700"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      <div 
        v-if="showCountryDropdown" 
        @click="showCountryDropdown = false"
        class="fixed inset-0 z-5"
      ></div>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useRegisterPropertyOwnerBusiness } from "@/composables/modules/auth/useRegisterPropertyOwnerBusiness"
import { useRegisterPropertyOwnerIndividual } from "@/composables/modules/auth/useRegisterPropertyOwnerIndividual"
import { useVerifyOtpEmail } from "@/composables/modules/auth/useVerifyOtpEmail"
import { useAttachSignature } from "@/composables/modules/kyc/useAttachSignature"
import { useSubmitKYC } from "@/composables/modules/kyc/useSubmitKYC"
import { Mail, Upload, FileCheck, ChevronDown } from 'lucide-vue-next'
// import { definePageMeta, useRuntimeConfig } from '#app'

definePageMeta({
  layout: false
})

const router = useRouter()

const { loading: savingBusiness, registerPropertyOwnerBusiness } = useRegisterPropertyOwnerBusiness()
const { loading: savingIndividual, registerPropertyOwnerIndividual } = useRegisterPropertyOwnerIndividual()
const { loading, verifyOtpEmail } = useVerifyOtpEmail()
const { loading: submittingKyc, submitKYC } = useSubmitKYC()
const { loading: attachingSignture, attachSignature } = useAttachSignature()

// Step management
const currentStep = ref(4)
const totalSteps = ref(4)

// Form data
const formData = ref({
  ownerType: 'individual',
  legalName: '',
  email: '',
  address: '',
  phone: '',
  password: '',
  businessName: '',
  ninNumber: '',
  ninDocument: null as File | null,
  cacNumber: '',
  cacDocument: null as File | null,
  signatureName: '',
  signatureFile: null as File | null
})

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

const selectedCountry = ref(countries.value[2]) // Default to Nigeria

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

// Signature
const signatureMethod = ref('upload')
const signatureCanvas = ref<HTMLCanvasElement | null>(null)
const isDrawing = ref(false)
const signatureContext = ref<CanvasRenderingContext2D | null>(null)

// Google Places Autocomplete
const addressInput = ref<HTMLInputElement | null>(null)
const businessAddressInput = ref<HTMLInputElement | null>(null)
let autocomplete: any = null
let businessAutocomplete: any = null

onMounted(() => {
  const config = useRuntimeConfig()
  
  // Load Google Maps API
  if (typeof window !== 'undefined' && !window.google) {
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAEbdwDP8p8hb1toMMmVuK-Tnzb_LX-TGw&libraries=places`
    // script.src = `https://maps.googleapis.com/maps/api/js?key=${config.public.googleMapsApiKey}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = initAutocomplete
    document.head.appendChild(script)
  } else if (window.google) {
    initAutocomplete()
  }

  // Initialize signature canvas
  nextTick(() => {
    if (signatureCanvas.value) {
      signatureContext.value = signatureCanvas.value.getContext('2d')
      if (signatureContext.value) {
        signatureContext.value.strokeStyle = '#000'
        signatureContext.value.lineWidth = 2
        signatureContext.value.lineCap = 'round'
      }
    }
  })
})

const initAutocomplete = () => {
  const config = useRuntimeConfig()
  
  if (addressInput.value && window.google) {
    autocomplete = new window.google.maps.places.Autocomplete(addressInput.value, {
      types: ['address']
    })
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace()
      if (place.formatted_address) {
        formData.value.address = place.formatted_address
      }
    })
  }

  if (businessAddressInput.value && window.google) {
    businessAutocomplete = new window.google.maps.places.Autocomplete(businessAddressInput.value, {
      types: ['address']
    })
    businessAutocomplete.addListener('place_changed', () => {
      const place = businessAutocomplete.getPlace()
      if (place.formatted_address) {
        formData.value.address = place.formatted_address
      }
    })
  }
}

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-$$$$]+$/
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}

const validateField = (fieldName: string) => {
  const value = formData.value[fieldName as keyof typeof formData.value]
  
  switch (fieldName) {
    case 'legalName':
    case 'businessName':
      if (!value || (typeof value === 'string' && value.trim().length < 2)) {
        errors.value[fieldName] = 'Please enter a valid name (minimum 2 characters)'
        return false
      }
      break
      
    case 'email':
      if (!value) {
        errors.value[fieldName] = 'Email address is required'
        return false
      }
      if (typeof value === 'string' && !validateEmail(value)) {
        errors.value[fieldName] = 'Please enter a valid email address'
        return false
      }
      break
      
    case 'address':
      if (!value || (typeof value === 'string' && value.trim().length < 5)) {
        errors.value[fieldName] = 'Please enter a valid address (minimum 5 characters)'
        return false
      }
      break
      
    case 'phone':
      if (!value) {
        errors.value[fieldName] = 'Phone number is required'
        return false
      }
      if (typeof value === 'string' && !validatePhone(value)) {
        errors.value[fieldName] = 'Please enter a valid phone number'
        return false
      }
      break

    case 'password':
      if (!value || (typeof value === 'string' && value.length < 6)) {
        errors.value[fieldName] = 'Password must be at least 6 characters'
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
    ? ['legalName', 'email', 'address', 'phone', 'password']
    : ['businessName', 'email', 'address', 'phone', 'password']
  
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
  
  try {
    if (formData.value.ownerType === 'individual') {
      // Call individual registration API
      const payload = {
        app: 'property-owner',
        email: formData.value.email,
        phone: `${selectedCountry.value.code}${formData.value.phone}`,
        password: formData.value.password,
        address: formData.value.address,
        propertyOwnerType: 'individual',
        legalName: formData.value.legalName
      }
      
      const result = await registerPropertyOwnerIndividual(payload)
      
      if (result) {
        currentStep.value = 2
      }
    } else {
      // Call business registration API
      const payload = {
        app: 'property-owner',
        email: formData.value.email,
        phone: `${selectedCountry.value.code}${formData.value.phone}`,
        password: formData.value.password,
        propertyOwnerType: 'business',
        businessName: formData.value.businessName,
        address: formData.value.address
      }
      
      const result = await registerPropertyOwnerBusiness(payload)
      
      if (result) {
        currentStep.value = 2
      }
    }
  } catch (error) {
    console.error('Step 1 submission failed:', error)
  }
}

const handleVerifyEmail = async () => {
  const code = verificationCode.value.join('')
  if (code.length !== 6) return
  
  try {
    const payload = {
      email: formData.value.email,
      otp: code,
      type: 'email_verification',
      app: 'customer'
    }
    
    const result = await verifyOtpEmail(payload)
    
    if (result) {
      currentStep.value = 3
    }
  } catch (error) {
    console.error('Email verification failed:', error)
  }
}

const handleCodeInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  const value = target.value.replace(/[^0-9]/g, '')
  
  if (value.length > 0) {
    verificationCode.value[index] = value.slice(-1)
    
    // Auto-focus next input
    if (index < 5) {
      const inputs = document.querySelectorAll('input[type="text"][maxlength="1"]')
      const nextInput = inputs[index + 1] as HTMLInputElement
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
    const inputs = document.querySelectorAll('input[type="text"][maxlength="1"]')
    const prevInput = inputs[index - 1] as HTMLInputElement
    if (prevInput) {
      prevInput.focus()
    }
  }
  
  if (!/[0-9]/.test(event.key) && !['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault()
  }
}

const resendCode = async () => {
  console.log('Resending verification code...')
  // You can call the registration API again to resend OTP
}

const handleFileUpload = (event: Event, fieldName: string) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  
  if (file) {
    formData.value[fieldName as keyof typeof formData.value] = file as any
  }
}

const handleStep3Submit = async () => {
  try {
    if (formData.value.ownerType === 'individual') {
      if (!formData.value.ninDocument || !formData.value.ninNumber) {
        alert('Please provide NIN number and document')
        return
      }

      const formDataPayload = new FormData()
      formDataPayload.append('file', formData.value.ninDocument)
      formDataPayload.append('kycType', 'NIN')
      formDataPayload.append('fieldName', 'ninDocument')

      const result = await submitKYC(formDataPayload)
      
      if (result) {
        showVerificationModal.value = true
      }
    } else {
      if (!formData.value.cacDocument || !formData.value.cacNumber) {
        alert('Please provide CAC number and document')
        return
      }

      const formDataPayload = new FormData()
      formDataPayload.append('file', formData.value.cacDocument)
      formDataPayload.append('kycType', 'CAC')
      formDataPayload.append('fieldName', 'cacDocument')

      const result = await submitKYC(formDataPayload)
      
      if (result) {
        showVerificationModal.value = true
      }
    }
  } catch (error) {
    console.error('Step 3 submission failed:', error)
  }
}

const startDrawing = (event: MouseEvent | TouchEvent) => {
  isDrawing.value = true
  const canvas = signatureCanvas.value
  const ctx = signatureContext.value
  
  if (!canvas || !ctx) return
  
  const rect = canvas.getBoundingClientRect()
  const x = 'touches' in event ? event.touches[0].clientX - rect.left : event.clientX - rect.left
  const y = 'touches' in event ? event.touches[0].clientY - rect.top : event.clientY - rect.top
  
  ctx.beginPath()
  ctx.moveTo(x, y)
}

const draw = (event: MouseEvent | TouchEvent) => {
  if (!isDrawing.value) return
  
  const canvas = signatureCanvas.value
  const ctx = signatureContext.value
  
  if (!canvas || !ctx) return
  
  const rect = canvas.getBoundingClientRect()
  const x = 'touches' in event ? event.touches[0].clientX - rect.left : event.clientX - rect.left
  const y = 'touches' in event ? event.touches[0].clientY - rect.top : event.clientY - rect.top
  
  ctx.lineTo(x, y)
  ctx.stroke()
}

const stopDrawing = () => {
  isDrawing.value = false
}

const clearSignature = () => {
  const canvas = signatureCanvas.value
  const ctx = signatureContext.value
  
  if (!canvas || !ctx) return
  
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

const handleStep4Submit = async () => {
  if (!formData.value.signatureName) {
    alert('Please enter signatory name')
    return
  }

  try {
    let signatureFile: File | null = null

    if (signatureMethod.value === 'upload') {
      if (!formData.value.signatureFile) {
        alert('Please upload a signature file')
        return
      }
      signatureFile = formData.value.signatureFile
    } else {
      // Convert canvas to blob
      const canvas = signatureCanvas.value
      if (!canvas) return

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/png')
      })

      if (!blob) {
        alert('Please draw your signature')
        return
      }

      signatureFile = new File([blob], 'signature.png', { type: 'image/png' })
    }

    const formDataPayload = new FormData()
    formDataPayload.append('file', signatureFile)
    formDataPayload.append('category', 'general')

    const result = await attachSignature(formDataPayload)
    
    if (result) {
      // Redirect to dashboard or success page
      router.push('/auth/login')
    }
  } catch (error) {
    console.error('Step 4 submission failed:', error)
  }
}

const skipKYC = () => {
  currentStep.value = 4
}

const skipSignature = async () => {
  router.push('/auth/login')
}

const closeVerificationModal = () => {
  showVerificationModal.value = false
  currentStep.value = 4
}
</script>

<style scoped>
/* Add any custom styles here */
</style>
