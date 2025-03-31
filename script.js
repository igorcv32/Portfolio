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

    // Formulário de contato com EmailJS
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.querySelector('.form-message');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Desabilitar o botão e mostrar loading
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        
        // Coletar dados do formulário
        const formData = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Enviar e-mail usando EmailJS
        emailjs.send('service_onwmky8', 'template_ih2cawk', formData)
            .then(function() {
                // Sucesso
                formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
                formMessage.className = 'form-message success';
                contactForm.reset();
            })
            .catch(function(error) {
                // Erro
                console.error('Erro EmailJS:', error);
                formMessage.textContent = `Erro ao enviar mensagem: ${error.text || 'Por favor, tente novamente.'}`;
                formMessage.className = 'form-message error';
            })
            .finally(function() {
                // Reabilitar o botão e restaurar texto
                submitButton.disabled = false;
                submitButton.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensagem';
                
                // Limpar mensagem após 5 segundos
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            });
    });

    // Alternância de tema
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const themeIcon = themeToggle.querySelector('i');

    // Função para atualizar o ícone do tema
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }

    // Função para aplicar o tema
    function applyTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        updateThemeIcon(theme);
    }

    // Verificar tema salvo ou preferência do sistema
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(prefersDark.matches ? 'dark' : 'light');
    }

    // Alternar tema ao clicar no botão
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // Detectar mudança na preferência do sistema
    prefersDark.addListener((e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
});