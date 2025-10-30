/**
 * Landing Page Script
 * Handles form submission and user interactions
 */

import { i18n, t } from "./i18n.js";

// Configuration
const CONFIG = {
  WEBHOOK_URL: "", // Configure your webhook URL here
  ANALYTICS_ID: "", // Optional: Google Analytics ID
};

// DOM Elements
let leadForm, successModal, closeModalBtn, navCTA, ctaButtonLarge;

/**
 * Initialize app
 */
async function init() {
  // Load translations
  await i18n.loadAllTranslations();

  // Update page content with current language
  i18n.updatePageContent();

  // Add language switcher to header
  const nav = document.querySelector(".nav");
  if (nav) {
    const switcher = i18n.createLanguageSwitcher();
    nav.appendChild(switcher);
  }

  // Get DOM elements after translations are loaded
  leadForm = document.getElementById("leadForm");
  successModal = document.getElementById("successModal");
  closeModalBtn = document.getElementById("closeModal");
  navCTA = document.querySelector(".nav-cta");
  ctaButtonLarge = document.querySelector(".cta-button-large");

  setupFormSubmission();
  setupModalHandlers();
  setupCTAButtons();
  setupAnalytics();
}

/**
 * Form submission handler
 */
function setupFormSubmission() {
  if (!leadForm) return;

  leadForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(leadForm);
    const email = formData.get("email");

    // Validate email
    if (!isValidEmail(email)) {
      showError("Please enter a valid email"); // Basic error - can be enhanced with i18n
      return;
    }

    // Show loading state
    const submitButton = leadForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    try {
      // Send to webhook (if configured)
      if (CONFIG.WEBHOOK_URL) {
        await submitToWebhook({ email });
      }

      // Store in localStorage (fallback)
      storeLeadLocally(email);

      // Show success modal
      showSuccessModal();

      // Reset form
      leadForm.reset();

      // Track conversion
      trackConversion("lead_captured", { email });
    } catch (error) {
      console.error("Error submitting form:", error);
      showError("Something went wrong. Please try again."); // Basic error - can be enhanced with i18n
    } finally {
      // Restore button state
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    }
  });
}

/**
 * Submit form data to webhook
 */
async function submitToWebhook(data) {
  if (!CONFIG.WEBHOOK_URL) {
    console.log("[Mock] Form data:", data);
    return;
  }

  const response = await fetch(CONFIG.WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...data,
      timestamp: new Date().toISOString(),
      source: window.location.href,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

/**
 * Store lead data locally (fallback)
 */
function storeLeadLocally(email) {
  try {
    const leads = JSON.parse(localStorage.getItem("leads") || "[]");
    leads.push({
      email,
      timestamp: new Date().toISOString(),
      source: window.location.href,
    });
    localStorage.setItem("leads", JSON.stringify(leads));
    console.log("Lead stored locally:", email);
  } catch (error) {
    console.error("Error storing lead:", error);
  }
}

/**
 * Email validation
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Show success modal
 */
function showSuccessModal() {
  if (successModal) {
    successModal.classList.add("show");
    successModal.setAttribute("aria-hidden", "false");

    // Focus on close button for accessibility
    setTimeout(() => {
      closeModalBtn?.focus();
    }, 100);
  }
}

/**
 * Hide success modal
 */
function hideSuccessModal() {
  if (successModal) {
    successModal.classList.remove("show");
    successModal.setAttribute("aria-hidden", "true");
  }
}

/**
 * Setup modal event handlers
 */
function setupModalHandlers() {
  // Close button
  closeModalBtn?.addEventListener("click", hideSuccessModal);

  // Click outside modal
  successModal?.addEventListener("click", (e) => {
    if (e.target === successModal) {
      hideSuccessModal();
    }
  });

  // Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && successModal?.classList.contains("show")) {
      hideSuccessModal();
    }
  });
}

/**
 * Setup CTA buttons to scroll to form
 */
function setupCTAButtons() {
  const scrollToForm = (e) => {
    e.preventDefault();
    const heroSection = document.querySelector(".hero");
    heroSection?.scrollIntoView({ behavior: "smooth" });

    // Focus on email input for accessibility
    setTimeout(() => {
      document.getElementById("email")?.focus();
    }, 500);
  };

  navCTA?.addEventListener("click", scrollToForm);
  ctaButtonLarge?.addEventListener("click", scrollToForm);
}

/**
 * Show error message
 */
function showError(message) {
  // Create or update error message
  let errorEl = document.querySelector(".form-error");

  if (!errorEl) {
    errorEl = document.createElement("div");
    errorEl.className = "form-error";
    errorEl.setAttribute("role", "alert");
    leadForm?.insertBefore(errorEl, leadForm.firstChild);
  }

  errorEl.textContent = message;
  errorEl.style.cssText = `
    background: #fee;
    color: #c33;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    text-align: center;
  `;

  // Remove after 5 seconds
  setTimeout(() => {
    errorEl?.remove();
  }, 5000);
}

/**
 * Setup analytics tracking
 */
function setupAnalytics() {
  // Google Analytics (if configured)
  if (CONFIG.ANALYTICS_ID && window.gtag) {
    gtag("config", CONFIG.ANALYTICS_ID, {
      page_path: window.location.pathname,
    });
  }
}

/**
 * Track conversion events
 */
function trackConversion(eventName, data = {}) {
  // Google Analytics
  if (window.gtag) {
    gtag("event", eventName, data);
  }

  // Console log for development
  console.log("Conversion tracked:", eventName, data);

  // Facebook Pixel (if configured)
  if (window.fbq) {
    fbq("track", "Lead");
  }
}

/**
 * Smooth scroll polyfill for older browsers
 */
if (!("scrollBehavior" in document.documentElement.style)) {
  const script = document.createElement("script");
  script.src =
    "https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js";
  document.head.appendChild(script);
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

// Export for testing (if needed)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    isValidEmail,
    storeLeadLocally,
    submitToWebhook,
  };
}
