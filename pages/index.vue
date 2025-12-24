<template>
  <div class="min-h-screen bg-gray-50">

     <!-- Hero Section -->
    <section id="home" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <!-- Left Content -->
        <div class="space-y-8 lg:space-y-10">
          <div class="space-y-4">
            <div class="inline-block">
              <span class="text-sm font-medium text-gray-600 tracking-wider uppercase bg-gray-200 px-4 py-2 rounded-full">
                Premium Healthcare Consulting
              </span>
            </div>
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 leading-tight">
              Trust your health<br />
              <span class="font-normal text-gray-800">to the best specialist</span><br />
              <span class="font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">Care</span>
            </h1>
          </div>

          <!-- Icon and Description -->
          <div class="flex items-start space-x-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div class="flex-shrink-0 mt-1">
              <svg class="w-14 h-14 lg:w-16 lg:h-16 text-gray-800" viewBox="0 0 64 64" fill="none">
                <circle cx="16" cy="32" r="3" fill="currentColor" />
                <circle cx="32" cy="32" r="3" fill="currentColor" />
                <circle cx="48" cy="32" r="3" fill="currentColor" />
                <rect x="14" y="20" width="4" height="24" fill="currentColor" />
                <rect x="30" y="20" width="4" height="24" fill="currentColor" />
                <rect x="46" y="20" width="4" height="24" fill="currentColor" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-base lg:text-lg text-gray-700 leading-relaxed">
                Get trusted counselling and personalised therapy from a professional service that puts your wellbeing first. Book a session, get clear guidance, and start the right treatment plan — all in one place.
              </p>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-2">
            <button @click="scrollToContact"
              class="bg-gray-900 hover:bg-gray-800 text-white px-10 py-5 text-base lg:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Request a call
            </button>
            <a @click="scrollToContact" href="mailto:info.doctordey@gmail.com"
              class="bg-white text-center hover:bg-gray-50 text-gray-900 px-10 py-5 text-base lg:text-lg border-2 border-gray-900 transition-all duration-300 shadow-md hover:shadow-lg">
              Send Email
            </a>
          </div>
        </div>

        <!-- Right Content - Doctor Card -->
        <div class="relative flex justify-center lg:justify-end">
          <div class="relative w-full max-w-md lg:max-w-lg">
            <!-- Main Doctor Image Container -->
            <div class="relative bg-gradient-to-br from-gray-700 to-gray-500 w-full aspect-[3/4] rounded-tl-[60px] overflow-hidden shadow-2xl">
              <img src="@/assets/img/founder.jpeg" alt="Doctor Patrick Nwachi"
                class="w-full h-full object-cover" />
              <!-- Decorative overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            <!-- Doctor Info Card -->
            <div
              class="absolute -bottom-8 -left-4 sm:-bottom-12 sm:-left-8 lg:-bottom-48 lg:-left-12 bg-[#1a1a1a] text-white p-8 lg:p-10 w-[calc(100%-1rem)] sm:w-[90%] lg:w-[460px] shadow-2xl z-20 rounded-lg">
              <!-- Header with Navigation -->
              <div class="flex justify-between items-start mb-6">
                <div>
                  <h2 class="text-3xl lg:text-[2.75rem] font-light tracking-wide leading-tight">Dr Patrick<br/>Nwachi.</h2>
                  <p class="text-sm text-gray-400 mt-2">MBBS, FMCFM, DipIBLM</p>
                </div>
                <div class="flex space-x-1">
                  <button class="p-2 hover:bg-gray-800 transition-colors rounded">
                    <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button class="p-2 hover:bg-gray-800 transition-colors rounded">
                    <svg class="w-5 h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="border-t border-gray-700 pt-6 mb-6">
                <p class="text-sm lg:text-base text-gray-300 leading-relaxed">
                  Consultant Family Physician and International Board Certified Lifestyle Physician with broad clinical experience in holistic medicine.
                </p>
              </div>

              <!-- Stats Grid -->
              <div class="grid grid-cols-2 gap-x-8 gap-y-6 mb-8">
                <div>
                  <p class="text-xs lg:text-sm text-gray-400 mb-2">Average rating</p>
                  <p class="text-xl font-light text-yellow-400">★★★★★</p>
                </div>
                <div>
                  <p class="text-xs lg:text-sm text-gray-400 mb-2">Average Visit</p>
                  <p class="text-2xl lg:text-[1.75rem] font-light">1000+</p>
                </div>
                <div class="col-span-2">
                  <p class="text-xs lg:text-sm text-gray-400 mb-2">Total Experience</p>
                  <p class="text-2xl lg:text-[1.75rem] font-light">24 Years +</p>
                </div>
              </div>

              <!-- Schedule Button -->
              <NuxtLink to="/login"
                class="block w-full text-center bg-white text-gray-900 hover:bg-gray-100 py-4 text-base lg:text-lg transition-all duration-300 font-medium">
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
        <div class="bg-white border-[0.5px] rounded-xl border-gray-100 p-8 hover:shadow-lg transition-shadow">
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
        <div class="bg-white border-[0.5px] rounded-xl border-gray-100 p-8 hover:shadow-lg transition-shadow">
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
        <div class="bg-white border-[0.5px] rounded-xl border-gray-100 p-8 hover:shadow-lg transition-shadow">
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

        <!-- Service Card 4 - Family Therapy -->
        <div class="bg-white border-[0.5px] rounded-xl border-gray-100 p-8 hover:shadow-lg transition-shadow">
          <div class="mb-6">
            <svg class="w-12 h-12 text-gray-900" viewBox="0 0 64 64" fill="none">
              <circle cx="24" cy="20" r="6" stroke="currentColor" stroke-width="3" />
              <circle cx="40" cy="20" r="6" stroke="currentColor" stroke-width="3" />
              <circle cx="32" cy="38" r="5" stroke="currentColor" stroke-width="3" />
              <path d="M18 50c0-6 4-10 10-10h8c6 0 10 4 10 10" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            </svg>
          </div>
          <h3 class="text-2xl font-normal text-gray-900 mb-4">Family Therapy</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Strengthen family bonds and resolve conflicts through guided therapeutic sessions designed to improve communication and understanding among family members.
          </p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Conflict resolution</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Communication enhancement</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Family dynamics improvement</span>
            </li>
          </ul>
        </div>

        <!-- Service Card 5 - Marriage/Relationship Counseling -->
        <div class="bg-white border-[0.5px] rounded-xl border-gray-100 p-8 hover:shadow-lg transition-shadow">
          <div class="mb-6">
            <svg class="w-12 h-12 text-gray-900" viewBox="0 0 64 64" fill="none">
              <path d="M32 52c-8-8-20-14-20-24 0-8 6-14 14-14 4 0 6 2 6 2s2-2 6-2c8 0 14 6 14 14 0 10-12 16-20 24z" 
                stroke="currentColor" stroke-width="3" fill="none" />
            </svg>
          </div>
          <h3 class="text-2xl font-normal text-gray-900 mb-4">Marriage/Relationship Counseling</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Nurture and strengthen your relationship through professional counseling that addresses challenges, builds intimacy, and fosters lasting partnership.
          </p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Couples therapy sessions</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Pre-marital counseling</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Intimacy and trust building</span>
            </li>
          </ul>
        </div>

        <!-- Service Card 6 - Group Therapy -->
        <div class="bg-white border-[0.5px] rounded-xl border-gray-100 p-8 hover:shadow-lg transition-shadow">
          <div class="mb-6">
            <svg class="w-12 h-12 text-gray-900" viewBox="0 0 64 64" fill="none">
              <circle cx="20" cy="24" r="5" stroke="currentColor" stroke-width="3" />
              <circle cx="32" cy="24" r="5" stroke="currentColor" stroke-width="3" />
              <circle cx="44" cy="24" r="5" stroke="currentColor" stroke-width="3" />
              <path d="M14 46c0-5 4-9 9-9h6c5 0 9 4 9 9M26 46c0-5 4-9 9-9h6c5 0 9 4 9 9" 
                stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            </svg>
          </div>
          <h3 class="text-2xl font-normal text-gray-900 mb-4">Group Therapy</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Find support and healing in a safe, confidential group setting where you can share experiences and learn from others facing similar challenges.
          </p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Peer support groups</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Shared experience healing</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Skill-building workshops</span>
            </li>
          </ul>
        </div>

        <!-- Service Card 7 - Anxiety/Depression Counseling -->
        <div class="bg-white border-[0.5px] rounded-xl border-gray-100 p-8 hover:shadow-lg transition-shadow">
          <div class="mb-6">
            <svg class="w-12 h-12 text-gray-900" viewBox="0 0 64 64" fill="none">
              <circle cx="32" cy="28" r="12" stroke="currentColor" stroke-width="3" />
              <path d="M20 36c2 4 6 8 12 8s10-4 12-8" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
              <circle cx="26" cy="26" r="2" fill="currentColor" />
              <circle cx="38" cy="26" r="2" fill="currentColor" />
              <path d="M16 50h32M24 50v-4M32 50v-6M40 50v-4" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
            </svg>
          </div>
          <h3 class="text-2xl font-normal text-gray-900 mb-4">Anxiety/Depression Counseling</h3>
          <p class="text-gray-700 leading-relaxed mb-4">
            Receive specialized care for anxiety disorders and depression with evidence-based therapeutic approaches tailored to your mental health needs.
          </p>
          <ul class="space-y-2 text-gray-600">
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Cognitive behavioral therapy</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Stress and anxiety management</span>
            </li>
            <li class="flex items-start">
              <span class="mr-2">•</span>
              <span>Depression treatment plans</span>
            </li>
          </ul>
        </div>

        <!-- Service Card 8 - Lab Review & Analysis -->
        <div class="bg-white border-[0.5px] rounded-xl border-gray-100 p-8 hover:shadow-lg transition-shadow">
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

        <!-- Service Card 9 - Wellness Programs -->
        <div class="bg-white border-[0.5px] rounded-xl border-gray-100 p-8 hover:shadow-lg transition-shadow">
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

