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

    // Enhanced Particles
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const numParticles = 50;
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random size categories
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
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 8) + 's';
            
            // Enhanced color palette for particles
            const colors = [
                '#6366f1', '#ec4899', '#06b6d4', '#8b5cf6', '#10b981',
                '#f59e0b', '#ef4444', '#84cc16', '#06b6d4', '#d946ef'
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particle.style.background = color;
            particle.style.boxShadow = `0 0 10px ${color}`;
            
            particlesContainer.appendChild(particle);
        }
    }

    // Enhanced Section Scroll Animations with staggered effect
    const sections = document.querySelectorAll('.section');
    const observerOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                // Staggered animation for child elements
                const cards = entry.target.querySelectorAll('.glass-card, .cert-item, .contact-item');
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    }, index * 150);
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        observer.observe(section);
        
        // Initially hide cards for staggered effect
        const cards = section.querySelectorAll('.glass-card, .cert-item, .contact-item');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
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

    // Add typing effect to subtitle
    const subtitle = document.querySelector('.hero .subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.opacity = '1';
        
        let i = 0;
        const typeEffect = setInterval(() => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeEffect);
            }
        }, 100);
    }

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

    // Advanced Card Reveal Animation
    function initAdvancedCardAnimations() {
        const cards = document.querySelectorAll('.glass-card, .project-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0) scale(1)';
                        entry.target.style.filter = 'blur(0)';
                    }, index * 150); // Staggered animation
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) scale(0.95)';
            card.style.filter = 'blur(5px)';
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(card);
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

    // Initialize all enhanced effects
    initMagneticEffects();
    initAdvancedCardAnimations();
    initThemeSystem();
    initParallaxEffects();

    // Debug: Add a test for theme toggle
    console.log('All systems initialized');
});