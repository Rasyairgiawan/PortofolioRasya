// Enhanced Page Transitions with Modern Loading
document.addEventListener('DOMContentLoaded', function() {
    console.log('Modern page transitions initialized');
    
    const pageTransition = document.getElementById('pageTransition');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a, .logo');
    const percentageCounter = document.querySelector('.percentage-counter');
    const progressBar = document.querySelector('.loading-progress-bar');
    const loadingText = document.querySelector('.loading-text');
    const particleContainer = document.getElementById('particleContainer');
    
    if (!pageTransition) {
        console.error('Page transition element not found!');
        return;
    }
    
    // Add scroll progress indicator if not exists
    let scrollProgress = document.getElementById('scrollProgress');
    if (!scrollProgress) {
        scrollProgress = document.createElement('div');
        scrollProgress.className = 'scroll-progress';
        scrollProgress.id = 'scrollProgress';
        document.body.appendChild(scrollProgress);
    }
    
    // Create particles
    function createParticles() {
        if (!particleContainer) return;
        
        particleContainer.innerHTML = '';
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const left = Math.random() * 100;
            const delay = Math.random() * 2;
            const duration = 2 + Math.random() * 2;
            const tx = (Math.random() * 200 - 100) + 'px';
            
            particle.style.left = left + '%';
            particle.style.animationDelay = delay + 's';
            particle.style.animationDuration = duration + 's';
            particle.style.setProperty('--tx', tx);
            
            // Random size
            const size = 2 + Math.random() * 3;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            // Random opacity
            particle.style.opacity = 0.3 + Math.random() * 0.7;
            
            particleContainer.appendChild(particle);
        }
    }
    
    // Animate percentage counter
    function animatePercentage(duration = 1000) {
        if (!percentageCounter || !progressBar) return;
        
        let startTime = null;
        const startValue = 0;
        const endValue = 100;
        
        function updateCounter(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            // Easing function
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(startValue + (endValue - startValue) * easeProgress);
            
            percentageCounter.textContent = currentValue + '%';
            progressBar.style.width = currentValue + '%';
            
            // Animate loading text
            if (loadingText) {
                const text = 'LOADING';
                loadingText.innerHTML = '';
                for (let i = 0; i < text.length; i++) {
                    const span = document.createElement('span');
                    span.textContent = text[i];
                    loadingText.appendChild(span);
                }
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                percentageCounter.textContent = '100%';
                progressBar.style.width = '100%';
            }
        }
        
        requestAnimationFrame(updateCounter);
    }
    
    // Initialize Intersection Observer for section animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add specific animations based on section
                const sectionId = entry.target.id;
                animateSectionContent(entry.target, sectionId);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        sectionObserver.observe(section);
        section.classList.add('section-transition');
    });
    
    // Enhanced navigation with page transitions
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;
            
            const targetSection = document.querySelector(targetId);
            if (!targetSection) return;
            
            // Start page transition
            startPageTransition(() => {
                // Scroll to target section
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Highlight active navigation
                updateActiveNav(link);
                
                // Animate target section in
                setTimeout(() => {
                    targetSection.classList.add('animate-in');
                    animateSectionContent(targetSection, targetSection.id);
                    endPageTransition();
                }, 500);
            });
        });
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const currentHash = window.location.hash || '#home';
        const targetSection = document.querySelector(currentHash);
        
        if (targetSection) {
            startPageTransition(() => {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active nav based on hash
                updateActiveNavBasedOnHash(currentHash);
                
                setTimeout(() => {
                    targetSection.classList.add('animate-in');
                    animateSectionContent(targetSection, targetSection.id);
                    endPageTransition();
                }, 500);
            });
        }
    });
    
    // Initialize first section
    const firstSection = document.querySelector('section');
    if (firstSection) {
        setTimeout(() => {
            firstSection.classList.add('animate-in');
            animateSectionContent(firstSection, firstSection.id);
        }, 500);
    }
    
    // Scroll progress indicator
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrolled + "%";
        }
        
        // Highlight active section on scroll
        highlightActiveSection();
    });
    
    // Function to start page transition
    function startPageTransition(callback) {
        // Reset dan setup
        if (percentageCounter) {
            percentageCounter.textContent = '0%';
        }
        if (progressBar) {
            progressBar.style.width = '0%';
        }
        
        // Create particles
        createParticles();
        
        // Show page transition
        pageTransition.classList.add('active');
        
        // Start percentage animation
        setTimeout(() => {
            animatePercentage(800);
        }, 300);
        
        // Wait for transition to show
        setTimeout(() => {
            if (callback) callback();
        }, 300);
    }
    
    // Function to end page transition
    function endPageTransition() {
        setTimeout(() => {
            pageTransition.classList.remove('active');
            // Reset counter
            if (percentageCounter) {
                percentageCounter.textContent = '0%';
            }
            if (progressBar) {
                progressBar.style.width = '0%';
            }
        }, 500);
    }
    
    // Function to update active navigation
    function updateActiveNav(clickedLink) {
        navLinks.forEach(link => link.classList.remove('active'));
        clickedLink.classList.add('active');
    }
    
    // Function to update nav based on URL hash
    function updateActiveNavBasedOnHash(hash) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });
    }
    
    // Function to animate section content with staggered effects
    function animateSectionContent(section, sectionId) {
        const elements = section.querySelectorAll('h1, h2, h3, p, .btn, .social-media, .services-box, .project-box, .testimonial-item, .about-content, .about-img');
        
        elements.forEach((element, index) => {
            // Reset animation
            element.style.animation = '';
            element.classList.remove('animated');
            
            // Add animation with delay
            setTimeout(() => {
                element.classList.add('animated');
                
                // Apply different animations based on element type
                if (element.tagName === 'H1' || element.tagName === 'H2') {
                    element.style.animation = 'fadeInDown 0.8s ease forwards';
                } else if (element.tagName === 'P') {
                    element.style.animation = 'fadeInUp 0.8s ease forwards';
                } else if (element.classList.contains('btn') || element.classList.contains('social-media')) {
                    element.style.animation = 'scaleIn 0.6s ease forwards';
                } else if (element.classList.contains('services-box') || element.classList.contains('project-box')) {
                    element.style.animation = 'fadeInUp 0.8s ease forwards';
                } else {
                    element.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            }, index * 100);
        });
    }
    
    // Smooth scroll for manual scrolling
    let isScrolling = false;
    let lastScrollTop = 0;
    let scrollDirection = 'down';
    
    function highlightActiveSection() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                let currentScroll = window.pageYOffset;
                scrollDirection = currentScroll > lastScrollTop ? 'down' : 'up';
                lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
                
                // Update scroll direction attribute
                document.body.setAttribute('data-scroll-direction', scrollDirection);
                
                sections.forEach(section => {
                    const sectionTop = section.offsetTop - 100;
                    const sectionBottom = sectionTop + section.offsetHeight;
                    
                    if (currentScroll >= sectionTop && currentScroll < sectionBottom) {
                        // Add pulse effect when section comes into view
                        if (!section.classList.contains('pulse-highlight')) {
                            section.classList.add('pulse-highlight');
                            setTimeout(() => {
                                section.classList.remove('pulse-highlight');
                            }, 1000);
                        }
                        
                        // Update active nav
                        updateActiveNavBasedOnHash(`#${section.id}`);
                    }
                });
                
                isScrolling = false;
            });
            isScrolling = true;
        }
    }
    
    // Initialize particles
    createParticles();
    
    // Initialize
    highlightActiveSection();
    
    // Add CSS for pulse highlight
    const style = document.createElement('style');
    style.textContent = `
        .pulse-highlight {
            animation: pulseHighlight 1s ease;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Page transitions system ready');
});