// ===================================
// STATE MANAGEMENT
// ===================================

let currentStage = 1;
let dodgeCount = 0;
const maxDodges = 5;
let audioEnabled = false;

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initStage1();
    setupAudioToggle();
});

// ===================================
// PARTICLE SYSTEM (Falling Petals)
// ===================================

function initParticles() {
    if (typeof tsParticles !== 'undefined') {
        tsParticles.load('particles', {
            particles: {
                number: {
                    value: 30,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#FF6B9D', '#FEC163', '#A855F7', '#F093FB']
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.6,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.2,
                        sync: false
                    }
                },
                size: {
                    value: 8,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 3,
                        sync: false
                    }
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'bottom',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: false
                    },
                    onclick: {
                        enable: false
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
}

// ===================================
// STAGE 1: ENTRANCE
// ===================================

function initStage1() {
    console.log('Stage 1: Entrance initialized');
    // Automatically transition to stage 2 after entrance animation
    setTimeout(() => {
        console.log('Stage 1: Transitioning to stage 2');
        transitionToStage(2);
    }, 4000); // Increased from 3500 to 4000ms
}

// ===================================
// STAGE 2: THE PRANK
// ===================================

function initStage2() {
    console.log('Stage 2: Prank initialized');
    const sadButton = document.getElementById('sadButton');
    const happyButton = document.getElementById('happyButton');
    const dodgeCountDisplay = document.getElementById('dodgeCount');
    const pawTrails = document.getElementById('pawTrails');

    let buttonPosition = { top: 0, left: 0 };

    // Touch/Click handlers for sad button (dodging)
    sadButton.addEventListener('touchstart', handleSadButtonInteraction);
    sadButton.addEventListener('mouseenter', handleSadButtonInteraction);
    sadButton.addEventListener('click', (e) => {
        e.preventDefault();
        handleSadButtonInteraction(e);
    });

    function handleSadButtonInteraction(e) {
        e.preventDefault();

        // On first interaction, make the button absolute positioned
        if (dodgeCount === 0) {
            sadButton.classList.add('is-dodging');
            console.log('Sad button: Starting dodge mode');
        }

        if (dodgeCount >= maxDodges) {
            // After max dodges, make it disappear
            sadButton.classList.add('disappear');
            dodgeCountDisplay.textContent = 'Okay, okay... maybe you ARE happy! 😄';

            setTimeout(() => {
                sadButton.style.display = 'none';
            }, 600);
            return;
        }

        dodgeCount++;
        dodgeCountDisplay.textContent = `Nice try! ${dodgeCount}/${maxDodges}`;

        // Add shake animation
        sadButton.classList.add('dodging');
        setTimeout(() => sadButton.classList.remove('dodging'), 300);

        // Create paw print trail
        createPawPrint(e);

        // Move button to random position
        moveButtonRandomly(sadButton);

        // Play sound if enabled
        if (audioEnabled) {
            playSound('dodge');
        }
    }

    function moveButtonRandomly(button) {
        const container = button.parentElement;
        const containerRect = container.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();

        const maxX = containerRect.width - buttonRect.width - 40;
        const maxY = containerRect.height - buttonRect.height - 40;

        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        button.style.left = `${randomX}px`;
        button.style.top = `${randomY}px`;
    }

    function createPawPrint(e) {
        const paw = document.createElement('div');
        paw.className = 'paw-print';
        paw.textContent = '🐾';

        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;

        paw.style.left = `${x}px`;
        paw.style.top = `${y}px`;

        pawTrails.appendChild(paw);

        setTimeout(() => {
            paw.remove();
        }, 1000);
    }

    // Happy button handler
    happyButton.addEventListener('click', () => {
        console.log('Happy button clicked! Transitioning to celebration...');
        if (audioEnabled) {
            playSound('success');
        }

        // Transition to celebration
        setTimeout(() => {
            console.log('Transitioning to stage 3');
            transitionToStage(3);
        }, 300);
    });
}

// ===================================
// STAGE 3: CELEBRATION
// ===================================

function initStage3() {
    console.log('Stage 3: Celebration initialized');
    const flipCard = document.querySelector('.flip-card');

    // Trigger confetti
    setTimeout(() => {
        console.log('Triggering confetti');
        triggerConfetti();
    }, 300);

    // Flip card animation
    setTimeout(() => {
        console.log('Flipping card');
        flipCard.classList.add('flipped');
    }, 800);

    // Transition to final stage
    setTimeout(() => {
        console.log('Transitioning to stage 4');
        transitionToStage(4);
    }, 3000);
}

function triggerConfetti() {
    if (typeof confetti !== 'undefined') {
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            zIndex: 9999
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio),
                colors: ['#FF6B9D', '#FEC163', '#A855F7', '#F093FB', '#FFD700']
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });

        fire(0.2, {
            spread: 60,
        });

        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });

        // Additional confetti bursts
        setTimeout(() => fire(0.15, { spread: 80 }), 400);
        setTimeout(() => fire(0.15, { spread: 80 }), 800);
    }
}

