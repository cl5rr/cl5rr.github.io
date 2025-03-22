document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('contextmenu', (e) => e.preventDefault());

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
            notificationElement.style.animationName = 'dialoguePopOut';
            
            setTimeout(() => {
                notificationElement.remove();
                processNotificationQueue();
            }, 500);
        }, notification.duration);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'u')) {
            showNotification('dude... github exists.');
            e.preventDefault();
        }
    });

    let isTabbing = false;
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !isTabbing) {
            isTabbing = true;
            showNotification('tip: use arrow keys (← → or ↑ ↓) to navigate. see how much i care about people?');
            setTimeout(() => {
                isTabbing = false;
            }, 5000);
        }
    });

    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#ff9933", "#ff5e62", "#8a2be2", "#ffffff"] },
                "shape": { 
                    "type": ["circle", "triangle", "polygon"],
                    "stroke": { "width": 0, "color": "#000000" }, 
                    "polygon": { "nb_sides": 5 }
                },
                "opacity": { 
                    "value": 0.6, 
                    "random": true, 
                    "anim": { 
                        "enable": true, 
                        "speed": 1, 
                        "opacity_min": 0.1, 
                        "sync": false 
                    } 
                },
                "size": { 
                    "value": 4, 
                    "random": true, 
                    "anim": { 
                        "enable": true, 
                        "speed": 6, 
                        "size_min": 0.5, 
                        "sync": false 
                    } 
                },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#ffffff", 
                    "opacity": 0.4, 
                    "width": 1.2 
                },
                "move": { 
                    "enable": true, 
                    "speed": 4, 
                    "direction": "none", 
                    "random": true, 
                    "straight": false, 
                    "out_mode": "bounce", 
                    "bounce": true, 
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
                        "line_linked": { "opacity": 1 } 
                    }, 
                    "bubble": { 
                        "distance": 150, 
                        "size": 12, 
                        "duration": 2, 
                        "opacity": 0.8, 
                        "speed": 3 
                    }, 
                    "repulse": { 
                        "distance": 200, 
                        "duration": 0.4 
                    }, 
                    "push": { 
                        "particles_nb": 5 
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
            this.style.animation = 'floatAnimation 0.5s ease-in-out 3';
            showNotification('Ah, I see you\'re a person of culture as well...');
            
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
            bgMusic.volume = 0.4;
            bgMusic.play().then(() => {
                let currentVolume = 0.4;
                const fadeIn = setInterval(() => {
                    currentVolume += 0.1;
                    if (currentVolume >= 0.8) {
                        clearInterval(fadeIn);
                        currentVolume = 0.8;
                    }
                    bgMusic.volume = currentVolume;
                }, 1000);
                
                showNotification('Music enabled. Hope you like bees.');
                musicStarted = true;
            }).catch(e => {
                console.log('Audio playback error:', e);
                showNotification('Music couldn\'t be played. Click again to try.');
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

        const direction = getTransitionDirection(currentSection, targetSection);
        
        currentSection.style.animation = `enhancedFadeOut 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
        currentSection.style.transform = `translateY(${direction * 50}px) scale(0.95)`;
        currentSection.style.opacity = '0';

        const navMenu = document.querySelector('.nav-menu');
        navMenu.style.animation = 'none';
        setTimeout(() => {
            navMenu.style.animation = 'navGlow 0.8s ease-in-out';
        }, 10);

        setTimeout(() => {
            currentSection.classList.remove('active');
            currentSection.style.animation = '';
            currentSection.style.transform = '';
            currentSection.style.opacity = '';

            targetSection.classList.add('active');
            targetSection.style.animation = `enhancedFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards`;
            
            const cards = targetSection.querySelectorAll('.card');
            cards.forEach((card, index) => {
                card.style.transform = 'translateY(40px) scale(0.95)';
                card.style.opacity = '0';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    card.style.transform = 'translateY(0) scale(1)';
                    card.style.opacity = '1';
                    
                    setTimeout(() => {
                        card.style.transition = '';
                    }, 800);
                }, 100 + index * 150);
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
                this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 94, 98, 0.4)';
                
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
                
                const randomDelay = Math.floor(Math.random() * 50) + 50;
                
                const char = originalText.charAt(i);
                const extraDelay = (char === '.' || char === ',' || char === '&') ? 200 : 0;
                
                i++;
                setTimeout(typeEffect, randomDelay + extraDelay);
                
                subtitleElement.style.animation = 'none';
                setTimeout(() => {
                    subtitleElement.style.animation = 'subtitleGlow 4s infinite';
                }, 10);
            } else {
                subtitleElement.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    subtitleElement.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
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
                document.body.style.background = 'linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet)';
                document.body.style.backgroundSize = '400% 400%';
                document.body.style.animation = 'enhancedGradientAnimation 5s ease infinite';
    
                showNotification('How do you still remember that?');
    
                konamiPosition = 0;
            }
        } else {
            konamiPosition = konamiCode.indexOf(e.key) === -1 ? 0 : konamiPosition;
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
        const numSparkles = Math.floor(Math.random() * 10) + 5;
    
        for (let i = 0; i < numSparkles; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'absolute';
            sparkle.style.width = `${Math.random() * 10 + 3}px`;
            sparkle.style.height = `${Math.random() * 10 + 3}px`;
            sparkle.style.borderRadius = '50%';
            sparkle.style.backgroundColor = getRandomColor();
            sparkle.style.left = `${e.clientX}px`;
            sparkle.style.top = `${e.clientY}px`;
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${getRandomColor()}`;
            document.body.appendChild(sparkle);
    
            const animationDuration = Math.random() * 1000 + 500;
            const animationDistance = Math.random() * 100 + 50;
            const angle = Math.random() * Math.PI * 2;
    
            sparkle.animate([
                { 
                    transform: 'scale(1) translate(0, 0)',
                    opacity: 1
                },
                { 
                    transform: `scale(${Math.random() * 2 + 1}) translate(${Math.cos(angle) * animationDistance}px, ${Math.sin(angle) * animationDistance}px)`,
                    opacity: 0
                }
            ], {
                duration: animationDuration,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            });
    
            setTimeout(() => {
                document.body.removeChild(sparkle);
            }, animationDuration);
        }
    });
    
    function getRandomColor() {
        const colors = ['#ff9933', '#ff5e62', '#8a2be2', '#ff6b6b', '#ffffff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
});
