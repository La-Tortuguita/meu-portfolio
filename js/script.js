
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const mainContent = document.getElementById('content');

    async function loadContent(sectionName) {                                           // Carregar o conteúdo
        try {                                                                             // Remove a classe 'active-content' das seções
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active-content');
            });
                                                                                             // Tenta encontrar uma seção já existente na página
            let targetSection = document.getElementById(`${sectionName}-section`);

            if (!targetSection) {                                                           // Se a seção não existir, carrega o HTML do arquivo correspondente
                const response = await fetch(`${sectionName}.html`); 
                if (!response.ok) {
                    throw new Error(`Erro ao carregar o conteúdo de ${sectionName}.html: ${response.statusText}`);
                }
                const html = await response.text();

                const tempDiv = document.createElement('div');                             
                tempDiv.innerHTML = html;
                targetSection = tempDiv.querySelector('section');

                if (targetSection) {
                    targetSection.id = `${sectionName}-section`;                        // Define um ID para a seção carregada
                    targetSection.classList.add('content-section');                     // Adiciona classe para estilização
                    mainContent.appendChild(targetSection);
                } else {
                    console.error(`Seção não encontrada no arquivo ${sectionName}.html`);
                    mainContent.innerHTML = `<p>Conteúdo para "${sectionName}" não encontrado.</p>`;
                    return;
                }
            }

            targetSection.classList.add('active-content');                                  // Adiciona a classe 'active-content' para mostrar a seção

        } catch (error) {
            console.error('Erro ao carregar conteúdo:', error);
            mainContent.innerHTML = `<p>Houve um erro ao carregar o conteúdo.</p>`;
        }
    }

    navLinks.forEach(link => {                                                              // Adiciona evento de clique aos links de navegação
        link.addEventListener('click', (event) => {
            event.preventDefault(); 
            const contentId = event.target.dataset.content;
            if (contentId) {
                loadContent(contentId);
            }
        });
    });

    loadContent('sobre-mim');                                                               // Carrega o conteúdo "Sobre mim" ao carregar a página pela primeira vez
});