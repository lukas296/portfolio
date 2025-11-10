// Check for system color scheme preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
} else {
    document.documentElement.setAttribute('data-theme', 'light');
}

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear().toString();

// Function to initialize all animations with IntersectionObserver
function initTimelineAnimations() {
    // Set transitions for all animated elements
    document.querySelectorAll('section.card, section.tagCard,section.textCard, .advantage-item').forEach((el) => {
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        el.classList.remove('visible');
    });

    // observer configuration for appearing sections
    const observerAppearing = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observerAppearing.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.01,
            rootMargin: '0px 0px -3% 0px',
        },
    );
    document.querySelectorAll('.timeline-item,section.card, section.tagCard,section.textCard, .advantage-item').forEach((element) => {
        observerAppearing.observe(element);
    });

    // observer configuration for animating bars
    const observerAnimating = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('emptyBar');
                    observerAnimating.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.01,
            rootMargin: '0px 0px 0% 0px',
        },
    );

    document.querySelectorAll('.emptyBar').forEach((element) => {
        observerAnimating.observe(element);
    });
}

// Initialize animation page load
window.addEventListener('load', initTimelineAnimations);

// Add click handler for home link
document.getElementById('homeLink').addEventListener('click', function (event) {
    event.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});

// Theme toggle
document.querySelector('#themeToggle').addEventListener('click', () => {
    const html = document.documentElement;
    html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
});

// Language toggle
document.querySelector('#langToggle').addEventListener('click', () => {
    document.getElementById('lang-de').classList.toggle('hidden');
    document.getElementById('lang-en').classList.toggle('hidden');
    document.getElementById('lang-de-content').classList.toggle('hidden');
    document.getElementById('lang-en-content').classList.toggle('hidden');

    initTimelineAnimations();
});

// Modal stuff
// Function to update contact modal language
function updateContactModalLanguage(isGerman) {
    document.getElementById('contact-de').classList.toggle('hidden', !isGerman);
    document.getElementById('contact-en').classList.toggle('hidden', isGerman);
}

// Add click handler for contact buttons
document.querySelectorAll('.contact-btn').forEach((button) => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        const lang = this.getAttribute('data-lang');
        updateContactModalLanguage(lang === 'de');
        document.getElementById('contactModal').classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    const modal = document.getElementById('contactModal');
    if (modal.classList.contains('show')) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Close modal when clicking the close button
document.querySelector('.close-btn').addEventListener('click', function () {
    closeModal();
});

// Close modal when clicking outside the modal content
window.addEventListener('click', function (e) {
    const modal = document.getElementById('contactModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.getElementById('contactModal').classList.contains('show')) {
        closeModal();
    }
});
