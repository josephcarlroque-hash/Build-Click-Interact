// UX Master Quiz JavaScript
class UXMasterQuiz {
    constructor() {
        this.questions = [
            {
                id: 1,
                category: "Usability",
                question: "Which heuristic states the system should keep users informed about what is going on?",
                options: ["Error Prevention", "Visibility of System Status", "User Control and Freedom", "Consistency and Standards"],
                correct: 1,
                explanation: "Visibility of System Status ensures users know what's happening through appropriate feedback."
            },
            {
                id: 2,
                category: "Usability",
                question: "What does learnability mean in usability?",
                options: ["How fast expert users perform tasks", "How easy it is for new users to learn", "How many features the system has", "How attractive the interface looks"],
                correct: 1,
                explanation: "Learnability refers to how easily new users can accomplish basic tasks the first time they encounter the design."
            },
            {
                id: 3,
                category: "Accessibility",
                question: "What does WCAG stand for?",
                options: ["Web Content Accessibility Guidelines", "Web Color Accessibility Guide", "World Computer Access Group", "Website Content And Graphics"],
                correct: 0,
                explanation: "WCAG stands for Web Content Accessibility Guidelines, the international standard for web accessibility."
            },
            {
                id: 4,
                category: "Accessibility",
                question: "Minimum contrast ratio for normal text under WCAG AA standard?",
                options: ["2.5:1", "3:1", "4.5:1", "7:1"],
                correct: 2,
                explanation: "WCAG AA requires a minimum contrast ratio of 4.5:1 for normal text to ensure readability."
            },
            {
                id: 5,
                category: "Accessibility",
                question: "What is the purpose of alt text?",
                options: ["Makes images load faster", "Describes images for screen readers", "Changes image colors", "Adds video captions"],
                correct: 1,
                explanation: "Alt text provides alternative information for images, primarily used by screen readers to describe content to visually impaired users."
            },
            {
                id: 6,
                category: "User-Centered Design",
                question: "What is a user persona?",
                options: ["A fake social media profile", "A fictional representation of your target user", "A type of wireframe tool", "A color scheme template"],
                correct: 1,
                explanation: "A user persona is a fictional character created to represent a user type that might use a site, brand, or product."
            },
            {
                id: 7,
                category: "User-Centered Design",
                question: "What does UCD stand for?",
                options: ["Universal Color Design", "User Content Development", "User-Centered Design", "Unified Component Design"],
                correct: 2,
                explanation: "UCD stands for User-Centered Design, a design philosophy where users influence all aspects of the design."
            },
            {
                id: 8,
                category: "User-Centered Design",
                question: "Which best helps understand real user needs?",
                options: ["Guessing based on experience", "Copying competitor products", "User interviews and research", "Adding more features"],
                correct: 2,
                explanation: "User interviews and research provide direct insights into actual user needs and behaviors."
            },
            {
                id: 9,
                category: "Interactivity",
                question: "What is a microinteraction?",
                options: ["A very small display screen", "A small animation responding to user action", "A type of database query", "A mobile-only feature"],
                correct: 1,
                explanation: "Microinteractions are small, functional animations that provide visual feedback and enhance the user experience."
            },
            {
                id: 10,
                category: "Interactivity",
                question: "Why is feedback important in UI design?",
                options: ["Makes the interface look fancy", "Tells users what happened after their action", "Increases page loading speed", "Reduces overall file size"],
                correct: 1,
                explanation: "Feedback communicates the result of user actions, helping users understand the system state and their interactions."
            },
            {
                id: 11,
                category: "Fitts Law",
                question: "What does Fitts' Law predict?",
                options: ["How many users will adopt a product", "The time required to move to a target", "The best color for call-to-action buttons", "Ideal webpage length"],
                correct: 1,
                explanation: "Fitts' Law predicts that the time to acquire a target is a function of the distance to and size of the target."
            },
            {
                id: 12,
                category: "Fitts Law",
                question: "Which button is easier to click?",
                options: ["Small button far from cursor", "Large button close to cursor", "Medium button anywhere", "All buttons are equally easy"],
                correct: 1,
                explanation: "According to Fitts' Law, larger targets that are closer to the cursor position are easier and faster to acquire."
            },
            {
                id: 13,
                category: "Fitts Law",
                question: "Why are Mac menu bars at the screen edge?",
                options: ["They look more aesthetic there", "Screen edges act as infinite size targets", "It is a longstanding tradition only", "To save usable screen space"],
                correct: 1,
                explanation: "Screen edges stop cursor movement, effectively making targets infinitely large in that direction, which aligns with Fitts' Law."
            },
            {
                id: 14,
                category: "Color Theory",
                question: "What color typically signals errors?",
                options: ["Blue", "Green", "Red", "Purple"],
                correct: 2,
                explanation: "Red is universally associated with errors, warnings, and stop conditions across most interfaces."
            },
            {
                id: 15,
                category: "Color Theory",
                question: "What does green typically mean in UI?",
                options: ["Danger or stop", "Warning or caution", "Success or proceed", "Premium or exclusive"],
                correct: 2,
                explanation: "Green commonly indicates success, completion, safe actions, or permission to proceed."
            },
            {
                id: 16,
                category: "Color Theory",
                question: "Why is color contrast important?",
                options: ["Makes UI look more colorful", "Ensures readability and accessibility", "Reduces image file sizes", "Speeds up page loading"],
                correct: 1,
                explanation: "Color contrast ensures text is readable for all users, including those with visual impairments, and is required by accessibility standards."
            },
            {
                id: 17,
                category: "Navigation",
                question: "What is a breadcrumb in web design?",
                options: ["A type of cookie popup", "A trail showing location within the site", "A collapsible sidebar menu", "An animated search bar"],
                correct: 1,
                explanation: "Breadcrumbs provide a trail of links showing the user's location within the site hierarchy."
            },
            {
                id: 18,
                category: "Navigation",
                question: "When should you use a hamburger menu?",
                options: ["Always on desktop for consistency", "On mobile or when screen space is limited", "Never in modern web design", "Only for restaurant websites"],
                correct: 1,
                explanation: "Hamburger menus are ideal for mobile devices or situations where screen space is limited and navigation needs to be hidden."
            },
            {
                id: 19,
                category: "Mental Models",
                question: "Why is the floppy disk still the save icon despite being obsolete?",
                options: ["Floppy disks are still widely used", "Users associate it with saving from decades of use", "It was chosen by a design committee randomly", "It looks modern and minimal"],
                correct: 1,
                explanation: "The floppy disk icon persists because users have formed strong mental associations between this symbol and the save function over decades."
            },
            {
                id: 20,
                category: "Mental Models",
                question: "What is a mental model in UX?",
                options: ["A type of artificial intelligence system", "A user's internal expectation of how a system works", "A professional design software tool", "A backend programming language"],
                correct: 1,
                explanation: "A mental model is what users believe about how a system works based on their past experiences and observations."
            }
        ];

        this.currentQuestion = 0;
        this.score = 0;
        this.categoryScores = {};
        this.timer = null;
        this.timeLeft = 30;
        this.quizActive = false;
        this.answers = [];

        this.initializeQuiz();
    }

