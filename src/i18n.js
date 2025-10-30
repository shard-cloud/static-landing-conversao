/**
 * i18n module for internationalization support
 * Manages translations and language switching for the landing page
 */

class I18n {
  constructor() {
    this.translations = {};
    this.currentLanguage = this.getStoredLanguage() || this.detectLanguage();
    this.supportedLanguages = ["en", "pt-BR", "es"];
  }

  /**
   * Detect browser language
   */
  detectLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;

    // Check exact match
    if (this.supportedLanguages.includes(browserLang)) {
      return browserLang;
    }

    // Check language code only (e.g., 'pt' from 'pt-PT')
    const langCode = browserLang.split("-")[0];
    const match = this.supportedLanguages.find((lang) =>
      lang.startsWith(langCode)
    );

    return match || "en";
  }

  /**
   * Get stored language from localStorage
   */
  getStoredLanguage() {
    return localStorage.getItem("language");
  }

  /**
   * Set and store language
   */
  setLanguage(language) {
    if (this.supportedLanguages.includes(language)) {
      this.currentLanguage = language;
      localStorage.setItem("language", language);
      return true;
    }
    return false;
  }

  /**
   * Load translation file
   */
  async loadTranslation(language) {
    try {
      const response = await fetch(`/locales/${language}.json`);
      if (!response.ok) {
        throw new Error(`Failed to load translation: ${language}`);
      }
      this.translations[language] = await response.json();
      return true;
    } catch (error) {
      console.error(`Error loading translation ${language}:`, error);
      return false;
    }
  }

  /**
   * Load all translations
   */
  async loadAllTranslations() {
    const promises = this.supportedLanguages.map((lang) =>
      this.loadTranslation(lang)
    );
    await Promise.all(promises);
  }

  /**
   * Get translation for a key
   */
  t(key, params = {}) {
    try {
      // Navigate through nested object
      const keys = key.split(".");
      let value = this.translations[this.currentLanguage];

      for (const k of keys) {
        if (value && typeof value === "object") {
          value = value[k];
        } else {
          break;
        }
      }

      // Fallback to English if not found
      if (value === undefined && this.currentLanguage !== "en") {
        value = this.translations["en"];
        for (const k of keys) {
          if (value && typeof value === "object") {
            value = value[k];
          } else {
            break;
          }
        }
      }

      // If still not found, return key
      if (value === undefined) {
        console.warn(`Translation not found: ${key}`);
        return key;
      }

      // Interpolate parameters
      if (typeof value === "string" && Object.keys(params).length > 0) {
        return value.replace(/\{(\w+)\}/g, (match, key) => {
          return params[key] !== undefined ? params[key] : match;
        });
      }

      return value;
    } catch (error) {
      console.error(`Error translating ${key}:`, error);
      return key;
    }
  }

  /**
   * Update page content with translations
   */
  updatePageContent() {
    // Update meta tags
    document.title = this.t("meta.title");
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", this.t("meta.description"));
    document
      .querySelector('meta[name="keywords"]')
      ?.setAttribute("content", this.t("meta.keywords"));
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", this.t("meta.og_title"));
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", this.t("meta.og_description"));
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute("content", this.t("meta.og_title"));
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", this.t("meta.og_description"));

    // Update lang attribute
    document.documentElement.lang = this.currentLanguage;

    // Update all elements with data-i18n attribute
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const translation = this.t(key);

      if (element.hasAttribute("data-i18n-placeholder")) {
        element.placeholder = translation;
      } else if (element.hasAttribute("data-i18n-aria")) {
        element.setAttribute("aria-label", translation);
      } else {
        element.innerHTML = translation;
      }
    });
  }

  /**
   * Create language switcher
   */
  createLanguageSwitcher() {
    const switcher = document.createElement("div");
    switcher.className = "language-switcher";
    switcher.setAttribute("role", "navigation");
    switcher.setAttribute("aria-label", "Language selector");

    const languages = [
      { code: "en", flag: "🇺🇸", name: "English" },
      { code: "pt-BR", flag: "🇧🇷", name: "Português" },
      { code: "es", flag: "🇪🇸", name: "Español" },
    ];

    languages.forEach((lang) => {
      const button = document.createElement("button");
      button.className = "lang-button";
      button.setAttribute("aria-label", `Switch to ${lang.name}`);
      button.innerHTML = lang.flag;
      button.title = lang.name;

      if (lang.code === this.currentLanguage) {
        button.classList.add("active");
      }

      button.addEventListener("click", async () => {
        if (this.setLanguage(lang.code)) {
          this.updatePageContent();

          // Update active state
          switcher
            .querySelectorAll(".lang-button")
            .forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");
        }
      });

      switcher.appendChild(button);
    });

    return switcher;
  }
}

// Export singleton instance
export const i18n = new I18n();
export const t = (key, params) => i18n.t(key, params);