<section id="prices" class="bg-gray-900 text-white py-20 lg:py-32">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-16 lg:mb-20">
        <div class="inline-block mb-4">
          <span class="text-gray-400 text-sm font-semibold tracking-wider uppercase">Flexible Options</span>
        </div>
        <h2 class="text-5xl sm:text-6xl lg:text-7xl font-light leading-tight mb-6">
          Choose Your Care Style
        </h2>
        <p class="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Quality healthcare on your terms - whether from the comfort of home or in-person at our clinic
        </p>
      </div>

      <!-- Consultation Type Tabs -->
      <div class="flex justify-center mb-12">
        <div class="inline-flex bg-gray-800 rounded-full p-1.5 border border-gray-700">
          <button
            @click="consultationType = 'virtual'"
            :class="[
              'px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300',
              consultationType === 'virtual'
                ? 'bg-white text-gray-900 shadow-lg'
                : 'text-gray-400 hover:text-white'
            ]"
          >
            💻 Virtual Consultation
          </button>
          <button
            @click="consultationType = 'physical'"
            :class="[
              'px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300',
              consultationType === 'physical'
                ? 'bg-white text-gray-900 shadow-lg'
                : 'text-gray-400 hover:text-white'
            ]"
          >
            🏥 Physical Consultation
          </button>
        </div>
      </div>

      <!-- Virtual Consultation Plans -->
      <div v-show="consultationType === 'virtual'" class="grid md:grid-cols-3 gap-8 lg:gap-10">
        <!-- Quick Connect - 10 mins -->
        <div class="group bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-gray-500 transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-light leading-tight text-white">Quick Connect</h3>
            <div class="text-3xl">⚡</div>
          </div>
          
          <div class="mb-6">
            <div class="flex items-baseline">
              <span class="text-5xl font-light leading-tight text-white">₦20,000</span>
            </div>
            <p class="text-gray-400 mt-2">10-minute session</p>
          </div>

          <div class="space-y-4 mb-8">
            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-300">Video or voice call</span>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-300">Quick medical advice</span>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-300">Prescription refills</span>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-300">Same-day availability</span>
            </div>
          </div>

          <NuxtLink to="/register"
            @click="scrollToContact"
            class="w-full block text-center bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 text-white py-3 rounded-xl text-lg font-mediun transition-all duration-300"
          >
            Book Now
          </NuxtLink>
        </div>

        <!-- Standard Care - 20 mins (MOST POPULAR) -->
        <div class="group bg-white text-gray-900 rounded-2xl p-8 transform lg:scale-105 shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div class="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div class="bg-gray-900 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
              ⭐ MOST POPULAR
            </div>
          </div>

          <div class="pt-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-2xl font-light leading-tight text-gray-900">Standard Care</h3>
              <div class="text-3xl">🎯</div>
            </div>
            
            <div class="mb-6">
              <div class="flex items-baseline">
                <span class="text-6xl font-light leading-tight text-gray-900">₦30,000</span>
              </div>
              <p class="text-gray-600 mt-2">20-minute session</p>
            </div>

            <div class="space-y-4 mb-8">
              <div class="flex items-start gap-3">
                <div class="mt-1 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-900 font-medium">HD video or voice call</span>
              </div>
              <div class="flex items-start gap-3">
                <div class="mt-1 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-900 font-medium">Comprehensive diagnosis</span>
              </div>
              <div class="flex items-start gap-3">
                <div class="mt-1 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-900 font-medium">Treatment plan & prescriptions</span>
              </div>
              <div class="flex items-start gap-3">
                <div class="mt-1 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-900 font-medium">Medical records access</span>
              </div>
              <div class="flex items-start gap-3">
                <div class="mt-1 w-5 h-5 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-900 font-medium">7-day follow-up support</span>
              </div>
            </div>

            <NuxtLink to="/register"
              @click="scrollToContact"
              class="w-full block text-center bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl text-lg font-mediun transition-all duration-300 shadow-lg"
            >
              Get Started Now
            </NuxtLink>
          </div>
        </div>

        <!-- Extended Care - 30 mins -->
        <div class="group bg-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-gray-500 transition-all duration-300 hover:-translate-y-1">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-2xl font-light leading-tight text-white">Extended Care</h3>
            <div class="text-3xl">💎</div>
          </div>
          
          <div class="mb-6">
            <div class="flex items-baseline">
              <span class="text-5xl font-light leading-tight text-white">₦50,000</span>
            </div>
            <p class="text-gray-400 mt-2">30-minute session</p>
          </div>

          <div class="space-y-4 mb-8">
            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-300">Premium video or voice call</span>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-300">In-depth consultation</span>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-300">Specialist referrals</span>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-300">Detailed treatment roadmap</span>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-1 w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center flex-shrink-0">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-300">14-day priority support</span>
            </div>
          </div>

          <NuxtLink to="/register"
            @click="scrollToContact"
            class="w-full block text-center bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 text-white py-3 rounded-xl text-lg font-mediun transition-all duration-300"
          >
            Book Now
          </NuxtLink>
        </div>
      </div>

      <!-- Physical Consultation Plan -->
      <div v-show="consultationType === 'physical'" class="max-w-2xl mx-auto">
        <div class="group bg-white text-gray-900 rounded-2xl p-10 shadow-2xl hover:-translate-y-2 transition-all duration-300">
          <div>
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-3xl leading-tight font-light text-gray-900 mb-2">In-Person Consultation</h3>
                <p class="text-gray-600">Complete physical examination at our clinic</p>
              </div>
              <div class="text-5xl">🏥</div>
            </div>
            
            <div class="mb-8">
              <div class="flex items-baseline">
                <span class="text-6xl leading-tight font-light text-gray-900">₦100,000</span>
              </div>
              <p class="text-gray-600 mt-2 text-lg">30-minute in-clinic session</p>
            </div>

            <div class="grid md:grid-cols-2 gap-4 mb-10">
              <div class="flex items-start gap-3">
                <div class="mt-1 w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-900 font-medium">Full physical examination</span>
              </div>
              <div class="flex items-start gap-3">
                <div class="mt-1 w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-900 font-medium">Diagnostic tests available</span>
              </div>
              <div class="flex items-start gap-3">
                <div class="mt-1 w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-900 font-medium">Specialist physicians</span>
              </div>
              <div class="flex items-start gap-3">
                <div class="mt-1 w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-900 font-medium">Immediate prescriptions</span>
              </div>
              <div class="flex items-start gap-3">
                <div class="mt-1 w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-900 font-medium">Lab work coordination</span>
              </div>
              <div class="flex items-start gap-3">
                <div class="mt-1 w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-gray-900 font-medium">Medical documentation</span>
              </div>
            </div>

            <div class="bg-gray-100 rounded-2xl p-6 mb-8">
              <h4 class="text-gray-900 font-semibold mb-3 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Clinic Hours
              </h4>
              <div class="space-y-2 text-gray-700">
                <div class="flex justify-between items-center">
                  <span>Thursday</span>
                  <span class="font-semibold">9:00 AM - 5:00 PM</span>
                </div>
                <div class="flex justify-between items-center">
                  <span>Saturday</span>
                  <span class="font-semibold">9:00 AM - 5:00 PM</span>
                </div>
              </div>
            </div>

            <NuxtLink to="/register"
              @click="scrollToContact"
              class="w-full block text-center bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-xl text-lg font-mediun transition-all duration-300 shadow-lg"
            >
              Schedule Clinic Visit
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-16 text-center">
        <div class="inline-flex items-center gap-3 bg-gray-800 border border-gray-700 rounded-full px-8 py-4">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span class="text-gray-300">All consultations are confidential and HIPAA compliant</span>
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
                  <a href="mailto:info.doctordey@gmail.com" class="text-gray-700">
    info.doctordey@gmail.com
  </a>
                </div>
              </div>
              <div class="flex items-start space-x-4">
                <svg class="w-6 h-6 text-gray-900 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p class="text-gray-900 font-medium">Phone</p>
                  <a href="tel:+2348034080064" class="text-gray-700">
    +234 803 408 0064
  </a>
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
        <div class="bg-white border-[0.5px] rounded-xl border-gray-100 p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div><label class="block text-sm font-medium text-gray-900 mb-2">Full
                Name</label><input v-model="form.name" type="text" required
                class="w-full px-4 py-3 border-[0.5px] rounded-xl border-gray-200 focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="John Doe" /></div>
            <div><label class="block text-sm font-medium text-gray-900 mb-2">Email</label><input v-model="form.email"
                type="email" required
                class="w-full px-4 py-3 border-[0.5px] rounded-xl border-gray-200 focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="john@example.com" /></div>
            <div><label class="block text-sm font-medium text-gray-900 mb-2">Phone</label><input v-model="form.phone"
                type="tel" required
                class="w-full px-4 py-3 border-[0.5px] rounded-xl border-gray-200 focus:outline-none focus:border-gray-900 transition-colors"
                placeholder="+1 (555) 000-0000" /></div>
            <div><label class="block text-sm font-medium text-gray-900 mb-2">Message</label><textarea
                v-model="form.message" required rows="4"
                class="w-full px-4 py-3 border-[0.5px] rounded-xl border-gray-200 focus:outline-none focus:border-gray-900 transition-colors resize-none"
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

const consultationType = ref<'virtual' | 'physical'>('virtual')
</script>

<style scoped>
/* Add smooth transitions */
[v-show] {
  transition: opacity 0.3s ease-in-out;
}
</style>