/* ============================================
   ROMANTIC BIRTHDAY WEBSITE - JAVASCRIPT
   ============================================ */

/* ============================================
   EDITABLE VARIABLES - CUSTOMIZE HERE! 🎨
   ============================================ */

const girlfriendName = "Antigravity";
const birthdayMessage = "Happy Birthday My Love 💖";
const youtubeVideoId = "LUgpPmj6nR8";

const loveLetter = `My love, every moment with you feels like a beautiful dream I never want to wake up from. You are my peace in chaos, my smile in sadness, and my strength when I feel weak. No matter where life takes us, always remember one thing — I am always with you, in every heartbeat, every breath, every moment. You are my forever and always. Happy Birthday, my love 💕.`;

/* ============================================
   PAGE MANAGEMENT
   ============================================ */

let currentPage = 0;
let isMuted = true;
let isAnimating = false;

const pages = document.querySelectorAll('.page');
const dots = document.querySelectorAll('.dot');

/**
 * Initialize the website on page load
 */
function initializePage() {
    // Set girlfriend's name in welcome title
    document.getElementById('welcome-title').textContent = `Happy Birthday ${girlfriendName} 💕`;

    // Add love letter with typewriter effect
    typeWriterEffect('love-letter-text', loveLetter, 50);

    // Setup keyboard navigation
    setupKeyboardNavigation();

    // Setup touch/swipe navigation
    setupSwipeNavigation();

    // Update YouTube player source
    updateYouTubePlayer();

    console.log('🎉 Website Initialized!');
    console.log('💕 Welcome to ' + girlfriendName + '\'s Birthday Website!');
}

/**
 * Go to specific page
 * @param {number} pageIndex - Index of page to navigate to
 */
function goToPage(pageIndex) {
    if (isAnimating) return;
    if (pageIndex < 0 || pageIndex >= pages.length) return;
    if (pageIndex === currentPage) return;

    isAnimating = true;

    // Remove active class from current page
    pages[currentPage].classList.remove('active');
    dots[currentPage].classList.remove('active');

    // Add animation class for direction
    if (pageIndex > currentPage) {
        pages[currentPage].classList.add('prev');
    } else {
        pages[currentPage].classList.remove('prev');
    }

    // Set new page as active
    currentPage = pageIndex;
    pages[currentPage].classList.add('active');
    pages[currentPage].classList.remove('prev');
    dots[currentPage].classList.add('active');

    // Reset animation lock after transition
    setTimeout(() => {
        isAnimating = false;
    }, 600);
}

/**
 * Go to next page
 */
function nextPage() {
    goToPage(currentPage + 1);
}

/**
 * Go to previous page
 */
function prevPage() {
    goToPage(currentPage - 1);
}

/* ============================================
   KEYBOARD NAVIGATION
   ============================================ */

function setupKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            e.preventDefault();
            nextPage();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevPage();
        }
    });
}

/* ============================================
   SWIPE/TOUCH NAVIGATION
   ============================================ */

let touchStartX = 0;
let touchEndX = 0;

function setupSwipeNavigation() {
    const container = document.querySelector('.pages-container');

    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextPage(); // Swiped left
        } else {
            prevPage(); // Swiped right
        }
    }
}

/* ============================================
   MUSIC CONTROL
   ============================================ */

/**
 * Toggle sound on/off
 */
function toggleSound() {
    const button = document.querySelector('.music-toggle');
    const player = document.getElementById('yt-player');
    const currentSrc = player.src;

    if (isMuted) {
        // Unmute
        player.src = currentSrc.replace('mute=1', 'mute=0');
        button.textContent = '🎵 Music On';
        isMuted = false;
    } else {
        // Mute
        player.src = currentSrc.replace('mute=0', 'mute=1');
        button.textContent = '🎵 Play Music';
        isMuted = true;
    }
}

/**
 * Update YouTube player with custom video ID
 */
