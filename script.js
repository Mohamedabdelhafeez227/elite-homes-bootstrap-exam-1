// Services Data Structure
const servicesData = {
  buying: {
    title: "Home Buying Made Simple",
    desc: "Our expert team guides you through every step of the home buying process, from initial search to closing day.",
    theme: "theme-purple",
    btnText: "Start Your Search",
    image: "imges/family.png",
    badgePos: "badge-left",
    statValue: "98%",
    statLabel: "Success Rate",
    features: [
      { icon: "fa-magnifying-glass", title: "Property Search", desc: "Access exclusive listings and get notified of new properties that match your criteria." },
      { icon: "fa-calculator", title: "Financial Planning", desc: "Get pre-approved for mortgages and understand your budget with our financial experts." },
      { icon: "fa-handshake", title: "Negotiation Support", desc: "Our skilled negotiators ensure you get the best possible deal on your dream home." }
    ]
  },
  selling: {
    title: "Maximize Your Home's Value",
    desc: "Sell your property quickly and for the best price with our comprehensive marketing strategy and expert guidance.",
    theme: "theme-green",
    btnText: "Get Home Valuation",
    image: "imges/man.png",
    badgePos: "badge-right",
    statValue: "21 days",
    statLabel: "Avg. Time to Sell",
    features: [
      { icon: "fa-chart-line", title: "Market Analysis", desc: "Get a comprehensive market analysis to price your home competitively." },
      { icon: "fa-camera", title: "Professional Marketing", desc: "High-quality photography, virtual tours, and multi-channel marketing campaigns." },
      { icon: "fa-users-gear", title: "Buyer Screening", desc: "We pre-qualify buyers to ensure serious inquiries and smooth transactions." }
    ]
  },
  renting: {
    title: "Premium Rental Properties",
    desc: "Find your perfect rental home with our extensive portfolio of quality properties and personalized service.",
    theme: "theme-purple",
    btnText: "Browse Rentals",
    image: "imges/house.png",
    badgePos: "badge-left",
    statValue: "5,000+",
    statLabel: "Available Rentals",
    features: [
      { icon: "fa-location-dot", title: "Prime Locations", desc: "Access rentals in the most desirable neighborhoods and communities." },
      { icon: "fa-shield-halved", title: "Verified Properties", desc: "All our rental properties are thoroughly inspected and verified for quality." },
      { icon: "fa-headset", title: "24/7 Support", desc: "Round-the-clock maintenance and tenant support services." }
    ]
  },
  investing: {
    title: "Real Estate Investment",
    desc: "Build wealth through strategic real estate investments with our expert guidance and market insights.",
    theme: "theme-gold",
    btnText: "Explore Investments",
    image: "imges/data.png",
    badgePos: "badge-right",
    statValue: "15%",
    statLabel: "Avg. Annual ROI",
    features: [
      { icon: "fa-pie-chart", title: "Portfolio Analysis", desc: "Comprehensive analysis of investment opportunities and portfolio optimization." },
      { icon: "fa-file-invoice-dollar", title: "ROI Projections", desc: "Detailed return on investment calculations and market forecasting." },
      { icon: "fa-gear", title: "Property Management", desc: "Full-service property management for hands-off investment experience." }
    ]
  },
  commercial: {
    title: "Commercial Real Estate",
    desc: "Expert commercial real estate services for businesses, investors, and developers.",
    theme: "theme-blue",
    btnText: "View Commercial Properties",
    image: "imges/building.png",
    badgePos: "badge-left",
    statValue: "$2.5B",
    statLabel: "Commercial Volume",
    features: [
      { icon: "fa-building", title: "Office Spaces", desc: "Prime office locations for businesses of all sizes and industries." },
      { icon: "fa-warehouse", title: "Industrial Properties", desc: "Warehouses, manufacturing facilities, and distribution centers." },
      { icon: "fa-store", title: "Retail Spaces", desc: "High-traffic retail locations and shopping center opportunities." }
    ]
  }
};

// DOM Elements
const tabBtns = document.querySelectorAll('.tab-btn');
const serviceTitle = document.getElementById('service-title');
const serviceDesc = document.getElementById('service-desc');
const featuresList = document.getElementById('features-list');
const serviceBtn = document.getElementById('service-btn');
const serviceImg = document.getElementById('service-img');
const statBadge = document.getElementById('stat-badge');
const statValue = document.getElementById('stat-value');
const statLabel = document.getElementById('stat-label');