    initializeQuiz() {
        this.setupEventListeners();
        this.startQuiz();
    }

    setupEventListeners() {
        document.getElementById('retake-quiz').addEventListener('click', () => {
            this.resetQuiz();
        });
    }

    startQuiz() {
        this.quizActive = true;
        this.currentQuestion = 0;
        this.score = 0;
        this.categoryScores = {};
        this.answers = [];
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            this.endQuiz();
            return;
        }

        const question = this.questions[this.currentQuestion];
        const questionText = document.getElementById('question-text');
        const categoryBadge = document.getElementById('category-badge');
        const optionsContainer = document.getElementById('quiz-options');
        const feedbackDiv = document.getElementById('quiz-feedback');
        const currentQuestionSpan = document.getElementById('current-question');
        const progressFill = document.getElementById('progress-fill');

        // Update question info
        questionText.textContent = question.question;
        categoryBadge.textContent = question.category;
        currentQuestionSpan.textContent = this.currentQuestion + 1;
        
        // Update progress bar
        const progressPercent = ((this.currentQuestion + 1) / this.questions.length) * 100;
        progressFill.style.width = progressPercent + '%';

        // Clear previous content
        optionsContainer.innerHTML = '';
        feedbackDiv.style.display = 'none';
        feedbackDiv.className = 'quiz-feedback';

