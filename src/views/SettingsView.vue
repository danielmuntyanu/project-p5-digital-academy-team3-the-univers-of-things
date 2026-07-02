<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth-store'
import { storeToRefs } from 'pinia'

const router = useRouter()
const authStore = useAuthStore()

// --- Perfil / Avatar ---
const profileMessage = ref('')
const profileError = ref('')
const isSavingProfile = ref(false)

const { avatarURL, fullName } = storeToRefs(authStore);

const actualAvatarURL = computed(() => {
  if (avatarURL.value) {
    return avatarURL.value;
  } else {
    return 'https://api.dicebear.com/7.x/avataaars/svg?seed=nexus';
  }
})
const { 
  updateAvatar, 
  updateFullName, 
  changePassword,
  deleteAccount
} = authStore;
const avatarError = ref(false);
const newFullName = ref(fullName.value)

async function handleAvatarUpload(event) {
  const file = event.target.files?.[0]
  if (!file) return;

  const result = await updateAvatar(file)
  if (!result) {
    avatarError.value = true;
  } else {
    avatarError.value = false;
  }
}

async function saveFullName() {
  profileMessage.value = ''
  profileError.value = ''
  isSavingProfile.value = true

  try {
    const result = await updateFullName(newFullName.value)
    
    if (!result) {
      throw new Error(`Full Name value is incorrect: ${newFullName.value}`)
    }
    profileMessage.value = 'Perfil actualizado correctamente.'
  } catch (error) {
    console.log(error)
    profileError.value = 'No se pudo actualizar el perfil. Inténtalo de nuevo.'
  } finally {
    isSavingProfile.value = false
  }
}

// --- Cambiar contraseña ---
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showDeletingPassword = ref(false)
const passwordMessage = ref('')
const passwordError = ref('')
const isSavingPassword = ref(false)

function toggleCurrentPasswordVisibility() {
  showCurrentPassword.value = !showCurrentPassword.value
}

function toggleNewPasswordVisibility() {
  showNewPassword.value = !showNewPassword.value
}

function toggleDeletingPasswordVisibility() {
  showDeletingPassword.value = !showDeletingPassword.value
}

async function changePasswordHandler() {
  passwordMessage.value = ''
  passwordError.value = ''

  if (newPassword.value !== confirmPassword.value) {
    passwordError.value = 'Las contraseñas no coinciden.'
    return
  }

  isSavingPassword.value = true

  try {
    await changePassword(currentPassword.value, newPassword.value);
    
    passwordMessage.value = 'Contraseña actualizada correctamente.'
    currentPassword.value = ''
    newPassword.value = ''
    confirmPassword.value = ''
  } catch (error) {
    console.log(error)
    passwordError.value = 'No se pudo cambiar la contraseña. Comprueba la contraseña actual.'
  } finally {
    isSavingPassword.value = false
  }
}

// --- Eliminar cuenta ---
const isDeleteModalOpen = ref(false)
const deleteConfirmText = ref('')
const deletePassword = ref('')
const deleteError = ref('')
const isDeletingAccount = ref(false)

function openDeleteModal() {
  isDeleteModalOpen.value = true
  deleteConfirmText.value = ''
  deleteError.value = ''
}

function closeDeleteModal() {
  isDeleteModalOpen.value = false
}

async function confirmDeleteAccount() {
  if (deleteConfirmText.value !== 'DELETE') {
    deleteError.value = 'Enter DELETE for accepting deletion of your account'
    return
  }

  if (!deletePassword.value || deletePassword.value == "") {
    deleteError.value = 'Enter your actual password'
    return
  }

  isDeletingAccount.value = true
  deleteError.value = ''

  try {
    await deleteAccount(deletePassword.value)
    
    await authStore.logout()
    router.push('/login')
  } catch (error) {
    console.log(error)
    deleteError.value = 'Cannot delete account. Please, try again later'
    isDeletingAccount.value = false
  }
}
</script>