// ===================================
// STAGE 4: CONGRATULATIONS
// ===================================

function initStage4() {
    console.log('Stage 4: Congratulations initialized');

    // Scroll to top of Stage 4
    const stage4 = document.getElementById('stage4');
    if (stage4) {
        stage4.scrollTo(0, 0);
    }

    // Setup scroll-triggered reveals
    setupScrollReveal();

    // Setup interactive emojis
    setupInteractiveEmojis();

    // Setup photo flip cards
    setupPhotoFlipCards();

    // Setup interactive flowers
    setupFlowers();

    // Animate signature
    animateSignature();

    // Setup scroll indicator
    setupScrollIndicator();

    // Setup GSAP animations if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        setupGSAPAnimations();
    }
}

function setupScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-element');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
}

function setupInteractiveEmojis() {
    const emojis = document.querySelectorAll('.interactive-emoji');

    emojis.forEach(emoji => {
        emoji.addEventListener('click', (e) => {
            const effect = emoji.getAttribute('data-effect');

            // Remove the effect class to restart animation
            emoji.style.animation = 'none';

            // Trigger reflow to restart animation
            void emoji.offsetWidth;

            // Add animation based on effect
            switch(effect) {
                case 'bounce':
                    emoji.style.animation = 'emojiBounce 0.6s ease-in-out';
                    break;
                case 'shake':
                    emoji.style.animation = 'emojiShake 0.5s ease-in-out';
                    break;
                case 'spin':
                    emoji.style.animation = 'emojiSpin 0.8s ease-in-out';
                    break;
                case 'glow':
                    emoji.style.animation = 'emojiGlow 1s ease-in-out';
                    // Add mini confetti burst
                    if (typeof confetti !== 'undefined') {
                        confetti({
                            particleCount: 20,
                            spread: 40,
                            origin: {
                                x: e.clientX / window.innerWidth,
                                y: e.clientY / window.innerHeight
                            },
                            colors: ['#FFD700', '#FEC163', '#FFEB3B']
                        });
                    }
                    break;
                case 'pulse':
                    emoji.style.animation = 'emojiPulse 1s ease-in-out';
                    // Heart burst effect
                    if (typeof confetti !== 'undefined') {
                        confetti({
                            particleCount: 15,
                            spread: 50,
                            origin: {
                                x: e.clientX / window.innerWidth,
                                y: e.clientY / window.innerHeight
                            },
                            colors: ['#FF6B9D', '#FEC163', '#FFD700'],
                            shapes: ['circle']
                        });
                    }
                    break;
                case 'float':
                    emoji.style.animation = 'emojiFloat 2s ease-in-out';
                    break;
                case 'twinkle':
                    emoji.style.animation = 'emojiTwinkle 1s ease-in-out';
                    break;
                case 'ring':
                    emoji.style.animation = 'emojiRing 0.8s ease-in-out';
                    break;
            }

            // Play sound if enabled
            if (audioEnabled) {
                playSound(effect);
            }

            // Reset animation after it completes
            emoji.addEventListener('animationend', () => {
                emoji.style.animation = '';
            }, { once: true });
        });

        // Add hover effect
        emoji.addEventListener('mouseenter', () => {
            emoji.style.transform = 'scale(1.2)';
        });

        emoji.addEventListener('mouseleave', () => {
            emoji.style.transform = '';
        });
    });
}

function setupFlowers() {
    const flowers = document.querySelectorAll('.flower');

    flowers.forEach(flower => {
        flower.addEventListener('click', () => {
            const isBloomed = flower.getAttribute('data-bloomed') === 'true';

            if (!isBloomed) {
                flower.setAttribute('data-bloomed', 'true');

                // Play sound if enabled
                if (audioEnabled) {
                    playSound('bloom');
                }

                // Add visual feedback
                flower.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    flower.style.transform = '';
                }, 300);
            }
        });
    });
}

function setupPhotoFlipCards() {
    const photoCards = document.querySelectorAll('.photo-flip-card');

    photoCards.forEach(card => {
        card.addEventListener('click', () => {
            const isFlipped = card.getAttribute('data-flipped') === 'true';

            // Toggle flip state
            card.setAttribute('data-flipped', !isFlipped);

            // Play sound if enabled
            if (audioEnabled) {
                playSound('flip');
            }

            // Add confetti when revealing photo
            if (!isFlipped && typeof confetti !== 'undefined') {
                const rect = card.getBoundingClientRect();
                confetti({
                    particleCount: 30,
                    spread: 60,
                    origin: {
                        x: (rect.left + rect.width / 2) / window.innerWidth,
                        y: (rect.top + rect.height / 2) / window.innerHeight
                    },
                    colors: ['#FF6B9D', '#FEC163', '#A855F7']
                });
            }
        });
    });
}

function animateSignature() {
    const signaturePath = document.getElementById('signaturePath');
    const signatureName = document.querySelector('.signature-name');

    if (signaturePath && signatureName) {
        // Animate the path drawing
        setTimeout(() => {
            signaturePath.style.transition = 'stroke-dashoffset 2s ease-out';
            signaturePath.style.strokeDashoffset = '0';

            // Fade in the name after path animation
            setTimeout(() => {
                signatureName.style.transition = 'opacity 1s ease-out';
                signatureName.style.opacity = '1';
            }, 1500);
        }, 500);
    }
}

