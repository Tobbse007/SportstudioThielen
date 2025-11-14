// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking on a link
const mobileLinks = mobileMenu.querySelectorAll('a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Navbar scroll effect - hide on scroll down, show on scroll up
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 50) {
        navbar.classList.add('nav-shadow');
    } else {
        navbar.classList.remove('nav-shadow');
    }
    
    // Hide/show navbar based on scroll direction
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down & past 100px - hide navbar
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up - show navbar
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Scroll animations (Fade in on scroll)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});

// Pop-up functionality (wird später für Services & Trainer genutzt)
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// Close popup when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup-overlay')) {
        e.target.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
});

// Form submission handlers (placeholder)
function handleContactForm(event) {
    event.preventDefault();
    alert('Vielen Dank für deine Nachricht! Wir melden uns bald bei dir.');
    event.target.reset();
}

function handleTrainerContact(event) {
    event.preventDefault();
    alert('Anfrage wurde versendet! Der Trainer meldet sich in Kürze bei dir.');
    event.target.reset();
    // Close the popup
    const popup = event.target.closest('.popup-overlay');
    if (popup) {
        popup.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}



// OLD Toggle function (wird nicht mehr verwendet, aber als Backup behalten)
function togglePrices() {
    console.log('=== OLD togglePrices CALLED (should not be used) ===');
    
    const aboCards = document.getElementById('abo-cards');
    const cardsSection = document.getElementById('cards-section');
    const toggleDot = document.getElementById('toggle-dot');
    const toggleBtn = document.getElementById('price-toggle');
    const aboLabel = document.getElementById('abo-label');
    const cardsLabel = document.getElementById('cards-label');
    
    console.log('Elements found:', {
        aboCards: !!aboCards,
        cardsSection: !!cardsSection,
        toggleDot: !!toggleDot,
        toggleBtn: !!toggleBtn
    });
    
    if (!aboCards || !cardsSection) {
        console.error('ERROR: Required elements not found!');
        return;
    }
    
    // Check if showing Abos (check computed style, not inline style)
    const aboDisplay = window.getComputedStyle(aboCards).display;
    const cardsDisplay = window.getComputedStyle(cardsSection).display;
    const isShowingAbos = aboDisplay !== 'none';
    
    console.log('Current display states:', {
        aboCards: aboDisplay,
        cardsSection: cardsDisplay,
        isShowingAbos: isShowingAbos
    });
    
    // Responsive toggle distance
    const isMobile = window.innerWidth < 768;
    const toggleDistance = isMobile ? '28px' : '32px';
    
    if (isShowingAbos) {
        console.log('>>> Switching TO Tageskarten');
        // Switch to Tageskarten
        // 1. Fade out Abos
        aboCards.style.opacity = '0';
        aboCards.style.transform = 'translateY(-20px)';
        console.log('Step 1: Fading out Abos');
        
        setTimeout(() => {
            aboCards.style.display = 'none';
            console.log('Step 2: Abos hidden, showing Tageskarten');
            
            // 2. Show and fade in Tageskarten
            cardsSection.style.display = 'grid';
            cardsSection.style.opacity = '0';
            cardsSection.style.transform = 'translateY(20px)';
            
            console.log('Tageskarten display set to grid');
            
            // Force reflow
            void cardsSection.offsetHeight;
            
            setTimeout(() => {
                cardsSection.style.opacity = '1';
                cardsSection.style.transform = 'translateY(0)';
                console.log('Step 3: Tageskarten faded in', {
                    display: cardsSection.style.display,
                    opacity: cardsSection.style.opacity
                });
            }, 50);
        }, 300);
        
        // Update toggle UI
        toggleDot.style.transform = `translateX(${toggleDistance})`;
        toggleBtn.classList.add('bg-primary-dark');
        aboLabel.classList.remove('text-primary');
        aboLabel.classList.add('text-gray-500');
        cardsLabel.classList.remove('text-gray-500');
        cardsLabel.classList.add('text-primary');
    } else {
        console.log('>>> Switching TO Abos');
        // Switch to Abos
        // 1. Fade out Tageskarten
        cardsSection.style.opacity = '0';
        cardsSection.style.transform = 'translateY(-20px)';
        console.log('Step 1: Fading out Tageskarten');
        
        setTimeout(() => {
            cardsSection.style.display = 'none';
            console.log('Step 2: Tageskarten hidden, showing Abos');
            
            // 2. Show and fade in Abos
            aboCards.style.display = 'grid';
            aboCards.style.opacity = '0';
            aboCards.style.transform = 'translateY(20px)';
            
            console.log('Abos display set to grid');
            
            // Force reflow
            void aboCards.offsetHeight;
            
            setTimeout(() => {
                aboCards.style.opacity = '1';
                aboCards.style.transform = 'translateY(0)';
                console.log('Step 3: Abos faded in', {
                    display: aboCards.style.display,
                    opacity: aboCards.style.opacity
                });
            }, 50);
        }, 300);
        
        // Update toggle UI
        toggleDot.style.transform = 'translateX(0)';
        toggleBtn.classList.remove('bg-primary-dark');
        cardsLabel.classList.remove('text-primary');
        cardsLabel.classList.add('text-gray-500');
        aboLabel.classList.remove('text-gray-500');
        aboLabel.classList.add('text-primary');
    }
}
