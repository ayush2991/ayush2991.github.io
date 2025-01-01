document.addEventListener('DOMContentLoaded', function () {
    const card1 = document.getElementById('card1');
    const card2 = document.getElementById('card2');
    const card3 = document.getElementById('card3');
    const fortuneBox = document.getElementById('fortune-box');

    async function updateFortune() {
        const card1Value = card1.value;
        const card2Value = card2.value;
        const card3Value = card3.value;

        if (card1Value && card2Value && card3Value) {
            try {
                const response = await fetch('http://localhost:3000/get-fortune', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ card1: card1Value, card2: card2Value, card3: card3Value })
                });
                const data = await response.json();
                fortuneBox.textContent = data.fortune || 'Your stars shine upon you!';
            } catch (error) {
                fortuneBox.textContent = 'Error fetching fortune.';
                console.log(error);
            }
        } else {
            fortuneBox.textContent = 'Your fortune will appear here.';
        }
    }

    card1.addEventListener('change', updateFortune);
    card2.addEventListener('change', updateFortune);
    card3.addEventListener('change', updateFortune);
});