// Render Content Function
function renderTab(tabKey) {
  const data = servicesData[tabKey];
  if (!data) return;

  // Smooth Transition Fade Out
  serviceImg.style.opacity = '0.3';
  
  setTimeout(() => {
    // Update Text & Main Elements
    serviceTitle.textContent = data.title;
    serviceDesc.textContent = data.desc;
    serviceImg.src = data.image;
    serviceBtn.textContent = data.btnText;
    
    // Update Button Color Theme
    serviceBtn.className = `service-action-btn ${data.theme}`;
    
    // Update Floating Stat Card
    statValue.textContent = data.statValue;
    statLabel.textContent = data.statLabel;
    statBadge.className = `stat-badge ${data.badgePos} ${data.theme}-text`;

    // Render Features List
    featuresList.innerHTML = data.features.map(feat => `
      <div class="feature-item">
        <div class="feature-icon ${data.theme}-icon">
          <i class="fa-solid ${feat.icon}"></i>
        </div>
        <div class="feature-text">
          <h4>${feat.title}</h4>
          <p>${feat.desc}</p>
        </div>
      </div>
    `).join('');

    // Smooth Transition Fade In
    serviceImg.style.opacity = '1';
  }, 150);
}

// Attach Event Listeners to Tab Buttons
tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTab(btn.getAttribute('data-tab'));
  });
});

// Initial Setup on Load
document.addEventListener('DOMContentLoaded', () => {
  renderTab('buying');
});





















// ==========================================
// TESTIMONIALS CAROUSEL (HORIZONTAL SLIDE + AUTOPLAY)
// ==========================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.carousel-dots .dot');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carouselContainer = document.querySelector('.carousel-wrapper');

let currentSlide = 0;
let autoPlayTimer = null;
const slideInterval = 4000; // تقليب تلقائي كل 4 ثواني

function showSlide(targetIndex, direction = 'next') {
  if (targetIndex === currentSlide) return;

  // التعامل مع حدود المصفوفة (تكرار دائري)
  let nextIndex = targetIndex;
  if (nextIndex >= testimonialCards.length) nextIndex = 0;
  if (nextIndex < 0) nextIndex = testimonialCards.length - 1;

  const currentCard = testimonialCards[currentSlide];
  const nextCard = testimonialCards[nextIndex];

  // إزالة التنسيقات السابقة
  testimonialCards.forEach(card => {
    card.classList.remove('active', 'slide-left', 'slide-right');
  });

  // تجهيز الاتجاه وتطبيق الانزلاق الأفقي
  if (direction === 'next') {
    currentCard.classList.add('slide-left');
    nextCard.style.transform = 'translateX(100%)';
  } else {
    currentCard.classList.add('slide-right');
    nextCard.style.transform = 'translateX(-100%)';
  }

  // تفعيل الكارت الجديد وبداية الانزلاق للمنتصف
  setTimeout(() => {
    nextCard.classList.add('active');
    nextCard.style.transform = '';
  }, 20);

  // تحديث الـ Dots السفلية
  dots.forEach((dot, idx) => {
    if (idx === nextIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });

  currentSlide = nextIndex;
}

function nextSlide() {
  showSlide(currentSlide + 1, 'next');
}

function prevSlide() {
  showSlide(currentSlide - 1, 'prev');
}

// التحكم في التشغيل التلقائي
function startAutoPlay() {
  stopAutoPlay();
  autoPlayTimer = setInterval(nextSlide, slideInterval);
}

function stopAutoPlay() {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
}

// إضافة أحداث الضغط على الأسهم
if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => {
    nextSlide();
    startAutoPlay();
  });

  prevBtn.addEventListener('click', () => {
    prevSlide();
    startAutoPlay();
  });
}

// إضافة أحداث الضغط على الـ Dots
dots.forEach((dot, idx) => {
  dot.addEventListener('click', () => {
    const direction = idx > currentSlide ? 'next' : 'prev';
    showSlide(idx, direction);
    startAutoPlay();
  });
});

// إيقاف التقليب التلقائي مؤقتاً عند تودية الماوس فوق السلايدر
if (carouselContainer) {
  carouselContainer.addEventListener('mouseenter', stopAutoPlay);
  carouselContainer.addEventListener('mouseleave', startAutoPlay);
}

// تشغيل التقليب التلقائي فور التحميل
document.addEventListener('DOMContentLoaded', () => {
  startAutoPlay();
});




























// ==========================================
// FAQ ACCORDION LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    questionBtn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // اغلاق باقي الأسئلة الشائعة (لو عايزه يفتح واحد بس في المرة)
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        otherAnswer.style.maxHeight = null;
      });

      // فتح أو غلق السؤال الحالي
      if (!isOpen) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});








// ==========================================
// CONTACT FORM HANDLING
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;

      // Temporary Loading State on Submit
      submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
      submitBtn.style.opacity = '0.8';

      setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
        submitBtn.style.backgroundColor = '#10b981';
        submitBtn.style.opacity = '1';

        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.backgroundColor = '';
        }, 3000);
      }, 1200);
    });
  }
});