        // Create option buttons
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'quiz-option';
            button.textContent = option;
            button.addEventListener('click', () => this.selectAnswer(index));
            optionsContainer.appendChild(button);
        });

        // Start timer
        this.startTimer();
    }

    startTimer() {
        this.timeLeft = 30;
        const timerFill = document.getElementById('timer-fill');
        const timeLeftSpan = document.getElementById('time-left');

        // Clear existing timer
        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(() => {
            this.timeLeft--;
            timeLeftSpan.textContent = this.timeLeft;
            
            const timerPercent = (this.timeLeft / 30) * 100;
            timerFill.style.width = timerPercent + '%';

            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    selectAnswer(selectedIndex) {
        if (!this.quizActive) return;

        clearInterval(this.timer);
        this.quizActive = false;

        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        const feedbackDiv = document.getElementById('quiz-feedback');

        // Disable all options
        options.forEach(option => option.disabled = true);

        // Store answer
        this.answers.push({
            questionId: question.id,
            selected: selectedIndex,
            correct: question.correct,
            category: question.category
        });

        // Show feedback
        if (selectedIndex === question.correct) {
            options[selectedIndex].classList.add('correct');
            this.score++;
            this.updateCategoryScore(question.category, true);
        } else {
            options[selectedIndex].classList.add('incorrect');
            options[question.correct].classList.add('correct');
            this.updateCategoryScore(question.category, false);
        }

        // Show explanation
        feedbackDiv.innerHTML = `
            <div class="feedback-content">
                <p><strong>${selectedIndex === question.correct ? 'Correct!' : 'Incorrect'}</strong></p>
                <p>${question.explanation}</p>
            </div>
        `;
        feedbackDiv.style.display = 'block';

        // Auto-advance after delay
        setTimeout(() => {
            this.currentQuestion++;
            this.quizActive = true;
            this.showQuestion();
        }, 3000);
    }

    timeUp() {
        clearInterval(this.timer);
        this.quizActive = false;

        const question = this.questions[this.currentQuestion];
        const options = document.querySelectorAll('.quiz-option');
        const feedbackDiv = document.getElementById('quiz-feedback');

        // Disable all options
        options.forEach(option => option.disabled = true);

        // Mark as incorrect
        options[question.correct].classList.add('correct');

        // Store answer
        this.answers.push({
            questionId: question.id,
            selected: -1,
            correct: question.correct,
            category: question.category
        });

        this.updateCategoryScore(question.category, false);

        // Show feedback
        feedbackDiv.innerHTML = `
            <div class="feedback-content">
                <p><strong>Time's up!</strong></p>
                <p>${question.explanation}</p>
            </div>
        `;
        feedbackDiv.style.display = 'block';

        // Auto-advance after delay
        setTimeout(() => {
            this.currentQuestion++;
            this.quizActive = true;
            this.showQuestion();
        }, 3000);
    }

    updateCategoryScore(category, correct) {
        if (!this.categoryScores[category]) {
            this.categoryScores[category] = { correct: 0, total: 0 };
        }
        this.categoryScores[category].total++;
        if (correct) {
            this.categoryScores[category].correct++;
        }
    }

    endQuiz() {
        clearInterval(this.timer);

        const quizContainer = document.getElementById('quiz-container');
        const resultsContainer = document.getElementById('results-container');
        const finalScore = document.getElementById('final-score');
        const performanceBadge = document.getElementById('performance-badge');
        const badgeText = document.getElementById('badge-text');
        const categoryTbody = document.getElementById('category-tbody');

        // Update score display
        finalScore.textContent = this.score;

        // Set performance badge
        let badgeClass, badgeIcon, badgeMessage;
        if (this.score >= 18) {
            badgeClass = 'gold';
            badgeIcon = 'fas fa-trophy';
            badgeMessage = 'UX Expert!';
        } else if (this.score >= 14) {
            badgeClass = 'silver';
            badgeIcon = 'fas fa-medal';
            badgeMessage = 'UX Enthusiast!';
        } else if (this.score >= 10) {
            badgeClass = 'bronze';
            badgeIcon = 'fas fa-award';
            badgeMessage = 'UX Learner!';
        } else {
            badgeClass = 'blue';
            badgeIcon = 'fas fa-graduation-cap';
            badgeMessage = 'Keep Practicing!';
        }

        performanceBadge.className = `performance-badge ${badgeClass}`;
        performanceBadge.innerHTML = `<i class="${badgeIcon}"></i><span>${badgeMessage}</span>`;

        // Update category breakdown
        categoryTbody.innerHTML = '';
        for (const [category, scores] of Object.entries(this.categoryScores)) {
            const row = document.createElement('tr');
            const percent = Math.round((scores.correct / scores.total) * 100);
            let performance = '';
            let performanceClass = '';

            if (percent >= 80) {
                performance = 'Excellent';
                performanceClass = 'excellent';
            } else if (percent >= 60) {
                performance = 'Good';
                performanceClass = 'good';
            } else if (percent >= 40) {
                performance = 'Needs Work';
                performanceClass = 'needs-work';
            } else {
                performance = 'Review Required';
                performanceClass = 'review';
            }

            row.innerHTML = `
                <td>${category}</td>
                <td>${scores.correct}/${scores.total}</td>
                <td><span class="performance-indicator ${performanceClass}">${performance}</span></td>
            `;
            categoryTbody.appendChild(row);
        }

        // Save best score
        const bestScore = localStorage.getItem('quiz_best_score') || 0;
        if (this.score > bestScore) {
            localStorage.setItem('quiz_best_score', this.score);
        }

        // Show best score if it exists
        if (bestScore > 0) {
            const bestScoreDiv = document.getElementById('best-score');
            const bestScoreValue = document.getElementById('best-score-value');
            bestScoreDiv.style.display = 'block';
            bestScoreValue.textContent = bestScore;
        }

        // Show results
        quizContainer.style.display = 'none';
        resultsContainer.style.display = 'block';
    }

    resetQuiz() {
        const quizContainer = document.getElementById('quiz-container');
        const resultsContainer = document.getElementById('results-container');

        quizContainer.style.display = 'block';
        resultsContainer.style.display = 'none';

        this.startQuiz();
    }
}

// Initialize quiz when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UXMasterQuiz();
});
