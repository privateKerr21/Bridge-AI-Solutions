// RIPLLL Executive Coaching Landing Page JavaScript
// Handles interactive elements including FAQ accordion and scroll animations

document.addEventListener('DOMContentLoaded', function() {

    // FAQ Accordion Functionality
    initFAQAccordion();

    // Scroll Animations
    initScrollAnimations();

    // Smooth Scrolling for Anchor Links
    initSmoothScrolling();
});

/**
 * FAQ Accordion - Dynamic content wrapping and toggle functionality
 */
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('h3');

        if (question) {
            // Collect all content after the h3 (paragraphs, lists, etc.)
            const content = [];
            let sibling = question.nextElementSibling;

            while (sibling) {
                content.push(sibling);
                sibling = sibling.nextElementSibling;
            }

            // Create wrapper div for FAQ content
            const wrapper = document.createElement('div');
            wrapper.className = 'faq-item-content';

            // Move all content into the wrapper
            content.forEach(el => {
                wrapper.appendChild(el);
            });

            // Append wrapper to FAQ item
            question.parentNode.appendChild(wrapper);

            // Add click handler to question
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                // Close all FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                // Toggle current item (close if it was active, open if it wasn't)
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

/**
 * Scroll Animations - Fade in elements as they enter viewport
 */
function initScrollAnimations() {
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

    // Observe benefits, features, and testimonials
    const animatedElements = document.querySelectorAll(
        '.coaching-benefit, .feature, .testimonial, .process-step'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

/**
 * Smooth Scrolling - For anchor links
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Don't prevent default for # only (back to top)
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Progress Value Animation - Count up effect for dashboard metrics
 */
function animateProgressValues() {
    const progressValues = document.querySelectorAll('.progress-value');

    progressValues.forEach(value => {
        const finalValue = value.textContent;
        const numericValue = parseInt(finalValue.replace(/[^0-9]/g, ''));

        if (!isNaN(numericValue)) {
            let current = 0;
            const increment = numericValue / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    value.textContent = finalValue;
                    clearInterval(timer);
                } else {
                    value.textContent = Math.floor(current) + finalValue.replace(/[0-9]/g, '');
                }
            }, 20);
        }
    });
}

// Initialize progress animation when dashboard comes into view
const dashboardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressValues();
            dashboardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const dashboardShowcase = document.querySelector('.dashboard-showcase');
if (dashboardShowcase) {
    dashboardObserver.observe(dashboardShowcase);
}

// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

if (mobileMenuToggle && nav) {
    mobileMenuToggle.addEventListener('click', () => {
        nav.classList.toggle('mobile-open');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('mobile-open');
            mobileMenuToggle.classList.remove('active');
        });
    });
}
