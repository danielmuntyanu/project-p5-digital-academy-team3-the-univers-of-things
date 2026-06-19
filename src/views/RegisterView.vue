<script setup>
import RegisterForm from '@/components/RegisterForm.vue';

</script>

<template>
  <div class="login-page">
    <!-- Lado izquierdo: imagen + texto -->
    <div class="login-left">
      <img
        src="https://img.freepik.com/premium-photo/mastering-smooth-gradient-backgrounds-techniques-tips-digital-artists_953733-26405.jpg"
        alt="Background"
        class="login-bg-img"
      />
      <div class="login-left-content">
        <h1 class="login-hero-title">
          Your gateway to the <span class="login-hero-highlight">ultimate</span> collection.
        </h1>
        <p class="login-hero-desc">
          Access rare anime collectibles, high-stakes auctions, and a community of elite curators.
          The Nexus is waiting.
        </p>
        <div class="login-stats">
          <div class="login-stat">
            <span class="login-stat-number">150K+</span>
            <span class="login-stat-label">Active Bids</span>
          </div>
          <div class="login-stat">
            <span class="login-stat-number">2.4M</span>
            <span class="login-stat-label">Digital Assets</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Lado derecho: formulario -->
    <div class="login-right">
      <!-- Logo -->
      <div class="login-logo">
        <span class="login-logo-text">Nexus Anime</span>
      </div>

      <!-- Tabs -->
      <div class="login-tabs">
        <RouterLink to="/login" class="login-tab">Sign In</RouterLink>
        <RouterLink to="/register" class="login-tab login-tab--active">Create Account</RouterLink>
      </div>

      <!-- Formulario -->
       <RegisterForm />
      

      <!-- Footer del formulario -->
      <div class="login-form-footer">
        <span class="login-secure">🔒 Secure Server</span>
        <div class="login-form-links">
          <a href="#" class="login-form-link">Support</a>
          <a href="#" class="login-form-link">Privacy</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "../assets/main.css";

.login-page {
  @apply flex min-h-screen bg-bg-body;
}

/* ── Lado izquierdo ── */
.login-left {
  @apply relative w-1/2 overflow-hidden;
}

.login-bg-img {
  @apply absolute inset-0 w-full h-full object-cover;
}

.login-left-content {
  @apply relative z-10 flex flex-col justify-end h-full p-12 pb-16;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.3) 60%,
    transparent 100%
  );
}

.login-hero-title {
  @apply text-5xl font-black text-text-default leading-tight mb-4;
}

.login-hero-highlight {
  @apply text-bg-special;
}

.login-hero-desc {
  @apply text-text-muted text-sm leading-relaxed mb-8 max-w-sm;
}

.login-stats {
  @apply flex gap-4;
}

.login-stat {
  @apply flex flex-col rounded-xl px-5 py-3 bg-black;
}

.login-stat-number {
  @apply text-text-default font-bold text-lg;
}

.login-stat-label {
  @apply text-text-muted text-xs;
}

/* ── Lado derecho ── */
.login-right {
  @apply w-1/2 flex flex-col justify-center px-16 py-12 bg-bg-surface;
}

/* Logo */
.login-logo {
  @apply flex items-center gap-3 mb-10;
}

.login-logo-icon {
  @apply w-10 h-10 rounded-xl bg-bg-brand flex items-center justify-center font-bold text-lg text-text-on-brand;
}

.login-logo-text {
  @apply text-2xl font-extrabold text-text-brand;
  text-shadow: 0 0 9px rgba(0, 240, 255, 0.4);
}

/* Tabs */
.login-tabs {
  @apply flex gap-8 mb-8 border-b border-border-default;
}

.login-tab {
  @apply pb-3 text-sm font-medium text-text-muted no-underline transition-colors;
}

.login-tab--active {
  @apply text-text-brand border-b-2 border-border-brand;
}

/* Footer del form */
.login-form-footer {
  @apply flex items-center justify-between mt-10 text-xs text-text-muted;
}

.login-secure {
  @apply font-mono;
}

.login-form-links {
  @apply flex gap-6;
}

.login-form-link {
  @apply text-text-muted no-underline hover:text-text-default transition-colors;
}

/* Mobile */
@media (max-width: 768px) {
  .login-page {
    @apply flex-col;
  }
  .login-left {
    @apply w-full h-64;
  }
  .login-right {
    @apply w-full px-8 py-10;
  }
}
</style>
