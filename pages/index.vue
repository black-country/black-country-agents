<template>
  <div class="min-h-screen bg-gray-50">

    <!-- Hero Section -->
    <section id="home" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
      <div class="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-center">
        <!-- Left Content -->
        <div class="space-y-6 lg:space-y-8">
          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-normal text-gray-900 leading-tight">
            Trust your health<br />to the best specialists
          </h1>

          <!-- Icon and Description -->
          <div class="flex items-start space-x-4">
            <div class="flex-shrink-0 mt-1">
              <svg class="w-12 h-12 lg:w-16 lg:h-16" viewBox="0 0 64 64" fill="none">
                <circle cx="16" cy="32" r="3" fill="#374151" />
                <circle cx="32" cy="32" r="3" fill="#374151" />
                <circle cx="48" cy="32" r="3" fill="#374151" />
                <rect x="14" y="20" width="4" height="24" fill="#374151" />
                <rect x="30" y="20" width="4" height="24" fill="#374151" />
                <rect x="46" y="20" width="4" height="24" fill="#374151" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-base lg:text-lg text-gray-700 leading-relaxed">
                Book appointments with the expert doctors.<br />
                Book a consultation, get diagnosed and find<br />
                the right treatment all in one place.
              </p>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-4">
            <button @click="scrollToContact"
              class="bg-gray-800 hover:bg-gray-900 text-white px-8 py-4 text-base lg:text-lg transition-colors">
              Request a call
            </button>
            <a @click="scrollToContact" href="mailto:info.doctordey@gmail.com"
              class="bg-transparent text-center hover:bg-gray-100 text-gray-800 px-8 py-4 text-base lg:text-lg border border-gray-300 transition-colors">
              Send Email
            </a>
          </div>
        </div>

        <!-- Right Content - Doctor Card -->
        <div class="relative flex justify-center lg:justify-end">
          <div class="relative w-full max-w-md lg:max-w-lg">
            <!-- Main Doctor Image Container -->
            <div class="relative bg-gray-600 w-full aspect-[3/4]">
              <img src="@/assets/img/founder.jpeg" alt="Doctor"
                class="w-full h-full object-cover" />

              <!-- Star decoration - top right OUTSIDE the image -->
              <!-- <div class="absolute -top-4 -right-10 lg:-top-6 lg:-right-16 z-10">
                <svg class="w-16 h-16 lg:w-24 lg:h-24 text-gray-900" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 0 L61 39 L100 50 L61 61 L50 100 L39 61 L0 50 L39 39 Z" />
                </svg>
              </div> -->
            </div>

            <!-- Doctor Info Card - Overlapping bottom right, extending beyond image -->
            <div
              class="absolute -bottom-8 -right-4 sm:-bottom-12 sm:-right-8 lg:-bottom-16 lg:-right-12 bg-[#1a1a1a] text-white p-6 lg:p-8 w-[calc(100%-2rem)] sm:w-[85%] lg:w-[420px] shadow-2xl z-20">
              <!-- Navigation Arrows -->
              <div class="flex justify-between items-center mb-5">
                <h2 class="text-3xl lg:text-[2.5rem] font-light tracking-wide">Dr Patrick Nwachi.</h2>
                <div class="flex space-x-1">
                  <button class="p-2 hover:bg-gray-800 transition-colors rounded">
                    <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button class="p-2 hover:bg-gray-800 transition-colors rounded">
                    <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" -viewBox="0 0 24 24"
                      stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="border-t border-gray-700 pt-5 mb-6">
                <p class="text-sm lg:text-base text-gray-300 leading-relaxed">
                  Consultant Family Physician (Fellow, Medical College of Family Medicine) with broad clinical experience and an interest in holistic medicine research.
                </p>
              </div>

              <!-- Stats Grid -->
              <div class="grid grid-cols-2 gap-x-8 gap-y-5 mb-7">
                <div>
                  <p class="text-xs lg:text-sm text-gray-400 mb-2">Average Procedure</p>
                  <p class="text-2xl lg:text-[1.75rem] font-light">30 min</p>
                </div>
                <div>
                  <p class="text-xs lg:text-sm text-gray-400 mb-2">Average rating</p>
                  <p class="text-2xl lg:text-[1.75rem] font-light">4,9</p>
                </div>
                <div>
                  <p class="text-xs lg:text-sm text-gray-400 mb-2">Average Visit</p>
                  <p class="text-2xl lg:text-[1.75rem] font-light">250$</p>
                </div>
                <div>
                  <p class="text-xs lg:text-sm text-gray-400 mb-2">Total Experience</p>
                  <p class="text-2xl lg:text-[1.75rem] font-light">12 years</p>
                </div>
              </div>

              <!-- Schedule Button -->
              <NuxtLink to="/login"
                class="block w-full text-center bg-transparent border border-gray-600 hover:bg-gray-700 text-white py-4 text-base lg:text-lg transition-colors">
                Schedule an Appointment
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section id="about" class="bg-gray-900 text-white py-16 lg:py-24 mt-32 lg:mt-48">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div class="space-y-6">
            <h2 class="text-4xl lg:text-5xl font-normal text-white leading-tight">
              About Doctor Dey Consulting
            </h2>
            <div class="border-t border-gray-700 pt-6">
              <p class="text-base lg:text-lg text-gray-300 leading-relaxed mb-4">
                Doctor Dey Consulting for Medical Services Consultations is a premier healthcare
                consulting firm dedicated to providing exceptional medical guidance and support to
                patients worldwide.
              </p>
              <p class="text-base lg:text-lg text-gray-300 leading-relaxed mb-4">
                Our mission is to bridge the gap between patients and world-class medical expertise,
                ensuring everyone has access to top-tier healthcare consultations regardless of their
                location.
              </p>
              <p class="text-base lg:text-lg text-gray-300 leading-relaxed">
                With a network of highly qualified specialists and cutting-edge telehealth technology,
                we deliver personalized care that puts your health and wellbeing first.
              </p>
            </div>
          </div>

          <div class="space-y-8">
            <div class="flex items-start space-x-6">
              <div class="flex-shrink-0">
                <svg class="w-10 h-10 text-white" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M20 4 L24 16 L20 28 L16 16 Z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl lg:text-2xl font-normal mb-2">Expert Medical Team</h3>
                <p class="text-gray-300 leading-relaxed">
                  Access to board-certified physicians and specialists with decades of combined
                  experience across multiple medical disciplines.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-6">
              <div class="flex-shrink-0">
                <svg class="w-10 h-10 text-white" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M20 4 L24 16 L20 28 L16 16 Z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl lg:text-2xl font-normal mb-2">Comprehensive Care</h3>
                <p class="text-gray-300 leading-relaxed">
                  From initial consultation to treatment planning and follow-up care, we provide
                  end-to-end medical consultation services.
                </p>
              </div>
            </div>

            <div class="flex items-start space-x-6">
              <div class="flex-shrink-0">
                <svg class="w-10 h-10 text-white" viewBox="0 0 40 40" fill="currentColor">
                  <path d="M20 4 L24 16 L20 28 L16 16 Z" />
                </svg>
              </div>
              <div>
                <h3 class="text-xl lg:text-2xl font-normal mb-2">Patient-Centered Approach</h3>
                <p class="text-gray-300 leading-relaxed">
                  Your health journey is unique. We tailor our consultations to your specific needs,
                  concerns, and medical history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div class="text-center mb-12 lg:mb-16">
        <h2 class="text-4xl lg:text-5xl font-normal text-gray-900 mb-4">Our Services</h2>
        <p class="text-lg text-gray-700 max-w-3xl mx-auto">
          Comprehensive medical consultation services designed to meet your healthcare needs
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Service Card 1 -->
        <div class="bg-white border border-gray-200 p-8 hover:shadow-lg transition-shadow">
          <div class="mb-6">
            <svg class="w-12 h-12 text-gray-900" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="32" r="20" stroke="currentColor" stroke-width="3" />
              <path d="M32 22v20M22 32h20" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            </svg>
          </div>
          <h3 class="text-2xl font-normal text-gray-900 mb-4">General Consultation</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Connect with experienced general practitioners for comprehensive health assessments, diagnosis,
            and treatment recommendations.
          </p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Initial health screening</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Preventive care guidance</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Chronic disease management</span>
            </li>
          </ul>
        </div>

        <!-- Service Card 2 -->
        <div class="bg-white border border-gray-200 p-8 hover:shadow-lg transition-shadow">
          <div class="mb-6">
            <svg class="w-12 h-12 text-gray-900" viewBox="0 0 64 64" fill="none">
              <path d="M32 12L40 28L56 32L40 36L32 52L24 36L8 32L24 28Z" fill="currentColor" />
            </svg>
          </div>
          <h3 class="text-2xl font-normal text-gray-900 mb-4">Specialist Referrals</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Access our network of specialized physicians including cardiologists, neurologists,
            endocrinologists, and more.
          </p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Expert second opinions</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Specialty consultations</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Treatment plan reviews</span>
            </li>
          </ul>
        </div>

        <!-- Service Card 3 -->
        <div class="bg-white border border-gray-200 p-8 hover:shadow-lg transition-shadow">
          <div class="mb-6">
            <svg class="w-12 h-12 text-gray-900" viewBox="0 0 64 64" fill="none">
              <rect x="16" y="16" width="32" height="32" stroke="currentColor" stroke-width="3" />
              <path d="M26 32l6 6 12-12" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
          </div>
          <h3 class="text-2xl font-normal text-gray-900 mb-4">Follow-Up Care</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Continuous monitoring and support throughout your treatment journey with scheduled check-ins and
            progress assessments.
          </p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Post-treatment monitoring</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Medication management</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Recovery tracking</span>
            </li>
          </ul>
        </div>

        <!-- Service Card 4 -->
        <div class="bg-white border border-gray-200 p-8 hover:shadow-lg transition-shadow">
          <div class="mb-6">
            <svg class="w-12 h-12 text-gray-900" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="24" r="8" stroke="currentColor" stroke-width="3" />
              <path d="M16 52c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" stroke-width="3"
                stroke-linecap="round" />
            </svg>
          </div>
          <h3 class="text-2xl font-normal text-gray-900 mb-4">Mental Health Support</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Connect with licensed therapists and psychiatrists for mental health consultations and ongoing
            psychological support.
          </p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Anxiety and depression care</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Stress management</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Counseling sessions</span>
            </li>
          </ul>
        </div>

        <!-- Service Card 5 -->
        <div class="bg-white border border-gray-200 p-8 hover:shadow-lg transition-shadow">
          <div class="mb-6">
            <svg class="w-12 h-12 text-gray-900" viewBox="0 0 64 64" fill="none">
              <path d="M32 8v48M8 32h48" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
              <circle cx="32" cy="32" r="12" stroke="currentColor" stroke-width="3" />
            </svg>
          </div>
          <h3 class="text-2xl font-normal text-gray-900 mb-4">Lab Review & Analysis</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Expert interpretation of laboratory results, imaging studies, and diagnostic tests with detailed
            explanations.
          </p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Blood work analysis</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Imaging interpretation</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Test result consultation</span>
            </li>
          </ul>
        </div>

        <!-- Service Card 6 -->
        <div class="bg-white border border-gray-200 p-8 hover:shadow-lg transition-shadow">
          <div class="mb-6">
            <svg class="w-12 h-12 text-gray-900" viewBox="0 0 64 64" fill="none">
              <rect x="12" y="20" width="40" height="28" rx="2" stroke="currentColor" stroke-width="3" />
              <path d="M12 28h40M22 20v-4M42 20v-4" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            </svg>
          </div>
          <h3 class="text-2xl font-normal text-gray-900 mb-4">Wellness Programs</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Preventive health programs focusing on nutrition, fitness, and lifestyle modifications for
            optimal wellbeing.
          </p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Nutrition counseling</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Fitness planning</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Lifestyle coaching</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Prices -->
    <section id="prices" class="bg-gray-900 text-white py-16 lg:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12 lg:mb-16">
          <h2 class="text-4xl lg:text-5xl font-normal text-white mb-4">Transparent Pricing</h2>
          <p class="text-lg text-gray-300 max-w-3xl mx-auto">Quality healthcare consultation at
            affordable rates with no hidden fees</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-gray-800 border border-gray-700 p-8 hover:border-gray-500 transition-colors">
            <h3 class="text-2xl font-normal text-white mb-2">Basic Consultation</h3>
            <div class="mb-6"><span class="text-5xl font-light">$99</span><span class="text-gray-400 ml-2">/
                session</span></div>
            <div class="border-t border-gray-700 pt-6 mb-8">
              <ul class="space-y-4 text-gray-300">
                <li class="flex items-start"><svg class="w-6 h-6 mr-3 flex-shrink-0 text-white" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg><span>30-minute consultation</span></li>
                <li class="flex items-start"><svg class="w-6 h-6 mr-3 flex-shrink-0 text-white" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg><span>General practitioner access</span></li>
                <li class="flex items-start"><svg class="w-6 h-6 mr-3 flex-shrink-0 text-white" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg><span>Written summary report</span></li>
                <li class="flex items-start"><svg class="w-6 h-6 mr-3 flex-shrink-0 text-white" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg><span>Email follow-up support</span></li>
              </ul>
            </div>
            <button @click="scrollToContact"
              class="w-full bg-transparent border border-gray-600 hover:bg-gray-700 text-white py-4 text-lg transition-colors">Get
              Started</button>
          </div>
          <div class="bg-white text-gray-900 p-8 transform lg:scale-105 shadow-xl">
            <div class="inline-block bg-gray-900 text-white px-4 py-1 text-sm mb-4">MOST POPULAR
            </div>
            <h3 class="text-2xl font-normal mb-2">Professional Care</h3>
            <div class="mb-6"><span class="text-5xl font-light">$199</span><span class="text-gray-600 ml-2">/
                session</span></div>
            <div class="border-t border-gray-200 pt-6 mb-8">
              <ul class="space-y-4 text-gray-700">
                <li class="flex items-start"><svg class="w-6 h-6 mr-3 flex-shrink-0 text-gray-900" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg><span>60-minute consultation</span></li>
                <li class="flex items-start"><svg class="w-6 h-6 mr-3 flex-shrink-0 text-gray-900" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg><span>Specialist physician access</span></li>
                <li class="flex items-start"><svg class="w-6 h-6 mr-3 flex-shrink-0 text-gray-900" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg><span>Detailed treatment plan</span></li>
                <li class="flex items-start"><svg class="w-6 h-6 mr-3 flex-shrink-0 text-gray-900" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg><span>Priority scheduling</span></li>
              </ul>
            </div>
            <button @click="scrollToContact"
              class="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 text-lg transition-colors">Get
              Started</button>
          </div>
          <div class="bg-gray-800 border border-gray-700 p-8 hover:border-gray-500 transition-colors">
            <h3 class="text-2xl font-normal text-white mb-2">Premium Package</h3>
            <div class="mb-6"><span class="text-5xl font-light">$349</span><span class="text-gray-400 ml-2">/
                session</span></div>
            <div class="border-t border-gray-700 pt-6 mb-8">
              <ul class="space-y-4 text-gray-300">
                <li class="flex items-start"><svg class="w-6 h-6 mr-3 flex-shrink-0 text-white" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg><span>90-minute consultation</span></li>
                <li class="flex items-start"><svg class="w-6 h-6 mr-3 flex-shrink-0 text-white" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg><span>Multi-specialist team</span></li>
                <li class="flex items-start"><svg class="w-6 h-6 mr-3 flex-shrink-0 text-white" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg><span>Comprehensive care coordination</span></li>
                <li class="flex items-start"><svg class="w-6 h-6 mr-3 flex-shrink-0 text-white" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg><span>24/7 support access</span></li>
              </ul>
            </div>
            <button @click="scrollToContact"
              class="w-full bg-transparent border border-gray-600 hover:bg-gray-700 text-white py-4 text-lg transition-colors">Get
              Started</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div class="space-y-6">
          <h2 class="text-4xl lg:text-5xl font-normal text-gray-900 leading-tight">Get in Touch
          </h2>
          <div class="border-t border-gray-300 pt-6">
            <p class="text-base lg:text-lg text-gray-700 leading-relaxed mb-6">Ready to take
              control of your health? Contact us today to schedule your consultation with our
              expert medical team.</p>
            <div class="space-y-4">
              <div class="flex items-start space-x-4">
                <svg class="w-6 h-6 text-gray-900 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p class="text-gray-900 font-medium">Email</p>
                  <p class="text-gray-700">info.doctordey@gmail.com</p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <svg class="w-6 h-6 text-gray-900 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p class="text-gray-900 font-medium">Phone</p>
                  <p class="text-gray-700">+234 803 408 0064</p>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <svg class="w-6 h-6 text-gray-900 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p class="text-gray-900 font-medium">Hours</p>
                  <p class="text-gray-700">Mon-Fri: 8am - 8pm<br />Sat-Sun: 10am - 6pm</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white border border-gray-200 p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div><label class="block text-sm font-medium text-gray-900 mb-2">Full
                Name</label><input v-model="form.name" type="text" required
                class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="John Doe" /></div>
            <div><label class="block text-sm font-medium text-gray-900 mb-2">Email</label><input v-model="form.email"
                type="email" required
                class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="john@example.com" /></div>
            <div><label class="block text-sm font-medium text-gray-900 mb-2">Phone</label><input v-model="form.phone"
                type="tel" required
                class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="+1 (555) 000-0000" /></div>
            <div><label class="block text-sm font-medium text-gray-900 mb-2">Message</label><textarea
                v-model="form.message" required rows="4"
                class="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-gray-900 transition-colors resize-none"
                placeholder="Tell us about your healthcare needs..."></textarea></div>
            <button type="submit" :disabled="loading"
              class="w-full bg-gray-900 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-25 text-white py-4 text-lg transition-colors">{{loading ? 'processing' : 'Send Message'}}
  </button>
          </form>
        </div>
      </div>
    </section>
    <!-- Footer -->


  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useUser } from '@/composables/modules/auth/user';
import { useCreateEnquiry } from "@/composables/modules/enquiry/useCreateEnquiry"

const { createEnquiry, loading } = useCreateEnquiry()

const mobileMenuOpen = ref(false)
const form = reactive({
  name: '',
  email: '',
  phone: '',
  message: ''
})



const scrollToContact = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

const handleSubmit = async () => {
  await createEnquiry(form).then(() => {
       form.name = ''
  form.email = ''
  form.phone = ''
  form.message = ''
  })

}
</script>
