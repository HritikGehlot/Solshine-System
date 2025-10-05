/**
 * Solshine Systems Website JavaScript
 * Interactive functionality for modern solar website
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollEffects();
    initializeFormHandling();
    initializeFAQ();
    initializeProjectFilters();
    initializeAnimations();
    initializeScrollToTop();
    initializeStats();
});

/**
 * Navigation functionality
 */
function initializeNavigation() {
    const navToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle?.contains(e.target) && !navMenu?.contains(e.target)) {
            navToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            }
        });
    }
}

/**
 * Smooth scrolling effects
 */
function initializeScrollEffects() {
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.service-card, .value-card, .team-card, .project-card, .testimonial-card');
    animatedElements.forEach((el, index) => {
        // Initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(el);
    });
}

/**
 * Form handling functionality
 */
function initializeFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Validate form
            if (validateForm(data)) {
                // Show loading state
                showFormLoading(true);
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    showFormLoading(false);
                    showFormSuccess();
                    contactForm.reset();
                }, 2000);
            }
        });
    }

    // Form validation
    function validateForm(data) {
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'propertyType'];
        const errors = [];
        
        requiredFields.forEach(field => {
            if (!data[field] || data[field].trim() === '') {
                errors.push(`${field.replace(/([A-Z])/g, ' $1').toLowerCase()} is required`);
            }
        });
        
        // Email validation
        if (data.email && !isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        // Phone validation
        if (data.phone && !isValidPhone(data.phone)) {
            errors.push('Please enter a valid phone number');
        }
        
        if (errors.length > 0) {
            showFormErrors(errors);
            return false;
        }
        
        clearFormErrors();
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        const cleanPhone = phone.replace(/[\s\-\(\)\.]/g, '');
        return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10;
    }
    
    function showFormLoading(show) {
        const submitBtn = contactForm?.querySelector('button[type="submit"]');
        if (submitBtn) {
            if (show) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Get Free Quote';
            }
        }
    }
    
    function showFormSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div style="background: #10b981; color: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem; text-align: center;">
                <i class="fas fa-check-circle"></i> Thank you! We'll contact you within 24 hours.
            </div>
        `;
        
        contactForm?.insertBefore(successMessage, contactForm.firstChild);
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    
    function showFormErrors(errors) {
        clearFormErrors();
        
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-errors';
        errorContainer.innerHTML = `
            <div style="background: #ef4444; color: white; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                <strong>Please correct the following errors:</strong>
                <ul style="margin: 0.5rem 0 0 1rem;">
                    ${errors.map(error => `<li>${error}</li>`).join('')}
                </ul>
            </div>
        `;
        
        contactForm?.insertBefore(errorContainer, contactForm.firstChild);
    }
    
    function clearFormErrors() {
        const existingErrors = contactForm?.querySelector('.form-errors');
        existingErrors?.remove();
    }
}

/**
 * FAQ accordion functionality
 */
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question?.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Project filter functionality
 */
function initializeProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(otherBtn => otherBtn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category')?.split(' ') || [];
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Initialize animations and interactive elements
 */
function initializeAnimations() {
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            const heroBackground = heroSection.querySelector('::before');
            if (heroBackground) {
                heroSection.style.transform = `translateY(${rate}px)`;
            }
        });
    }
    
    // Hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Scroll to top functionality
 */
function initializeScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #f59e0b 0%, #0ea5e9 100%);
        color: white;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide scroll button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
            scrollBtn.style.transform = 'translateY(0)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
            scrollBtn.style.transform = 'translateY(20px)';
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Button hover effect
    scrollBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
        this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.2)';
    });
    
    scrollBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    });
}

/**
 * Animate statistics counters
 */
function initializeStats() {
    const statNumbers = document.querySelectorAll('.stat-number, .impact-number');
    
    const countUp = (element, target) => {
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    };
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const target = parseInt(element.textContent.replace(/\D/g, ''));
                
                if (target && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                    countUp(element, target);
                }
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

/**
 * Utility functions
 */

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS for ripple effect
const rippleCSS = document.createElement('style');
rippleCSS.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleCSS);

// Performance optimization: Use passive listeners where appropriate
const passiveOptions = { passive: true };

// Add optimized scroll listener
window.addEventListener('scroll', throttle(function() {
    // Optimized scroll handling
}, 16), passiveOptions);

// Add resize listener for responsive adjustments
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.getElementById('mobile-menu');
    
    if (window.innerWidth > 768) {
        navMenu?.classList.remove('active');
        navToggle?.classList.remove('active');
        document.body.style.overflow = '';
    }
}, 250));

// Add keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.getElementById('mobile-menu');
        
        navMenu?.classList.remove('active');
        navToggle?.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Enter or Space to activate buttons
    if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('filter-btn')) {
        e.preventDefault();
        e.target.click();
    }
});

// Initialize service worker for better performance (if supported)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration would go here
        console.log('Solshine Systems website loaded successfully');
    });
}

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.addEventListener('load', function() {
                this.style.transition = 'opacity 0.3s ease';
                this.style.opacity = '1';
            });
        }
    });
});

// Console message for developers
console.log(`
🌞 Solshine Systems Website
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ Modern solar energy solutions
🚀 Built with vanilla HTML, CSS & JavaScript
🎨 Clean, responsive, and accessible design
💚 Powered by renewable energy enthusiasm

Need solar consultation? Contact us today!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);