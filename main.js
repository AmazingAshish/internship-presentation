document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    let currentSlideIndex = 0;

    // Function to scroll to a specific slide
    function scrollToSlide(index) {
        if (index >= 0 && index < slides.length) {
            slides[index].scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            currentSlideIndex = index;
            updateNavigationButtons();
        }
    }

    // Update button states (disabled/enabled)
    function updateNavigationButtons() {
        prevButton.disabled = currentSlideIndex === 0;
        nextButton.disabled = currentSlideIndex === slides.length - 1;
    }

    // Event listener for next button
    nextButton.addEventListener('click', () => {
        scrollToSlide(currentSlideIndex + 1);
    });

    // Event listener for previous button
    prevButton.addEventListener('click', () => {
        scrollToSlide(currentSlideIndex - 1);
    });

    // Add smooth scrolling between slides (existing functionality)
    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => {
            if (index < slides.length - 1) {
                scrollToSlide(index + 1);
            }
        });
    });

    // Add keyboard navigation (existing functionality)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown' && currentSlideIndex < slides.length - 1) {
            scrollToSlide(currentSlideIndex + 1);
        } else if (e.key === 'ArrowUp' && currentSlideIndex > 0) {
            scrollToSlide(currentSlideIndex - 1);
        }
    });

    // Animate progress bars when they come into view (existing functionality)
    const progressBars = document.querySelectorAll('.progress-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.width; /* Re-apply width to trigger transition */
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of the element is visible

    progressBars.forEach(bar => observer.observe(bar));

    // Initialize button states on load
    updateNavigationButtons();
    // Ensure first slide is in view on load
    scrollToSlide(0);
});
