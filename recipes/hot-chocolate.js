function updateServings() {
    const servings = document.getElementById('servings').value;
    document.getElementById('milk').textContent = (0.5 * servings) + ' cup whole milk';
    document.getElementById('cocoa-powder').textContent = (0.5 * servings) + ' tbsp unsweetened cocoa powder';
    document.getElementById('chocolate-chips').textContent = (1 * servings) + ' tbsp chocolate chips';
    document.getElementById('sugar').textContent = (0.25 * servings) + ' tbsp sugar';
    document.getElementById('vanilla-extract').textContent = (0.0625 * servings) + ' teaspoon vanilla extract';
}