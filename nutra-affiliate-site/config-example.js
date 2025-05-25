// Nutra Affiliate Landing Page Configuration
// Copy this file to 'config.js' and customize with your actual content

const SITE_CONFIG = {
  // Basic Information
  country_name: 'United States',
  title: 'Revolutionary Weight Loss Discovery Shocks Medical Community',

  // Images (Replace with your actual image URLs)
  hero_image:
    'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=500&fit=crop',
  product_photos:
    'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=600&fit=crop',

  // Content
  expert_opinions:
    "After 30 years in medical practice, I've never seen results like this. The clinical trials show unprecedented success rates that challenge everything we thought we knew about weight management.",

  reviews:
    'I lost 35 pounds in just 8 weeks! This product completely changed my life. I have more energy, confidence, and feel amazing. The results speak for themselves!',

  footer:
    '© 2024 Health Tribune. All rights reserved. Results may vary. Individual results are not guaranteed.',

  // Pricing
  original_price: '$149.99',
  sale_price: '$79.99',
  savings_amount: '$70',

  // Contact Information
  support_email: 'support@healthtribune.com',
  support_phone: '1-800-HEALTH',

  // Checkout/Order URL
  checkout_url: 'https://your-checkout-page.com',

  // Social Media Links
  social_links: {
    facebook: 'https://facebook.com/yourpage',
    twitter: 'https://twitter.com/yourhandle',
    instagram: 'https://instagram.com/yourprofile',
  },

  // Analytics
  google_analytics_id: 'GA_MEASUREMENT_ID',
  facebook_pixel_id: 'FB_PIXEL_ID',

  // Wheel of Fortune Settings
  wheel_discounts: ['10%', '15%', '20%', '25%', '30%', '35%'],
  countdown_duration: 15, // minutes

  // Urgency Settings
  stock_level: 47, // fake stock level for urgency
  visitor_count: 1247, // fake visitor count

  // Legal/Compliance
  privacy_policy_url: '#',
  terms_of_service_url: '#',
  refund_policy_url: '#',

  // Additional Expert Opinions
  additional_experts: [
    {
      name: 'Dr. Michael Stevens',
      title: 'Chief Medical Officer, Health Institute',
      photo:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
      quote:
        "The clinical results we've seen are unprecedented. This could revolutionize how we approach wellness and health maintenance.",
    },
    {
      name: 'Dr. Lisa Rodriguez',
      title: 'Research Director, Wellness Foundation',
      photo:
        'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
      quote:
        "In my 20 years of research, I've never encountered a breakthrough quite like this. The science is remarkable.",
    },
  ],

  // Additional Reviews
  additional_reviews: [
    {
      name: 'Sarah M.',
      location: 'New York',
      photo:
        'https://images.unsplash.com/photo-1494790108755-2616b612b1c3?w=50&h=50&fit=crop&crop=face',
      rating: 5,
      date: '3 days ago',
      text: 'I was skeptical at first, but the results speak for themselves. This product has genuinely changed my life. Highly recommend!',
    },
    {
      name: 'Mike T.',
      location: 'California',
      photo:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      rating: 5,
      date: '1 week ago',
      text: 'Amazing results in just a few weeks! My doctor is impressed with the improvements. Worth every penny.',
    },
    {
      name: 'Jennifer L.',
      location: 'Texas',
      photo:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face',
      rating: 5,
      date: '2 weeks ago',
      text: "I've tried everything over the years, but nothing worked like this. Finally found something that delivers real results!",
    },
  ],

  // Product Benefits/Features
  product_benefits: [
    'Scientifically proven formula',
    '30-day money-back guarantee',
    'No side effects reported',
    'Recommended by doctors',
    'Made in FDA-approved facility',
    '100% natural ingredients',
  ],

  // Trust Badges
  trust_badges: [
    {
      text: 'Clinically Tested',
      icon: 'fas fa-check-circle',
    },
    {
      text: 'FDA Compliant',
      icon: 'fas fa-shield-alt',
    },
    {
      text: '100% Natural',
      icon: 'fas fa-leaf',
    },
  ],

  // Guarantees
  guarantees: [
    {
      text: '30-Day Money Back',
      icon: 'fas fa-shield-alt',
    },
    {
      text: 'Free Shipping',
      icon: 'fas fa-truck',
    },
    {
      text: 'Secure Checkout',
      icon: 'fas fa-lock',
    },
  ],
};

