// Global variables
let completedModules = JSON.parse(localStorage.getItem('completedModules')) || [];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupHamburgerMenu();
    setupSmoothScroll();
    setupScrollAnimations();
    updateActiveNavLink();
    setupModuleProgress();
    setupSimulationInteractions();
}

// Hamburger Menu
function setupHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
        
        // Close menu when link is clicked
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

// Smooth Scroll
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// Update Active Navigation Link
function updateActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (currentPath.includes('index.html') || currentPath.endsWith('/')) {
            if (href === 'index.html') {
                link.classList.add('active');
            }
        } else if (currentPath.includes(href)) {
            link.classList.add('active');
        }
    });
}

// Module Progress Tracking
function setupModuleProgress() {
    updateProgressBar();
    markCompletedModules();
}

function updateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-tracker p');
    
    if (progressFill && progressText) {
        const completedCount = completedModules.length;
        const totalModules = 4;
        const percentage = (completedCount / totalModules) * 100;
        
        progressFill.style.width = percentage + '%';
        progressText.textContent = `${completedCount} of ${totalModules} modules completed`;
    }
}

function markCompletedModules() {
    completedModules.forEach(moduleId => {
        const moduleCard = document.querySelector(`[data-module="${moduleId}"]`);
        if (moduleCard) {
            moduleCard.classList.add('completed');
            const badge = document.createElement('div');
            badge.className = 'completed-badge';
            badge.innerHTML = '<i class="fas fa-check-circle"></i> Completed';
            moduleCard.appendChild(badge);
        }
    });
}

function markModuleComplete(moduleId) {
    if (!completedModules.includes(moduleId)) {
        completedModules.push(moduleId);
        localStorage.setItem('completedModules', JSON.stringify(completedModules));
        updateProgressBar();
        markCompletedModules();
    }
}

// Simulation Interactions
function setupSimulationInteractions() {
    // Usability Simulation
    setupUsabilitySimulation();
    
    // Accessibility Simulation
    setupAccessibilitySimulation();
    
    // User-Centered Design Simulation
    setupUserCenteredSimulation();
    
    // Interactivity Simulation
    setupInteractivitySimulation();
}

// Usability Simulation
function setupUsabilitySimulation() {
    const designBoxes = document.querySelectorAll('.design-box');
    const feedbackContainer = document.querySelector('.feedback-container');
    
    if (designBoxes.length > 0) {
        designBoxes.forEach(box => {
            box.addEventListener('click', function() {
                // Remove previous selections
                designBoxes.forEach(b => b.classList.remove('selected'));
                this.classList.add('selected');
                
                const isGoodDesign = this.classList.contains('design-good');
                showUsabilityFeedback(isGoodDesign, feedbackContainer);
                
                // Mark module complete
                setTimeout(() => {
                    markModuleComplete('usability');
                    showNextButton('accessibility');
                }, 2000);
            });
        });
    }
}

function showUsabilityFeedback(isCorrect, container) {
    if (!container) return;
    
    container.innerHTML = '';
    
    const feedbackBox = document.createElement('div');
    feedbackBox.className = `feedback-box ${isCorrect ? 'success' : 'error'}`;
    
    if (isCorrect) {
        feedbackBox.innerHTML = `
            <i class="fas fa-check-circle"></i> Correct! Design B follows usability principles: clear labels, good contrast, and clean layout.
        `;
    } else {
        feedbackBox.innerHTML = `
            <i class="fas fa-times-circle"></i> Not quite! Design A has low contrast, cluttered layout, and unlabeled buttons — these hurt usability.
        `;
    }
    
    container.appendChild(feedbackBox);
}

// Accessibility Simulation
function setupAccessibilitySimulation() {
    const issueItems = document.querySelectorAll('.issue-item');
    let foundIssues = 0;
    const totalIssues = 3;
    
    if (issueItems.length > 0) {
        issueItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                if (!this.classList.contains('found')) {
                    this.classList.add('found');
                    foundIssues++;
                    showAccessibilityExplanation(index, this);
                    
                    if (foundIssues === totalIssues) {
                        setTimeout(() => {
                            showAccessibilityComplete();
                            markModuleComplete('accessibility');
                            showNextButton('user-centered');
                        }, 1500);
                    }
                }
            });
        });
    }
}

function showAccessibilityExplanation(index, element) {
    const explanations = [
        "Low contrast makes text hard to read for visually impaired users. Fix: Use darker text colors.",
        "Images need alt text so screen readers can describe them to blind users.",
        "Buttons must have clear labels so users know what they do."
    ];
    
    const popup = document.createElement('div');
    popup.className = 'feedback-box success';
    popup.textContent = explanations[index];
    
    element.appendChild(popup);
    
    setTimeout(() => {
        element.classList.add('fixed');
        popup.remove();
    }, 2000);
}

