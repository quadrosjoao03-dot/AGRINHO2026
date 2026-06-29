document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu-buttons a');
    const sections = document.querySelectorAll('.content-section');
    const darkToggleLink = document.querySelector('.dark-toggle a');

    const updateDarkToggleText = () => {
        if (!darkToggleLink) {
            return;
        }
        darkToggleLink.textContent = document.body.classList.contains('dark-mode')
            ? 'Modo Claro'
            : 'Modo Escuro';
    };

    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
        if (darkToggleLink) {
            const toggleItem = darkToggleLink.closest('.menu-btn');
            if (toggleItem) {
                toggleItem.classList.toggle('active', document.body.classList.contains('dark-mode'));
            }
        }
        updateDarkToggleText();
    };

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

            if (targetId === 'dark') {
                toggleDarkMode();
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
