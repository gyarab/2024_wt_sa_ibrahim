console.log('START');

let karty = [
    { src: 'https://placecats.com/bella/100/100', altSrc: 'https://placekitten.com/100/100' },
    { src: 'https://placecats.com/millie/100/100', altSrc: 'https://placekitten.com/101/101' },
    { src: 'https://placecats.com/neo/100/100', altSrc: 'https://placekitten.com/102/102' },
    { src: 'https://placecats.com/neo_2/100/100', altSrc: 'https://placekitten.com/103/103' },
    { src: 'https://placecats.com/millie_neo/100/100', altSrc: 'https://placekitten.com/104/104' },
    { src : 'https://placecats.com/g/300/200'}
    
];

const cardBackSrc = 'pokemon-card-back.png';

let cards = [...karty, ...karty].sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let remainingPairs = karty.length; // Count of pairs to match

function createGrid() {
    let container = document.getElementById('pexeso');
    if (!container) {
        console.error('Element with id "pexeso" not found.');
        return;
    }

    container.innerHTML = "";

    cards.forEach((card, index) => {
        let img = document.createElement('img');
        img.src = cardBackSrc;
        img.dataset.src = card.src;
        img.dataset.index = index;
        img.dataset.matched = "false";

        img.addEventListener('click', () => flipCard(img));

        container.appendChild(img);
    });
}

function flipCard(img) {
    if (img.src.includes(cardBackSrc) && img.dataset.matched === "false" && (!firstCard || !secondCard)) {
        img.src = img.dataset.src;

        if (!firstCard) {
            firstCard = img;
        } else {
            secondCard = img;
            checkMatch();
        }
    }
}

function checkMatch() {
    if (firstCard.dataset.src === secondCard.dataset.src) {
        setTimeout(() => {
            firstCard.dataset.matched = "true";
            secondCard.dataset.matched = "true";
            remainingPairs--;

            if (remainingPairs === 0) {
                setTimeout(() => alert('Congratulations! You matched all the cards!'), 500);
            }

            reset();
        }, 500);
    } else {
        setTimeout(() => {
            firstCard.src = cardBackSrc;
            secondCard.src = cardBackSrc;
            reset();
        }, 1000);
    }
}

function reset() {
    firstCard = null;
    secondCard = null;
}

createGrid();

console.log('END');