<template>
  <div class="settings-page">
    <div class="settings-container">
      <header class="settings-header">
        <h1 class="settings-title">Settings</h1>
        <p class="settings-subtitle">Manage your profile, security, and account preferences.</p>
      </header>

      <!-- Perfil -->
      <section class="settings-card">
        <div class="settings-card-header">
          <h2 class="settings-card-title">Profile</h2>
          <p class="settings-card-description">Your name and avatar visible at Nexus Anime.</p>
        </div>

        <div class="settings-avatar-row">
          <img
            :src="actualAvatarURL"
            alt="Avatar"
            class="settings-avatar-img"
          />
          <div class="settings-avatar-actions">
            <label class="settings-btn-secondary">
              Upload avatar
              <input
                type="file"
                accept="image/*"
                class="settings-file-input"
                @change="handleAvatarUpload"
              />
            </label>
            <p class="settings-avatar-hint">PNG or JPG, maximum 2MB.</p>
            <div class="avatar_error" :class="avatarError ? 'block' : 'hidden'">
              Error with uploading the avatar. 
            </div>
          </div>
        </div>

        <div class="settings-field">
          <label class="settings-label">Full Name</label>
          <input
            v-model="newFullName"
            type="text"
            placeholder="Naruto Uzumaki"
            class="settings-input"
          />
        </div>

        <p v-if="profileMessage" class="settings-success">{{ profileMessage }}</p>
        <p v-if="profileError" class="settings-error">{{ profileError }}</p>

        <button
          type="button"
          class="settings-btn-primary"
          :disabled="isSavingProfile"
          @click="saveFullName"
        >
          {{ isSavingProfile ? 'Processing...' : 'Change Full Name' }}
        </button>
      </section>

      <!-- Cambiar contraseña -->
      <section class="settings-card">
        <div class="settings-card-header">
          <h2 class="settings-card-title">Password</h2>
          <p class="settings-card-description">Update your account access password.</p>
        </div>

        <div class="settings-field">
          <label class="settings-label">Actual password</label>
          <div class="settings-input-wrap">
            <input
              v-model="currentPassword"
              :type="showCurrentPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="settings-input settings-input-icon-pad"
            />
            <button
              type="button"
              class="settings-input-icon settings-toggle-password"
              :aria-label="showCurrentPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              @click="toggleCurrentPasswordVisibility"
            >
              {{ showCurrentPassword ? '🙈' : '👁' }}
            </button>
          </div>
        </div>

        <div class="settings-field">
          <label class="settings-label">New password</label>
          <div class="settings-input-wrap">
            <input
              v-model="newPassword"
              :type="showNewPassword ? 'text' : 'password'"
              placeholder="••••••••"
              class="settings-input settings-input-icon-pad"
            />
            <button
              type="button"
              class="settings-input-icon settings-toggle-password"
              :aria-label="showNewPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'"
              @click="toggleNewPasswordVisibility"
            >
              {{ showNewPassword ? '🙈' : '👁' }}
            </button>
          </div>
        </div>

        <div class="settings-field">
          <label class="settings-label">Confirm new password</label>
          <input
            v-model="confirmPassword"
            type="password"
            placeholder="••••••••"
            class="settings-input"
          />
        </div>

        <p v-if="passwordMessage" class="settings-success">{{ passwordMessage }}</p>
        <p v-if="passwordError" class="settings-error">{{ passwordError }}</p>

        <button
          type="button"
          class="settings-btn-primary"
          :disabled="isSavingPassword"
          @click="changePasswordHandler"
        >
          {{ isSavingPassword ? 'Updating...' : 'Change password' }}
        </button>
      </section>

      <!-- Eliminar cuenta -->
      <section class="settings-card settings-card-danger">
        <div class="settings-card-header">
          <h2 class="settings-card-title settings-card-title-danger">Eliminar cuenta</h2>
          <p class="settings-card-description">
            This action is permanent. Your profile, favorites, and associated data will be deleted.
          </p>
        </div>

        <button type="button" class="settings-btn-danger" @click="openDeleteModal">
          Delete account
        </button>
      </section>
    </div>

    <!-- Modal de confirmación -->
    <div v-if="isDeleteModalOpen" class="settings-modal-overlay" @click.self="closeDeleteModal">
      <div class="settings-modal">
        <h3 class="settings-modal-title">¿Eliminar tu cuenta?</h3>
        <p class="settings-modal-text">
          This action cannot be undone. Enter <strong>DELETE</strong> to confirm.
        </p>

        <input
          v-model="deleteConfirmText"
          type="text"
          placeholder="DELETE"
          class="settings-input"
        />

        <p class="settings-modal-text">
          Your actual password:
        </p>
        <div class="settings-input-wrap">
          <input
            v-model="deletePassword"
            :type="showDeletingPassword ? 'text' : 'password'"
            placeholder="••••••••"
            class="settings-input settings-input-icon-pad"
          />
          <button
            type="button"
            class="settings-input-icon settings-toggle-password"
            :aria-label="showDeletingPassword ? 'Hide password' : 'Show password'"
            @click="toggleDeletingPasswordVisibility"
          >
            {{ showDeletingPassword ? '🙈' : '👁' }}
          </button>
        </div>

        <p v-if="deleteError" class="settings-error">{{ deleteError }}</p>

        <div class="settings-modal-actions">
          <button type="button" class="settings-btn-secondary" @click="closeDeleteModal">
            Cancelar
          </button>
          <button
            type="button"
            class="settings-btn-danger"
            :disabled="isDeletingAccount"
            @click="confirmDeleteAccount"
          >
            {{ isDeletingAccount ? 'Deleting...' : 'Confirm deletion' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";

.settings-page {
  @apply min-h-screen bg-bg-body py-12 px-6;
}

.settings-container {
  @apply max-w-2xl mx-auto flex flex-col gap-6;
}

.settings-header {
  @apply mb-2;
}

.settings-title {
  @apply text-2xl font-extrabold text-text-default;
}

.settings-subtitle {
  @apply text-sm text-text-muted mt-1;
}

.settings-card {
  @apply flex flex-col gap-5 bg-bg-surface border border-border-default rounded-2xl p-6;
}

.settings-card-danger {
  @apply border-text-error/30;
}

.settings-card-header {
  @apply flex flex-col gap-1;
}

.settings-card-title {
  @apply text-lg font-bold text-text-default;
}

.settings-card-title-danger {
  @apply text-text-error;
}

.settings-card-description {
  @apply text-sm text-text-muted;
}

.settings-field {
  @apply flex flex-col gap-1.5;
}

.settings-label {
  @apply text-sm text-text-default font-medium;
}

.settings-input-wrap {
  @apply relative;
}

.settings-input {
  @apply w-full bg-bg-input border border-border-default rounded-lg px-4 py-3 text-sm text-text-default placeholder:text-text-muted outline-none focus:border-border-brand transition-colors;
}

.settings-input-icon-pad {
  @apply pr-10;
}

.settings-input-icon {
  @apply absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm;
}

.settings-toggle-password {
  @apply cursor-pointer hover:opacity-80 transition-opacity bg-transparent border-none p-0;
}

.settings-success {
  @apply text-sm text-text-brand;
}

.settings-error {
  @apply text-sm text-text-error;
}

.settings-avatar-row {
  @apply flex items-center gap-4;
}

.settings-avatar-img {
  @apply w-16 h-16 rounded-full object-cover border border-border-default;
}

.settings-avatar-actions {
  @apply flex flex-col gap-1;
}

.settings-file-input {
  @apply hidden;
}

.settings-avatar-hint {
  @apply text-xs text-text-muted;
}

.settings-btn-primary {
  @apply self-start px-5 py-2.5 rounded-xl text-sm font-bold text-text-on-brand bg-bg-brand hover:bg-bg-brand-hover transition-colors active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed;
}

.settings-btn-secondary {
  @apply self-start px-4 py-2 rounded-lg text-sm font-semibold text-text-default bg-bg-container border border-border-default hover:border-border-brand transition-colors cursor-pointer active:scale-[0.97];
}

.settings-btn-danger {
  @apply self-start px-5 py-2.5 rounded-xl text-sm font-bold text-text-on-brand bg-text-error hover:opacity-90 transition-opacity active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed;
}

.settings-modal-overlay {
  @apply fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-6;
}

.settings-modal {
  @apply flex flex-col gap-4 bg-bg-surface border border-border-default rounded-2xl p-6 max-w-sm w-full;
}

.settings-modal-title {
  @apply text-lg font-bold text-text-default;
}

.settings-modal-text {
  @apply text-sm text-text-muted;
}

.settings-modal-actions {
  @apply flex items-center justify-end gap-2 mt-1;
}

.avatar_error {
  @apply text-sm text-text-error;
}
</style>
