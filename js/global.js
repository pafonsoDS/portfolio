/* js/global.js */

// --- Particles.js Configuration ---
document.addEventListener('DOMContentLoaded', function () {
    // Check if the particles-js element exists before initializing
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#30363d" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true },
                "size": { "value": 2, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#58a6ff", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": false }, "resize": true },
                "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 0.3 } } }
            },
            "retina_detect": true
        });
    }

    // --- Intersection Observer for Scroll Animations ---
    const sections = document.querySelectorAll('.section');
    
    // Options for the observer
    const observerOptions = {
        root: null, // relative to the viewport
        threshold: 0.15 // 15% of the element must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // If the element is intersecting the viewport, add the 'visible' class
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
        // The first section is already visible by default, so we can skip it
        if (!section.classList.contains('visible')) {
            observer.observe(section);
        }
    });
});