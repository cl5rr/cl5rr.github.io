document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('contextmenu', (e) => e.preventDefault());

    document.body.style.background = 'linear-gradient(135deg, #ffffff, #f4f4f4, #eaeaea, #ffffff)';
    document.body.style.backgroundSize = '400% 400%';
    document.body.style.animation = 'subtleLiminalPulse 20s ease infinite';
    
    if (!document.querySelector('style#liminal-style')) {
        const style = document.createElement('style');
        style.id = 'liminal-style';
        style.textContent = `
            @keyframes subtleLiminalPulse {
                0% { background-position: 0% 50% }
                50% { background-position: 100% 50% }
                100% { background-position: 0% 50% }
            }
            
            .notification {
                background-color: rgba(245, 245, 245, 0.9) !important;
                color: #333 !important;
                border: 1px solid #ddd !important;
            }
            
            @keyframes softFloat {
                0% { transform: translateY(0px); }
                50% { transform: translateY(-8px); }
                100% { transform: translateY(0px); }
            }
        `;
        document.head.appendChild(style);
    }

    const notificationQueue = [];
    let activeNotification = null;

    function showNotification(message, duration = 5000) {
        const notification = {
            message: message,
            duration: duration
        };
        
        notificationQueue.push(notification);
        
        if (!activeNotification) {
            processNotificationQueue();
        }
    }
    
    function processNotificationQueue() {
        if (notificationQueue.length === 0) {
            activeNotification = null;
            return;
        }
    
        const notification = notificationQueue.shift();
        activeNotification = notification;
    
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
    
        const notificationElement = document.createElement('div');
        notificationElement.className = 'notification';
        notificationElement.textContent = notification.message;
        document.body.appendChild(notificationElement);
    
        setTimeout(() => {
            notificationElement.style.animationName = 'dialogueDismiss';
            
            setTimeout(() => {
                notificationElement.remove();
                processNotificationQueue();
            }, 500);
        }, notification.duration);
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'u')) {
            showNotification('source is available when you need it.');
            e.preventDefault();
        }
    });
    
    let isTabbing = false;
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !isTabbing) {
            isTabbing = true;
            showNotification('navigate with arrow keys (← → or ↑ ↓) for a smoother experience.');
            setTimeout(() => {
                isTabbing = false;
            }, 5000);
        }
    });

    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { 
                    "value": 60, // fewer particles
                    "density": { "enable": true, "value_area": 1000 } 
                },
                "color": { 
                    "value": ["#222222", "#444444", "#666666", "#888888"] // Dark/black colors
                },
                "shape": { 
                    "type": ["circle"],
                    "stroke": { "width": 0, "color": "#000000" },
                    "polygon": { "nb_sides": 5 }
                },
                "opacity": { 
                    "value": 0.3, // More transparent
                    "random": true, 
                    "anim": { 
                        "enable": true, 
                        "speed": 0.8, // Slower
                        "opacity_min": 0.1, 
                        "sync": false 
                    } 
                },
                "size": { 
                    "value": 3, // Smaller particles
                    "random": true, 
                    "anim": { 
                        "enable": true, 
                        "speed": 2,
                        "size_min": 0.1, 
                        "sync": false 
                    } 
                },
                "line_linked": { 
                    "enable": true, 
                    "distance": 200, 
                    "color": "#333333", // Dark lines
                    "opacity": 0.2,
                    "width": 0.8
                },
                "move": { 
                    "enable": true, 
                    "speed": 1, // Slower movement
                    "direction": "none", 
                    "random": true, 
                    "straight": false, 
                    "out_mode": "out",
                    "bounce": false, 
                    "attract": { 
                        "enable": true, 
                        "rotateX": 600, 
                        "rotateY": 1200 
                    } 
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { 
                    "onhover": { 
                        "enable": true, 
                        "mode": "bubble" 
                    }, 
                    "onclick": { 
                        "enable": true, 
                        "mode": "push" 
                    }, 
                    "resize": true 
                },
                "modes": { 
                    "grab": { 
                        "distance": 400, 
                        "line_linked": { "opacity": 0.4 }
                    }, 
                    "bubble": { 
                        "distance": 200, 
                        "size": 5,
                        "duration": 2, 
                        "opacity": 0.3,
                        "speed": 3 
                    }, 
                    "repulse": { 
                        "distance": 200, 
                        "duration": 0.4 
                    }, 
                    "push": { 
                        "particles_nb": 4
                    }, 
                    "remove": { 
                        "particles_nb": 2 
                    } 
                }
            },
            "retina_detect": true
        });
    }

    const hungaryFlag = document.getElementById('hungaryFlag');
    if (hungaryFlag) {
        hungaryFlag.addEventListener('click', function() {
            this.style.animation = 'softFloat 0.5s ease-in-out 3';
            showNotification('A brief moment of cultural appreciation...');
            
            setTimeout(() => {
                window.open('https://youtu.be/vsFdsmnXXew', '_blank');
                this.style.animation = '';
            }, 1500);
        });
    }

    const bgMusic = document.getElementById('bgMusic');
    let musicStarted = false;
    
    document.addEventListener('click', function() {
        if (!musicStarted && bgMusic) {
            bgMusic.volume = 0.3;
            bgMusic.play().then(() => {
                let currentVolume = 0.3;
                const fadeIn = setInterval(() => {
                    currentVolume += 0.1;
                    if (currentVolume >= 0.6) {
                        clearInterval(fadeIn);
                        currentVolume = 0.6;
                    }
                    bgMusic.volume = currentVolume;
                }, 1000);
                
                showNotification('entering liminal space');
                musicStarted = true;
            }).catch(e => {
                console.log('Audio playback error:', e);
                showNotification('Tap again to enable sound');
            });
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
    
        currentSection.style.animation = `gentleFadeOut 0.8s ease forwards`;
        currentSection.style.transform = `translateY(20px)`;
        currentSection.style.opacity = '0';
    
        const navMenu = document.querySelector('.nav-menu');
        navMenu.style.animation = 'none';
        setTimeout(() => {
            navMenu.style.animation = 'softGlow 3s ease-in-out';
        }, 10);
    
        setTimeout(() => {
            currentSection.classList.remove('active');
            currentSection.style.animation = '';
            currentSection.style.transform = '';
            currentSection.style.opacity = '';
    
            targetSection.classList.add('active');
            targetSection.style.animation = `gentleFadeIn 0.8s ease forwards`;
            
            const cards = targetSection.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.style.transform = 'translateY(20px)';
                card.style.opacity = '0';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.6s ease';
                    card.style.transform = 'translateY(0)';
                    card.style.opacity = '1';
                    
                    setTimeout(() => {
                        card.style.transition = '';
                    }, 600);
                }, 100 + index * 120);
            });
    
            currentSection = targetSection;
    
            setTimeout(() => {
                isAnimating = false;
            }, 800);
        }, 800);
    };

    function getTransitionDirection(current, target) {
        const sections = Array.from(document.querySelectorAll('section'));
        const currentIndex = sections.indexOf(current);
        const targetIndex = sections.indexOf(target);
        
        return targetIndex > currentIndex ? -1 : 1;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            
            const allLinks = document.querySelectorAll('.nav-menu a');
            allLinks.forEach(l => l.style.textShadow = '');
            this.style.textShadow = '0 0 15px var(--accent), 0 0 25px var(--accent)';
            
            switchSection(targetId);
        });
    });

    document.addEventListener('keydown', (e) => {
        const sectionIds = Array.from(sections).map(section => section.id);
        const currentIndex = sectionIds.indexOf(currentSection.id);

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            const nextIndex = (currentIndex + 1) % sectionIds.length;
            switchSection(sectionIds[nextIndex]);
            
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => link.style.textShadow = '');
            navLinks[nextIndex].style.textShadow = '0 0 15px var(--accent), 0 0 25px var(--accent)';
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            const prevIndex = (currentIndex - 1 + sectionIds.length) % sectionIds.length;
            switchSection(sectionIds[prevIndex]);
            
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => link.style.textShadow = '');
            navLinks[prevIndex].style.textShadow = '0 0 15px var(--accent), 0 0 25px var(--accent)';
        }
    });

    const dialogueBox = document.getElementById('dialogue-box');
    const dialogueElements = document.querySelectorAll('[data-dialogue]');

    dialogueElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const dialogue = this.getAttribute('data-dialogue');
            
            dialogueBox.className = 'show';
            
            void dialogueBox.offsetWidth;
            
            dialogueBox.textContent = dialogue;
            dialogueBox.classList.add('show');
            dialogueBox.classList.remove('hide');
        });

        element.addEventListener('mouseleave', function() {
            dialogueBox.classList.remove('show');
            dialogueBox.classList.add('hide');
        });

        element.addEventListener('click', function() {
            if (this.classList.contains('card') || this.tagName === 'H2' || this.tagName === 'P') {
                this.style.transform = 'scale(1.05) translateY(-10px) rotate(1deg)';
                this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(0, 0, 0, 0.2)';
                
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.boxShadow = '';
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
                
                const navLinks = document.querySelectorAll('.nav-menu a');
                navLinks.forEach(link => link.style.textShadow = '');
                navLinks[nextIndex].style.textShadow = '0 0 15px var(--accent), 0 0 25px var(--accent)';
            } else {
                const prevIndex = (currentIndex - 1 + sectionIds.length) % sectionIds.length;
                switchSection(sectionIds[prevIndex]);
                
                const navLinks = document.querySelectorAll('.nav-menu a');
                navLinks.forEach(link => link.style.textShadow = '');
                navLinks[prevIndex].style.textShadow = '0 0 15px var(--accent), 0 0 25px var(--accent)';
            }
        }
    }, { passive: false });

    let touchStartY = 0;
    let touchStartX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
        e.preventDefault();

        if (isAnimating) return;

        const touchY = e.touches[0].clientY;
        const touchX = e.touches[0].clientX;
        const diffY = touchStartY - touchY;
        const diffX = touchStartX - touchX;

        if (Math.abs(diffY) > Math.abs(diffX)) {
            if (Math.abs(diffY) > 50) {
                const sectionIds = Array.from(sections).map(section => section.id);
                const currentIndex = sectionIds.indexOf(currentSection.id);

                if (diffY > 0) {
                    const nextIndex = (currentIndex + 1) % sectionIds.length;
                    switchSection(sectionIds[nextIndex]);
                    
                    if (window.navigator && window.navigator.vibrate) {
                        window.navigator.vibrate(50);
                    }
                } else {
                    const prevIndex = (currentIndex - 1 + sectionIds.length) % sectionIds.length;
                    switchSection(sectionIds[prevIndex]);
                    
                    if (window.navigator && window.navigator.vibrate) {
                        window.navigator.vibrate(50);
                    }
                }

                touchStartY = touchY;
                touchStartX = touchX;
            }
        } else {
            if (Math.abs(diffX) > 50) {
                const sectionIds = Array.from(sections).map(section => section.id);
                const currentIndex = sectionIds.indexOf(currentSection.id);

                if (diffX > 0) {
                    const nextIndex = (currentIndex + 1) % sectionIds.length;
                    switchSection(sectionIds[nextIndex]);
                } else {
                    const prevIndex = (currentIndex - 1 + sectionIds.length) % sectionIds.length;
                    switchSection(sectionIds[prevIndex]);
                }

                touchStartY = touchY;
                touchStartX = touchX;
            }
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
                
                const randomDelay = Math.floor(Math.random() * 40) + 60;
                const char = originalText.charAt(i);
                const extraDelay = (char === '.' || char === ',' || char === '&') ? 300 : 0;
                
                i++;
                setTimeout(typeEffect, randomDelay + extraDelay);
                
                subtitleElement.style.animation = 'none';
                setTimeout(() => {
                    subtitleElement.style.animation = 'subtleTextGlow 4s infinite';
                }, 10);
            } else {
                subtitleElement.style.transform = 'scale(1.03)';
                setTimeout(() => {
                    subtitleElement.style.transition = 'transform 0.5s ease';
                    subtitleElement.style.transform = 'scale(1)';
                }, 200);
            }
        };
    
        setTimeout(typeEffect, 1000);
    }
    
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a', 'Enter'];
    let konamiPosition = 0;
    
    document.addEventListener('keydown', function(e) {
        if (e.key === konamiCode[konamiPosition]) {
            konamiPosition++;
    
            if (konamiPosition === konamiCode.length) {
                document.body.style.background = 'linear-gradient(135deg, #fff, #f0f0f0, #e0e0e0, #ffffff)';
                document.body.style.backgroundSize = '400% 400%';
                document.body.style.animation = 'subtlePulse 8s ease infinite';
    
                showNotification('Some memories transcend time and space.');
    
                konamiPosition = 0;
            }
        } else {
            konamiPosition = konamiCode.indexOf(e.key) === 0 ? 1 : 0;
        }
    });
    
    const buttons = document.querySelectorAll('.button, .social-link');
    buttons.forEach(button => {
        button.addEventListener('mouseover', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
    
        button.addEventListener('mouseout', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    document.addEventListener('click', function(e) {
        createLiminalClickEffect(e.clientX, e.clientY);
    });
    
    function createLiminalClickEffect(x, y) {
        const burstContainer = document.createElement('div');
        burstContainer.style.position = 'fixed';
        burstContainer.style.left = x + 'px';
        burstContainer.style.top = y + 'px';
        burstContainer.style.pointerEvents = 'none';
        burstContainer.style.zIndex = '9999';
        document.body.appendChild(burstContainer);
        
        const numParticles = Math.floor(Math.random() * 10) + 5; // Fewer particles for subtlety
        
        for (let i = 0; i < numParticles; i++) {
            createLiminalParticle(burstContainer);
        }
        
        createLiminalRippleEffect(x, y);
        
        setTimeout(() => {
            if (document.body.contains(burstContainer)) {
                document.body.removeChild(burstContainer);
            }
        }, 1500);
    }
    
    function createLiminalParticle(container) {
        const particle = document.createElement('div');
        
        const size = Math.random() * 8 + 2; // Smaller particles
        const duration = Math.random() * 800 + 400;
        const distance = Math.random() * 60 + 20; // Shorter distance
        const angle = Math.random() * Math.PI * 2;
        const delay = Math.random() * 100;
        
        const brightness = Math.floor(Math.random() * 30); // Very dark
        const color = `rgba(${brightness}, ${brightness}, ${brightness}, 0.7)`;
        
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%'; // All circular
        particle.style.boxShadow = `0 0 ${Math.random() * 4 + 1}px rgba(0, 0, 0, 0.5)`; // Subtle shadow
        particle.style.transform = 'translate(-50%, -50%) scale(0)';
        particle.style.opacity = '0';
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
            particle.style.transform = `translate(
                ${Math.cos(angle) * distance}px, 
                ${Math.sin(angle) * distance}px
            ) scale(${Math.random() * 0.4 + 0.2})`; // Smaller scale
            particle.style.opacity = '0.7';
            
            setTimeout(() => {
                particle.style.opacity = '0';
            }, duration * 0.6);
        }, delay);
    }
    
    function createLiminalRippleEffect(x, y) {
        const ripple = document.createElement('div');
        ripple.style.position = 'fixed';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.width = '8px';
        ripple.style.height = '8px';
        ripple.style.borderRadius = '50%';
        ripple.style.border = '2px solid rgba(0, 0, 0, 0.4)'; // Black border
        ripple.style.transform = 'translate(-50%, -50%)';
        ripple.style.pointerEvents = 'none';
        ripple.style.zIndex = '9999';
        document.body.appendChild(ripple);
        
        ripple.animate([
            { 
                width: '8px', 
                height: '8px', 
                opacity: 0.5,
                borderWidth: '2px'
            },
            { 
                width: '100px', 
                height: '100px', 
                opacity: 0,
                borderWidth: '1px'
            }
        ], {
            duration: 600,
            easing: 'ease-out'
        });
        
        setTimeout(() => {
            if (document.body.contains(ripple)) {
                document.body.removeChild(ripple);
            }
        }, 600);
    }
});
