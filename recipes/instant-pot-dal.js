function updateServings() {
    const servings = document.getElementById('servings').value;
    document.getElementById('toor-dal').textContent = `${0.5 * servings} cup Toor Dal (split pigeon peas)`;
    document.getElementById('moong-dal').textContent = `${0.5 * servings} cup Moong Dal (split yellow lentils)`;
    document.getElementById('onion').textContent = `${servings} medium onion, finely chopped`;
    document.getElementById('tomatoes').textContent = `${2 * servings} tomatoes, finely chopped`;
    document.getElementById('green-chilies').textContent = `${2 * servings} green chilies, slit`;
    document.getElementById('ginger-garlic-paste').textContent = `${1 * servings} tsp ginger-garlic paste`;
    document.getElementById('turmeric-powder').textContent = `${0.5 * servings} tsp turmeric powder`;
    document.getElementById('cumin-seeds').textContent = `${1 * servings} tsp cumin seeds`;
    document.getElementById('mustard-seeds').textContent = `${1 * servings} tsp mustard seeds`;
    document.getElementById('red-chili-powder').textContent = `${0.5 * servings} tsp red chili powder`;
    document.getElementById('salt').textContent = `Salt to taste`;
    document.getElementById('oil').textContent = `${2 * servings} tbsp oil`;
}