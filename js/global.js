/* js/global.js */

document.addEventListener('DOMContentLoaded', function () {
    // --- Particles.js Configuration ---
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
    const observerOptions = {
        root: null,
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // You can uncomment the line below if you want the animation to happen only once
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Tech Stack Generation from Manual Map ---
    const techStackGrid = document.querySelector('.tech-stack-grid');
    
    // -- EDIT YOUR SKILL RATINGS HERE (0-10) --
    const manualSkillRatings = {
        "Python": 9.5,
        "LLMs": 9,
        "PyTorch": 8.5,
        "Pandas": 8.5,
        "Python-Chess": 8,
        "Pynput": 8,
        "Java": 7.5,
        "Stockfish": 8,
        "Sklearn": 8,
        "Numpy": 8,
        "OpenCV": 7.5,
        "Unsloth": 7,
        "Flask": 7,
        "SQL": 7,
        "HTML": 6.5,
        "CSS": 6.5, 
        "Django": 6.5,
        "JS": 6,
        "Rust": 6,
        "Flutter": 6,
        "Firebase": 6,
    };

    if (techStackGrid) {
        // Sorts by rating in descending order (highest first)
        const sortedSkills = Object.entries(manualSkillRatings).sort(([, ratingA], [, ratingB]) => ratingB - ratingA);

        sortedSkills.forEach(([skill, rating]) => {
            const finalRating = Math.max(0, Math.min(10, rating)); // Ensure rating is between 0 and 10

            const skillElement = document.createElement('div');
            skillElement.classList.add('tech-skill');

            skillElement.innerHTML = `
                <h3>
                    ${skill}
                    <span class="skill-rating">${finalRating.toFixed(1)} / 10</span>
                </h3>
                <div class="skill-bar">
                    <div class="skill-progress" data-width="${finalRating * 10}%"></div>
                </div>
            `;
            techStackGrid.appendChild(skillElement);
        });

        // Use the observer to animate the progress bars when they become visible
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBar = entry.target.querySelector('.skill-progress');
                    progressBar.style.width = progressBar.getAttribute('data-width');
                    skillObserver.unobserve(entry.target); // Animate only once
                }
            });
        }, { threshold: 0.8 }); // Trigger when 80% of the skill item is visible

        document.querySelectorAll('.tech-skill').forEach(skillItem => {
            skillObserver.observe(skillItem);
        });
    }
});