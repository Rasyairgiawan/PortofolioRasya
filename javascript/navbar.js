// Enhanced Header Functionality
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.navbar a');

    // Header scroll effect
    function handleScroll() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // Toggle mobile menu
    function toggleMenu() {
        navbar.classList.toggle('active');
        menuIcon.classList.toggle('bx-x');
        
        // Change icon
        if (navbar.classList.contains('active')) {
            menuIcon.style.transform = 'rotate(90deg)';
        } else {
            menuIcon.style.transform = 'rotate(0deg)';
        }
    }

    // Close mobile menu when link is clicked
    function closeMenu() {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
        menuIcon.style.transform = 'rotate(0deg)';
    }

    // Smooth scroll to section
    function smoothScroll(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Event listeners
    window.addEventListener('scroll', handleScroll);
    
    if (menuIcon) {
        menuIcon.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Close mobile menu
            if (window.innerWidth <= 991) {
                closeMenu();
            }
            
            // Smooth scroll to target
            smoothScroll(targetId);
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 991 && 
            navbar.classList.contains('active') &&
            !navbar.contains(e.target) && 
            e.target !== menuIcon) {
            closeMenu();
        }
    });

    // Handle resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 991 && navbar.classList.contains('active')) {
            closeMenu();
        }
    });

    // Initialize
    handleScroll();
});