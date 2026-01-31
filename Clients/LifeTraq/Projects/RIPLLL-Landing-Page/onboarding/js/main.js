// RIPLLL Employee Onboarding & Retention Landing Page JavaScript

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
            console.log('Onboarding CTA Clicked:', {
                text: ctaText,
                href: ctaHref,
                page: 'onboarding',
                timestamp: new Date().toISOString()
            });
            // Add your analytics tracking here
        });
    });

    // Animate engagement score circle
    const scoreCircles = document.querySelectorAll('.score-circle');
    const scoreObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 1.5s ease-in-out';
            }
        });
    }, { threshold: 0.5 });

    scoreCircles.forEach(circle => {
        scoreObserver.observe(circle);
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

    // Onboarding-specific tracking
    console.log('RIPLLL Employee Onboarding & Retention Page Initialized');
    console.log('Target Audience: L&D Leaders, HR Directors, Talent Management');

});

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);
