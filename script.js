// Restored in Christ UK - Main JavaScript

// Add this to your DOMContentLoaded event handler
document.addEventListener('DOMContentLoaded', function () {
    // Update copyright year
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Initialize the event countdown
    initCountdown();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize newsletter form
    initNewsletterForm();

    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize scroll effect for navigation
    initScrollEffect();
});

/**
 * Event Countdown Timer
 * Set your event date in the targetDate variable
 */
function initCountdown() {
    // Set the date we're counting down to (format: YYYY-MM-DD)
    const targetDate = new Date('2025-08-09').getTime();

    // Update the countdown every 1 second
    const countdownTimer = setInterval(function () {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.event_countdown').innerHTML = "EVENT HAS STARTED!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown_days').textContent = days;
        document.getElementById('countdown_hours').textContent = hours;
        document.getElementById('countdown_minutes').textContent = minutes;
        document.getElementById('countdown_seconds').textContent = seconds;
    }, 1000);
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');

    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.classList.add('mobile-menu-btn');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');

    const mediaQuery = window.matchMedia('(max-width: 768px)');

    function handleScreenChange(e) {
        if (e.matches) {
            if (!document.querySelector('.mobile-menu-btn')) {
                header.insertBefore(mobileMenuBtn, nav);
                nav.classList.add('mobile-nav');
            }
        } else {
            if (document.querySelector('.mobile-menu-btn')) {
                document.querySelector('.mobile-menu-btn').remove();
                nav.classList.remove('mobile-nav', 'active');
            }
        }
    }

    handleScreenChange(mediaQuery);
    mediaQuery.addEventListener('change', handleScreenChange);

    document.addEventListener('click', function (e) {
        if (e.target.closest('.mobile-menu-btn')) {
            nav.classList.toggle('active');
            const isExpanded = nav.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
            mobileMenuBtn.innerHTML = isExpanded ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        } else if (!e.target.closest('nav') && nav.classList.contains('active')) {
            nav.classList.remove('active');
            if (document.querySelector('.mobile-menu-btn')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.setAttribute('aria-expanded', false);
            }
        }
    });

    if (!document.getElementById('mobile-menu-styles')) {
        const style = document.createElement('style');
        style.id = 'mobile-menu-styles';
        style.textContent = `
            @media (max-width: 768px) {
                header {
                    position: relative;
                }
                .mobile-menu-btn {
                    display: block;
                    background: none;
                    border: none;
                    color: var(--primary-color);
                    font-size: 1.5rem;
                    cursor: pointer;
                    z-index: 100;
                }
                .mobile-nav {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background-color: white;
                    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
                    padding: 1rem;
                }
                .mobile-nav.active {
                    display: block;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Handle navigation scroll effect
 */
function initScrollEffect() {
    const banner = document.querySelector('.banner');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    });
    
    // Check initial scroll position (in case page is refreshed while scrolled)
    if (window.scrollY > 100) {
        document.body.classList.add('scrolled');
    }
}