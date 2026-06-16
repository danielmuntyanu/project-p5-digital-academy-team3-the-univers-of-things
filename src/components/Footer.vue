<script setup></script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <!-- Columna 1: Logo + descripción + iconos -->
      <div class="footer-brand">
        <span class="footer-logo">Nexus Anime</span>
        <p class="footer-desc">
          The world's premier ecosystem for high-end anime collectibles, media discovery, and
          community engagement.
        </p>
        <div class="footer-icons">
          <button class="footer-icon-btn">🌐</button>
          <button class="footer-icon-btn">↗</button>
          <button class="footer-icon-btn">✉</button>
        </div>
      </div>

      <!-- Columna 2: Navigation -->
      <div class="footer-col">
        <h4 class="footer-col-title">Navigation</h4>
        <ul class="footer-links">
          <li><a href="#" class="footer-link">Marketplace</a></li>
          <li><a href="#" class="footer-link">Live Auctions</a></li>
          <li><a href="#" class="footer-link">Anime Calendar</a></li>
          <li><a href="#" class="footer-link">Community Hub</a></li>
        </ul>
      </div>

      <!-- Columna 3: Resources -->
      <div class="footer-col">
        <h4 class="footer-col-title">Resources</h4>
        <ul class="footer-links">
          <li><a href="#" class="footer-link">Collection Value Guide</a></li>
          <li><a href="#" class="footer-link">Seller Protection</a></li>
          <li><a href="#" class="footer-link">API Documentation</a></li>
          <li><a href="#" class="footer-link">Knowledge Base</a></li>
        </ul>
      </div>

      <!-- Columna 4: Newsletter -->
      <div class="footer-col">
        <h4 class="footer-col-title">Newsletter</h4>
        <p class="footer-newsletter-desc">Subscribe for the latest drops and late anime news.</p>
        <div class="footer-newsletter-form">
          <input type="email" placeholder="Email address" class="footer-input" />
          <button class="footer-subscribe-btn">Subscribe</button>
        </div>
      </div>
    </div>

    <!-- Barra inferior -->
    <div class="footer-bottom">
      <span class="footer-copy">© 2024 NEXUS ANIME ECOSYSTEM. ALL RIGHTS RESERVED.</span>
      <div class="footer-bottom-links">
        <a href="#" class="footer-bottom-link">Privacy Policy</a>
        <a href="#" class="footer-bottom-link">Terms of Service</a>
        <a href="#" class="footer-bottom-link">Cookie Settings</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@reference "../assets/main.css";

.footer {
  @apply bg-bg-body border-t border-border-default mt-16;
}

.footer-inner {
  @apply max-w-7xl mx-auto px-6 py-12 grid grid-cols-4 gap-10;
}

/* Columna 1 */
.footer-brand {
  @apply flex flex-col gap-4;
}

.footer-logo {
  @apply text-text-brand font-extrabold text-xl tracking-tight;
  text-shadow: 0 0 18px rgba(0, 240, 255, 0.5);
}

.footer-desc {
  @apply text-text-muted text-sm leading-relaxed;
}

.footer-icons {
  @apply flex gap-3;
}

.footer-icon-btn {
  @apply w-8 h-8 rounded-full border border-border-default flex items-center justify-center text-text-muted hover:text-text-default hover:border-border-brand transition-colors text-sm;
}

/* Columnas 2 y 3 */
.footer-col {
  @apply flex flex-col gap-4;
}

.footer-col-title {
  @apply text-text-default font-semibold text-xs uppercase tracking-widest;
}

.footer-links {
  @apply flex flex-col gap-2 list-none;
}

.footer-link {
  @apply text-text-muted text-sm hover:text-text-default transition-colors no-underline;
}

/* Columna 4 */
.footer-newsletter-desc {
  @apply text-text-muted text-sm leading-relaxed;
}

.footer-newsletter-form {
  @apply flex flex-col gap-2;
}

.footer-input {
  @apply bg-bg-container border border-border-default rounded-lg px-3 py-2 text-sm text-text-default placeholder:text-text-muted outline-none focus:border-border-brand transition-colors;
}

.footer-subscribe-btn {
  @apply bg-bg-container border border-border-default rounded-lg px-4 py-2 text-sm text-text-default hover:border-border-brand transition-colors;
}

/* Barra inferior */
.footer-bottom {
  @apply max-w-7xl mx-auto px-6 py-4 border-t border-border-default flex items-center justify-between;
}

.footer-copy {
  @apply text-text-muted text-xs;
}

.footer-bottom-links {
  @apply flex gap-6;
}

.footer-bottom-link {
  @apply text-text-muted text-xs hover:text-text-default transition-colors no-underline uppercase tracking-wide;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-inner {
    @apply grid-cols-2;
  }
}

@media (max-width: 480px) {
  .footer-inner {
    @apply grid-cols-1;
  }

  .footer-bottom {
    @apply flex-col gap-4 text-center;
  }
}
</style>
