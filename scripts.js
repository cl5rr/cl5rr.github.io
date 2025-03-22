document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'u')) {
            const tip = document.createElement('div');
            tip.style.position = 'fixed';
            tip.textContent = 'dude... github exists.';
            tip.style.bottom = '30px';
            tip.style.left = '50%';
            tip.style.transform = 'translateX(-50%)';
            tip.style.backgroundColor = 'rgba(25, 25, 35, 0.8)';
            tip.style.color = '#fff';
            tip.style.padding = '10px 20px';
            tip.style.borderRadius = '12px';
            tip.style.zIndex = '10000';
            tip.style.fontFamily = 'Arial, sans-serif';
            tip.style.fontSize = '14px';
            tip.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            tip.style.backdropFilter = 'blur(10px)';
            tip.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            document.body.appendChild(tip);

            setTimeout(() => {
                document.body.removeChild(tip);
            }, 5000);
            e.preventDefault();
        }
    });

    let isTabbing = false;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !isTabbing) {
            isTabbing = true;
            const tip = document.createElement('div');
            tip.style.position = 'fixed';
            tip.textContent = 'tip: use arrow keys (← → or ↑ ↓) to navigate. see how much i care about people?';
            tip.style.bottom = '30px';
            tip.style.left = '50%';
            tip.style.transform = 'translateX(-50%)';
            tip.style.backgroundColor = 'rgba(25, 25, 35, 0.8)';
            tip.style.color = '#fff';
            tip.style.padding = '10px 20px';
            tip.style.borderRadius = '12px';
            tip.style.zIndex = '10000';
            tip.style.fontFamily = 'Arial, sans-serif';
            tip.style.fontSize = '14px';
            tip.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
            tip.style.backdropFilter = 'blur(10px)';
            tip.style.border = '1px solid rgba(255, 255, 255, 0.1)';
            document.body.appendChild(tip);

            setTimeout(() => {
                document.body.removeChild(tip);
                isTabbing = false;
            }, 5000);
        }
    });

    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } },
                "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
                "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } }
            },
            "retina_detect": true
        });
    }

    const hungaryFlag = document.getElementById('hungaryFlag');
    if (hungaryFlag) {
        hungaryFlag.addEventListener('click', function() {
            window.open('https://youtu.be/vsFdsmnXXew', '_blank');
        });
    }

    const bgMusic = document.getElementById('bgMusic');
    let musicStarted = false;

    document.addEventListener('click', function() {
        if (!musicStarted && bgMusic) {
            bgMusic.play().catch(e => console.log('Audio playback error:', e));
            musicStarted = true;
        }
    }, { once: true });

    const navLinks = document.querySelectorAll('.nav-menu a[data-section]');
    const sections = document.querySelectorAll('section');
    let currentSection = document.querySelector('section.active');
    let isAnimating = false;

    const switchSection = (targetId) => {
        if (isAnimating) return;

        const targetSection = document.getElementById(targetId);
        if (!targetSection || targetSection === currentSection) return;

        isAnimating = true;

        currentSection.classList.add('inactive');

        setTimeout(() => {
            currentSection.classList.remove('active');
            currentSection.classList.remove('inactive');

            targetSection.classList.add('active');
            currentSection = targetSection;

            setTimeout(() => {
                isAnimating = false;
            }, 800);
        }, 800);
    };

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            switchSection(targetId);
        });
    });

    document.addEventListener('keydown', (e) => {
        const sectionIds = Array.from(sections).map(section => section.id);
        const currentIndex = sectionIds.indexOf(currentSection.id);

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            const nextIndex = (currentIndex + 1) % sectionIds.length;
            switchSection(sectionIds[nextIndex]);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            const prevIndex = (currentIndex - 1 + sectionIds.length) % sectionIds.length;
            switchSection(sectionIds[prevIndex]);
        }
    });

    const dialogueBox = document.getElementById('dialogue-box');
    const dialogueElements = document.querySelectorAll('[data-dialogue]');

    dialogueElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const dialogue = this.getAttribute('data-dialogue');
            dialogueBox.textContent = dialogue;
            dialogueBox.style.opacity = '1';
        });

        element.addEventListener('mouseleave', function() {
            dialogueBox.style.opacity = '0';
        });

        element.addEventListener('click', function() {
            if (this.classList.contains('card') || this.tagName === 'H2' || this.tagName === 'P') {
                this.style.transform = 'scale(1.03) translateY(-5px)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
        });
    });

    window.addEventListener('wheel', function(e) {
        e.preventDefault();

        if (!isAnimating) {
            const sectionIds = Array.from(sections).map(section => section.id);
            const currentIndex = sectionIds.indexOf(currentSection.id);

            if (e.deltaY > 0) {
                const nextIndex = (currentIndex + 1) % sectionIds.length;
                switchSection(sectionIds[nextIndex]);
            } else {
                const prevIndex = (currentIndex - 1 + sectionIds.length) % sectionIds.length;
                switchSection(sectionIds[prevIndex]);
            }
        }
    }, { passive: false });

    let touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
        e.preventDefault();

        if (isAnimating) return;

        const touchY = e.touches[0].clientY;
        const diff = touchStartY - touchY;

        if (Math.abs(diff) > 50) {
            const sectionIds = Array.from(sections).map(section => section.id);
            const currentIndex = sectionIds.indexOf(currentSection.id);

            if (diff > 0) {
                const nextIndex = (currentIndex + 1) % sectionIds.length;
                switchSection(sectionIds[nextIndex]);
            } else {
                const prevIndex = (currentIndex - 1 + sectionIds.length) % sectionIds.length;
                switchSection(sectionIds[prevIndex]);
            }

            touchStartY = touchY;
        }
    }, { passive: false });

    const subtitleElement = document.querySelector('.subtitle');
    if (subtitleElement) {
        const originalText = subtitleElement.textContent;
        subtitleElement.textContent = '';

        let i = 0;
        const typeEffect = () => {
            if (i < originalText.length) {
                subtitleElement.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeEffect, 100);
            }
        };

        setTimeout(typeEffect, 1000);
    }
});