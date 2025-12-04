// Loading Screen Management
document.addEventListener('DOMContentLoaded', function() {
    console.log('Loading screen initialized');
    
    // Generate random particles
    generateParticles();
    
    // Initialize loading sequence
    initLoadingSequence();
});

function generateParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 3 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

function initLoadingSequence() {
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;
    
    if (!loadingScreen) {
        console.error('Loading screen element not found');
        body.classList.remove('loading');
        body.classList.add('loaded');
        return;
    }
    
    // Simulate minimum loading time
    const minLoadTime = 1500; // 1.5 seconds minimum
    const startTime = Date.now();
    
    function checkResourcesLoaded() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        
        // Check if all resources are loaded
        if (document.readyState === 'complete') {
            // Ensure minimum loading time
            const remainingTime = minLoadTime - elapsed;
            
            if (remainingTime > 0) {
                setTimeout(hideLoadingScreen, remainingTime);
            } else {
                hideLoadingScreen();
            }
        } else {
            // If not loaded yet, check again in 100ms
            setTimeout(checkResourcesLoaded, 100);
        }
    }
    
    // Start checking resources
    checkResourcesLoaded();
    
    // Fallback timeout (max 5 seconds)
    setTimeout(function() {
        if (body.classList.contains('loading')) {
            console.warn('Loading timeout - forcing content display');
            hideLoadingScreen();
        }
    }, 5000);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;
    
    if (!loadingScreen || !body.classList.contains('loading')) {
        return;
    }
    
    console.log('Hiding loading screen');
    
    // Add fade-out animation
    loadingScreen.style.transition = 'opacity 0.5s ease, visibility 0.5s ease';
    loadingScreen.classList.add('hidden');
    
    // Update body classes
    body.classList.remove('loading');
    body.classList.add('loaded');
    
    // Remove loading screen from DOM after animation
    setTimeout(function() {
        loadingScreen.style.display = 'none';
        console.log('Loading screen hidden');
    }, 500);
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible' && 
        document.body.classList.contains('loading')) {
        // If page becomes visible while still loading, check again
        setTimeout(hideLoadingScreen, 100);
    }
});

// Handle page errors gracefully
window.addEventListener('error', function(e) {
    console.error('Page error detected:', e.message);
    
    // Even if there's an error, show content after a delay
    setTimeout(function() {
        if (document.body.classList.contains('loading')) {
            console.log('Showing content despite errors');
            hideLoadingScreen();
        }
    }, 1000);
});

// Handle offline/online events
window.addEventListener('offline', function() {
    console.warn('Network connection lost');
});

window.addEventListener('online', function() {
    console.log('Network connection restored');
});

// Export for use in other scripts if needed
window.loadingManager = {
    hide: hideLoadingScreen,
    isLoaded: function() {
        return document.body.classList.contains('loaded');
    }
};