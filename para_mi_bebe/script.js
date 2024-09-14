document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const victoryMessage = document.getElementById('victory-message');
    const cardImages = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    let cardValues = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let canFlip = true;

    function startGame() {
        board.innerHTML = '';
        flippedCards = [];
        matchedPairs = 0;
        canFlip = true;

        cardValues = [...cardImages, ...cardImages];
        cardValues.sort(() => Math.random() - 0.5);

        cardValues.forEach(value => {
            const cardContainer = document.createElement('div');
            cardContainer.className = 'card-container';
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.value = value;

            const cardInner = document.createElement('div');
            cardInner.className = 'card-inner';

            const cardFront = document.createElement('div');
            cardFront.className = 'card-front';
            // Aquí puedes agregar una imagen o dejarlo vacío

            const cardBack = document.createElement('div');
            cardBack.className = 'card-back';

            const img = document.createElement('img');
            img.src = `images/${value}.jpeg`;
            img.alt = `Carta ${value}`;
            cardBack.appendChild(img);

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);
            cardContainer.appendChild(card);

            card.addEventListener('click', () => flipCard(card));
            board.appendChild(cardContainer);
        });
    }

    function flipCard(card) {
        if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
            return;
        }

        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            canFlip = false;
            setTimeout(checkMatch, 500);
        }
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.value === card2.dataset.value) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
        } else {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }

        flippedCards = [];
        canFlip = true;

        if (matchedPairs === cardValues.length / 2) {
            setTimeout(() => {
                victoryMessage.classList.add('open');
                
                // Agregar el contenido de la carta de victoria al DOM
                const container1 = document.createElement('div');
                container1.className = 'container1 open-container';
                container1.innerHTML = `
                    <div class="hearts"></div>
                    <div class="letter">
                        <h1 style="text-align: center;">Para la niña más preciosa de todas🤍</h1>
                        <p>
                            Hola, mi pequeña gran niña, <br><br>
                            No sé cómo empezar a expresar todo lo que siento y te voy a decir, pero antes de todo primero que todo quiero hacer es agradecerte de corazón mi niña. Agradezco a la vida por este regalo Gracias por todo lo que has hecho por lo que haces por mí, por cada momento que compartimos y por el amor que me das. Tu presencia en mi vida es el regalo más grande, y a veces siento que no merezco todo lo que tú me das.
                            Me duele profundamente pensar en lo que hemos pasado. La pérdida de nuestro pequeño que hasta el día de hoy es el dolor más grande que siento que intento no pensarlo pero cada cosa me hace imaginar que hubiera pasado yo lo quería😭 si era contigo lo quería, el hecho de que no pude estar a tu lado en esos momentos tan cruciales, me consume de tristeza y culpa. No puedo perdonarme por no haber estado allí durante el embarazo, por no haberte acompañado esos días días, por no haber visto el Ultrasonido hace poco vi en los foto álbumes el mío y se me vino a la mente ese ni siquiera lo pude ver 😔 no fui de apoyo en ese duelo que necesitabas compañía y no estuve ahí 😞, ni siquiera sé cómo me puedes hablar. Cada vez que pienso en cómo pasaron las cosas, me duele saber cómo pasó aquel día de esa discusión que contribuyó y causó el dolor que ahora llevamos que pone triste pensar en que no te doy lo que mereces porque para ti darte el cielo y las galaxias es poco para lo que mereces.
                            Sé que esto es algo que es difícil, y entiendo si te sientes decepcionada o enojada conmigo si hay rencor odio o cualquier tipo de sentimientos encontrados lo entenderé 😔. Estoy consciente de que fallé directamente en uno de los momentos más importantes de nuestras vidas ya seríamos una familia, y me odio por no haber estado presente para ti y para nuestro pequeño. La culpa que siento es abrumadora, y me atormenta el pensamiento de que pude haber hecho las cosas bien pero por mis actos pasaron así ni siquiera pude saludar a la pancita o hablarle 😭.
                            Me duele aún más que, a pesar de todo, hayas planeado celebrar mi cumpleaños. No sé qué estaba pensando al ir al hotel cuando fue tu cumpleaños fue un error, ni cómo pude creer que eso era suficiente o una buena idea. Tu generosidad y cariño esas veces que aunque no dices porque sé que no eres mucho de decir tanto te amo. Con cada pequeño acto se puede sentir Siento que no tengo derecho a recibir tanto amor y que no merezco las cosas buenas que haces por mí no es falta de amor propio pero si se pone en balanza te debo mucho.
                            Solo te pido, con todo mi corazón, que entiendas cuánto lamento todo lo que ha sucedido no digo que perdones pido que sepas que así siento. Estoy profundamente arrepentido por el dolor que he causado y por no haber estado a la altura en los momentos en los que más me necesitaste. Ojalá pudiera volver atrás y cambiar las cosas a mejor, pero así no funcionan las cosas, debes saber cuánto valoro tu presencia en mi vida y cuánto siento el sufrimiento que has pasado.
                            Gracias por ser quien eres y por estar a mi lado, incluso cuando siento que no lo merezco sé que las cosas no son para siempre pero me ganaré mi lugar para que no quieras irte y seas feliz junto a mí.
                            <br><br>
                            Con todo mi amor y arrepentimiento, por las cosas que he hecho Jhair
                        </p>
                    </div>
                `;
                document.body.appendChild(container1);
            }, 500); // Ajusta el tiempo si es necesario
        }
    }

    function checkWin() {
        // Aquí iría tu lógica de verificación para saber si el jugador ha ganado.
        const hasWon = true;  // Cambia esta lógica según sea necesario.
    
        if (hasWon) {
            // Muestra el overlay con el corazón y el texto.
            document.getElementById("win-overlay").classList.add("active");
        }
    }
    
    // Agregar un evento para que cuando se haga clic en el texto "Click me", ocurra algo.
    document.querySelector(".click-me-text").addEventListener("click", function() {
        alert("¡Felicidades por ganar!");
        document.getElementById("win-overlay").classList.remove("active"); // Oculta el overlay después del clic.
    });
    


    startGame();
});
