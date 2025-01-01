document.addEventListener('DOMContentLoaded', function() {
    const card1 = document.getElementById('card1');
    const card2 = document.getElementById('card2');
    const card3 = document.getElementById('card3');
    const fortuneBox = document.getElementById('fortune-box');

    function updateFortune() {
        const card1Value = card1.value;
        const card2Value = card2.value;
        const card3Value = card3.value;

        if (card1Value && card2Value && card3Value) {
            fortuneBox.textContent = 'Your stars shine upon you!';
        } else {
            fortuneBox.textContent = 'Your fortune will appear here.';
        }
    }

    card1.addEventListener('change', updateFortune);
    card2.addEventListener('change', updateFortune);
    card3.addEventListener('change', updateFortune);
});