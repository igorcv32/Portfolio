document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuButton = document.querySelector('.menu-button');
    const navLinks = document.querySelector('.nav-links');
    
    menuButton.addEventListener('click', function() {
        menuButton.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuButton.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links') && !e.target.closest('.menu-button')) {
            menuButton.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Animações de scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

    // Formulário de contato
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.querySelector('.form-message');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulação de envio do formulário
        const formData = new FormData(contactForm);
        formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
        formMessage.className = 'form-message success';
        
        // Limpar formulário
        contactForm.reset();

        // Limpar mensagem após 5 segundos
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    });

    // Alternância de tema
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // Detectar preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleSystemThemeChange(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            html.setAttribute('data-theme', newTheme);
            updateThemeIcon(newTheme);
        }
    }

    prefersDark.addListener(handleSystemThemeChange);
});