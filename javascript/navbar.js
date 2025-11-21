// Enhanced Header & Mobile Navigation - FIXED SYMMETRY
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');
    const body = document.body;

    // Check if elements exist
    if (!header || !menuIcon || !navbar) {
        console.error('Required navigation elements not found!');
        return;
    }

    // Create header actions container for better mobile layout
    function createHeaderStructure() {
        const headerActions = document.createElement('div');
        headerActions.className = 'header-actions';
        
        // Move theme toggle and menu icon into header actions
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            headerActions.appendChild(themeToggle);
        }
        headerActions.appendChild(menuIcon);
        
        header.appendChild(headerActions);
    }

    // Initialize header structure
    createHeaderStructure();

    // Header scroll effect
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Toggle mobile menu
    function toggleMenu() {
        navbar.classList.toggle('active');
        body.classList.toggle('menu-open');
        
        // Change icon with proper animation
        if (navbar.classList.contains('active')) {
            menuIcon.classList.remove('bx-menu');
            menuIcon.classList.add('bx-x');
        } else {
            menuIcon.classList.remove('bx-x');
            menuIcon.classList.add('bx-menu');
        }
    }

    // Close mobile menu
    function closeMenu() {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
        menuIcon.classList.add('bx-menu');
        body.classList.remove('menu-open');
    }

    // Smooth scroll to section
    function smoothScroll(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Highlight active section in navigation
    function highlightActiveSection() {
        let scrollY = window.pageYOffset;
        const sections = document.querySelectorAll('section[id]');
        
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

    // Event Listeners
    window.addEventListener('scroll', function() {
        handleScroll();
        highlightActiveSection();
    });

    // Menu icon click
    menuIcon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Navigation links click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Close mobile menu if open
            if (window.innerWidth <= 991 && navbar.classList.contains('active')) {
                closeMenu();
            }
            
            // Remove active class from all links
            navLinks.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to target
            setTimeout(() => {
                smoothScroll(targetId);
            }, 300);
        });
    });

    // Close menu when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991 && 
            navbar.classList.contains('active') &&
            !navbar.contains(e.target) && 
            e.target !== menuIcon &&
            !menuIcon.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && navbar.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navbar.classList.contains('active')) {
            closeMenu();
        }
    });

    // Initialize
    handleScroll();
    highlightActiveSection();
    
    console.log('Mobile navigation initialized successfully!');
});