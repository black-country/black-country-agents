<template>
      <footer class="bg-gray-900 text-white py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-4 gap-8">
          <div class="md:col-span-2">
            <h3 class="text-2xl font-bold mb-4">Doctor Dey Consulting</h3>
            <p class="text-gray-400 leading-relaxed">Premier healthcare consulting for medical
              services and consultations. Your health, our priority.</p>
          </div>
          <div>
            <h4 class="text-lg font-medium mb-4">Quick Links</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#home" class="hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" class="hover:text-white transition-colors">About Us</a>
              </li>
              <li><a href="#services" class="hover:text-white transition-colors">Services</a>
              </li>
              <li><a href="#prices" class="hover:text-white transition-colors">Prices</a></li>
            </ul>
          </div>
          <div>
            <h4 class="text-lg font-medium mb-4">Contact</h4>
            <ul class="space-y-2 text-gray-400">
              <li>
                  <a href="mailto:info.doctordey@gmail.com" class="text-gray-700">
    info.doctordey@gmail.com
  </a>
              </li>
              <li>
                  <a href="tel:+2348034080064" class="text-gray-700">
    +234 803 408 0064
  </a>
              </li>
              <li>Mon-Fri: 8am - 8pm</li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {{ new Date().getFullYear() }} Doctor Dey Consulting. All rights reserved.</p>
        </div>
      </div>
    </footer>
</template>

<script setup lang="ts">
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseSlow {
  0%, 100% {
    opacity: 0.05;
    transform: scale(1);
  }
  50% {
    opacity: 0.1;
    transform: scale(1.05);
  }
}

@keyframes pulseDelayed {
  0%, 100% {
    opacity: 0.05;
    transform: scale(1);
  }
  50% {
    opacity: 0.08;
    transform: scale(1.08);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-pulse-slow {
  animation: pulseSlow 6s ease-in-out infinite;
}

.animate-pulse-delayed {
  animation: pulseDelayed 8s ease-in-out infinite 1s;
}
</style>