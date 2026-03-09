// Enhanced mobile menu toggle with accessibility and overlay handling
document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.navbar .mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu-items');
    const closeButton = document.querySelector('.mobile-menu-close');
    const navbar = document.querySelector('.navbar');

    if (!toggleButton || !mobileMenu) return;

    const icon = toggleButton.querySelector('i');

    function setAria(expanded) {
        toggleButton.setAttribute('aria-expanded', expanded);
        if (icon) {
            if (expanded) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        }
    }

    function openMenu() {
        mobileMenu.classList.add('active');
        setAria(true);
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mobileMenu.classList.remove('active');
        setAria(false);
        document.body.style.overflow = '';
    }

    toggleButton.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('active')) closeMenu();
        else openMenu();
    });

    // Close button inside mobile menu
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            closeMenu();
        });
    }

    // Support keyboard activation (Enter / Space)
    toggleButton.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleButton.click();
        }
    });

    // Close menu when a link inside it is clicked
    mobileMenu.addEventListener('click', function(e) {
        const target = e.target.closest('a');
        if (target) closeMenu();
    });

    // Close on Esc
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
        if (!mobileMenu.classList.contains('active')) return;
        if (!mobileMenu.contains(e.target) && !toggleButton.contains(e.target)) {
            closeMenu();
        }
    });

    // Initialize aria/icon
    setAria(false);

    // Change navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 0) {
            navbar.classList.add('navbar-scroll');
        } else {
            navbar.classList.remove('navbar-scroll');
        }
    });
});

document.getElementById('current-year').textContent = new Date().getFullYear();

