"use strict";
/**
 * DevPortfolio - Main Interaction Script
 * Implementação profissional de Scroll Reveal e UX
 */

document.addEventListener('DOMContentLoaded', () => {
    // Efeito de Header no Scroll
    const header = document.querySelector('.main-header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Adiciona classe scrolled se passar de 50px
        header.classList.toggle('scrolled', currentScrollY > 50);
        
        lastScrollY = currentScrollY;
    }, { passive: true });

    // Configuração do Intersection Observer para as animações de "subir"
    const observerOptions = {
        root: null, // utiliza a viewport
        threshold: 0.15, // dispara quando 15% do elemento está visível
        rootMargin: "0px 0px -50px 0px"
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Uma vez revelado, paramos de observar o elemento para poupar recursos
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);

    // Seleciona todos os elementos com a classe .reveal e inicia a observação
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    // Feedback visual básico para o formulário de contato (se existir na página)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }
});