function showAccessibilityComplete() {
    const container = document.querySelector('.simulation-content');
    if (container) {
        const completeBox = document.createElement('div');
        completeBox.className = 'feedback-box success';
        completeBox.innerHTML = `
            <i class="fas fa-check-circle"></i> Great job! You found all 3 accessibility issues. Accessibility makes the web usable for everyone.
        `;
        container.appendChild(completeBox);
    }
}

// User-Centered Design Simulation
function setupUserCenteredSimulation() {
    const questions = [
        {
            scenario: "You are designing an app for elderly users aged 65+. Which feature is most important?",
            options: [
                "Small font size to fit more content",
                "Large text, high contrast, simple navigation",
                "Flashy animations and complex gestures",
                "Dark mode only"
            ],
            correct: 1,
            explanation: "Elderly users benefit most from large text and simple navigation due to potential vision and motor challenges."
        },
        {
            scenario: "A user keeps clicking the wrong button by accident. What is the best fix?",
            options: [
                "Remove the button entirely",
                "Make the button smaller",
                "Add more space between buttons and make the correct one more prominent",
                "Change the button color to red"
            ],
            correct: 2,
            explanation: "Increasing spacing and making the correct button more prominent helps prevent accidental clicks."
        },
        {
            scenario: "Users say they don't know if their form was submitted. What should you add?",
            options: [
                "Nothing, users should figure it out",
                "A loading spinner and success message after submission",
                "Redirect them to a different website",
                "Ask them to submit again to confirm"
            ],
            correct: 1,
            explanation: "Clear feedback like loading states and success messages tells users their action was completed."
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    
    if (document.querySelector('.question-container')) {
        showQuestion(currentQuestion, questions);
    }
    
    function showQuestion(index, questions) {
        const container = document.querySelector('.question-container');
        if (!container || index >= questions.length) {
            showUserCenteredResults(score, questions.length);
            return;
        }
        
        const question = questions[index];
        container.innerHTML = `
            <div class="question-text">${question.scenario}</div>
            <div class="options-grid">
                ${question.options.map((option, i) => `
                    <button class="option-button" data-index="${i}">
                        ${String.fromCharCode(65 + i)}) ${option}
                    </button>
                `).join('')}
            </div>
        `;
        
        container.querySelectorAll('.option-button').forEach(button => {
            button.addEventListener('click', function() {
                const selectedIndex = parseInt(this.dataset.index);
                const isCorrect = selectedIndex === question.correct;
                
                // Show feedback
                container.querySelectorAll('.option-button').forEach(btn => {
                    btn.classList.remove('selected');
                });
                this.classList.add('selected');
                
                if (isCorrect) {
                    this.classList.add('correct');
                    score++;
                } else {
                    this.classList.add('incorrect');
                    container.querySelectorAll('.option-button')[question.correct].classList.add('correct');
                }
                
                // Show explanation
                setTimeout(() => {
                    const explanation = document.createElement('div');
                    explanation.className = 'feedback-box success';
                    explanation.textContent = question.explanation;
                    container.appendChild(explanation);
                    
                    // Next question
                    setTimeout(() => {
                        currentQuestion++;
                        showQuestion(currentQuestion, questions);
                    }, 3000);
                }, 1000);
            });
        });
    }
    
    function showUserCenteredResults(score, total) {
        const container = document.querySelector('.question-container');
        if (container) {
            container.innerHTML = `
                <div class="feedback-box ${score === total ? 'success' : 'error'}">
                    You got ${score} out of ${total} correct!
                    ${score < total ? '<br>Review the explanations above to learn more.' : ''}
                </div>
            `;
            
            markModuleComplete('user-centered');
            showNextButton('interactivity');
        }
    }
}

// Interactivity Simulation (Drag and Drop)
function setupInteractivitySimulation() {
    const draggables = document.querySelectorAll('.draggable-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    if (draggables.length > 0 && dropZones.length > 0) {
        let draggedElement = null;
        
        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', function(e) {
                draggedElement = this;
                this.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
            });
            
            draggable.addEventListener('dragend', function() {
                this.classList.remove('dragging');
            });
        });
        
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.classList.add('drag-over');
            });
            
            zone.addEventListener('dragleave', function() {
                this.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', function(e) {
                e.preventDefault();
                this.classList.remove('drag-over');
                
                if (draggedElement) {
                    const zoneIndex = Array.from(dropZones).indexOf(this);
                    const correctOrder = ['Navigation Bar', 'Hero Section', 'Features Section', 'Footer'];
                    const draggedText = draggedElement.textContent.trim();
                    
                    // Clear previous content
                    this.innerHTML = '';
                    this.appendChild(draggedElement.cloneNode(true));
                    
                    // Check if correct - remove emoji prefix for comparison
                    const cleanDraggedText = draggedText.replace(/^[^\w\s]+/, '').trim();
                    if (correctOrder[zoneIndex] === cleanDraggedText) {
                        this.classList.add('correct');
                        draggedElement.style.display = 'none';
                        
                        // Update the correct count display
                        updateCorrectCount();
                        
                        // Check if all are correct
                        checkInteractivityComplete();
                    } else {
                        this.classList.add('incorrect');
                        setTimeout(() => {
                            this.classList.remove('incorrect');
                            this.innerHTML = this.dataset.placeholder || '';
                        }, 1000);
                    }
                }
            });
        });
    }
}

