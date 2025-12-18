/**
 * Lógica de animação ao rolar (Reveal & Parallax)
 * Usa IntersectionObserver para performance
 */

const initScrollReveal = () => {

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obs.unobserve(entry.target); // Para de observar após revelar
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    const revealElements = document.querySelectorAll('.scroll-reveal, .fade-in-up');
    revealElements.forEach(el => observer.observe(el));
};

const initParallaxScroll = () => {
    const parallaxElements = document.querySelectorAll('.parallax-element');
    if (parallaxElements.length === 0) return;

    let ticking = false;

    const updateParallax = () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {

            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = parseFloat(el.dataset.speed) || 0.5;

                el.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
            }
        });
        
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
};

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initParallaxScroll();
});
