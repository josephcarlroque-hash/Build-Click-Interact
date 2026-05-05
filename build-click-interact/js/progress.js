// Progress Tracking System for HCI Learning Platform
class ProgressTracker {
    constructor() {
        this.modules = [
            { id: 'usability', name: 'Usability', storageKey: 'module_usability_complete' },
            { id: 'accessibility', name: 'Accessibility', storageKey: 'module_accessibility_complete' },
            { id: 'usercentered', name: 'User-Centered Design', storageKey: 'module_usercentered_complete' },
            { id: 'interactivity', name: 'Interactivity', storageKey: 'module_interactivity_complete' },
            { id: 'fittslaw', name: 'Fitts\' Law', storageKey: 'module_fittslaw_complete' },
            { id: 'colortheory', name: 'Color Theory', storageKey: 'module_colortheory_complete' },
            { id: 'navigation', name: 'Navigation Design', storageKey: 'module_navigation_complete' },
            { id: 'mentalmodels', name: 'Mental Models', storageKey: 'module_mentalmodels_complete' }
        ];
        
        this.quizBestScoreKey = 'quiz_best_score';
        
        this.initializeProgress();
    }

    initializeProgress() {
        // Initialize progress on modules page
        if (window.location.pathname.includes('modules.html')) {
            this.updateModulesPage();
        }
        
        // Initialize filter functionality
        this.setupModuleFilters();
        
        // Add resume buttons to incomplete modules
        this.addResumeButtons();
    }

    getCompletedModules() {
        return this.modules.filter(module => {
            return localStorage.getItem(module.storageKey) === 'true';
        });
    }

    getModuleCompletionCount() {
        return this.getCompletedModules().length;
    }

    updateModulesPage() {
        const completedCount = this.getModuleCompletionCount();
        const totalCount = this.modules.length;
        
        // Update progress text
        const progressText = document.querySelector('.progress-text');
        if (progressText) {
            progressText.textContent = `${completedCount} of ${totalCount} modules completed`;
        }
        
        // Update progress bar
        const progressBar = document.querySelector('.progress-fill');
        if (progressBar) {
            const progressPercent = (completedCount / totalCount) * 100;
            progressBar.style.width = progressPercent + '%';
        }
        
        // Add completed badges to module cards
        this.addCompletionBadges();
        
        // Show best quiz score if available
        this.showBestQuizScore();
    }

    addCompletionBadges() {
        this.modules.forEach(module => {
            const isCompleted = localStorage.getItem(module.storageKey) === 'true';
            const moduleCard = document.querySelector(`[data-module="${module.id}"]`);
            
            if (moduleCard && isCompleted) {
                // Add completed badge if it doesn't exist
                if (!moduleCard.querySelector('.completed-badge')) {
                    const badge = document.createElement('div');
                    badge.className = 'completed-badge';
                    badge.innerHTML = '<i class="fas fa-check"></i> Completed';
                    moduleCard.appendChild(badge);
                }
            }
        });
    }

    showBestQuizScore() {
        const bestScore = localStorage.getItem(this.quizBestScoreKey);
        if (bestScore && bestScore > 0) {
            const progressSection = document.querySelector('.progress-section');
            if (progressSection) {
                const scoreBadge = document.createElement('div');
                scoreBadge.className = 'best-score-badge';
                scoreBadge.innerHTML = `<i class="fas fa-trophy"></i> Best Quiz Score: ${bestScore}/20`;
                progressSection.appendChild(scoreBadge);
            }
        }
    }

    addResumeButtons() {
        const incompleteModules = this.modules.filter(module => {
            return localStorage.getItem(module.storageKey) !== 'true';
        });
        
        if (incompleteModules.length > 0) {
            const firstIncomplete = incompleteModules[0];
            const moduleCard = document.querySelector(`[data-module="${firstIncomplete.id}"]`);
            
            if (moduleCard) {
                const existingBtn = moduleCard.querySelector('.module-btn');
                if (existingBtn && !existingBtn.classList.contains('resume-btn')) {
                    existingBtn.textContent = 'Resume';
                    existingBtn.classList.add('resume-btn');
                }
            }
        }
    }

    setupModuleFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const moduleCards = document.querySelectorAll('.module-card');
        
        if (filterButtons.length === 0 || moduleCards.length === 0) {
            return;
        }
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.dataset.filter;
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter module cards
                moduleCards.forEach(card => {
                    const difficulty = card.dataset.difficulty;
                    
                    if (filter === 'all' || difficulty === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Mark module as complete
    markModuleComplete(moduleId) {
        const module = this.modules.find(m => m.id === moduleId);
        if (module) {
            localStorage.setItem(module.storageKey, 'true');
            
            // Update UI if on modules page
            if (window.location.pathname.includes('modules.html')) {
                this.updateModulesPage();
            }
        }
    }

    // Get quiz best score
    getQuizBestScore() {
        return parseInt(localStorage.getItem(this.quizBestScoreKey) || '0');
    }

    // Set quiz best score
    setQuizBestScore(score) {
        const currentBest = this.getQuizBestScore();
        if (score > currentBest) {
            localStorage.setItem(this.quizBestScoreKey, score.toString());
            return true; // New best score
        }
        return false;
    }

    // Reset all progress (for testing purposes)
    resetAllProgress() {
        this.modules.forEach(module => {
            localStorage.removeItem(module.storageKey);
        });
        localStorage.removeItem(this.quizBestScoreKey);
        
        if (window.location.pathname.includes('modules.html')) {
            this.updateModulesPage();
        }
    }

    // Get progress statistics
    getProgressStats() {
        const completed = this.getCompletedModules();
        const incomplete = this.modules.filter(m => !completed.includes(m));
        
        return {
            totalModules: this.modules.length,
            completedModules: completed.length,
            incompleteModules: incomplete.length,
            completionPercentage: Math.round((completed.length / this.modules.length) * 100),
            bestQuizScore: this.getQuizBestScore(),
            completedModulesList: completed.map(m => m.name),
            incompleteModulesList: incomplete.map(m => m.name)
        };
    }
}

// Animated Statistics Counter for Index Page
class StatisticsCounter {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.speed = 200; // Animation speed
        
        if (this.counters.length > 0) {
            this.setupIntersectionObserver();
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.counters.forEach(counter => {
            observer.observe(counter);
        });
    }

    animateCounter(counter) {
        const target = parseInt(counter.dataset.target);
        const increment = target / this.speed;
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
                // Add special formatting for specific stats
                if (target === 100) {
                    counter.textContent = '100%';
                } else {
                    counter.textContent = target + '+';
                }
            }
        };

        updateCounter();
    }
}

// Initialize progress tracking when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize progress tracker
    window.progressTracker = new ProgressTracker();
    
    // Initialize statistics counter
    window.statisticsCounter = new StatisticsCounter();
    
    // Add data-module attributes to module cards if they don't exist
    const moduleCards = document.querySelectorAll('.module-card');
    const moduleMappings = {
        'usability': 'usability',
        'accessibility': 'accessibility', 
        'user-centered': 'usercentered',
        'interactivity': 'interactivity',
        'fitts\' law': 'fittslaw',
        'color theory in ui': 'colortheory',
        'navigation design': 'navigation',
        'mental models': 'mentalmodels'
    };
    
    moduleCards.forEach((card, index) => {
        const titleElement = card.querySelector('.module-title');
        if (titleElement && !card.dataset.module) {
            const title = titleElement.textContent.toLowerCase();
            const moduleId = moduleMappings[title];
            if (moduleId) {
                card.dataset.module = moduleId;
            }
        }
    });
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ProgressTracker, StatisticsCounter };
}
