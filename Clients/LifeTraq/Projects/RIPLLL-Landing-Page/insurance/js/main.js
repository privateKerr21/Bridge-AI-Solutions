// RIPLLL Insurance Incentivization Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');

    // Wrap content in each FAQ item
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        if (question) {
            // Get all siblings after h3
            const content = [];
            let sibling = question.nextElementSibling;
            while (sibling) {
                content.push(sibling);
                sibling = sibling.nextElementSibling;
            }

            // Create wrapper div
            const wrapper = document.createElement('div');
            wrapper.className = 'faq-item-content';

            // Move content into wrapper
            content.forEach(el => {
                wrapper.appendChild(el);
            });

            // Append wrapper after question
            question.parentNode.appendChild(wrapper);

            // Add click handler to question
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');

                // Close all FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                // Toggle current item (if it wasn't active)
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Intersection Observer for scroll animations
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

    // Observe sections for animation
    const animatedElements = document.querySelectorAll('.benefit, .step, .feature, .testimonial, .faq-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Mobile menu toggle
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav');
        const header = document.querySelector('.header');

        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-toggle')) {
                const toggle = document.createElement('button');
                toggle.className = 'mobile-menu-toggle';
                toggle.innerHTML = '☰';
                toggle.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 2rem;
                    color: var(--primary-blue);
                    cursor: pointer;
                    display: block;
                `;

                header.querySelector('.container').insertBefore(toggle, nav);

                toggle.addEventListener('click', () => {
                    nav.classList.toggle('mobile-open');
                    toggle.innerHTML = nav.classList.contains('mobile-open') ? '✕' : '☰';
                });
            }
        }
    };

    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Add scroll effect to header
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // Track CTA clicks (for analytics - placeholder)
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-primary, .cta-button-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ctaText = this.textContent.trim();
            const ctaHref = this.getAttribute('href');
            console.log('Insurance CTA Clicked:', {
                text: ctaText,
                href: ctaHref,
                page: 'insurance',
                timestamp: new Date().toISOString()
            });
            // Add your analytics tracking here
        });
    });

    // Animate dashboard metrics on scroll
    const dashboardMetrics = document.querySelectorAll('.metric-value');
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'countUp 1s ease-out';
            }
        });
    }, { threshold: 0.5 });

    dashboardMetrics.forEach(metric => {
        metricsObserver.observe(metric);
    });

    // Star rating animation
    const starRatings = document.querySelectorAll('.star-rating');
    starRatings.forEach(rating => {
        rating.style.transition = 'all 0.5s ease';
    });

    // Highlight stats on hover
    const stats = document.querySelectorAll('.stat, .why-it-matters');
    stats.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(4px)';
        });
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // Add dynamic year to copyright
    const copyrightElement = document.querySelector('.footer-copyright p');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.innerHTML = copyrightElement.innerHTML.replace('2026', currentYear);
    }

    // Insurance-specific tracking
    console.log('RIPLLL Insurance Incentivization Page Initialized');
    console.log('Target Audience: Health Plans, Medicare Advantage, Self-Funded Employers');

});

// Add CSS for count-up animation
const style = document.createElement('style');
style.textContent = `
    @keyframes countUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
