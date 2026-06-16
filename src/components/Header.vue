<script setup></script>

<template>
  <header class="header">
    <div class="header-inner">
      <!-- Logo -->
      <a href="/" class="header-logo">
        <span class="header-logo-title">Nexus Anime</span>
        <span class="header-logo-sub">Anime</span>
      </a>

      <!-- Actions -->
      <div class="header-actions">
        <button class="header-btn-grid">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" />
            <rect x="14" y="3" width="7" height="7" />
            <rect x="3" y="14" width="7" height="7" />
            <rect x="14" y="14" width="7" height="7" />
          </svg>
        </button>

        <button class="header-btn-avatar">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=nexus"
            alt="Avatar"
            class="header-avatar-img"
          />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
@reference "../assets/main.css";

.header {
  @apply sticky top-0 z-50 bg-bg-surface border-b border-border-default;
}

.header-inner {
  @apply max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between;
}

.header-logo {
  @apply flex items-baseline gap-2 no-underline;
}

.header-logo-title {
  @apply text-[1.05rem] font-extrabold tracking-tight text-text-brand;
  text-shadow: 0 0 18px rgba(0, 240, 255, 0.5);
}

.header-logo-sub {
  @apply text-[0.7rem] font-medium uppercase tracking-widest text-text-muted border-b border-border-brand pb-px;
}

.header-actions {
  @apply flex items-center gap-2;
}

.header-btn-grid {
  @apply flex items-center justify-center w-9 h-9 rounded-lg text-text-muted hover:text-text-default hover:bg-bg-container transition-colors;
}

.header-btn-avatar {
  @apply w-[34px] h-[34px] rounded-full border border-border-default hover:border-border-brand bg-bg-container overflow-hidden transition-colors;
}

.header-avatar-img {
  @apply w-full h-full object-cover;
}
</style>
