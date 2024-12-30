function updateServings() {
    const servings = document.getElementById('servings').value;
    document.getElementById('sweet-potatoes').textContent = `${2 * servings} medium sweet potatoes`;
    document.getElementById('olive-oil').textContent = `${1 * servings} tablespoon olive oil`;
    document.getElementById('salt').textContent = `${0.5 * servings} teaspoon salt`;
    document.getElementById('pepper').textContent = `${0.25 * servings} teaspoon black pepper`;
    document.getElementById('cinnamon').textContent = `${0.5 * servings} teaspoon cinnamon (optional)`;
}