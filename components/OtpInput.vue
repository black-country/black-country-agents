<template>
  <div class="flex space-x-3 justify-center">
    <input
      v-for="(digit, index) in digits"
      :key="index"
      type="text"
      maxlength="1"
      inputmode="numeric"
      pattern="[0-9]*"
      ref="otpRefs"
      v-model="digits[index]"
      @input="onInput($event, index)"
      @keydown.backspace.prevent="onBackspace(index)"
      @paste.prevent="onPaste($event)"
      class="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";

const props = defineProps({
  length: { type: Number, default: 6 }, // OTP length (default 6)
  modelValue: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue", "complete"]);

const digits = ref(Array(props.length).fill(""));
const otpRefs = ref([]);

// keep external v-model synced
watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal && newVal.length === props.length) {
      digits.value = newVal.split("");
    }
  }
);

// Handle input & auto-focus
function onInput(e, index) {
  const value = e.target.value.replace(/[^0-9]/g, ""); // only numbers
  digits.value[index] = value;

  // Move to next input if filled
  if (value && index < props.length - 1) {
    nextTick(() => otpRefs.value[index + 1]?.focus());
  }

  updateOtp();
}

// Handle backspace -> go to previous input
function onBackspace(index) {
  if (!digits.value[index] && index > 0) {
    nextTick(() => otpRefs.value[index - 1]?.focus());
  }
  digits.value[index] = "";
  updateOtp();
}

// Handle paste (e.g. full OTP pasted)
function onPaste(e) {
  const pasted = e.clipboardData.getData("text").slice(0, props.length);
  pasted.split("").forEach((char, i) => {
    digits.value[i] = char;
  });
  updateOtp();
  nextTick(() => {
    const filledIndex = Math.min(pasted.length, props.length - 1);
    otpRefs.value[filledIndex]?.focus();
  });
}

// Emit OTP updates
function updateOtp() {
  const otp = digits.value.join("");
  emit("update:modelValue", otp);

  if (otp.length === props.length && !digits.value.includes("")) {
    emit("complete", otp);
  }
}
</script>
