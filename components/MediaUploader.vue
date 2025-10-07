<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="flex min-h-screen items-center justify-center p-4">
      <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('close')"></div>
      <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium text-[#0C111D]">
            Upload {{ uploadType === 'photo' ? 'Photos' : uploadType === 'video' ? 'Video' : uploadType === '3d' ? '3D Plan' : 'File' }}
          </h3>
          <button @click="$emit('close')" class="text-gray-400 hover:text-[#525866]">
            <X class="w-6 h-6" />
          </button>
        </div>

        <div
          @drop="handleDrop"
          @dragover.prevent
          @dragenter.prevent
          class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors"
        >
          <Upload class="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p class="text-sm text-[#525866] mb-2">Drag and drop files here, or</p>
          <input
            ref="fileInput"
            type="file"
            :multiple="uploadType === 'photo'"
            :accept="getAcceptedTypes()"
            @change="handleFileSelect"
            class="hidden"
          />
          <button
            @click="$refs.fileInput?.click()"
            class="btn-primary"
          >
            Browse Files
          </button>
          <p class="text-xs text-gray-500 mt-2">
            {{ getFileTypeText() }}
          </p>
        </div>

        <div v-if="selectedFiles.length > 0" class="mt-4">
          <h4 class="text-sm font-medium text-[#0C111D] mb-2">Selected Files:</h4>
          <div class="space-y-2">
            <div
              v-for="(file, index) in selectedFiles"
              :key="index"
              class="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
              <button
                @click="removeFile(index)"
                class="text-red-500 hover:text-red-700"
              >
                <X class="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button @click="$emit('close')" class="btn-secondary">Cancel</button>
          <button
            @click="uploadFiles"
            :disabled="selectedFiles.length === 0"
            class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Upload, X } from 'lucide-vue-next'

interface Props {
  isOpen: boolean
  uploadType: 'photo' | 'video' | 'file' | '3d'
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
  upload: [files: File[]]
}>()

const selectedFiles = ref<File[]>([])

const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  const files = Array.from(e.dataTransfer?.files || [])
  addFiles(files)
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  const files = Array.from(target.files || [])
  addFiles(files)
}

const addFiles = (files: File[]) => {
  const validFiles = files.filter(file => isValidFile(file))
  if (props.uploadType === 'photo') {
    selectedFiles.value.push(...validFiles)
  } else {
    selectedFiles.value = validFiles.slice(0, 1) // Single file for non-photo uploads
  }
}

const isValidFile = (file: File) => {
  const acceptedTypes = getAcceptedTypes()
  return acceptedTypes.split(',').some(type => file.type.match(type.trim()))
}

const getAcceptedTypes = () => {
  switch (props.uploadType) {
    case 'photo':
      return 'image/*'
    case 'video':
      return 'video/*'
    case '3d':
      return '.obj,.fbx,.gltf,.glb'
    default:
      return '.pdf,.doc,.docx,image/*'
  }
}

const getFileTypeText = () => {
  switch (props.uploadType) {
    case 'photo':
      return 'JPEG, PNG, WebP formats, up to 10 MB each'
    case 'video':
      return 'MP4, MOV, AVI formats, up to 100 MB'
    case '3d':
      return 'OBJ, FBX, GLTF formats, up to 50 MB'
    default:
      return 'PDF, DOC, DOCX, images, up to 50 MB'
  }
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

const uploadFiles = () => {
  emit('upload', selectedFiles.value)
  selectedFiles.value = []
}
</script>
