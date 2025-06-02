<template>
  <div class="container py-4">
    <div class="text-center mb-3">
      <a href="https://vite.dev" target="_blank">
        <img src="../assets/logo-bali-bikes-main-hz.png" class="img-fluid logo" alt="Vite logo" />
      </a>
    </div>

    <div class="mx-auto p-4 border rounded shadow-sm" style="max-width: 600px;">
      <h2 class="mb-4 text-center">Estimasi Persiapan Pengantaran</h2>

      <div class="row g-3">
        <div class="col-12">
          <label for="motorLocation" class="form-label">Lokasi Motor</label>
          <select v-model="MotorLocation" id="motorLocation" class="form-select">
            <option disabled value="">Pilih Lokasi</option>
            <option v-for="loc in MotorLocationOptions" :key="loc" :value="loc">{{ loc }}</option>
          </select>
        </div>

        <div class="col-12 col-md-6">
          <label for="arrivalTime" class="form-label">Jam Pertemuan (Tujuan)</label>
          <input type="time" id="arrivalTime" v-model="arrivalInput" class="form-control" />
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label">Jarak Pengambilan (km)</label>
          <input type="number" v-model.number="takingDistance" class="form-control" />
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label">Waktu Maps Pengambilan (menit)</label>
          <input type="number" v-model.number="takingMapTime" class="form-control" />
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label">Jarak Pengantaran (km)</label>
          <input type="number" v-model.number="deliveryDistance" class="form-control" />
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label">Waktu Maps Pengantaran (menit)</label>
          <input type="number" v-model.number="deliveryMapTime" class="form-control" />
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label">Durasi Persiapan Motor (menit)</label>
          <input type="number" v-model.number="prepMotor" class="form-control" disabled />
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label">Durasi Dokumen (menit)</label>
          <input type="number" v-model.number="prepDocs" class="form-control" disabled />
        </div>

        <div class="col-12 col-md-6">
          <label class="form-label">Durasi Aksesori (menit)</label>
          <input type="number" v-model.number="prepItems" class="form-control" disabled />
        </div>
      </div>

      <hr class="my-4" />

      <div class="bg-light p-3 rounded">
        <p><strong>Lokasi Motor:</strong> {{ MotorLocation || 'Belum dipilih' }}</p>
        <p><strong>Mulai Persiapan:</strong> {{ formatTime(startTime) }}</p>
        <p><strong>Total Persiapan:</strong> {{ totalPrep }} menit</p>
        <p><strong>Berangkat:</strong> {{ formatTime(departTime) }}</p>
        <p><strong>Pertemuan:</strong> {{ formatTime(arrivalTime) }}</p>
        <p><strong>Total Durasi:</strong> {{ totalDuration }} menit</p>
      </div>

      <button @click="copyToClipboard" class="btn btn-primary mt-3 w-100">Salin Estimasi</button>
      <div v-if="copied" class="text-success mt-2 text-center">Estimasi telah disalin!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const MotorLocationOptions = ['Warehouse', 'Kantor Sanur']
const MotorLocation = ref('')
const arrivalInput = ref('')

const takingDistance = ref(0)
const takingMapTime = ref(0)
const deliveryDistance = ref(0)
const deliveryMapTime = ref(0)

const prepMotor = ref(10)
const prepDocs = ref(10)
const prepItems = ref(10)
const copied = ref(false)

const takingTime = computed(() => takingDistance.value + takingMapTime.value)
const travelTime = computed(() => deliveryDistance.value + deliveryMapTime.value)
const totalPrep = computed(() => prepMotor.value + prepDocs.value + prepItems.value)
const totalDuration = computed(() => takingTime.value + totalPrep.value + travelTime.value)

const arrivalTime = computed(() => {
  if (!arrivalInput.value) return new Date()
  const [h, m] = arrivalInput.value.split(':').map(Number)
  const date = new Date()
  date.setHours(h, m, 0, 0)
  return date
})

const departTime = computed(() => {
  const date = new Date(arrivalTime.value)
  date.setMinutes(date.getMinutes() - travelTime.value)
  return date
})

const startTime = computed(() => {
  const date = new Date(departTime.value)
  date.setMinutes(date.getMinutes() - totalPrep.value - takingTime.value)
  return date
})

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function copyToClipboard() {
  const text =
    `📍 Lokasi Motor: ${MotorLocation.value || '-'}\n` +
    `📅 Pertemuan: ${formatTime(arrivalTime.value)}\n` +
    `🛵 Berangkat: ${formatTime(departTime.value)}\n` +
    `🔧 Mulai Persiapan: ${formatTime(startTime.value)}\n\n` +
    `🚚 Pengambilan: ${takingTime.value} menit\n` +
    `🧰 Persiapan: ${totalPrep.value} menit\n` +
    `🚛 Pengantaran: ${travelTime.value} menit\n` +
    `⏱️ Total Waktu: ${totalDuration.value} menit`

  navigator.clipboard.writeText(text).then(() => {
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  })
}
</script>

<style scoped>
.logo {
  max-width: 100%;
  height: auto;
}
</style>