function checkInteractivityComplete() {
    const correctZones = document.querySelectorAll('.drop-zone.correct');
    if (correctZones.length === 4) {
        showInteractivityComplete();
        markModuleComplete('interactivity');
    }
}

function showInteractivityComplete() {
    const container = document.querySelector('.simulation-content');
    if (container) {
        const completeBox = document.createElement('div');
        completeBox.className = 'feedback-box success';
        completeBox.innerHTML = `
            <i class="fas fa-trophy"></i> Perfect! You understand good UI layout structure.
            ${completedModules.length === 4 ? '<br><i class="fas fa-medal"></i> You completed all modules!' : ''}
        `;
        container.appendChild(completeBox);
        
        // Add confetti effect
        createConfetti();
    }
}

function createConfetti() {
    const colors = ['#1A73E8', '#34A853', '#FBBC04', '#EA4335'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        // Animate
        const duration = Math.random() * 3 + 2;
        const horizontalMovement = (Math.random() - 0.5) * 100;
        
        confetti.animate([
            { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) translateX(${horizontalMovement}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }
}

// Show Next Button
function showNextButton(nextModule) {
    const container = document.querySelector('.simulation-content');
    if (container && !container.querySelector('.next-button')) {
        const nextButton = document.createElement('div');
        nextButton.className = 'nav-buttons';
        nextButton.innerHTML = `
            <a href="../modules.html" class="btn back-to-modules">← Back to Modules</a>
            <a href="${nextModule}.html" class="btn btn-primary">Next: Try ${getModuleName(nextModule)} →</a>
        `;
        container.appendChild(nextButton);
    }
}

function getModuleName(moduleId) {
    const names = {
        'accessibility': 'Accessibility',
        'user-centered': 'User-Centered Design',
        'interactivity': 'Interactivity'
    };
    return names[moduleId] || moduleId;
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        updateActiveNavLink();
        updateProgressBar();
    }
});

// Handle browser back/forward
window.addEventListener('popstate', function() {
    updateActiveNavLink();
    updateProgressBar();
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        if (hamburger && navLinks) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    }
});

// Enhanced Scroll Animations with Better Easing
function setupEnhancedScrollAnimations() {
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
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

}


// Ripple Effect for Buttons
function setupRippleEffect() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
}

function createRipple(event, button) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Navbar Scroll Shadow Effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    });
}

// Enhanced Button Interactions
function setupEnhancedButtonInteractions() {
    // Add press effects to all buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1)';
        });
    });
}

// Smooth Fade-in Animation for Hero Headline
function setupTypewriterAnimation() {
    const headlineElement = document.querySelector('.typewriter');
    if (headlineElement) {
        // Remove typewriter class and add fade-in class
        headlineElement.classList.remove('typewriter');
        headlineElement.classList.add('fade-in', 'hero-headline');
        
        // Trigger animation after short delay
        setTimeout(() => {
            headlineElement.classList.add('visible');
        }, 300);
    }
}

// Initialize all new enhancements
function initializeModernEnhancements() {
    setupEnhancedScrollAnimations();
    setupRippleEffect();
    setupNavbarScroll();
    setupEnhancedButtonInteractions();
    setupTypewriterAnimation();
}

// Error handling and debugging
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('load', function() {
    console.log('All enhancements initialized successfully');
    
    // Test animations are working
    const testElements = document.querySelectorAll('.fade-in');
    console.log('Found fade-in elements:', testElements.length);
    
    
    // Check for any missing classes
    document.querySelectorAll('[class*="fade-in"]').forEach(el => {
        if (!el.classList.contains('fade-in')) {
            console.warn('Element missing fade-in class:', el);
        }
    });
});

// Update the main initializeApp function
function initializeApp() {
    setupHamburgerMenu();
    setupSmoothScroll();
    setupScrollAnimations();
    updateActiveNavLink();
    setupModuleProgress();
    setupSimulationInteractions();
    
    // Initialize new modern enhancements
    initializeModernEnhancements();
}

// Enhanced Scroll Animations (keeping original for compatibility)
function setupScrollAnimations() {
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

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Smooth scroll behavior for modern browsers
if ('scrollBehavior' in document.documentElement.style) {
    document.documentElement.style.scrollBehavior = 'smooth';
}
