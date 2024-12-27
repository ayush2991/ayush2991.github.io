function updateServings() {
    const servings = document.getElementById('servings').value;
    document.getElementById('wheat-bran').textContent = (1 * servings) + ' cup wheat bran';
    document.getElementById('buttermilk').textContent = (1 * servings) + ' cup buttermilk';
    document.getElementById('vegetable-oil').textContent = (0.33 * servings) + ' cup vegetable oil';
    document.getElementById('egg').textContent = (1 * servings) + ' egg';
    document.getElementById('brown-sugar').textContent = (0.67 * servings) + ' cup brown sugar';
    document.getElementById('vanilla-extract').textContent = (1 * servings) + ' teaspoon vanilla extract';
    document.getElementById('whole-wheat-flour').textContent = (1 * servings) + ' cup whole wheat flour';
    document.getElementById('baking-soda').textContent = (1 * servings) + ' teaspoon baking soda';
    document.getElementById('baking-powder').textContent = (1 * servings) + ' teaspoon baking powder';
    document.getElementById('salt').textContent = (0.5 * servings) + ' teaspoon salt';
    document.getElementById('raisins').textContent = (0.5 * servings) + ' cup raisins (optional)';
}