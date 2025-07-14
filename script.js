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
const TYPING_ROLES = [
    'Machine Learning Engineer @ Google',
    'Deep Learning Enthusiast',
    'NLP & Agentic AI Explorer',
    'Quantitative Finance Fan',
    'Quantum Physics Curious'
];
const TYPING_TYPE_SPEED_MS = 60;
const TYPING_DELETE_SPEED_MS = 30;
const TYPING_PAUSE_MS = 1200;

// =====================
// Theme Toggle
// =====================

/**
 * Sets the theme for the site and updates the toggle button.
 * @param {'dark'|'light'} theme
 */
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
}

/**
 * Initializes the theme based on localStorage or default.
 */
function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
}

// Theme toggle button event listeners
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
if (themeToggle) {
    themeToggle.setAttribute('tabindex', '0');
    themeToggle.addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
    themeToggle.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            themeToggle.click();
        }
    });
    initTheme();
}

// =====================
// Code Rain Animation
// =====================

/**
 * Initializes the Matrix-style code rain animation on the hero section canvas.
 */
function initCodeRain() {
    const canvas = document.getElementById('code-rain');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let columns = Math.floor(width / CODE_RAIN_FONT_SIZE);
    let drops = Array(columns).fill(1);

    /**
     * Draws one frame of the code rain animation.
     */
    function draw() {
        const theme = document.body.getAttribute('data-theme');
        ctx.fillStyle = theme === 'dark'
            ? 'rgba(26,26,26,0.15)'
            : 'rgba(243,243,247,0.15)';
        ctx.fillRect(0, 0, width, height);
        ctx.font = `${CODE_RAIN_FONT_SIZE}px Fira Code, monospace`;
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--color-accent');
        for (let i = 0; i < drops.length; i++) {
            const text = CODE_RAIN_CHARS[Math.floor(Math.random() * CODE_RAIN_CHARS.length)];
            ctx.fillText(text, i * CODE_RAIN_FONT_SIZE, drops[i] * CODE_RAIN_FONT_SIZE);
            // Reset drop randomly after reaching bottom
            if (drops[i] * CODE_RAIN_FONT_SIZE > height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }

    setInterval(draw, CODE_RAIN_INTERVAL_MS);

    // Responsive: update canvas size and columns on window resize
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
        const current = TYPING_ROLES[idx];
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
                idx = (idx + 1) % TYPING_ROLES.length;
            }
        }
        jobTitle.textContent = current.slice(0, char) + (typing ? '|' : '');
        setTimeout(typeLoop, typing ? TYPING_TYPE_SPEED_MS : TYPING_DELETE_SPEED_MS);
    }
    setTimeout(typeLoop, 1000);
}
initTypingAnimation();

// =====================
// Smooth Scroll for Anchor Links
// =====================

/**
 * Enables smooth scrolling for all anchor links targeting IDs.
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
initSmoothScroll();

// =====================
// Lazy-load Images
// =====================

/**
 * Sets all images to lazy-load for performance optimization.
 */
function enableLazyLoadImages() {
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });
}
enableLazyLoadImages();
