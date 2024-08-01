document.addEventListener("DOMContentLoaded", () => {
    const spans = document.querySelectorAll(".copy-text");
    const feedback = document.getElementById("copied-feedback");

    spans.forEach(span => {
        span.addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(span.textContent); // Copia o texto

                // Posiciona o feedback relativo ao botão
                const rect = span.getBoundingClientRect();
                feedback.style.top = `${rect.bottom + window.scrollY}px`;
                feedback.style.left = `${rect.left + window.scrollX + span.offsetWidth}px`;

                // Exibe o feedback
                feedback.classList.remove('hidden');
                feedback.classList.add('show');

                // Esconde o feedback após 1 segundo
                setTimeout(() => {
                    feedback.classList.remove('show');
                    feedback.classList.add('hidden');
                }, 1000);
            } catch (err) {
                console.error('Falha ao copiar o texto!', err);
            }
        });
    });
});
