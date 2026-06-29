document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu-buttons a');
    const sections = document.querySelectorAll('.content-section');
    const darkToggleLink = document.getElementById('dark-mode-toggle');

    const updateDarkToggleText = () => {
        if (!darkToggleLink) {
            return;
        }
        darkToggleLink.textContent = document.body.classList.contains('dark-mode')
            ? 'Modo Claro'
            : 'Modo Escuro';
    };

    const toggleDarkMode = (event) => {
        if (event) {
            event.preventDefault();
        }
        document.body.classList.toggle('dark-mode');
        updateDarkToggleText();
    };

    if (darkToggleLink) {
        darkToggleLink.addEventListener('click', toggleDarkMode);
    }

    const quizNameInput = document.getElementById('quiz-name');
    const quizSubmitButton = document.getElementById('quiz-submit');
    const quizMessage = document.getElementById('quiz-message');

    const feedbackText = document.getElementById('feedback-text');
    const feedbackSubmitButton = document.getElementById('feedback-submit');
    const feedbackMessage = document.getElementById('feedback-message');

    if (quizSubmitButton) {
        quizSubmitButton.addEventListener('click', () => {
            const name = quizNameInput?.value.trim() || 'Aluno';
            if (quizMessage) {
                quizMessage.textContent = `Olá ${name}! Boa sorte no quiz.`;
            }
        });
    }

    if (feedbackSubmitButton) {
        feedbackSubmitButton.addEventListener('click', () => {
            const feedback = feedbackText?.value.trim();
            if (feedbackMessage) {
                if (feedback) {
                    feedbackMessage.textContent = 'Obrigado pelo seu feedback!';
                } else {
                    feedbackMessage.textContent = 'Por favor, escreva algo antes de enviar.';
                }
            }
        });
    }

    const showSection = (sectionId) => {
        if (!sectionId) {
            sectionId = 'intro';
        }

        sections.forEach((section) => {
            section.classList.toggle('active', section.id === sectionId);
        });

        menuLinks.forEach((link) => {
            const menuButton = link.closest('.menu-btn');
            const targetId = link.getAttribute('href').slice(1);
            const isActive = targetId === sectionId;
            if (menuButton) {
                menuButton.classList.toggle('active', isActive);
            }
        });
    };

    menuLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            if (!targetId) {
                return;
            }

            showSection(targetId);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            history.pushState(null, '', `#${targetId}`);
        });
    });

    window.addEventListener('popstate', () => {
        const hash = window.location.hash.slice(1);
        showSection(hash || 'intro');
    });

    showSection(window.location.hash.slice(1) || 'intro');
});
