let currentSlide = 0; // Start from the first slide

// Function to show the slideshow overlay
function toggleSlideshow(setId) {
    const overlay = document.querySelectorAll('.overlay');
    const slideIndex = setId - 1; // Set the index for the particular overlay
    const slideShow = overlay[slideIndex]; // Get the specific overlay for the set
    const container = slideShow.querySelector('.slideshow-container'); // Get the slideshow container
    const slides = container.querySelectorAll('.set'); // Get all slide divs (with class 'set')


    if (container.style.display === 'flex') {
        container.style.display = 'none';  // Hide the overlay if it's currently visible
        slideShow.style.display = 'none';  // Also hide the entire overlay
    } else {
        container.style.display = 'flex';  // Show the overlay
        slideShow.style.display = 'flex';  // Show the overlay

        // Ensure that slides are passed correctly
        showSlide(slides, currentSlide, setId);  // Show the first slide for the specific overlay
    }

    // Add event listener to close overlay if clicked outside the slideshow container
    slideShow.addEventListener('click', function (event) {
        if (event.target === slideShow) {
            closeSlideshow(); // Close overlay if the background (outside the slideshow) is clicked
        }
    });
}

// Function to show a specific slide
function showSlide(slides, currentSlide, setId) {
    const slidesArray = Array.from(slides); // Convert NodeList to an Array for easier handling
    // Ensure currentSlide is within bounds
    if (currentSlide >= slidesArray.length) {
        currentSlide = 0; // Loop back to the first slide
    } else if (currentSlide < 0) {
        currentSlide = slidesArray.length - 1; // Loop back to the last slide
    }

    // First, hide all slides
    slidesArray.forEach(slide => {
        slide.style.display = 'none'; // Hide all slides
    });

    // Show the current slide
    slidesArray[currentSlide].style.display = 'block'; // Display the current slide
}

// Function to change slides (next or previous)
function changeSlide(direction) {
    currentSlide += direction; // Increment or decrement the current slide index
    const overlays = document.querySelectorAll('.overlay'); // Get all overlays

    // Find the currently active overlay
    overlays.forEach(overlay => {
        const container = overlay.querySelector('.slideshow-container');
        const slides = container.querySelectorAll('.set');

        // Ensure the current slide is within bounds
        if (currentSlide >= slides.length) {
            currentSlide = 0; // Reset to first slide
        } else if (currentSlide < 0) {
            currentSlide = slides.length - 1; // Go to the last slide
        }

        // Hide all slides and show the new current slide
        slides.forEach(slide => slide.style.display = 'none');
        slides[currentSlide].style.display = 'block'; // Show the current slide
    });
}

// Close the slideshow overlay
function closeSlideshow() {
    const overlays = document.querySelectorAll('.overlay');
    overlays.forEach(overlay => {
        overlay.style.display = 'none'; // Hide the overlay
    });
}