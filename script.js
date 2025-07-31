// Enhanced JS with mobile navigation and scroll effects
document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Remove from DOM after transition
            setTimeout(() => {
                loadingScreen.remove();
            }, 800);
        }, 500);
    });

    // Mobile Navigation
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close mobile menu when clicking on links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            });
        });
    }

    // Performance optimization - throttle scroll events
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Header scroll effect with throttling
    const header = document.getElementById('header');
    let lastScrollY = window.scrollY;

    const handleScroll = throttle(() => {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        lastScrollY = currentScrollY;
    }, 16); // ~60fps

    window.addEventListener('scroll', handleScroll);

    // Initialize particles based on theme
    function initializeParticles() {
        const particlesContainer = document.getElementById('particles');
        if (particlesContainer) {
            // Clear existing particles
            particlesContainer.innerHTML = '';
            
            // Get current theme
            const currentTheme = document.body.classList.contains('black-theme') ? 'black-theme' :
                                document.body.classList.contains('light-theme') ? 'light-theme' : 'epic-dark';
            
            let numParticles, colors;
            
            // Set particle properties based on theme
            if (currentTheme === 'black-theme') {
                numParticles = 100;
                colors = ['#ffffff'];
            } else if (currentTheme === 'light-theme') {
                numParticles = 100;
                colors = ['#000000'];
            } else {
                // Default to original epic dark theme particles
                numParticles = 80;
                colors = ['#6366f1', '#ec4899', '#06b6d4', '#8b5cf6', '#10b981'];
            }
            
            // Create particles
            for (let i = 0; i < numParticles; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Simplified size categories
                const sizeCategory = Math.random();
                if (sizeCategory < 0.3) {
                    particle.classList.add('small');
                } else if (sizeCategory > 0.7) {
                    particle.classList.add('large');
                }
                
                const size = Math.random() * 4 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = Math.random() * 100 + 'vw';
                particle.style.top = Math.random() * 100 + 'vh';
                particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
                particle.style.animationDelay = (Math.random() * 5) + 's';
                
                // Set color based on theme
                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.background = color;
                
                // Set glow based on theme
                particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
                
                particlesContainer.appendChild(particle);
            }
        }
    }
    
    // Initialize particles
    initializeParticles();

    // OPTIMIZED STARFIELD - REDUCED COUNT
    const starfieldContainer = document.getElementById('starfield');
    if (starfieldContainer) {
        const numStars = 200;
        for (let i = 0; i < numStars; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            const size = Math.random() * 2 + 0.5; // Smaller stars
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 8 + 's'; // Longer delays
            star.style.animationDuration = (Math.random() * 6 + 4) + 's'; // Slower animation
            
            // Simplified star effects
            const intensity = Math.random();
            if (intensity > 0.9) { // Only very few bright stars
                star.style.boxShadow = `0 0 ${size * 2}px white`;
            }
            
            starfieldContainer.appendChild(star);
        }
    }

    // OPTIMIZED ORBS SYSTEM - REDUCED COUNT
    const orbsContainer = document.getElementById('interactiveOrbs');
    if (orbsContainer) {
        const numOrbs = 12;
        for (let i = 0; i < numOrbs; i++) {
            const orb = document.createElement('div');
            orb.classList.add('orb');
            
            const size = Math.random() * 60 + 30; // Smaller orbs
            orb.style.width = size + 'px';
            orb.style.height = size + 'px';
            orb.style.left = Math.random() * 100 + '%';
            orb.style.top = Math.random() * 100 + '%';
            orb.style.animationDelay = Math.random() * 30 + 's'; // Longer delays
            orb.style.animationDuration = (Math.random() * 40 + 30) + 's'; // Slower animation
            
            // Simplified orb colors
            const orbColors = [
                'radial-gradient(circle at 30% 30%, rgba(99, 102, 241, 0.3), transparent)',
                'radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.25), transparent)',
                'radial-gradient(circle at 30% 30%, rgba(6, 182, 212, 0.2), transparent)'
            ];
            const orbColor = orbColors[Math.floor(Math.random() * orbColors.length)];
            orb.style.background = orbColor;
            
            orbsContainer.appendChild(orb);
        }
    }

    // Scroll animations disabled - sections are immediately visible
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
        
        // Make all cards immediately visible
        const cards = section.querySelectorAll('.glass-card, .cert-item, .contact-item');
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Typing effect is now handled by initEnhancedTypingEffect() below

    // Custom Cursor
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    
    if (cursor && cursorFollower) {
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            cursor.style.left = mouseX - 10 + 'px';
            cursor.style.top = mouseY - 10 + 'px';
        });
        
        // Smooth follower animation
        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            cursorFollower.style.left = followerX - 20 + 'px';
            cursorFollower.style.top = followerY - 20 + 'px';
            
            requestAnimationFrame(animateFollower);
        }
        animateFollower();
        
        // Hide cursor on mobile
        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
            cursorFollower.style.display = 'none';
        }
    }

    // Enhanced Magnetic Button Effects with Sound Feedback
    function initMagneticEffects() {
        const magneticElements = document.querySelectorAll('.project-link, .contact-item, .social-link, .btn-primary, .btn-secondary');
        const scaleAmount = 1.05;

        magneticElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                // Apply scaling on hover
                this.style.transform = `scale(${scaleAmount})`;
            });

            element.addEventListener('mouseleave', function() {
                // Reset scale on mouse leave
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Card animations disabled - cards are immediately visible
    function initAdvancedCardAnimations() {
        const cards = document.querySelectorAll('.glass-card, .project-card');
        
        cards.forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
            card.style.filter = 'blur(0)';
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }

    // Enhanced Theme Persistence with Smooth Transitions
    function initThemeSystem() {
        console.log('Initializing theme system...');
        // Set initial theme (dark is default)
        document.body.classList.remove('light-mode');
        console.log('Applied dark theme by default');
        console.log('Theme system initialized successfully - Dark theme forced');
    }

    // Parallax Effect for Background Elements
    function initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.bg-mesh');
        
        function updateParallax() {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach((element, index) => {
                const rate = (index + 1) * 0.5;
                const yPos = -(scrolled * rate);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }
        
        // Throttled parallax update
        let parallaxTimeout;
        window.addEventListener('scroll', () => {
            if (parallaxTimeout) return;
            parallaxTimeout = setTimeout(() => {
                updateParallax();
                parallaxTimeout = null;
            }, 16);
        });
    }

    // Skill tag animations disabled - tags are immediately visible
    function initSkillTagAnimations() {
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach(category => {
            const skillTags = category.querySelectorAll('.skill-tag');
            skillTags.forEach(tag => {
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
                tag.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            });
        });
    }

    // Enhanced typing effect with cursor
    function initEnhancedTypingEffect() {
        const subtitle = document.querySelector('.hero .subtitle');
        if (subtitle) {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            subtitle.style.opacity = '1';
            subtitle.style.borderRight = '2px solid var(--primary)';
            subtitle.style.paddingRight = '2px';
            
            let i = 0;
            const typeEffect = setInterval(() => {
                if (i < text.length) {
                    subtitle.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeEffect);
                    setTimeout(() => {
                        subtitle.style.borderRight = 'none';
                    }, 1000);
                }
            }, 100);
        }
    }

    // Enhanced project card interactions
    function initProjectCardEnhancements() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) rotateX(5deg) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // Social link tooltips with enhanced animations
    function initSocialTooltips() {
        const socialLinks = document.querySelectorAll('.social-link[data-tooltip]');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.15) rotate(5deg)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }

    // Status indicator pulse effect
    function initStatusIndicator() {
        const statusDot = document.querySelector('.status-dot');
        if (statusDot) {
            let pulseCount = 0;
            setInterval(() => {
                if (pulseCount < 3) {
                    statusDot.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        statusDot.style.transform = 'scale(1)';
                    }, 200);
                    pulseCount++;
                } else {
                    setTimeout(() => {
                        pulseCount = 0;
                    }, 3000);
                }
            }, 800);
        }
    }

    // Hero stats counter animation
    function initStatsCounter() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const finalValue = statNumber.textContent;
                    
                    // Extract numeric value
                    const numericValue = parseFloat(finalValue);
                    if (!isNaN(numericValue)) {
                        let currentValue = 0;
                        const increment = numericValue / 50;
                        const isDecimal = finalValue.includes('.');
                        
                        const counter = setInterval(() => {
                            currentValue += increment;
                            if (currentValue >= numericValue) {
                                statNumber.textContent = finalValue;
                                clearInterval(counter);
                            } else {
                                const displayValue = isDecimal
                                    ? currentValue.toFixed(1)
                                    : Math.floor(currentValue);
                                statNumber.textContent = displayValue + (finalValue.includes('+') ? '+' : '');
                            }
                        }, 40);
                    }
                    
                    statsObserver.unobserve(statNumber);
                }
            });
        }, { threshold: 0.8 });
        
        statNumbers.forEach(stat => statsObserver.observe(stat));
    }

    // FAST MOUSE INTERACTION SYSTEM - ENHANCED RESPONSIVENESS
    function initMouseInteractions() {
        let mouseX = 0, mouseY = 0;
        let ticking = false;
        
        function updateMouseEffects() {
            // Enhanced background shift - multiple layers with faster response
            const aurora = document.querySelector('.aurora-layer');
            const quantum = document.querySelector('.quantum-field');
            const plasma = document.querySelector('.plasma-layer');
            
            if (aurora) {
                const xOffset = (mouseX - 0.5) * 25; // Increased intensity
                const yOffset = (mouseY - 0.5) * 25;
                aurora.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            }
            if (quantum) {
                const xOffset = (mouseX - 0.5) * 15;
                const yOffset = (mouseY - 0.5) * 15;
                quantum.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            }
            if (plasma) {
                const xOffset = (mouseX - 0.5) * 20;
                const yOffset = (mouseY - 0.5) * 20;
                plasma.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
            }
            
            ticking = false;
        }
        
        document.addEventListener('mousemove', throttle((e) => {
            mouseX = e.clientX / window.innerWidth;
            mouseY = e.clientY / window.innerHeight;
            
            if (!ticking) {
                requestAnimationFrame(updateMouseEffects);
                ticking = true;
            }
        }, 16)); // Faster - 60fps mouse tracking
    }

    // FASTER SCROLL EFFECTS - ENHANCED RESPONSIVENESS
    function initAdvancedScrollEffects() {
        let ticking = false;
        
        function updateScrollEffects() {
            const scrolled = window.pageYOffset;
            
            // Enhanced parallax for multiple layers with faster response
            const aurora = document.querySelector('.aurora-layer');
            const quantum = document.querySelector('.quantum-field');
            const fractal = document.querySelector('.fractal-layer');
            const plasma = document.querySelector('.plasma-layer');
            
            if (aurora) aurora.style.transform = `translateY(${scrolled * -0.3}px)`;
            if (quantum) quantum.style.transform = `translateY(${scrolled * -0.2}px)`;
            if (fractal) fractal.style.transform = `translateY(${scrolled * -0.15}px)`;
            if (plasma) plasma.style.transform = `translateY(${scrolled * -0.25}px)`;
            
            ticking = false;
        }
        
        window.addEventListener('scroll', throttle(() => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        }, 16)); // Faster - 60fps scrolling
    }

    // DYNAMIC COLOR SYSTEM - DISABLED FOR PERFORMANCE
    function initDynamicColors() {
        // Disabled for better performance
        console.log('Dynamic colors disabled for performance');
    }

    // ENHANCED PERFORMANCE OPTIMIZATIONS
    function initPerformanceOptimizations() {
        // Detect low-end devices more aggressively
        const isLowEnd = navigator.hardwareConcurrency <= 4 ||
                        window.innerWidth < 1024 ||
                        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // if (isLowEnd) {
        //     // Disable most background layers on low-end devices
        //     const intensiveElements = document.querySelectorAll('.quantum-field, .fractal-layer, .plasma-layer');
        //     intensiveElements.forEach(el => el.style.display = 'none');
            
        //     // Reduce particles and stars even further
        //     const particles = document.querySelectorAll('.particle');
        //     particles.forEach((particle, index) => {
        //         if (index > 15) particle.remove(); // Keep only 15 particles
        //     });
            
        //     const stars = document.querySelectorAll('.star');
        //     stars.forEach((star, index) => {
        //         if (index > 25) star.remove(); // Keep only 25 stars
        //     });
            
        //     const orbs = document.querySelectorAll('.orb');
        //     orbs.forEach((orb, index) => {
        //         if (index > 3) orb.remove(); // Keep only 3 orbs
        //     });
        // }
        
        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            const allAnimatedElements = document.querySelectorAll('[class*="layer"], .particle, .orb, .star');
            if (document.hidden) {
                allAnimatedElements.forEach(el => el.style.animationPlayState = 'paused');
            } else {
                allAnimatedElements.forEach(el => el.style.animationPlayState = 'running');
            }
        });
        
        // Reduce quality on small screens
        if (window.innerWidth < 768) {
            const allLayers = document.querySelectorAll('[class*="layer"]');
            allLayers.forEach(layer => {
                layer.style.opacity = '0.3'; // Reduce opacity on mobile
            });
        }
    }

    // AUDIO REACTIVE BACKGROUND - DISABLED FOR PERFORMANCE
    function initAudioReactiveBackground() {
        // Disabled for better performance
        console.log('Audio reactive background disabled for performance');
    }

    // Initialize all enhanced effects
    initMagneticEffects();
    initAdvancedCardAnimations();
    initThemeSystem();
    initParallaxEffects();
    initSkillTagAnimations();
    initEnhancedTypingEffect();
    initProjectCardEnhancements();
    initSocialTooltips();
    initStatusIndicator();
    initStatsCounter();
    
    // Initialize new epic effects
    initMouseInteractions();
    initAdvancedScrollEffects();
    initDynamicColors();
    initPerformanceOptimizations();
    initAudioReactiveBackground();

    // Debug: Add a test for theme toggle
    console.log('🚀 ALL EPIC SYSTEMS INITIALIZED - BACKGROUND IS NOW INSANE! 🚀');

    // Theme Switcher System
    function initThemeSwitcher() {
        const themeSwitcher = document.getElementById('themeSwitcher');
        const mobileThemeSwitcher = document.querySelector('.mobile-nav .theme-switcher');
        const themeSwitchers = [themeSwitcher, mobileThemeSwitcher];
        
        // Get saved theme from localStorage or default to 'epic-dark'
        let currentTheme = localStorage.getItem('selectedTheme') || 'epic-dark';
        
        // Apply saved theme
        applyTheme(currentTheme);
        
        // Set active state on theme switcher buttons
        updateThemeSwitcherUI(currentTheme);
        
        // Add event listeners to both theme switchers
        themeSwitchers.forEach(switcher => {
            if (switcher) {
                switcher.addEventListener('click', () => {
                    cycleTheme();
                });
            }
        });
        
        // Function to cycle through themes
        function cycleTheme() {
            // Add switching animation
            themeSwitchers.forEach(switcher => {
                if (switcher) {
                    switcher.classList.add('switching');
                    setTimeout(() => {
                        switcher.classList.remove('switching');
                    }, 500);
                }
            });
            
            // Cycle through themes
            if (currentTheme === 'epic-dark') {
                currentTheme = 'black-theme';
            } else if (currentTheme === 'black-theme') {
                currentTheme = 'light-theme';
            } else {
                currentTheme = 'epic-dark';
            }
            
            // Apply new theme
            applyTheme(currentTheme);
            updateThemeSwitcherUI(currentTheme);
            
            // Save theme to localStorage
            localStorage.setItem('selectedTheme', currentTheme);
        }
        
        // Function to apply theme
        function applyTheme(theme) {
            // Remove all theme classes
            document.body.classList.remove('epic-dark', 'black-theme', 'light-theme');
            
            // Add selected theme class
            if (theme !== 'epic-dark') {
                document.body.classList.add(theme);
            }
            
            // Update theme switcher icon based on theme
            const icons = document.querySelectorAll('.theme-switcher i');
            icons.forEach(icon => {
                if (theme === 'epic-dark') {
                    icon.className = 'fas fa-moon';
                } else if (theme === 'black-theme') {
                    icon.className = 'fas fa-circle';
                } else {
                    icon.className = 'fas fa-sun';
                }
            });
            
            // Reinitialize particles for the new theme
            initializeParticles();
        }
        
        // Function to update theme switcher UI
        function updateThemeSwitcherUI(theme) {
            themeSwitchers.forEach(switcher => {
                if (switcher) {
                    switcher.classList.remove('active');
                    // We'll keep the indicator simple for now
                }
            });
        }
    }
    
    // Initialize theme switcher after DOM content is loaded
    initThemeSwitcher();
});