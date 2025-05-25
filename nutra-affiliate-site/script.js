// DOM Content Loaded Event Listener
document.addEventListener('DOMContentLoaded', function () {
  // Initialize all functions
  initializeDateDisplay();
  initializeWheelOfFortune();
  initializeCountdownTimer();
  initializeCTAButtons();
  initializeScrollAnimations();
  initializeLazyLoading();
  // Contact form close button
  const closeBtn = document.getElementById('closeContactForm');
  if (closeBtn) {
    closeBtn.addEventListener('click', hideContactFormModal);
  }
  // Overlay click closes modal
  const overlay = document.querySelector('.contact-form-overlay');
  if (overlay) {
    overlay.addEventListener('click', hideContactFormModal);
  }
  // Contact form submit
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Optionally, send data via AJAX here
      contactForm.style.display = 'none';
      document.getElementById('contactFormSuccess').style.display = 'block';
      setTimeout(() => {
        hideContactFormModal();
        // Reset form for next time
        contactForm.reset();
        contactForm.style.display = '';
        document.getElementById('contactFormSuccess').style.display = 'none';
      }, 2500);
    });
  }
});

// Date Display Functions
function initializeDateDisplay() {
  const currentDate = new Date();
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', options);

  // Update current date in header
  const currentDateElement = document.getElementById('current-date');
  if (currentDateElement) {
    currentDateElement.textContent = formattedDate;
  }

  // Update article date (make it seem like it was published today)
  const articleDateElement = document.getElementById('article-date');
  if (articleDateElement) {
    articleDateElement.textContent = formattedDate;
  }
}

// Wheel of Fortune Functionality
function initializeWheelOfFortune() {
  const wheel = document.getElementById('wheel');
  const spinButton = document.getElementById('spinButton');
  const wheelResult = document.getElementById('wheelResult');
  const discountAmountSpan = document.getElementById('discountAmount');

  if (!wheel || !spinButton || !wheelResult || !discountAmountSpan) {
    return; // Exit if elements don't exist
  }

  let isSpinning = false;
  let hasSpun = false;

  const discounts = ['10%', '15%', '20%', '25%', '30%', '35%', '50%'];

  spinButton.addEventListener('click', function () {
    if (isSpinning || hasSpun) return;

    isSpinning = true;
    hasSpun = true;
    spinButton.disabled = true;
    spinButton.innerHTML =
      '<span>SPINNING...</span><i class="fas fa-sync-alt fa-spin"></i>';

    // Force always win 50% OFF for testing
    const segmentAngle = 360 / discounts.length;
    const fiftyIndex = discounts.indexOf('50%');
    // The wheel stops at 0deg, so rotate so that 50% is at the pointer
    const stopAngle = 360 - fiftyIndex * segmentAngle;
    const fullRotations = 4 * 360; // 4 full spins
    const randomRotation = fullRotations + stopAngle;
    const selectedSegment = fiftyIndex;
    const selectedDiscount = discounts[selectedSegment];

    // Apply rotation
    wheel.style.transform = `rotate(${randomRotation}deg)`;
    wheel.classList.add('spinning');

    // Show result after spin animation
    setTimeout(() => {
      wheel.classList.remove('spinning');
      isSpinning = false;

      // Update result display
      discountAmountSpan.textContent = selectedDiscount;
      wheelResult.style.display = 'block';

      // If 50% OFF, show contact form and hide claim button
      if (selectedDiscount === '50%') {
        document.querySelector('.claim-button').style.display = 'none';
        showContactFormModal();
      } else {
        document.querySelector('.claim-button').style.display = '';
      }

      // Smooth scroll to result
      wheelResult.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      // Start countdown timer
      startCountdownTimer();

      // Add confetti effect
      createConfettiEffect();
    }, 3000); // Match CSS transition duration
  });
}

// Countdown Timer for Wheel Result
function startCountdownTimer() {
  const countdownElement = document.getElementById('countdown');
  if (!countdownElement) return;

  let timeLeft = 15 * 60; // 15 minutes in seconds

  function updateCountdown() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft <= 0) {
      countdownElement.textContent = '00:00';
      countdownElement.parentElement.innerHTML =
        '<span style="color: #dc2626; font-weight: bold;">⚠️ OFFER EXPIRED</span>';
      return;
    }

    timeLeft--;
  }

  // Update immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// General Countdown Timer Initialization
function initializeCountdownTimer() {
  // Add urgency countdown in other sections if needed
  const urgencyElements = document.querySelectorAll('.urgency-countdown');

  urgencyElements.forEach(element => {
    let timeLeft = 30 * 60; // 30 minutes

    function updateUrgencyTimer() {
      const hours = Math.floor(timeLeft / 3600);
      const minutes = Math.floor((timeLeft % 3600) / 60);
      const seconds = timeLeft % 60;

      let display = '';
      if (hours > 0) {
        display = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      } else {
        display = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      }

      element.textContent = display;
      timeLeft--;
    }

    updateUrgencyTimer();
    setInterval(updateUrgencyTimer, 1000);
  });
}

