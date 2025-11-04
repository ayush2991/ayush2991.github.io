/**
 * Portfolio Site Main JavaScript
 * Handles theme toggling, code rain animation, project card interactions, typing animation, smooth scrolling, and accessibility.
 */

// =====================
// Configuration Section
// =====================

/** Code rain animation settings */
const CODE_RAIN_FONT_SIZE = 18;
const CODE_RAIN_INTERVAL_MS = 50;
const CODE_RAIN_CHARS = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@'.split('');

/** Project card animation settings */
const PROJECT_CARD_SCALE = 1.035;
const PROJECT_CARD_TRANSLATE_Y = -4; // px
const PROJECT_CARD_BOX_SHADOW = '0 16px 32px 0 rgba(0,0,0,0.18)';

/** Typing animation settings */
const ROLE_VARIANTS = [
    'Machine Learning Engineer',
    'Search & NLP Specialist',
];
const ROLE_SUFFIX = ' @ Google';
const TYPING_TYPE_SPEED_MS = 60;
const TYPING_DELETE_SPEED_MS = 30;
const TYPING_PAUSE_MS = 1200;

// Theme is determined by the user's device preference (prefers-color-scheme).
// No manual toggle UI — the page sets `data-theme` on <body> at load.
const root = document.documentElement;

// =====================
// Code Rain Animation (requestAnimationFrame version)
// =====================

/**
 * Initializes the Matrix-style code rain animation on the hero section canvas.
 * Uses requestAnimationFrame for smoother animation.
 */
function initCodeRain() {
    const canvas = document.getElementById('code-rain');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let columns = Math.floor(width / CODE_RAIN_FONT_SIZE);
    let drops = Array(columns).fill(1);

    let lastRainTime = 0;

    /**
     * Draws one frame of the code rain animation.
     * @param {DOMHighResTimeStamp} currentTime
     */
    function draw(currentTime = 0) {
        // Throttle to desired interval
        if (currentTime - lastRainTime < CODE_RAIN_INTERVAL_MS) {
            requestAnimationFrame(draw);
            return;
        }
        lastRainTime = currentTime;

        // Fetch CSS variables for background and accent color
        const computedStyle = getComputedStyle(document.body);
        const backgroundColor = computedStyle.getPropertyValue('--color-background').trim();
        const accentColor = computedStyle.getPropertyValue('--color-accent').trim();

        // Use RGBA fallback for background overlay
        ctx.fillStyle = backgroundColor ? backgroundColor + '26' : 'rgba(26,26,26,0.15)';
        ctx.fillRect(0, 0, width, height);

        ctx.font = `${CODE_RAIN_FONT_SIZE}px Fira Code, monospace`;
        ctx.fillStyle = accentColor || '#b34a2e';
        for (let i = 0; i < drops.length; i++) {
            const text = CODE_RAIN_CHARS[Math.floor(Math.random() * CODE_RAIN_CHARS.length)];
            ctx.fillText(text, i * CODE_RAIN_FONT_SIZE, drops[i] * CODE_RAIN_FONT_SIZE);
            if (drops[i] * CODE_RAIN_FONT_SIZE > height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / CODE_RAIN_FONT_SIZE);
        drops = Array(columns).fill(1);
    });
}
initCodeRain();

// =====================
// Project Card Animation & Accessibility
// =====================

/**
 * Adds interactive hover/focus effects and keyboard accessibility to project cards.
 */
function initProjectCardInteractions() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('mouseenter', () => {
            card.style.transform = `scale(${PROJECT_CARD_SCALE}) translateY(${PROJECT_CARD_TRANSLATE_Y}px)`;
            card.style.boxShadow = PROJECT_CARD_BOX_SHADOW;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
        card.addEventListener('focus', () => {
            card.style.transform = `scale(${PROJECT_CARD_SCALE}) translateY(${PROJECT_CARD_TRANSLATE_Y}px)`;
            card.style.boxShadow = PROJECT_CARD_BOX_SHADOW;
        });
        card.addEventListener('blur', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
}
initProjectCardInteractions();

// =====================
// Typing Animation for Job Title
// =====================

/**
 * Animates the job title in the hero section to cycle through ML-related roles.
 */
function initTypingAnimation() {
    const jobTitle = document.querySelector('header p');
    if (!jobTitle) return;

    let idx = 0, char = 0, typing = true;

    /**
     * Handles the typing and deleting animation loop.
     */
    function typeLoop() {
        const current = ROLE_VARIANTS[idx];
        if (typing) {
            char++;
            if (char > current.length) {
                typing = false;
                setTimeout(typeLoop, TYPING_PAUSE_MS);
                return;
            }
        } else {
            char--;
            if (char === 0) {
                typing = true;
                idx = (idx + 1) % ROLE_VARIANTS.length;
            }
        }
    const rolePart = current.slice(0, char);
    jobTitle.textContent = rolePart + (typing ? '|' : '') + ROLE_SUFFIX;
        setTimeout(typeLoop, typing ? TYPING_TYPE_SPEED_MS : TYPING_DELETE_SPEED_MS);
    }
    setTimeout(typeLoop, 1000);
}
initTypingAnimation();

// =====================
// Smooth Scroll for Anchor Links (with accessibility)
// =====================

/**
 * Enables smooth scrolling for all anchor links targeting IDs.
 * After scrolling, focuses the target section for accessibility.
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => {
                    if (!target.hasAttribute('tabindex')) {
                        target.setAttribute('tabindex', '-1');
                    }
                    target.focus();
                }, 500);
            }
        });
    });
}
initSmoothScroll();

// =====================
// Lazy-load Images
// =====================

/**
 * Sets all images with class 'lazy-img' to lazy-load for performance optimization.
 * Excludes images with class 'no-lazy'.
 */
function enableLazyLoadImages() {
    document.querySelectorAll('img:not(.no-lazy)').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
}
enableLazyLoadImages();
