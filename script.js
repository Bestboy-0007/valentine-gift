/* ========================================
   VALENTINE GIFT WEBSITE - JAVASCRIPT
   ======================================== */

// Default passcode
const PASSCODE = "1234";

// Cute error messages for wrong passcode
const errorMessages = [
    "Oops! That's not the magic number 💕",
    "Nope! Try again, my love 💖",
    "Wrong passcode! But I still love you 💘",
    "That's not it! Keep trying 💝",
    "Hmm, not quite right 💗",
    "Close but no! Try again 💖",
    "Wrong! But you're still amazing 💕"
];

// Love message to type out
const loveMessage = "My dearest love, from the moment I first saw you, my life has been filled with joy and meaning. You are my sunshine on cloudy days, my smile when I'm sad, and my heartbeat when I think of you. Every moment with you is a treasure, and I fall more in love with you each day. Happy Valentine's Day! ❤️";

// ========================================
// LOGIN PAGE FUNCTIONS
// ========================================

// Create floating hearts for login page
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    if (!container) return;
    
    const hearts = ['💕', '💖', '💗', '💘', '💝', '❤️', '💓', '💔', '💟'];
    
    // Create initial hearts
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createHeart(container, hearts);
        }, i * 400);
    }
    
    // Keep adding hearts periodically
    setInterval(() => {
        createHeart(container, hearts);
    }, 600);
}

function createHeart(container, hearts) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 8000);
}

// Check passcode
function checkPasscode() {
    const passcodeInput = document.getElementById('passcode');
    const errorMessage = document.getElementById('errorMessage');
    const enteredPasscode = passcodeInput.value;
    
    if (enteredPasscode === PASSCODE) {
        // Correct passcode - redirect to surprise page
        errorMessage.style.color = '#2ecc71';
        errorMessage.textContent = '❤️ Opening... ❤️';
        setTimeout(() => {
            window.location.href = 'surprise.html';
        }, 500);
    } else {
        // Wrong passcode - show cute error message
        const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
        errorMessage.textContent = randomMessage;
        
        // Shake animation
        errorMessage.style.animation = 'none';
        setTimeout(() => {
            errorMessage.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
        
        // Clear input
        passcodeInput.value = '';
        passcodeInput.focus();
    }
}

// Allow Enter key to submit
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkPasscode();
    }
});

// ========================================
// SURPRISE PAGE FUNCTIONS
// ========================================

// Create falling hearts for surprise page
function createFallingHearts() {
    const container = document.getElementById('heartsBackground');
    if (!container) return;
    
    const hearts = ['💕', '💖', '💗', '💘', '💝', '❤️', '💓'];
    
    // Create initial hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFallingHeart(container, hearts);
        }, i * 300);
    }
    
    // Keep adding hearts periodically
    setInterval(() => {
        createFallingHeart(container, hearts);
    }, 400);
}

function createFallingHeart(container, hearts) {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heart.style.animationDuration = (Math.random() * 3 + 6) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    container.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        heart.remove();
    }, 10000);
}

// Type love message
function typeLoveMessage() {
    const messageElement = document.getElementById('loveMessage');
    if (!messageElement) return;
    
    let index = 0;
    
    function type() {
        if (index < loveMessage.length) {
            messageElement.textContent += loveMessage.charAt(index);
            index++;
            setTimeout(type, 50); // Typing speed
        }
    }
    
    // Start typing after a short delay
    setTimeout(type, 1000);
}

// Show surprise popup
function showSurprise() {
    const popup = document.getElementById('popupOverlay');
    popup.classList.add('active');
    
    // Start confetti
    startConfetti();
    
    // Play celebration
    celebrate();
}

// Close popup
function closePopup() {
    const popup = document.getElementById('popupOverlay');
    popup.classList.remove('active');
    
    // Stop confetti
    stopConfetti();
}

// Close popup when clicking outside
document.addEventListener('click', function(e) {
    const popup = document.getElementById('popupOverlay');
    if (e.target === popup) {
        closePopup();
    }
});

// Answer Valentine question
function answerValentine(answer) {
    const popupTitle = document.getElementById('popupTitle');
    const popupMessage = document.getElementById('popupMessage');
    const yesNoButtons = document.getElementById('yesNoButtons');
    const popupHeart = document.querySelector('.popup-heart-animation');
    
    if (answer === 'yes') {
        popupTitle.textContent = "YAY! 💖";
        popupMessage.textContent = "You made me the happiest person ever! ❤️";
        popupHeart.textContent = "💕💕💕";
        
        // Hide the buttons after Yes
        yesNoButtons.style.display = 'none';
        
        // Add response message
        const responseDiv = document.createElement('div');
        responseDiv.className = 'response-message yes-response';
        responseDiv.textContent = '❤️ I LOVE YOU SO MUCH! ❤️';
        
        const popupContent = document.querySelector('.popup-content');
        popupContent.appendChild(responseDiv);
        
        // Restart confetti for yes
        stopConfetti();
        setTimeout(() => {
            startConfetti();
        }, 300);
    } else {
        // If she clicks No, show a pleading message instead!
        popupTitle.textContent = "Please Say Yes 🥺💕";
        popupMessage.textContent = "I love you so much! ❤️";
        popupHeart.textContent = "💖";
        
        // Show the response message asking her to say yes
        const responseDiv = document.createElement('div');
        responseDiv.className = 'response-message no-response';
        responseDiv.textContent = '🥺 Please baby, say YES! 🥺';
        
        const popupContent = document.querySelector('.popup-content');
        popupContent.appendChild(responseDiv);
        
        // Keep the Yes button visible and make No button disappear
        yesNoButtons.innerHTML = '<button class="yes-btn" onclick="answerValentine(\'yes\')">Yes 💖</button>';
        
        // Start celebration when she finally says Yes
        stopConfetti();
        setTimeout(() => {
            startConfetti();
        }, 500);
    }
}

// ========================================
// CONFETTI EFFECT
// ========================================

let confettiInterval;
const confettiColors = ['#ff4d6d', '#ff8fa3', '#ffd700', '#ff69b4', '#ff1493', '#da70d6'];

function startConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const confetti = [];
    const confettiCount = 150;
    
    // Create confetti pieces
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            w: Math.random() * 10 + 5,
            h: Math.random() * 6 + 3,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * 360,
            spin: Math.random() * 0.2 - 0.1,
            drift: Math.random() * 2 - 1
        });
    }
    
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confetti.forEach(c => {
            ctx.save();
            ctx.translate(c.x, c.y);
            ctx.rotate(c.angle);
            ctx.fillStyle = c.color;
            ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
            ctx.restore();
            
            // Update position
            c.y += c.speed;
            c.x += c.drift;
            c.angle += c.spin;
            
            // Reset when off screen
            if (c.y > canvas.height) {
                c.y = -20;
                c.x = Math.random() * canvas.width;
            }
        });
        
        if (confettiInterval) {
            requestAnimationFrame(draw);
        }
    }
    
    confettiInterval = true;
    draw();
    
    // Stop confetti after 5 seconds
    setTimeout(stopConfetti, 5000);
}

function stopConfetti() {
    confettiInterval = false;
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Celebration function
function celebrate() {
    // Add some extra animations
    const body = document.body;
    body.style.animation = 'celebrate 0.5s ease';
    setTimeout(() => {
        body.style.animation = '';
    }, 500);
}

// Add celebrate animation
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrate {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }
`;
document.head.appendChild(style);

// Handle window resize for confetti canvas
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confettiCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
