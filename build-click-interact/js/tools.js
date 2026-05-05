// Tools Page JavaScript
class ToolsPage {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.filterButtons = document.querySelectorAll('#filterButtons .filter-btn');
        this.toolCards = document.querySelectorAll('.tool-card');
        this.categorySections = document.querySelectorAll('.category-section');
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupSearch();
        this.setupFilters();
    }

    setupEventListeners() {
        // Search input event
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Filter button events
        this.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleFilter(e.target);
            });
        });

        // Add hover effects to tool cards
        this.toolCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)';
                card.style.boxShadow = 'var(--shadow-xl)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'var(--shadow-md)';
            });
        });
    }

    setupSearch() {
        // Clear search functionality
        if (this.searchInput) {
            this.searchInput.addEventListener('focus', () => {
                this.searchInput.parentElement.classList.add('focused');
            });

            this.searchInput.addEventListener('blur', () => {
                this.searchInput.parentElement.classList.remove('focused');
            });
        }
    }

    setupFilters() {
        // Set initial active filter
        const activeButton = document.querySelector('#filterButtons .filter-btn.active');
        if (activeButton) {
            this.filterByCategory(activeButton.dataset.category);
        }
    }

    handleSearch(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        
        this.toolCards.forEach(card => {
            const toolName = card.querySelector('.tool-name').textContent.toLowerCase();
            const toolDescription = card.querySelector('.tool-description').textContent.toLowerCase();
            const learnTag = card.querySelector('.learn-tag').textContent.toLowerCase();
            
            const matchesSearch = toolName.includes(term) || 
                               toolDescription.includes(term) || 
                               learnTag.includes(term);
            
            if (matchesSearch && this.isCardVisibleByFilter(card)) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });

        // Update category sections visibility
        this.updateCategorySectionVisibility();
    }

    handleFilter(button) {
        // Remove active class from all buttons
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Filter by category
        const category = button.dataset.category;
        this.filterByCategory(category);
    }

    filterByCategory(category) {
        this.toolCards.forEach(card => {
            const cardCategory = this.getCardCategory(card);
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });

        // Update category sections visibility
        this.updateCategorySectionVisibility();
    }

    getCardCategory(card) {
        // Find the parent category section
        const parentSection = card.closest('.category-section');
        if (parentSection) {
            return parentSection.dataset.category;
        }
        return 'unknown';
    }

    isCardVisibleByFilter(card) {
        const activeFilter = document.querySelector('#filterButtons .filter-btn.active');
        if (!activeFilter) return true;
        
        const category = activeFilter.dataset.category;
        const cardCategory = this.getCardCategory(card);
        
        return category === 'all' || cardCategory === category;
    }

    updateCategorySectionVisibility() {
        this.categorySections.forEach(section => {
            const visibleCards = section.querySelectorAll('.tool-card[style="display: block;"]');
            
            if (visibleCards.length > 0) {
                section.style.display = 'block';
                section.classList.add('fade-in');
            } else {
                section.style.display = 'none';
                section.classList.remove('fade-in');
            }
        });
    }

    // Utility method to reset all filters and search
    resetAll() {
        if (this.searchInput) {
            this.searchInput.value = '';
        }
        
        // Reset to "All" filter
        const allButton = document.querySelector('#filterButtons .filter-btn[data-category="all"]');
        if (allButton) {
            this.handleFilter(allButton);
        }
    }

    // Method to get current filter state
    getCurrentState() {
        const activeFilter = document.querySelector('#filterButtons .filter-btn.active');
        const searchTerm = this.searchInput ? this.searchInput.value : '';
        
        return {
            filter: activeFilter ? activeFilter.dataset.category : 'all',
            search: searchTerm
        };
    }
}

// Initialize the tools page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ToolsPage();
});

// Add smooth scroll behavior for internal links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});

// Add keyboard navigation for search
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        // Focus search on Ctrl+K or Cmd+K
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });

        // Clear search on Escape
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                searchInput.dispatchEvent(new Event('input'));
                searchInput.blur();
            }
        });
    }
});

// Add analytics for tool clicks (optional)
document.addEventListener('DOMContentLoaded', () => {
    const toolButtons = document.querySelectorAll('.tool-button');
    toolButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const toolName = button.closest('.tool-card').querySelector('.tool-name').textContent;
            const toolUrl = button.href;
            
            // Log tool usage (you can replace this with actual analytics)
            console.log(`Tool opened: ${toolName} - ${toolUrl}`);
            
            // You could send this data to analytics service here
            // Example: gtag('event', 'tool_open', { tool_name: toolName, tool_url: toolUrl });
        });
    });
});

// Add loading states for external links
document.addEventListener('DOMContentLoaded', () => {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Add loading state
            const originalText = link.innerHTML;
            link.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
            link.style.pointerEvents = 'none';
            
            // Reset after a delay
            setTimeout(() => {
                link.innerHTML = originalText;
                link.style.pointerEvents = 'auto';
            }, 2000);
        });
    });
});
