// Enhanced JavaScript for Rasya Portfolio - FIXED
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio enhanced features initialized');
    
    // Typing Animation
    initTypingAnimation();
    
    // Scroll Animations
    initScrollAnimations();
    
    // Enhanced Navigation
    initEnhancedNavigation();
    
    // Dark/Light Mode Toggle - FIXED FOR MOBILE
    initThemeToggle();
    
    // Back to Top Button
    initBackToTop();
    
    // Form Validation
    initFormValidation();
    
    // Image Loading Animation
    initImageLoading();
    
    // Enhanced Modal Interactions
    initEnhancedModals();
});

// Typing Animation for Hero Section
function initTypingAnimation() {
    const typedTextSpan = document.querySelector('.multiple-text');
    if (!typedTextSpan) return;
    
    const textArray = ['Full-Stack Developer', 'UI/UX Designer', 'Mobile Developer', 'Problem Solver'];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 1500;
    let textArrayIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = textArray[textArrayIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, newTextDelay);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, typingDelay + 500);
        } else {
            setTimeout(type, isDeleting ? erasingDelay : typingDelay);
        }
    }
    
    // Start typing animation after page load
    setTimeout(type, 1000);
}

// Scroll Animations with Intersection Observer
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.services-box, .project-box, .testimonial-item, .about-content, .about-img'
    );
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Enhanced Navigation with Active State
function initEnhancedNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar a');
    
    function highlightNav() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNav);
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active state
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Initial highlight
    highlightNav();
}

// Dark/Light Mode Toggle - FIXED FOR MOBILE
function initThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="bx bx-moon"></i>';
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    themeToggle.setAttribute('title', 'Toggle theme');
    
    // Add to header actions for proper positioning
    const header = document.querySelector('.header');
    let headerActions = document.querySelector('.header-actions');
    
    if (!headerActions) {
        headerActions = document.createElement('div');
        headerActions.className = 'header-actions';
        header.appendChild(headerActions);
    }
    
    // Insert before menu icon for better mobile layout
    const menuIcon = document.querySelector('#menu-icon');
    if (menuIcon && menuIcon.parentElement === headerActions) {
        headerActions.insertBefore(themeToggle, menuIcon);
    } else {
        headerActions.appendChild(themeToggle);
    }
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    
    // Apply theme
    applyTheme(currentTheme);
    
    // Theme toggle click event
    themeToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        
        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Apply theme function
    function applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        updateThemeIcon(theme);
        
        // Add transition class for smooth change
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
    }
    
    // Update theme icon
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'bx bx-moon' : 'bx bx-sun';
        }
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="bx bx-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form Validation for Contact Form
function initFormValidation() {
    const contactForm = document.querySelector('.contact form');
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.classList.remove('focused');
            }
            validateField(this);
        });
        
        // Real-time validation for email
        if (input.type === 'email') {
            input.addEventListener('input', function() {
                validateEmail(this);
            });
        }
    });
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        if (isValid) {
            // Simulate form submission
            const submitBtn = this.querySelector('input[type="submit"]');
            const originalText = submitBtn.value;
            
            submitBtn.value = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('Pesan berhasil dikirim! Terima kasih telah menghubungi saya.');
                contactForm.reset();
                submitBtn.value = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
    
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        
        if (field.hasAttribute('required') && !value) {
            showError(field, 'Field ini wajib diisi');
            isValid = false;
        } else if (field.type === 'email' && value) {
            if (!validateEmail(field)) {
                isValid = false;
            }
        } else {
            clearError(field);
        }
        
        return isValid;
    }
    
    function validateEmail(emailField) {
        const email = emailField.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            showError(emailField, 'Format email tidak valid');
            return false;
        } else {
            clearError(emailField);
            return true;
        }
    }
    
    function showError(field, message) {
        clearError(field);
        field.classList.add('error');
        
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        field.parentElement.appendChild(errorElement);
    }
    
    function clearError(field) {
        field.classList.remove('error');
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
}

// Image Loading Animation
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Add loading class
        img.classList.add('loading');
        
        // Remove loading class when image is loaded
        if (img.complete) {
            img.classList.remove('loading');
        } else {
            img.addEventListener('load', function() {
                this.classList.remove('loading');
            });
            
            // Handle image loading errors
            img.addEventListener('error', function() {
                this.classList.remove('loading');
                this.classList.add('error');
            });
        }
    });
}

// Enhanced Modal Interactions
function initEnhancedModals() {
    const modalTriggers = document.querySelectorAll('[onclick*="openModal"]');
    
    modalTriggers.forEach(trigger => {
        // Remove inline onclick and add event listener
        const modalType = trigger.getAttribute('onclick').match(/'([^']+)'/)[1];
        trigger.removeAttribute('onclick');
        
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(modalType);
        });
    });
    
    // Enhanced modal opening with animation
    window.openModal = function(serviceType) {
        const modal = document.getElementById(serviceType + '-modal');
        if (!modal) return;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    };
    
    // Enhanced modal closing
    window.closeModal = function(serviceType) {
        const modal = document.getElementById(serviceType + '-modal');
        if (!modal) return;
        
        modal.classList.remove('active');
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    };
    
    // Enhanced outside click and escape key
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
            
            setTimeout(() => {
                event.target.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    };
    
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                modal.classList.remove('active');
                
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 300);
            });
        }
    });
}