// Function to apply configuration to the page
function applyConfiguration() {
  // Replace placeholders in HTML
  document.title = `${SITE_CONFIG.title} - Breaking News in ${SITE_CONFIG.country_name}`;

  // Update all text placeholders
  const placeholders = {
    '{country_name}': SITE_CONFIG.country_name,
    '{title}': SITE_CONFIG.title,
    '{hero_image}': SITE_CONFIG.hero_image,
    '{expert_opinions}': SITE_CONFIG.expert_opinions,
    '{product_photos}': SITE_CONFIG.product_photos,
    '{reviews}': SITE_CONFIG.reviews,
    '{footer}': SITE_CONFIG.footer,
  };

  // Replace placeholders in the DOM
  function replacePlaceholders(element) {
    if (element.nodeType === Node.TEXT_NODE) {
      let text = element.textContent;
      Object.keys(placeholders).forEach(placeholder => {
        text = text.replace(
          new RegExp(placeholder, 'g'),
          placeholders[placeholder]
        );
      });
      element.textContent = text;
    } else if (element.nodeType === Node.ELEMENT_NODE) {
      // Handle image src attributes
      if (element.tagName === 'IMG' && element.src) {
        Object.keys(placeholders).forEach(placeholder => {
          if (element.src.includes(placeholder)) {
            element.src = element.src.replace(
              placeholder,
              placeholders[placeholder]
            );
          }
        });
      }

      // Recursively process child nodes
      Array.from(element.childNodes).forEach(child => {
        replacePlaceholders(child);
      });
    }
  }

  // Apply to entire document
  replacePlaceholders(document.body);

  // Update pricing
  const originalPriceElements = document.querySelectorAll('.original-price');
  originalPriceElements.forEach(
    el => (el.textContent = SITE_CONFIG.original_price)
  );

  const salePriceElements = document.querySelectorAll('.sale-price');
  salePriceElements.forEach(el => (el.textContent = SITE_CONFIG.sale_price));

  const savingsElements = document.querySelectorAll('.savings');
  savingsElements.forEach(
    el => (el.textContent = `Save ${SITE_CONFIG.savings_amount}!`)
  );

  // Update checkout URLs
  updateCheckoutLinks();

  // Add analytics tracking
  addAnalyticsTracking();
}

// Update checkout links
function updateCheckoutLinks() {
  const ctaButtons = document.querySelectorAll('.cta-button');
  ctaButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      if (
        this.textContent.toLowerCase().includes('claim') ||
        this.textContent.toLowerCase().includes('order') ||
        this.textContent.toLowerCase().includes('buy')
      ) {
        e.preventDefault();
        window.open(SITE_CONFIG.checkout_url, '_blank');
      }
    });
  });
}

// Add analytics tracking
function addAnalyticsTracking() {
  // Google Analytics
  if (
    SITE_CONFIG.google_analytics_id &&
    SITE_CONFIG.google_analytics_id !== 'GA_MEASUREMENT_ID'
  ) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.google_analytics_id}`;
    document.head.appendChild(script);

    const initScript = document.createElement('script');
    initScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${SITE_CONFIG.google_analytics_id}');
        `;
    document.head.appendChild(initScript);
  }

  // Facebook Pixel
  if (
    SITE_CONFIG.facebook_pixel_id &&
    SITE_CONFIG.facebook_pixel_id !== 'FB_PIXEL_ID'
  ) {
    const fbScript = document.createElement('script');
    fbScript.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${SITE_CONFIG.facebook_pixel_id}');
            fbq('track', 'PageView');
        `;
    document.head.appendChild(fbScript);
  }
}

// Initialize configuration when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyConfiguration);
} else {
  applyConfiguration();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