function updateYouTubePlayer() {
    const player = document.getElementById('yt-player');
    const baseUrl = 'https://www.youtube.com/embed/';
    const params = '?autoplay=0&loop=1&playlist=' + youtubeVideoId + '&mute=1';
    player.src = baseUrl + youtubeVideoId + params;
}

/* ============================================
   TEXT ANIMATIONS
   ============================================ */

/**
 * Typewriter effect for love letter
 * @param {string} elementId - ID of element to animate
 * @param {string} text - Text to type
 * @param {number} speed - Speed of typing in ms
 */
function typeWriterEffect(elementId, text, speed = 50) {
    const element = document.getElementById(elementId);
    element.innerHTML = '';

    let index = 0;

    function type() {
        if (index < text.length) {
            const char = text.charAt(index);
            element.innerHTML += char;
            index++;
            setTimeout(type, speed);
        }
    }

    // Wait for element to be visible before typing
    setTimeout(() => {
        type();
    }, 300);
}

/* ============================================
   SURPRISE PAGE ANIMATIONS
   ============================================ */

/**
 * Trigger surprise animation and message
 */
function triggerSurprise() {
    const message = document.getElementById('surprise-message');
    const button = event.target.closest('.btn-surprise');

    // Show message
    message.classList.remove('hidden');
    message.classList.add('visible');

    // Create heart explosion
    createHeartExplosion();

    // Add glow effect
    addGlowEffect();

    // Disable button
    button.disabled = true;
    button.style.opacity = '0.5';
}

/**
 * Create hearts explosion animation
 */
function createHeartExplosion() {
    const container = document.getElementById('hearts-container');
    const hearts = ['💖', '💕', '💗', '💝', '💞', '❤️', '💓'];
    const centerX = container.offsetWidth / 2;
    const centerY = container.offsetHeight / 2;

    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-pop';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        // Random explosion direction
        const angle = (Math.random() * Math.PI * 2);
        const distance = 100 + Math.random() * 200;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance - 100; // Bias upward

        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');

        container.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 1500);
    }
}

/**
 * Add glow effect to page background
 */
function addGlowEffect() {
    const page = document.querySelector('.page.active');
    const glow = document.createElement('div');
    glow.style.position = 'absolute';
    glow.style.width = '300px';
    glow.style.height = '300px';
    glow.style.background = 'radial-gradient(circle, rgba(255,182,193,0.4) 0%, transparent 70%)';
    glow.style.borderRadius = '50%';
    glow.style.pointerEvents = 'none';
    glow.style.top = '50%';
    glow.style.left = '50%';
    glow.style.transform = 'translate(-50%, -50%)';
    glow.style.animation = 'pulse 2s ease-in-out';
    glow.style.zIndex = '2';

    page.appendChild(glow);

    // Remove glow after animation
    setTimeout(() => {
        glow.remove();
    }, 2000);
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

/**
 * Generate random number between min and max
 */
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
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

/* ============================================
   PAGE LOAD
   ============================================ */

// Initialize website when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}

/* ============================================
   ERROR HANDLING & LOGGING
   ============================================ */

window.addEventListener('error', (e) => {
    console.error('❌ Error:', e.message);
});

console.log('%c💕 Romantic Birthday Website 💕', 'color: #FF7F7F; font-size: 20px; font-weight: bold;');
console.log('%cCustomize these variables in script.js:', 'color: #FFB6C1; font-size: 14px; font-weight: bold;');
console.log('%cgirlfriendName: "' + girlfriendName + '"', 'color: #FFB6C1; font-size: 12px;');
console.log('%cbirthdayMessage: "' + birthdayMessage + '"', 'color: #FFB6C1; font-size: 12px;');
console.log('%cyoutubeVideoId: "' + youtubeVideoId + '"', 'color: #FFB6C1; font-size: 12px;');
console.log('%c🎉 Happy Birthday! 🎉', 'color: #FF7F7F; font-size: 16px; font-weight: bold;');
