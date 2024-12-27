function updateServings() {
    const servings = document.getElementById('servings').value;
    document.getElementById('chia-seeds').textContent = (0.25 * servings) + ' cup chia seeds';
    document.getElementById('almond-milk').textContent = servings + ' cup almond milk (or any milk of your choice)';
    document.getElementById('maple-syrup').textContent = (1 * servings) + ' tablespoon maple syrup (or honey)';
    document.getElementById('vanilla-extract').textContent = (0.5 * servings) + ' teaspoon vanilla extract';
}