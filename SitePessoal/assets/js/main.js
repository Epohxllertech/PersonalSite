"use strict";
/**
 * DevPortfolio - Main Interaction Script
 * Implementação profissional de Scroll Reveal e UX
 */

document.addEventListener('DOMContentLoaded', () => {
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
            alert('Mensagem enviada com sucesso! (Simulação)');
            contactForm.reset();
        });
    }
});