
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing about section...');
    
    // Toggle Read More functionality
    const readMoreBtn = document.getElementById('readMoreBtn');
    const enhancedFeatures = document.getElementById('enhancedFeatures');
    let isExpanded = false;
    
    // Check if elements exist
    if (!readMoreBtn || !enhancedFeatures) {
        console.error('Required elements not found!');
        console.log('readMoreBtn:', readMoreBtn);
        console.log('enhancedFeatures:', enhancedFeatures);
        return;
    }

    // Event listener untuk button read more
    readMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Read More button clicked!');
        
        if (!isExpanded) {
            enhancedFeatures.classList.add('show');
            readMoreBtn.textContent = 'Read Less';
            isExpanded = true;
            
            // Animate stats counter when shown
            animateStats();
        } else {
            enhancedFeatures.classList.remove('show');
            readMoreBtn.textContent = 'Read More';
            isExpanded = false;
            
            // Reset stats counter
            resetStats();
        }
    });

    // Stats counter animation
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        console.log('Animating stats, found:', statNumbers.length, 'elements');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const updateStat = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current);
                    setTimeout(updateStat, 20);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateStat();
        });
    }

    // Skill bars animation on scroll
        const skillBars = document.querySelectorAll('.skill-progress');
        const skillsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 500);
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => {
            skillsObserver.observe(bar);
        });

    // Reset stats counter
    function resetStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            stat.textContent = '0';
        });
    }

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            console.log('Tab clicked:', targetTab);
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Optional: Smooth scroll ketika enhanced features muncul
    function smoothScrollToElement(element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }

    // Optional: Event listener untuk smooth scroll
    readMoreBtn.addEventListener('click', function() {
        if (isExpanded) {
            setTimeout(() => {
                smoothScrollToElement(enhancedFeatures);
            }, 100);
        }
    });
    
    console.log('About section initialized successfully!');
});