function setupGSAPAnimations() {
    // Animate photos with parallax effect
    gsap.utils.toArray('.photo-card').forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top bottom-=100',
                end: 'top center',
                scrub: 1
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.1
        });
    });

    // Animate message sections
    gsap.utils.toArray('.message-section').forEach((section, index) => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top bottom-=50',
                toggleActions: 'play none none none'
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            delay: index * 0.2
        });
    });
}

function setupScrollIndicator() {
    const scrollIndicator = document.getElementById('scrollIndicator');
    const stage4 = document.getElementById('stage4');

    if (!scrollIndicator || !stage4) return;

    // Show indicator after a delay when stage 4 loads
    setTimeout(() => {
        scrollIndicator.classList.add('visible');
    }, 1500);

    // Hide indicator when user starts scrolling
    let hasScrolled = false;
    stage4.addEventListener('scroll', () => {
        if (!hasScrolled && stage4.scrollTop > 50) {
            hasScrolled = true;
            scrollIndicator.classList.remove('visible');
            scrollIndicator.classList.add('hidden');
        }
    });

    // Also hide if user scrolls with mouse wheel
    stage4.addEventListener('wheel', () => {
        if (!hasScrolled) {
            hasScrolled = true;
            scrollIndicator.classList.remove('visible');
            scrollIndicator.classList.add('hidden');
        }
    }, { once: true });
}

// ===================================
// STAGE TRANSITIONS
// ===================================

function transitionToStage(stageNumber) {
    console.log(`Transitioning from stage ${currentStage} to stage ${stageNumber}`);
    const stages = document.querySelectorAll('.stage');

    // Hide current stage
    stages.forEach(stage => {
        stage.classList.remove('active');
    });

    // Show new stage
    const newStage = document.getElementById(`stage${stageNumber}`);
    if (newStage) {
        setTimeout(() => {
            newStage.classList.add('active');
            currentStage = stageNumber;
            console.log(`Stage ${stageNumber} is now active`);

            // Update debug indicator
            const debugEl = document.getElementById('stageDebug');
            if (debugEl) {
                debugEl.textContent = `Stage: ${stageNumber}`;
            }

            // Initialize new stage
            switch (stageNumber) {
                case 2:
                    initStage2();
                    break;
                case 3:
                    initStage3();
                    break;
                case 4:
                    initStage4();
                    break;
            }
        }, 600);
    } else {
        console.error(`Stage ${stageNumber} not found!`);
    }
}

// ===================================
// AUDIO CONTROLS
// ===================================

function setupAudioToggle() {
    const audioToggle = document.getElementById('audioToggle');

    if (audioToggle) {
        audioToggle.addEventListener('click', () => {
            audioEnabled = !audioEnabled;
            audioToggle.classList.toggle('muted', !audioEnabled);
        });
    }
}

function playSound(type) {
    // Sound effects can be added here
    // For now, using a simple beep API or Web Audio API
    // Example: new Audio('sounds/dodge.mp3').play();

    // Simple Web Audio API beep as fallback
    if (audioEnabled && typeof AudioContext !== 'undefined') {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        let frequency = 440;
        switch (type) {
            case 'dodge':
                frequency = 300;
                break;
            case 'success':
                frequency = 600;
                break;
            case 'bloom':
                frequency = 500;
                break;
        }

        oscillator.frequency.value = frequency;
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Prevent default touch behaviors that might interfere
document.addEventListener('touchmove', (e) => {
    if (currentStage === 2) {
        // Allow scrolling in stage 2 but prevent overscroll
        const target = e.target;
        if (!target.closest('.buttons-container')) {
            return;
        }
    }
}, { passive: true });

// Performance optimization: pause particles when not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations to save battery
        if (typeof tsParticles !== 'undefined') {
            tsParticles.domItem(0)?.pause();
        }
    } else {
        // Resume animations
        if (typeof tsParticles !== 'undefined') {
            tsParticles.domItem(0)?.play();
        }
    }
});

// ===================================
// PREFERS REDUCED MOTION
// ===================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable or reduce animations
    document.body.style.setProperty('--duration-fast', '0.01ms');
    document.body.style.setProperty('--duration-normal', '0.01ms');
    document.body.style.setProperty('--duration-slow', '0.01ms');
    document.body.style.setProperty('--duration-very-slow', '0.01ms');
}

// ===================================
// CONSOLE EASTER EGG
// ===================================

console.log('%c🎉 Congratulations Winfred! 🎉', 'font-size: 24px; color: #FF6B9D; font-weight: bold;');
console.log('%cThis card was made with ❤️ by Jasonnn', 'font-size: 14px; color: #A855F7;');
console.log('%cFinished KCSE on November 19th, 2025! 🎓', 'font-size: 12px; color: #FEC163;');
