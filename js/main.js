/**
 * PS Irrigação - Main Logic
 * Gerenciamento de menu, scroll e estados globais
 */


const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const initMobileMenu = () => {
    const btn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const menu = document.getElementById('mobile-menu');
    const links = document.querySelectorAll('.mobile-link');

    if(!btn || !menu) return;

    const toggleMenu = (isOpen) => {
        if(isOpen) {
            menu.classList.add('open');
            document.body.style.overflow = 'hidden'; // Previne scroll
        } else {
            menu.classList.remove('open');
            document.body.style.overflow = '';
        }
    };

    btn.addEventListener('click', () => toggleMenu(true));
    closeBtn.addEventListener('click', () => toggleMenu(false));
    

    links.forEach(link => {
        link.addEventListener('click', () => toggleMenu(false));
    });


    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && menu.classList.contains('open')) toggleMenu(false);
    });
};

const initHeaderScroll = () => {
    const header = document.getElementById('main-header');
    if(!header) return;
    

    if (window.scrollY > 20) header.classList.add('scrolled');

    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };


    window.addEventListener('scroll', handleScroll, { passive: true });
};

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeaderScroll();
    console.log('PS Irrigação System Ready.');
});
