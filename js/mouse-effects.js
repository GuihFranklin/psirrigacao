/**
 * Efeitos interativos do mouse (Partículas e Tilt 3D)
 */

class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        if(!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.resize();
        this.initParticles();
        this.animate();


        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => this.resize(), 200);
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initParticles() {
        this.particles = [];

        const count = window.innerWidth < 768 ? 20 : 50;
        
        for(let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                size: Math.random() * 2 + 0.5
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#66ACC5';
        this.ctx.strokeStyle = 'rgba(102, 172, 197, 0.08)'; 

        this.particles.forEach((p, index) => {
            p.x += p.vx;
            p.y += p.vy;


            if(p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if(p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();


            for(let j = index + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx*dx + dy*dy);

                if(dist < 140) {
                    this.ctx.lineWidth = 1 - (dist / 140);
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

const initTilt = () => {
    const elements = document.querySelectorAll('[data-tilt]');
    if(elements.length === 0) return;
    
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const updateTilt = () => {

        targetX += (mouseX - targetX) * 0.05; 
        targetY += (mouseY - targetY) * 0.05;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (targetX - centerX) / 60;
        const moveY = (targetY - centerY) / 60;

        elements.forEach(el => {
            el.style.transform = `perspective(1000px) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
        });

        requestAnimationFrame(updateTilt);
    };

    updateTilt();
};

document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();

    if(window.matchMedia('(pointer: fine)').matches) {
        initTilt();
    }
});