// CTA Button Interactions
function initializeCTAButtons() {
  const ctaButtons = document.querySelectorAll('.cta-button');

  ctaButtons.forEach(button => {
    // Add click tracking
    button.addEventListener('click', function (e) {
      // Create ripple effect
      createRippleEffect(e, this);

      // Track button click (you can integrate with analytics here)
      console.log('CTA Button clicked:', this.textContent.trim());

      // Add to cart functionality or redirect
      handleCTAClick(this);
    });

    // Add hover effects
    button.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-3px) scale(1.02)';
    });

    button.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
}

// Handle CTA Button Clicks
function handleCTAClick(button) {
  const buttonText = button.textContent.trim().toLowerCase();

  if (
    buttonText.includes('claim') ||
    buttonText.includes('order') ||
    buttonText.includes('buy')
  ) {
    // Simulate order process
    showOrderModal();
  } else if (buttonText.includes('learn')) {
    // Scroll to product information
    const productSection = document.querySelector('.product-showcase');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

// Show Order Modal (placeholder)
function showOrderModal() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        backdrop-filter: blur(5px);
    `;

  // Create modal
  const modal = document.createElement('div');
  modal.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        margin: 20px;
        position: relative;
        animation: modalSlideIn 0.3s ease-out;
    `;

  modal.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 20px;">🎉</div>
        <h2 style="color: #1e293b; margin-bottom: 15px;">Thank You for Your Interest!</h2>
        <p style="color: #64748b; margin-bottom: 25px;">
            This is a template demonstration. In a real implementation, 
            this would redirect to your secure checkout page.
        </p>
        <button id="closeModal" style="
            background: linear-gradient(135deg, #dc2626, #b91c1c);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        ">Close</button>
    `;

  // Add CSS animation
  const style = document.createElement('style');
  style.textContent = `
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
  document.head.appendChild(style);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close modal functionality
  const closeButton = modal.querySelector('#closeModal');
  const closeModal = () => {
    overlay.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(overlay);
      document.head.removeChild(style);
    }, 300);
  };

  closeButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  // Add fadeOut animation
  style.textContent += `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
}

// Create Ripple Effect for Buttons
function createRippleEffect(event, element) {
  const ripple = document.createElement('span');
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;

  const style = document.createElement('style');
  style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;

  if (!document.head.querySelector('style[data-ripple]')) {
    style.setAttribute('data-ripple', 'true');
    document.head.appendChild(style);
  }

  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

// Create Confetti Effect
function createConfettiEffect() {
  const colors = [
    '#ff6b6b',
    '#4ecdc4',
    '#45b7d1',
    '#96ceb4',
    '#feca57',
    '#ff9ff3',
  ];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
  }
}

function createConfettiPiece(color) {
  const confetti = document.createElement('div');
  confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${color};
        top: -10px;
        left: ${Math.random() * 100}vw;
        z-index: 10000;
        pointer-events: none;
        animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
        transform: rotate(${Math.random() * 360}deg);
    `;

  const style = document.createElement('style');
  style.textContent = `
        @keyframes confettiFall {
            to {
                transform: translateY(100vh) rotate(720deg);
                opacity: 0;
            }
        }
    `;

  if (!document.head.querySelector('style[data-confetti]')) {
    style.setAttribute('data-confetti', 'true');
    document.head.appendChild(style);
  }

  document.body.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 5000);
}

// Scroll Animations
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Add scroll animations to cards and sections
  const animatedElements = document.querySelectorAll(`
        .expert-card,
        .review-card,
        .product-showcase,
        .wheel-section,
        .final-cta
    `);

  animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
}

// Lazy Loading for Images
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[src]');

  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';

        const newImg = new Image();
        newImg.onload = () => {
          img.style.opacity = '1';
        };
        newImg.src = img.src;

        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Smooth Scrolling for Anchor Links
function initializeSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

// Utility Functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Add scroll-to-top functionality
function addScrollToTop() {
  const scrollButton = document.createElement('button');
  scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #dc2626, #b91c1c);
        color: white;
        border: none;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
    `;

  document.body.appendChild(scrollButton);

  const toggleScrollButton = debounce(() => {
    if (window.pageYOffset > 300) {
      scrollButton.style.opacity = '1';
      scrollButton.style.transform = 'translateY(0)';
    } else {
      scrollButton.style.opacity = '0';
      scrollButton.style.transform = 'translateY(10px)';
    }
  }, 100);

  window.addEventListener('scroll', toggleScrollButton);

  scrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Initialize scroll-to-top after DOM loads
document.addEventListener('DOMContentLoaded', addScrollToTop);

// Performance optimization: Preload critical images
function preloadCriticalImages() {
  const criticalImages = [
    // Add your critical image URLs here
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face',
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = src;
    link.as = 'image';
    document.head.appendChild(link);
  });
}

// Initialize preloading
preloadCriticalImages();

// Contact Form Modal Logic
function showContactFormModal() {
  const modal = document.getElementById('contactFormModal');
  if (!modal) return;
  modal.style.display = 'flex';
}

function hideContactFormModal() {
  const modal = document.getElementById('contactFormModal');
  if (!modal) return;
  modal.style.display = 'none';
}
