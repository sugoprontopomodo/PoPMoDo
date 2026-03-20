/**
 * PO MO DO - Bold Pop 70s Script
 * Handles aggressive "snap" animations on scroll.
 */

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------
       Intersection Observer for Snappy Animations
    ------------------------------------- */

    // We want elements to snap in decisively when they appear
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px', // Trigger slightly before it hits the bottom
        threshold: 0.1
    };

    const snapObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class that triggers the CSS transition snap
                entry.target.classList.add('is-snapped');
                // Stop observing once animated in
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab all sections that need to snap
    const snapSections = document.querySelectorAll('.snap-observe');
    snapSections.forEach(section => {
        snapObserver.observe(section);
    });

    /* -------------------------------------
       Smooth Scroll mapping
    ------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
