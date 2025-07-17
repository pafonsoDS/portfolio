document.addEventListener('DOMContentLoaded', () => {
    // Function to open a modal
    const openModal = (modal) => {
        if (modal) {
            modal.classList.add('active');
            
            // --- THIS IS THE KEY FIX (PART 1) ---
            // Find an iframe within the modal that has a data-src
            const iframe = modal.querySelector('iframe[data-src]');
            if (iframe) {
                // Set the src attribute to the value from data-src to load the video
                iframe.src = iframe.dataset.src;
            }
        }
    };

    // Function to close a modal
    const closeModal = (modal) => {
        if (modal) {
            modal.classList.remove('active');

            // --- THIS IS THE KEY FIX (PART 2) ---
            // Find any iframe in the modal
            const iframe = modal.querySelector('iframe');
            if (iframe) {
                // Blank the src to completely stop the video and free up resources
                iframe.src = ""; 
            }

            // Your original code for native HTML5 <video> tags is still good to have
            const video = modal.querySelector('video');
            if (video) {
                video.pause();
            }
        }
    };

    // Open modal buttons
    const openModalButtons = document.querySelectorAll('[data-modal-target]');
    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.querySelector(button.dataset.modalTarget);
            openModal(modal);
        });
    });

    // Close modal via overlay click
    const overlays = document.querySelectorAll('.modal-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            const modal = overlay.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal via close button
    const closeModalButtons = document.querySelectorAll('.modal-close-btn');
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });
});