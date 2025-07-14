// This file is prepared for future JavaScript functionality
// You can add your custom JavaScript code here

// Live Sentiment Analysis Demo using TensorFlow.js Toxicity model
// (Classifier removed as requested)

// 1. Theme Toggle with Persistence
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggle.textContent = theme === 'dark' ? '🌙' : '☀️';
}
themeToggle.addEventListener('click', () => {
    const current = document.body.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});
(function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
})();

// 2. Matrix Code Rain Effect
const canvas = document.getElementById('code-rain');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let fontSize = 18;
    let columns = Math.floor(width / fontSize);
    let drops = Array(columns).fill(1);
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&@'.split('');
    function draw() {
        ctx.fillStyle = document.body.getAttribute('data-theme') === 'dark'
            ? 'rgba(26,26,26,0.15)' : 'rgba(243,243,247,0.15)';
        ctx.fillRect(0, 0, width, height);
        ctx.font = fontSize + "px Fira Code, monospace";
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--color-accent');
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(draw, 50);
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        columns = Math.floor(width / fontSize);
        drops = Array(columns).fill(1);
    });
}

// 3. Live Sentiment Analysis Demo (using Toxicity model as a proxy)
// (Removed as requested)

// 4. Project Card Hover Animation (lift on hover) + Keyboard accessibility
document.querySelectorAll('.project-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.035) translateY(-4px)';
        card.style.boxShadow = '0 16px 32px 0 rgba(0,0,0,0.18)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
    card.addEventListener('focus', () => {
        card.style.transform = 'scale(1.035) translateY(-4px)';
        card.style.boxShadow = '0 16px 32px 0 rgba(0,0,0,0.18)';
    });
    card.addEventListener('blur', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
});

// 5. Typing Animation for Job Title
const jobTitle = document.querySelector('header p');
if (jobTitle) {
    const roles = [
        'Machine Learning Engineer @ Google',
        'Deep Learning Enthusiast',
        'NLP & Agentic AI Explorer',
        'Quantitative Finance Fan',
        'Quantum Computing Curious'
    ];
    let idx = 0, char = 0, typing = true;
    function typeLoop() {
        let current = roles[idx];
        if (typing) {
            char++;
            if (char > current.length) {
                typing = false;
                setTimeout(typeLoop, 1200);
                return;
            }
        } else {
            char--;
            if (char === 0) {
                typing = true;
                idx = (idx + 1) % roles.length;
            }
        }
        jobTitle.textContent = current.slice(0, char) + (typing ? '|' : '');
        setTimeout(typeLoop, typing ? 60 : 30);
    }
    setTimeout(typeLoop, 1000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Lazy-load images
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading', 'lazy');
});

// Keyboard accessibility for theme toggle
themeToggle.setAttribute('tabindex', '0');
themeToggle.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
        themeToggle.click();
    }
});
