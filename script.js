// ===== Blueprint Grid Canvas =====
const canvas = document.getElementById('gridCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const dots = [];
    const spacing = 40;
    const init = () => {
        dots.length = 0;
        for (let x = 0; x < w; x += spacing) {
            for (let y = 0; y < h; y += spacing) {
                dots.push({ x, y, baseAlpha: Math.random() * 0.3 + 0.05 });
            }
        }
    };
    init();
    window.addEventListener('resize', init);

    let mouse = { x: -1000, y: -1000 };
    document.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

    const draw = () => {
        ctx.clearRect(0, 0, w, h);
        dots.forEach(d => {
            const dx = mouse.x - d.x, dy = mouse.y - d.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - dist / 200);
            const alpha = d.baseAlpha + influence * 0.5;
            const size = 1 + influence * 2;
            ctx.beginPath();
            ctx.arc(d.x, d.y, size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(232, 168, 85, ${alpha})`;
            ctx.fill();
        });
        requestAnimationFrame(draw);
    };
    draw();
}

// ===== Navbar Scroll =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== Rotating Text (framer-motion style) =====
const rotatingWrapper = document.getElementById('rotatingText');
if (rotatingWrapper) {
    const words = rotatingWrapper.querySelectorAll('.hero-rotating-word');
    let currentIndex = 0;

    setInterval(() => {
        const current = words[currentIndex];
        current.classList.remove('active');
        current.classList.add('exit-up');

        const nextIndex = (currentIndex + 1) % words.length;
        const next = words[nextIndex];

        // Reset position to below before animating in
        next.classList.remove('exit-up');
        next.style.transform = 'translateY(80px)';
        next.style.opacity = '0';

        // Trigger reflow, then animate in
        void next.offsetWidth;
        next.classList.add('active');
        next.style.transform = '';
        next.style.opacity = '';

        // Clean up exit class after transition
        setTimeout(() => {
            current.classList.remove('exit-up');
        }, 500);

        currentIndex = nextIndex;
    }, 2000);
}

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle) {
    navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// ===== Scroll Reveal =====
const revealElements = document.querySelectorAll('.reveal-up');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
revealElements.forEach(el => observer.observe(el));

// ===== Active Nav Link =====
const sections = document.querySelectorAll('.section, .hero');
const navItems = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
        }
    });
}, { threshold: 0.3 });
sections.forEach(s => navObserver.observe(s));
