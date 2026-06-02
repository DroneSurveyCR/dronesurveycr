/**
 * Drone Survey CR - Analytics & CTA Components
 * Self-initializing script that injects Meta Pixel, GA4 tracking, sticky mobile CTA, and exit-intent popup
 * Production-quality with error handling and accessibility support
 */

(function() {
  'use strict';

  // ============================================================================
  // 1. META PIXEL INITIALIZATION
  // TODO: Add Meta Pixel ID when ready
  // ============================================================================
  // (function initMetaPixel() {
  //   window.fbq = window.fbq || function() {
  //     (window.fbq.q = window.fbq.q || []).push(arguments);
  //   };
  //   window.fbq('init', 'YOUR_PIXEL_ID_HERE');
  //   window.fbq('track', 'PageView');
  //
  //   // Fallback for users with JavaScript disabled
  //   if (document.readyState === 'loading') {
  //     const noscriptImg = document.createElement('img');
  //     noscriptImg.height = '1';
  //     noscriptImg.width = '1';
  //     noscriptImg.style.display = 'none';
  //     noscriptImg.src = 'https://www.facebook.com/tr?id=YOUR_PIXEL_ID_HERE&ev=PageView&noscript=1';
  //     document.body.appendChild(noscriptImg);
  //   }
  // })();

  // ============================================================================
  // 2. GA4 FORM SUBMISSION & SCROLL DEPTH TRACKING
  // ============================================================================
  (function initGA4Tracking() {
    // Ensure gtag is available
    if (typeof gtag === 'undefined') {
      console.warn('GA4: gtag not found. Ensure Google Analytics script is loaded first.');
      return;
    }

    // Track form submissions via fetch interception
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const [resource] = args;
      const url = typeof resource === 'string' ? resource : resource.url;
      
      // Detect form submission to Supabase
      if (url && url.includes('/api/leads/quote-submit')) {
        gtag('event', 'form_submission', {
          form_name: 'quote_request',
          event_category: 'engagement',
          timestamp: new Date().toISOString()
        });
      }
      
      return originalFetch.apply(this, args);
    };

    // Track scroll depth
    let scrollDepthTracked = {
      25: false,
      50: false,
      75: false,
      100: false
    };

    window.addEventListener('scroll', function() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollPercentage = (scrollTop + windowHeight) / documentHeight;

      [25, 50, 75, 100].forEach(threshold => {
        if (scrollPercentage >= (threshold / 100) && !scrollDepthTracked[threshold]) {
          scrollDepthTracked[threshold] = true;
          gtag('event', 'scroll_depth', {
            depth_percentage: threshold,
            event_category: 'engagement'
          });
        }
      });
    }, { passive: true });

    // Track page views
    gtag('event', 'page_view', {
      page_path: window.location.pathname,
      page_title: document.title
    });
  })();

  // ============================================================================
  // 3. STICKY MOBILE CTA BAR
  // ============================================================================
  (function initMobileCTABar() {
    // Only show on mobile devices
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const ctaBarHTML = `
      <div id="drone-cta-bar" role="banner" aria-label="Call to action bar">
        <button id="cta-whatsapp" type="button" aria-label="Contact us on WhatsApp">
          <span style="margin-right: 8px;">💬</span> WhatsApp
        </button>
        <button id="cta-quote" type="button" aria-label="Request a quote">
          📋 Quote
        </button>
      </div>
    `;

    const ctaBarStyles = `
      #drone-cta-bar {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 60px;
        background: white;
        border-top: 1px solid #e0e0e0;
        display: flex;
        justify-content: space-between;
        gap: 10px;
        padding: 10px;
        z-index: 9999;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        font-family: 'IBM Plex Sans', sans-serif;
      }

      #cta-whatsapp,
      #cta-quote {
        flex: 1;
        padding: 12px 16px;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        white-space: nowrap;
      }

      #cta-whatsapp {
        background: #25d366;
        color: white;
      }

      #cta-whatsapp:active {
        background: #1fa855;
      }

      #cta-quote {
        background: #0080fe;
        color: white;
      }

      #cta-quote:active {
        background: #0056b3;
      }

      @media (min-width: 768px) {
        #drone-cta-bar {
          display: none;
        }
      }
    `;

    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.textContent = ctaBarStyles;
    document.head.appendChild(styleEl);

    // Inject HTML at end of body
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = ctaBarHTML;
    document.body.appendChild(tempDiv.firstElementChild);

    // Attach event listeners
    const whatsappBtn = document.getElementById('cta-whatsapp');
    const quoteBtn = document.getElementById('cta-quote');

    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', function() {
        window.open('https://wa.me/50672938970', '_blank');
      });
    }

    if (quoteBtn) {
      quoteBtn.addEventListener('click', function() {
        // Scroll to quote form or trigger modal
        const quoteForm = document.getElementById('quote-form') || document.querySelector('[data-quote-form]');
        if (quoteForm) {
          quoteForm.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Fallback: trigger quote modal or navigate
          window.location.hash = '#quote';
        }
      });
    }
  })();

  // ============================================================================
  // 4. EXIT-INTENT POPUP
  // ============================================================================
  (function initExitIntentPopup() {
    const popupId = 'drone-exit-popup';
    const sessionKey = 'drone-exit-popup-shown';

    // Check if popup was already shown this session
    if (sessionStorage.getItem(sessionKey)) {
      return;
    }

    const popupHTML = `
      <div id="${popupId}-overlay" role="presentation" aria-hidden="true"></div>
      <div id="${popupId}" role="dialog" aria-labelledby="${popupId}-title" aria-modal="true">
        <button id="${popupId}-close" type="button" aria-label="Close popup">×</button>
        <h2 id="${popupId}-title">Don't Leave Empty-Handed!</h2>
        <p>Get a free aerial survey consultation and discover how drone technology can transform your business.</p>
        <button id="${popupId}-cta" type="button">Get Your Free Consultation</button>
        <p style="font-size: 12px; color: #666; margin-top: 12px;">No credit card required. Takes 2 minutes.</p>
      </div>
    `;

    const popupStyles = `
      #${popupId}-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(48, 47, 64, 0.7);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #${popupId} {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border-radius: 12px;
        padding: 32px 24px;
        max-width: 420px;
        width: 90%;
        z-index: 10001;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        font-family: 'Inter', sans-serif;
        animation: slideUp 0.3s ease-out;
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translate(-50%, -40%);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -50%);
        }
      }

      #${popupId} h2 {
        margin: 0 0 12px 0;
        font-size: 20px;
        font-weight: 700;
        color: #302f40;
        font-family: 'IBM Plex Sans', sans-serif;
      }

      #${popupId} p {
        margin: 0 0 20px 0;
        font-size: 14px;
        color: #555;
        line-height: 1.5;
      }

      #${popupId}-cta {
        width: 100%;
        padding: 12px 20px;
        background: #0080fe;
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      #${popupId}-cta:hover {
        background: #0056b3;
      }

      #${popupId}-cta:active {
        background: #003d82;
      }

      #${popupId}-close {
        position: absolute;
        top: 12px;
        right: 12px;
        background: transparent;
        border: none;
        font-size: 28px;
        color: #999;
        cursor: pointer;
        padding: 0;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: color 0.2s ease;
      }

      #${popupId}-close:hover {
        color: #333;
      }

      @media (max-width: 480px) {
        #${popupId} {
          padding: 24px 16px;
        }

        #${popupId} h2 {
          font-size: 18px;
        }
      }
    `;

    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.textContent = popupStyles;
    document.head.appendChild(styleEl);

    // Function to show popup
    function showPopup() {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = popupHTML;
      const overlay = tempDiv.querySelector(`#${popupId}-overlay`);
      const popup = tempDiv.querySelector(`#${popupId}`);
      document.body.appendChild(overlay);
      document.body.appendChild(popup);

      sessionStorage.setItem(sessionKey, 'true');

      // Close button
      document.getElementById(`${popupId}-close`).addEventListener('click', closePopup);
      overlay.addEventListener('click', closePopup);

      // CTA button
      document.getElementById(`${popupId}-cta`).addEventListener('click', function() {
        gtag('event', 'exit_intent_conversion', {
          event_category: 'engagement',
          event_label: 'popup_cta'
        });
        const quoteForm = document.getElementById('quote-form') || document.querySelector('[data-quote-form]');
        if (quoteForm) {
          quoteForm.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = '#quote';
        }
        closePopup();
      });

      // Prevent overlay click from closing when clicking the popup itself
      popup.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    }

    function closePopup() {
      const overlay = document.getElementById(`${popupId}-overlay`);
      const popup = document.getElementById(popupId);
      if (overlay) overlay.remove();
      if (popup) popup.remove();
    }

    // Desktop: Show on mouseleave
    document.addEventListener('mouseleave', function(e) {
      if (e.clientY <= 0 && !sessionStorage.getItem(sessionKey)) {
        showPopup();
      }
    });

    // Mobile: Show after 45 seconds
    setTimeout(function() {
      if (!sessionStorage.getItem(sessionKey) && window.innerWidth < 768) {
        showPopup();
      }
    }, 45000);
  })();

  // ============================================================================
  // Initialize on DOM Ready
  // ============================================================================
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      // All components self-init