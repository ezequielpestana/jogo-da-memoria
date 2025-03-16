const board = document.querySelector('.game-board');
        const words = ['Gato', 'Cachorro', 'Lua', 'Sol', 'Carro', 'Casa', 'Árvore', 'Livro'];
        let wordArray = [...words, ...words]; // Duplicar as palavras para criar pares

        let hasFlippedCard = false;
        let lockBoard = false;
        let firstCard, secondCard;

        // Função para criar cartas dinamicamente
        function createCards() {
            wordArray.sort(() => 0.5 - Math.random()); // Embaralhar as palavras

            wordArray.forEach(word => {
                const card = document.createElement('div');
                card.classList.add('memory-card');
                card.innerHTML = `
                    <div class="front-face">${word}</div>
                    <div class="back-face"></div>
                `;
                board.appendChild(card);

                card.addEventListener('click', flipCard);
            });
        }

        // Função que lida com o clique nas cartas
        function flipCard() {
            if (lockBoard) return;
            if (this === firstCard) return;

            this.classList.add('flip');

            if (!hasFlippedCard) {
                hasFlippedCard = true;
                firstCard = this;
                return;
            }

            secondCard = this;
            checkForMatch();
        }

        // Verifica se há correspondência entre as duas cartas viradas
        function checkForMatch() {
            let isMatch = firstCard.innerText === secondCard.innerText;

            isMatch ? disableCards() : unflipCards();
        }

        // Desativa as cartas correspondentes
        function disableCards() {
            firstCard.removeEventListener('click', flipCard);
            secondCard.removeEventListener('click', flipCard);

            firstCard.classList.add('matched');
            secondCard.classList.add('matched');

            resetBoard();
        }

        // Vira as cartas de volta caso não correspondam
        function unflipCards() {
            lockBoard = true;

            setTimeout(() => {
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');

                resetBoard();
            }, 1000);
        }

        // Reseta as variáveis de controle para permitir novas jogadas
        function resetBoard() {
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }

        // Inicializa o jogo criando as cartas
        createCards();