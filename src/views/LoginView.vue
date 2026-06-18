<script setup></script>

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
        <a href="#" class="login-tab login-tab--active">Sign In</a>
        <a href="#" class="login-tab">Create Account</a>
      </div>

      <!-- Formulario -->
      <div class="login-form">
        <div class="login-field">
          <label class="login-label">Email Address</label>
          <div class="login-input-wrap">
            <input type="email" placeholder="anime@nexus.com" class="login-input" />
            <span class="login-input-icon">✉</span>
          </div>
        </div>

        <div class="login-field">
          <div class="login-field-header">
            <label class="login-label">Password</label>
            <a href="#" class="login-forgot">Forgot password?</a>
          </div>
          <div class="login-input-wrap">
            <input type="password" placeholder="••••••••" class="login-input" />
            <span class="login-input-icon">🔒</span>
          </div>
        </div>

        <div class="login-remember">
          <input type="checkbox" id="remember" class="login-checkbox" />
          <label for="remember" class="login-remember-label">Stay signed in for 30 days</label>
        </div>

        <a href="#" class="login-submit"> Access The Nexus → </a>
      </div>

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

/* Formulario */
.login-form {
  @apply flex flex-col gap-5;
}

.login-field {
  @apply flex flex-col gap-1.5;
}

.login-field-header {
  @apply flex items-center justify-between;
}

.login-label {
  @apply text-sm text-text-default font-medium;
}

.login-forgot {
  @apply text-sm text-text-brand no-underline hover:opacity-80 transition-opacity;
}

.login-input-wrap {
  @apply relative;
}

.login-input {
  @apply w-full bg-bg-input border border-border-default rounded-lg px-4 py-3 text-sm text-text-default placeholder:text-text-muted outline-none focus:border-border-brand transition-colors pr-10;
}

.login-input-icon {
  @apply absolute right-3 top-1/2 -translate-y-1/2 text-text-muted text-sm;
}

.login-remember {
  @apply flex items-center gap-2;
}

.login-checkbox {
  @apply w-4 h-4 accent-bg-brand;
}

.login-remember-label {
  @apply text-sm text-text-muted;
}

.login-submit {
  @apply block w-full py-3 rounded-xl text-center font-bold text-text-on-brand no-underline bg-bg-brand hover:bg-bg-brand-hover transition-colors;
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
