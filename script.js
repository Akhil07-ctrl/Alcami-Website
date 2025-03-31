document.addEventListener('DOMContentLoaded', function() {
    // Handle dropdown toggles
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // Function to close all dropdowns
    const closeAllDropdowns = () => {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            if (dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            }
        });
    };

    // Initialize dropdowns - ensure they're closed by default
    closeAllDropdowns();

    // Add click event to all dropdown toggles
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // For all viewport sizes, prevent default link behavior
            e.preventDefault();
            e.stopPropagation();

            const dropdown = this.parentElement;

            // Toggle the active class
            if (dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            } else {
                // Close other dropdowns first
                closeAllDropdowns();
                dropdown.classList.add('active');
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });

    // Product Carousel Functionality
    const initProductCarousel = () => {
        const carousel = document.querySelector('.product-carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.carousel-slide');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        const thumbnails = document.querySelectorAll('.alcami-elements ul li img');

        let currentSlide = 0;

        // Function to show a specific slide
        const showSlide = (index) => {
            // Hide all slides
            slides.forEach(slide => {
                slide.classList.remove('active');
            });

            // Show the selected slide
            slides[index].classList.add('active');

            // Update current slide index
            currentSlide = index;

            // Update active thumbnail
            thumbnails.forEach((thumb, idx) => {
                const thumbParent = thumb.parentElement;
                if (idx === index) {
                    thumbParent.classList.add('active-thumbnail');
                } else {
                    thumbParent.classList.remove('active-thumbnail');
                }
            });
        };

        // Initialize with first slide active
        showSlide(0);

        // Previous button click
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
                showSlide(currentSlide);
            });
        }

        // Next button click
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            });
        }

        // Thumbnail clicks
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                // Only change if we have a slide for this index
                if (index < slides.length) {
                    // Update active thumbnail
                    thumbnails.forEach(thumb => {
                        thumb.parentElement.classList.remove('active-thumbnail');
                    });
                    thumbnail.parentElement.classList.add('active-thumbnail');

                    showSlide(index);
                }
            });
        });

        // Set initial active thumbnail
        if (thumbnails.length > 0) {
            thumbnails[0].parentElement.classList.add('active-thumbnail');
        }

        // Auto-rotate slides
        let slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);

        // Pause auto-rotation on hover or thumbnail interaction
        const pauseAutoRotation = () => {
            clearInterval(slideInterval);
        };

        // Resume auto-rotation
        const resumeAutoRotation = () => {
            slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);

                // Update active thumbnail
                thumbnails.forEach((thumb, idx) => {
                    if (idx === currentSlide) {
                        thumb.parentElement.classList.add('active-thumbnail');
                    } else {
                        thumb.parentElement.classList.remove('active-thumbnail');
                    }
                });
            }, 5000);
        };

        // Pause on carousel hover
        carousel.addEventListener('mouseenter', pauseAutoRotation);
        carousel.addEventListener('mouseleave', resumeAutoRotation);

        // Pause on thumbnails hover
        const thumbnailContainer = document.querySelector('.alcami-elements ul');
        if (thumbnailContainer) {
            thumbnailContainer.addEventListener('mouseenter', pauseAutoRotation);
            thumbnailContainer.addEventListener('mouseleave', resumeAutoRotation);
        }
    };

    // Initialize product carousel
    initProductCarousel();

    // Flavor and Subscription Selection
    const initProductOptions = () => {
        // Flavor selection
        const flavorOptions = document.querySelectorAll('.flavor-option input[type="radio"]');
        const subscriptionOptions = document.querySelectorAll('.subscription-option input[type="radio"]');
        const addToCartBtn = document.querySelector('.add-to-cart-button');

        // Handle flavor selection
        flavorOptions.forEach(option => {
            option.addEventListener('change', () => {
                // Visual feedback for selection
                const selectedFlavor = option.value;
                console.log(`Selected flavor: ${selectedFlavor}`);

                // You could update product image or price based on selection
                // For example:
                // updateProductImage(selectedFlavor);
                // updateProductPrice();
            });
        });

        // Handle subscription selection
        subscriptionOptions.forEach(option => {
            option.addEventListener('change', () => {
                const selectedSubscription = option.value;
                console.log(`Selected subscription: ${selectedSubscription}`);

                // Update price or other elements based on subscription
                // updateProductPrice();
            });
        });

        // Add to cart functionality
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', () => {
                // Get selected flavor
                const selectedFlavor = document.querySelector('.flavor-option input[type="radio"]:checked').value;

                // Get selected subscription
                const selectedSubscription = document.querySelector('.subscription-option input[type="radio"]:checked').value;

                // Add to cart logic
                console.log(`Adding to cart: Alcami Elements - ${selectedFlavor} (${selectedSubscription})`);

                // Show confirmation message
                alert(`Added to cart: Alcami Elements - ${selectedFlavor} (${selectedSubscription})`);

                // In a real implementation, you would send this data to a cart system
                // addToCart({
                //     product: 'Alcami Elements',
                //     flavor: selectedFlavor,
                //     subscription: selectedSubscription,
                //     quantity: 1
                // });
            });
        }
    };

    // Initialize product options
    initProductOptions();

    // Usage Section Animation
    const initUsageSection = () => {
        const usageSection = document.querySelector('.usage-section');
        if (!usageSection) return;

        const steps = usageSection.querySelectorAll('.usage-step');
        const usageVideo = usageSection.querySelector('.usage-video');
        const usageButton = usageSection.querySelector('.usage-button');

        // Animate steps on scroll
        const animateSteps = () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Add animation class to each step with a delay
                        steps.forEach((step, index) => {
                            setTimeout(() => {
                                step.classList.add('animate-in');
                            }, index * 200); // 200ms delay between each step
                        });

                        // Unobserve after animation
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            // Observe the usage section
            observer.observe(usageSection);
        };

        // Handle video play/pause
        if (usageVideo) {
            // Play video when it comes into view
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Only play if video is not already playing
                        if (usageVideo.paused) {
                            // Optional: wait a moment before playing
                            setTimeout(() => {
                                usageVideo.play().catch(e => {
                                    // Handle any autoplay restrictions
                                    console.log('Video autoplay prevented:', e);
                                });
                            }, 500);
                        }
                    } else {
                        // Pause when out of view
                        usageVideo.pause();
                    }
                });
            }, { threshold: 0.5 });

            videoObserver.observe(usageVideo);
        }

        // Usage button click
        if (usageButton) {
            usageButton.addEventListener('click', () => {
                // Scroll to video testimonials or open modal
                // For example:
                // document.querySelector('#testimonials').scrollIntoView({ behavior: 'smooth' });

                // Or open a modal with more usage examples
                // openModal('usage-examples');

                console.log('See how people are using Alcami button clicked');
            });
        }

        // Initialize animations
        animateSteps();
    };

    // Initialize usage section
    initUsageSection();

    // Percentage counter animation
    const animatePercentage = () => {
        const percentageNumbers = document.querySelectorAll('.percentage-number');
        const analyticsSection = document.querySelector('.analytics-section');

        if (percentageNumbers.length === 0 || !analyticsSection) return;

        // Reset all counters to 0
        percentageNumbers.forEach(number => {
            number.textContent = '0';
        });

        // Options for the Intersection Observer
        const options = {
            threshold: 0.5, // Trigger when at least 50% of the section is visible
            rootMargin: '0px' // No margin
        };

        // Create an observer for the analytics section
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start all counters when the section comes into view
                    percentageNumbers.forEach(element => {
                        const target = parseInt(element.getAttribute('data-target'));
                        let count = 0;
                        const duration = 2000; // 2 seconds
                        const frameDuration = 1000 / 60; // 60fps
                        const totalFrames = Math.round(duration / frameDuration);
                        const increment = target / totalFrames;

                        const counter = setInterval(() => {
                            count += increment;
                            if (count >= target) {
                                element.textContent = target;
                                clearInterval(counter);
                            } else {
                                element.textContent = Math.floor(count);
                            }
                        }, frameDuration);
                    });

                    // Unobserve after animation starts
                    sectionObserver.unobserve(analyticsSection);
                }
            });
        }, options);

        // Observe the analytics section
        sectionObserver.observe(analyticsSection);
    };

    // Initialize percentage counter animation
    animatePercentage();

    // Reviews carousel functionality
    const initReviewsCarousel = () => {
        const track = document.querySelector('.reviews-track');

        // Check if carousel elements exist before proceeding
        if (!track) return;

        const slides = Array.from(track.children);
        const nextButton = document.querySelector('.next-arrow');
        const prevButton = document.querySelector('.prev-arrow');
        const dotsNav = document.querySelector('.carousel-dots');

        // Exit if any required elements are missing
        if (!slides.length || !nextButton || !prevButton || !dotsNav) return;

        const dots = Array.from(dotsNav.children);

        // Exit if no dots are found
        if (!dots.length) return;

        // Determine number of cards to show based on screen size
        const getCardsToShow = () => {
            if (window.innerWidth <= 767) {
                return 1; // Mobile phones
            } else if (window.innerWidth <= 1024) {
                return 2; // iPads and tablets
            } else {
                return 3; // Larger screens
            }
        };

        // Number of cards to show at once (responsive)
        let cardsToShow = getCardsToShow();
        // Total number of "pages" (groups of cards)
        let totalPages = Math.ceil(slides.length / cardsToShow);
        // Current page index (0-based)
        let currentPage = 0;

        // Function to move to a specific page
        const moveToPage = (pageIndex) => {
            // Recalculate cards to show based on current screen size
            cardsToShow = getCardsToShow();
            totalPages = Math.ceil(slides.length / cardsToShow);

            // Ensure pageIndex is valid with new totalPages
            if (pageIndex >= totalPages) {
                pageIndex = totalPages - 1;
            }

            // Calculate the translation amount
            const slideWidth = slides[0].getBoundingClientRect().width;
            const gapWidth = 20; // Consistent gap for all views

            let moveAmount;
            // For iPad (2 cards), ensure proper spacing
            if (cardsToShow === 2) {
                // Calculate width including the gap
                const totalWidth = slideWidth + gapWidth;
                moveAmount = pageIndex * totalWidth * 2;
            } else {
                // For mobile (1 card) and desktop (3 cards)
                moveAmount = pageIndex * (cardsToShow * slideWidth + (cardsToShow - 1) * gapWidth);
            }

            // Apply the transform
            track.style.transform = `translateX(-${moveAmount}px)`;

            // Update current page
            currentPage = pageIndex;

            // Update dots
            updateDots(currentPage);

            // Update arrow visibility
            hideShowArrows();
        };

        const updateDots = (pageIndex) => {
            // Remove active class from all dots
            dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to current dot
            if (dots[pageIndex]) {
                dots[pageIndex].classList.add('active');
            }

            // Update aria-label to reflect current view
            const itemsPerPage = getCardsToShow();
            const startItem = pageIndex * itemsPerPage + 1;
            const endItem = Math.min(startItem + itemsPerPage - 1, slides.length);

            if (dots[pageIndex]) {
                dots[pageIndex].setAttribute('aria-label', `Showing reviews ${startItem} to ${endItem} of ${slides.length}`);
            }
        };

        const hideShowArrows = () => {
            if (currentPage === 0) {
                prevButton.classList.add('is-hidden');
                nextButton.classList.remove('is-hidden');
            } else if (currentPage === totalPages - 1) {
                prevButton.classList.remove('is-hidden');
                nextButton.classList.add('is-hidden');
            } else {
                prevButton.classList.remove('is-hidden');
                nextButton.classList.remove('is-hidden');
            }
        };

        // Initialize the carousel
        moveToPage(0);

        // Click right button, move to next page
        nextButton.addEventListener('click', () => {
            if (currentPage < totalPages - 1) {
                moveToPage(currentPage + 1);
            }
        });

        // Click left button, move to previous page
        prevButton.addEventListener('click', () => {
            if (currentPage > 0) {
                moveToPage(currentPage - 1);
            }
        });

        // Click indicator dots, move to that page
        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button');

            if (!targetDot) return;

            const targetIndex = dots.findIndex(dot => dot === targetDot);
            moveToPage(targetIndex);
        });

        // Handle keyboard navigation
        document.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight') {
                nextButton.click();
            } else if (e.key === 'ArrowLeft') {
                prevButton.click();
            }
        });

        // Handle swipe gestures for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        track.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left, go to next page
                nextButton.click();
            } else if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right, go to previous page
                prevButton.click();
            }
        };

        // Auto-play functionality
        let autoplayInterval;

        const startAutoplay = () => {
            autoplayInterval = setInterval(() => {
                if (currentPage < totalPages - 1) {
                    moveToPage(currentPage + 1);
                } else {
                    moveToPage(0); // Loop back to the first page
                }
            }, 5000); // Change page every 5 seconds
        };

        const stopAutoplay = () => {
            clearInterval(autoplayInterval);
        };

        // Start autoplay
        startAutoplay();

        // Pause autoplay on hover or touch
        track.addEventListener('mouseenter', stopAutoplay);
        track.addEventListener('touchstart', stopAutoplay, { passive: true });

        // Resume autoplay when mouse leaves
        track.addEventListener('mouseleave', startAutoplay);
        track.addEventListener('touchend', startAutoplay, { passive: true });

        // Handle window resize to recalculate positions
        window.addEventListener('resize', () => {
            // Get previous cards to show setting
            const prevCardsToShow = cardsToShow;

            // Update cards to show based on new screen size
            cardsToShow = getCardsToShow();

            // Only recalculate if the number of cards to show has changed
            if (prevCardsToShow !== cardsToShow) {
                totalPages = Math.ceil(slides.length / cardsToShow);

                // If current page is now invalid, adjust it
                if (currentPage >= totalPages) {
                    currentPage = totalPages - 1;
                }

                // Recalculate and move to current page after resize
                moveToPage(currentPage);
            } else {
                // Just reposition without changing page
                moveToPage(currentPage);
            }
        });
    };

    // Initialize reviews carousel
    initReviewsCarousel();

    // FAQ Accordion functionality
    const initFaqAccordion = () => {
        const accordionItems = document.querySelectorAll('.accordion-item');
        const toggleAllButton = document.querySelector('.toggle-all-button');

        if (!accordionItems.length) return;

        // Function to toggle a single accordion item
        const toggleAccordion = (item) => {
            const button = item.querySelector('button');
            const content = item.querySelector('.accordion-content');
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // Toggle the clicked item
            button.setAttribute('aria-expanded', !isExpanded);

            // Ensure content is visible when expanded
            if (!isExpanded) {
                // Make content visible first
                content.style.visibility = 'visible';
                content.style.display = 'block';

                // Set timeout to allow transition to work properly
                setTimeout(() => {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }, 10);

                button.setAttribute('aria-label', `${button.textContent.trim()}: section expanded`);
            } else {
                content.style.maxHeight = '0';

                // Reset display and visibility after transition completes
                setTimeout(() => {
                    if (button.getAttribute('aria-expanded') === 'false') {
                        content.style.visibility = 'hidden';
                        content.style.display = '';
                    }
                }, 300); // Match transition duration

                button.setAttribute('aria-label', `${button.textContent.trim()}: section collapsed`);
            }
        };

        // Add click event to each accordion button
        accordionItems.forEach(item => {
            const button = item.querySelector('button');
            const content = item.querySelector('.accordion-content');

            // Set initial state
            button.setAttribute('aria-expanded', 'false');
            button.setAttribute('aria-label', `${button.textContent.trim()}: section collapsed`);

            // Ensure content is initially hidden
            content.style.maxHeight = '0';
            content.style.visibility = 'hidden';

            // Add click event
            button.addEventListener('click', () => {
                // Close all other items
                accordionItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherButton = otherItem.querySelector('button');
                        const otherContent = otherItem.querySelector('.accordion-content');

                        otherButton.setAttribute('aria-expanded', 'false');
                        otherButton.setAttribute('aria-label', `${otherButton.textContent.trim()}: section collapsed`);

                        // Hide other content
                        otherContent.style.maxHeight = '0';
                        otherContent.style.visibility = 'hidden';
                    }
                });

                // Toggle the clicked item
                toggleAccordion(item);

                // Update toggle all button text
                updateToggleAllButtonText();
            });
        });

        // Function to check if all items are expanded
        const areAllExpanded = () => {
            return Array.from(accordionItems).every(item =>
                item.querySelector('button').getAttribute('aria-expanded') === 'true'
            );
        };

        // Function to update toggle all button text
        const updateToggleAllButtonText = () => {
            if (!toggleAllButton) return;

            const textSpan = toggleAllButton.querySelector('.toggle-text');
            const arrowIcon = toggleAllButton.querySelector('.arrow-icon');

            if (areAllExpanded()) {
                textSpan.textContent = 'Close all FAQs';
                if (arrowIcon) {
                    arrowIcon.innerHTML = `
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    `;
                }
            } else {
                textSpan.textContent = 'View all FAQs';
                if (arrowIcon) {
                    arrowIcon.innerHTML = `
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    `;
                }
            }
        };

        // Toggle all button functionality
        if (toggleAllButton) {
            toggleAllButton.addEventListener('click', () => {
                const allExpanded = areAllExpanded();

                // Toggle all items
                accordionItems.forEach(item => {
                    const button = item.querySelector('button');
                    const content = item.querySelector('.accordion-content');

                    // Set expanded state
                    button.setAttribute('aria-expanded', !allExpanded);
                    button.setAttribute('aria-label', `${button.textContent.trim()}: section ${!allExpanded ? 'expanded' : 'collapsed'}`);

                    // Handle content visibility
                    if (!allExpanded) {
                        // Expand content
                        content.style.visibility = 'visible';
                        content.style.display = 'block';
                        setTimeout(() => {
                            content.style.maxHeight = content.scrollHeight + 'px';
                        }, 10);
                    } else {
                        // Collapse content
                        content.style.maxHeight = '0';
                        setTimeout(() => {
                            if (button.getAttribute('aria-expanded') === 'false') {
                                content.style.visibility = 'hidden';
                                content.style.display = '';
                            }
                        }, 300);
                    }
                });

                // Update button text
                updateToggleAllButtonText();
            });
        }

        // Initialize toggle all button text
        updateToggleAllButtonText();

        // Add keyboard navigation
        accordionItems.forEach(item => {
            const button = item.querySelector('button');

            button.addEventListener('keydown', (e) => {
                const buttons = Array.from(document.querySelectorAll('.accordion-item button'));
                const index = buttons.indexOf(button);

                // Handle arrow keys for navigation
                if (e.key === 'ArrowDown' && index < buttons.length - 1) {
                    buttons[index + 1].focus();
                    e.preventDefault();
                } else if (e.key === 'ArrowUp' && index > 0) {
                    buttons[index - 1].focus();
                    e.preventDefault();
                } else if (e.key === 'Home') {
                    buttons[0].focus();
                    e.preventDefault();
                } else if (e.key === 'End') {
                    buttons[buttons.length - 1].focus();
                    e.preventDefault();
                }
            });
        });
    };

    // Initialize FAQ accordion
    initFaqAccordion();

    // Search button functionality
    const searchButton = document.querySelector('.search-button');

    // Sample product data for demonstration
    const sampleProducts = [
        {
            id: 1,
            name: 'Alcami Original Blend',
            price: 39.99,
            image: 'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1743223870/Mask_group_5_sb6fkd.png',
            description: 'Our signature adaptogen blend for focus and energy.'
        },
        {
            id: 2,
            name: 'Alcami Focus Formula',
            price: 44.99,
            image: 'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1743223870/Mask_group_5_sb6fkd.png',
            description: 'Enhanced formula for maximum concentration and mental clarity.'
        },
        {
            id: 3,
            name: 'Alcami Calm & Clarity',
            price: 42.99,
            image: 'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1743223870/Mask_group_5_sb6fkd.png',
            description: 'Balanced blend for stress reduction and mental clarity.'
        },
        {
            id: 4,
            name: 'Alcami Energy Boost',
            price: 41.99,
            image: 'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1743223870/Mask_group_5_sb6fkd.png',
            description: 'Powerful formula for sustained energy throughout the day.'
        },
        {
            id: 5,
            name: 'Alcami Sleep Support',
            price: 39.99,
            image: 'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1743223870/Mask_group_5_sb6fkd.png',
            description: 'Gentle blend to promote restful sleep and recovery.'
        },
        {
            id: 6,
            name: 'Alcami Immune Defense',
            price: 45.99,
            image: 'https://res.cloudinary.com/dgsmgz8zl/image/upload/v1743223870/Mask_group_5_sb6fkd.png',
            description: 'Powerful blend to support immune system health.'
        }
    ];

    if (searchButton) {
        searchButton.addEventListener('click', function() {
            // Create search overlay if it doesn't exist
            let searchOverlay = document.querySelector('.search-overlay');

            if (!searchOverlay) {
                searchOverlay = document.createElement('div');
                searchOverlay.className = 'search-overlay';

                const searchContainer = document.createElement('div');
                searchContainer.className = 'search-container';

                const searchForm = document.createElement('form');
                searchForm.className = 'search-form';

                const searchInput = document.createElement('input');
                searchInput.type = 'text';
                searchInput.placeholder = 'Search products...';
                searchInput.className = 'search-input';

                const closeButton = document.createElement('button');
                closeButton.type = 'button';
                closeButton.className = 'search-close';
                closeButton.innerHTML = '&times;';
                closeButton.addEventListener('click', function() {
                    searchOverlay.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(searchOverlay);
                    }, 300);
                });

                // Create search results container
                const searchResultsContainer = document.createElement('div');
                searchResultsContainer.className = 'search-results-container';

                // Create initial message
                const initialMessage = document.createElement('div');
                initialMessage.className = 'search-initial-message';
                initialMessage.textContent = 'Enter a search term to find products';
                searchResultsContainer.appendChild(initialMessage);

                // Create product results grid
                const productGrid = document.createElement('div');
                productGrid.className = 'product-grid';
                searchResultsContainer.appendChild(productGrid);

                // No results message
                const noResultsMessage = document.createElement('div');
                noResultsMessage.className = 'no-results-message';
                noResultsMessage.textContent = 'No products found matching your search';
                noResultsMessage.style.display = 'none';
                searchResultsContainer.appendChild(noResultsMessage);

                searchForm.appendChild(searchInput);
                searchContainer.appendChild(searchForm);
                searchContainer.appendChild(closeButton);
                searchContainer.appendChild(searchResultsContainer);
                searchOverlay.appendChild(searchContainer);

                // Add styles for search overlay
                const style = document.createElement('style');
                style.textContent = `
                    .search-overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.9);
                        display: flex;
                        align-items: flex-start;
                        justify-content: center;
                        z-index: 1000;
                        opacity: 0;
                        visibility: hidden;
                        transition: opacity 0.3s ease, visibility 0.3s ease;
                        overflow-y: auto;
                        padding: 80px 0;
                    }

                    .search-overlay.active {
                        opacity: 1;
                        visibility: visible;
                    }

                    .search-container {
                        width: 90%;
                        max-width: 1200px;
                        position: relative;
                        display: flex;
                        flex-direction: column;
                    }

                    .search-form {
                        width: 100%;
                        margin-bottom: 30px;
                    }

                    .search-input {
                        width: 100%;
                        padding: 15px;
                        font-size: 18px;
                        background: transparent;
                        border: none;
                        border-bottom: 2px solid white;
                        color: white;
                        outline: none;
                    }

                    .search-input::placeholder {
                        color: rgba(255, 255, 255, 0.7);
                    }

                    .search-close {
                        position: absolute;
                        top: -40px;
                        right: 0;
                        background: transparent;
                        border: none;
                        color: white;
                        font-size: 30px;
                        cursor: pointer;
                    }

                    .search-results-container {
                        width: 100%;
                        margin-top: 20px;
                    }

                    .search-initial-message, .no-results-message {
                        color: white;
                        text-align: center;
                        font-size: 18px;
                        margin: 40px 0;
                    }

                    .product-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                        gap: 30px;
                        width: 100%;
                    }

                    .product-card {
                        background-color: white;
                        border-radius: 8px;
                        overflow: hidden;
                        transition: transform 0.3s ease, box-shadow 0.3s ease;
                        display: flex;
                        flex-direction: column;
                    }

                    .product-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                    }

                    .product-image {
                        width: 100%;
                        height: 200px;
                        object-fit: contain;
                        background-color: #f9f9f9;
                        padding: 20px;
                    }

                    .product-info {
                        padding: 20px;
                        flex-grow: 1;
                        display: flex;
                        flex-direction: column;
                    }

                    .product-name {
                        font-size: 18px;
                        font-weight: 600;
                        margin-bottom: 10px;
                        color: #333;
                    }

                    .product-description {
                        font-size: 14px;
                        color: #666;
                        margin-bottom: 15px;
                        flex-grow: 1;
                    }

                    .product-price {
                        font-size: 18px;
                        font-weight: 700;
                        color: var(--gold-color);
                        margin-bottom: 15px;
                    }

                    .add-to-cart {
                        background: linear-gradient(135deg, var(--gold-color) 0%, var(--gold-light) 100%);
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                    }

                    .add-to-cart:hover {
                        background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold-color) 100%);
                        transform: translateY(-2px);
                    }

                    @media (max-width: 768px) {
                        .product-grid {
                            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                        }
                    }

                    @media (max-width: 480px) {
                        .product-grid {
                            grid-template-columns: 1fr;
                        }
                    }
                `;

                document.head.appendChild(style);
                document.body.appendChild(searchOverlay);

                // Activate with a slight delay to ensure the transition works
                setTimeout(() => {
                    searchOverlay.classList.add('active');
                    searchInput.focus();
                }, 10);

                // Close search overlay when pressing Escape key
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape' && document.querySelector('.search-overlay.active')) {
                        closeButton.click();
                    }
                });

                // Function to filter and display products
                const filterProducts = (searchTerm) => {
                    const productGrid = document.querySelector('.product-grid');
                    const initialMessage = document.querySelector('.search-initial-message');
                    const noResultsMessage = document.querySelector('.no-results-message');

                    // Clear previous results
                    productGrid.innerHTML = '';

                    if (!searchTerm) {
                        // If no search term, show initial message
                        initialMessage.style.display = 'block';
                        noResultsMessage.style.display = 'none';
                        return;
                    }

                    // Hide initial message
                    initialMessage.style.display = 'none';

                    // Filter products based on search term
                    const filteredProducts = sampleProducts.filter(product =>
                        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        product.description.toLowerCase().includes(searchTerm.toLowerCase())
                    );

                    if (filteredProducts.length === 0) {
                        // Show no results message
                        noResultsMessage.style.display = 'block';
                        return;
                    }

                    // Hide no results message
                    noResultsMessage.style.display = 'none';

                    // Display filtered products
                    filteredProducts.forEach(product => {
                        const productCard = document.createElement('div');
                        productCard.className = 'product-card';

                        productCard.innerHTML = `
                            <img src="${product.image}" alt="${product.name}" class="product-image">
                            <div class="product-info">
                                <h3 class="product-name">${product.name}</h3>
                                <p class="product-description">${product.description}</p>
                                <div class="product-price">$${product.price.toFixed(2)}</div>
                                <button class="add-to-cart">
                                    Add to Cart
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="9" cy="21" r="1"></circle>
                                        <circle cx="20" cy="21" r="1"></circle>
                                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                    </svg>
                                </button>
                            </div>
                        `;

                        productGrid.appendChild(productCard);
                    });
                };

                // Handle search input changes (real-time search)
                searchInput.addEventListener('input', function() {
                    const searchTerm = this.value.trim();
                    filterProducts(searchTerm);
                });

                // Handle search form submission
                searchForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const searchTerm = searchInput.value.trim();
                    filterProducts(searchTerm);
                });
            } else {
                // If search overlay already exists, just activate it
                searchOverlay.classList.add('active');
                document.querySelector('.search-input').focus();
            }
        });
    }

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // For desktop - already handled by CSS hover, but this adds accessibility
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        // Add ARIA attributes for accessibility
        dropdownToggle.setAttribute('aria-haspopup', 'true');
        dropdownToggle.setAttribute('aria-expanded', 'false');
        dropdownMenu.setAttribute('aria-label', 'submenu');
        
        // Toggle dropdown on click (for mobile devices)
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if dropdown is already open
            const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';
            
            // Close all other dropdowns
            document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
                toggle.setAttribute('aria-expanded', 'false');
            });
            
            // Toggle current dropdown
            dropdownToggle.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!dropdown.contains(e.target)) {
                dropdownToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Add keyboard navigation for accessibility
    dropdowns.forEach(dropdown => {
        const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        const dropdownItems = dropdownMenu.querySelectorAll('a');
        
        dropdownToggle.addEventListener('keydown', function(e) {
            // Open dropdown on Enter or Space
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                dropdownToggle.setAttribute('aria-expanded', 'true');
                dropdownItems[0].focus();
            }
        });
        
        // Navigate through dropdown items with arrow keys
        dropdownItems.forEach((item, index) => {
            item.addEventListener('keydown', function(e) {
                switch(e.key) {
                    case 'Escape':
                        e.preventDefault();
                        dropdownToggle.setAttribute('aria-expanded', 'false');
                        dropdownToggle.focus();
                        break;
                    case 'ArrowDown':
                        e.preventDefault();
                        if (index < dropdownItems.length - 1) {
                            dropdownItems[index + 1].focus();
                        }
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        if (index > 0) {
                            dropdownItems[index - 1].focus();
                        } else {
                            dropdownToggle.focus();
                            dropdownToggle.setAttribute('aria-expanded', 'false');
                        }
                        break;
                }
            });
        });
    });

    // FAQ Item Accordion functionality
    const initFaqItemAccordion = () => {
        const faqItems = document.querySelectorAll('.faq-item');

        if (faqItems.length === 0) return;

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');

            // Add ARIA attributes for accessibility
            question.setAttribute('aria-expanded', 'false');
            answer.setAttribute('aria-hidden', 'true');

            question.addEventListener('click', () => {
                // Check if this item is already active
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                        otherItem.querySelector('.faq-answer').setAttribute('aria-hidden', 'true');
                    }
                });

                // Toggle current item
                item.classList.toggle('active');
                question.setAttribute('aria-expanded', !isActive);
                answer.setAttribute('aria-hidden', isActive);
            });

            // Add keyboard support
            question.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });

            // Make questions focusable
            question.setAttribute('tabindex', '0');
        });

        // Open first FAQ item by default
        if (faqItems.length > 0) {
            faqItems[0].classList.add('active');
            faqItems[0].querySelector('.faq-question').setAttribute('aria-expanded', 'true');
            faqItems[0].querySelector('.faq-answer').setAttribute('aria-hidden', 'false');
        }
    };

    // Initialize FAQ item accordion
    initFaqItemAccordion();
});