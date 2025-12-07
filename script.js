  // DOM Elements
        const recipeContainer = document.getElementById('recipe-container');
        const categoryContainer = document.getElementById('category-container');
        const categorySidebar = document.getElementById('category-sidebar');
        const favoritesList = document.getElementById('favorites-list');
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const quickSearchBtns = document.querySelectorAll('.quick-btn');
        const randomBtn = document.getElementById('random-btn');
        const recipeModal = document.getElementById('recipe-modal');
        const closeModal = document.querySelector('.close-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalTags = document.querySelector('.modal-tags');
        const modalIngredients = document.getElementById('modal-ingredients');
        const modalInstructions = document.getElementById('modal-instructions');
        const favoriteBtn = document.getElementById('favorite-btn');
        const watchVideo = document.getElementById('watch-video');
        const subscribeBtn = document.getElementById('subscribe-btn');
        
        // State variables
        let currentRecipes = [];
        let currentCategories = [];
        let favorites = JSON.parse(localStorage.getItem('recipeFavorites')) || [];
        let currentRecipeId = null;
        
        // Initialize the app
        document.addEventListener('DOMContentLoaded', function() {
            loadRandomRecipes();
            loadCategories();
            updateFavoritesList();
            
            // Event listeners
            searchBtn.addEventListener('click', performSearch);
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') performSearch();
            });
            
            quickSearchBtns.forEach(btn => {
                if (btn.dataset.search) {
                    btn.addEventListener('click', function() {
                        searchInput.value = this.dataset.search;
                        performSearch();
                    });
                }
            });
            
            randomBtn.addEventListener('click', loadRandomRecipes);
            closeModal.addEventListener('click', closeRecipeModal);
            recipeModal.addEventListener('click', function(e) {
                if (e.target === recipeModal) closeRecipeModal();
            });
            
            favoriteBtn.addEventListener('click', toggleFavorite);
            subscribeBtn.addEventListener('click', function() {
                const email = document.getElementById('newsletter-email').value;
                if (email && validateEmail(email)) {
                    alert(`Thank you for subscribing with ${email}! You'll receive our weekly newsletter.`);
                    document.getElementById('newsletter-email').value = '';
                } else {
                    alert('Please enter a valid email address.');
                }
            });
            
            // Load favorites from localStorage
            if (favorites.length > 0) {
                updateFavoritesList();
            }
        });
        
        // Functions
        function loadRandomRecipes() {
            recipeContainer.innerHTML = '<div class="spinner"></div>';
            
            // Fetch 9 random recipes
            const promises = [];
            for (let i = 0; i < 9; i++) {
                promises.push(fetch('https://www.themealdb.com/api/json/v1/1/random.php')
                    .then(response => response.json())
                    .then(data => data.meals[0]));
            }
            
            Promise.all(promises)
                .then(recipes => {
                    currentRecipes = recipes;
                    displayRecipes(recipes);
                })
                .catch(error => {
                    console.error('Error loading recipes:', error);
                    recipeContainer.innerHTML = '<p>Failed to load recipes. Please try again later.</p>';
                });
        }
        
        function loadCategories() {
            fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
                .then(response => response.json())
                .then(data => {
                    currentCategories = data.categories;
                    displayCategories(currentCategories);
                    displaySidebarCategories(currentCategories.slice(0, 8));
                })
                .catch(error => {
                    console.error('Error loading categories:', error);
                });
        }
        
        function displayRecipes(recipes) {
            if (!recipes || recipes.length === 0) {
                recipeContainer.innerHTML = '<p>No recipes found. Try a different search term.</p>';
                return;
            }
            
            recipeContainer.innerHTML = '';
            
            recipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.className = 'recipe-card';
                recipeCard.innerHTML = `
                    <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" class="recipe-img">
                    <div class="recipe-info">
                        <h3>${recipe.strMeal}</h3>
                        <div class="recipe-meta">
                            <span><i class="fas fa-utensils"></i> ${recipe.strCategory || 'Unknown'}</span>
                            <span><i class="fas fa-globe"></i> ${recipe.strArea || 'Unknown'}</span>
                        </div>
                        <button class="view-recipe-btn" data-id="${recipe.idMeal}">
                            <i class="fas fa-book-open"></i> View Recipe
                        </button>
                    </div>
                `;
                
                recipeCard.querySelector('.view-recipe-btn').addEventListener('click', function() {
                    showRecipeDetails(this.dataset.id);
                });
                
                recipeContainer.appendChild(recipeCard);
            });
        }
        
        function displayCategories(categories) {
            categoryContainer.innerHTML = '';
            
            categories.forEach(category => {
                const categoryCard = document.createElement('div');
                categoryCard.className = 'recipe-card';
                categoryCard.innerHTML = `
                    <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="recipe-img">
                    <div class="recipe-info">
                        <h3>${category.strCategory}</h3>
                        <p>${category.strCategoryDescription.substring(0, 100)}...</p>
                        <button class="view-recipe-btn" data-category="${category.strCategory}">
                            <i class="fas fa-list"></i> Browse Recipes
                        </button>
                    </div>
                `;
                
                categoryCard.querySelector('.view-recipe-btn').addEventListener('click', function() {
                    searchByCategory(this.dataset.category);
                });
                
                categoryContainer.appendChild(categoryCard);
            });
        }
        
        function displaySidebarCategories(categories) {
            categorySidebar.innerHTML = '';
            
            categories.forEach(category => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${category.strCategory}</span>
                    <i class="fas fa-chevron-right"></i>
                `;
                
                li.addEventListener('click', function() {
                    searchByCategory(category.strCategory);
                });
                
                categorySidebar.appendChild(li);
            });
        }
        
        function searchByCategory(category) {
            recipeContainer.innerHTML = '<div class="spinner"></div>';
            document.querySelector('.section-title h2').textContent = `${category} Recipes`;
            
            fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
                .then(response => response.json())
                .then(data => {
                    if (data.meals) {
                        // Fetch full details for each recipe
                        const promises = data.meals.slice(0, 12).map(meal => 
                            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                                .then(response => response.json())
                                .then(data => data.meals[0])
                        );
                        
                        Promise.all(promises)
                            .then(recipes => {
                                currentRecipes = recipes;
                                displayRecipes(recipes);
                            });
                    } else {
                        recipeContainer.innerHTML = '<p>No recipes found in this category.</p>';
                    }
                })
                .catch(error => {
                    console.error('Error searching by category:', error);
                    recipeContainer.innerHTML = '<p>Failed to load recipes. Please try again later.</p>';
                });
        }
        
        function performSearch() {
            const query = searchInput.value.trim();
            
            if (!query) {
                alert('Please enter a search term.');
                return;
            }
            
            recipeContainer.innerHTML = '<div class="spinner"></div>';
            document.querySelector('.section-title h2').textContent = `Search Results for "${query}"`;
            
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
                .then(response => response.json())
                .then(data => {
                    if (data.meals) {
                        currentRecipes = data.meals.slice(0, 12);
                        displayRecipes(currentRecipes);
                    } else {
                        recipeContainer.innerHTML = `<p>No recipes found for "${query}". Try a different search term.</p>`;
                    }
                })
                .catch(error => {
                    console.error('Error searching recipes:', error);
                    recipeContainer.innerHTML = '<p>Failed to search recipes. Please try again later.</p>';
                });
        }
        
        function showRecipeDetails(recipeId) {
            currentRecipeId = recipeId;
            
            fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
                .then(response => response.json())
                .then(data => {
                    const recipe = data.meals[0];
                    
                    // Update modal content
                    modalTitle.textContent = recipe.strMeal;
                    
                    // Clear and add tags
                    modalTags.innerHTML = '';
                    const tags = [recipe.strCategory, recipe.strArea];
                    tags.forEach(tag => {
                        if (tag) {
                            const tagEl = document.createElement('span');
                            tagEl.className = 'tag';
                            tagEl.textContent = tag;
                            modalTags.appendChild(tagEl);
                        }
                    });
                    
                    // Clear and add ingredients
                    modalIngredients.innerHTML = '';
                    for (let i = 1; i <= 20; i++) {
                        const ingredient = recipe[`strIngredient${i}`];
                        const measure = recipe[`strMeasure${i}`];
                        
                        if (ingredient && ingredient.trim()) {
                            const li = document.createElement('li');
                            li.textContent = `${measure ? measure : ''} ${ingredient}`.trim();
                            modalIngredients.appendChild(li);
                        }
                    }
                    
                    // Add instructions
                    modalInstructions.textContent = recipe.strInstructions;
                    
                    // Update favorite button
                    const isFavorite = favorites.includes(recipeId);
                    favoriteBtn.innerHTML = isFavorite 
                        ? '<i class="fas fa-heart"></i> Remove from Favorites' 
                        : '<i class="far fa-heart"></i> Add to Favorites';
                    
                    // Update video link
                    if (recipe.strYoutube) {
                        watchVideo.href = recipe.strYoutube;
                        watchVideo.style.display = 'flex';
                    } else {
                        watchVideo.style.display = 'none';
                    }
                    
                    // Show modal
                    recipeModal.style.display = 'block';
                    document.body.style.overflow = 'hidden';
                })
                .catch(error => {
                    console.error('Error loading recipe details:', error);
                    alert('Failed to load recipe details. Please try again.');
                });
        }
        
        function closeRecipeModal() {
            recipeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        function toggleFavorite() {
            if (!currentRecipeId) return;
            
            const index = favorites.indexOf(currentRecipeId);
            
            if (index === -1) {
                // Add to favorites
                favorites.push(currentRecipeId);
                favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Remove from Favorites';
            } else {
                // Remove from favorites
                favorites.splice(index, 1);
                favoriteBtn.innerHTML = '<i class="far fa-heart"></i> Add to Favorites';
            }
            
            // Save to localStorage
            localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
            
            // Update favorites list
            updateFavoritesList();
        }
        
        function updateFavoritesList() {
            if (favorites.length === 0) {
                favoritesList.innerHTML = '<li>No favorites yet. Add some recipes!</li>';
                return;
            }
            
            // Fetch favorite recipes
            const promises = favorites.map(id => 
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                    .then(response => response.json())
                    .then(data => data.meals[0])
            );
            
            Promise.all(promises)
                .then(recipes => {
                    favoritesList.innerHTML = '';
                    
                    recipes.forEach(recipe => {
                        const li = document.createElement('li');
                        li.innerHTML = `
                            <span>${recipe.strMeal}</span>
                            <button class="remove-fav" data-id="${recipe.idMeal}">
                                <i class="fas fa-times"></i>
                            </button>
                        `;
                        
                        li.querySelector('.remove-fav').addEventListener('click', function(e) {
                            e.stopPropagation();
                            removeFavorite(this.dataset.id);
                        });
                        
                        li.addEventListener('click', function() {
                            showRecipeDetails(recipe.idMeal);
                        });
                        
                        favoritesList.appendChild(li);
                    });
                })
                .catch(error => {
                    console.error('Error loading favorites:', error);
                    favoritesList.innerHTML = '<li>Error loading favorites.</li>';
                });
        }
        
        function removeFavorite(recipeId) {
            const index = favorites.indexOf(recipeId);
            if (index !== -1) {
                favorites.splice(index, 1);
                localStorage.setItem('recipeFavorites', JSON.stringify(favorites));
                updateFavoritesList();
                
                // If the current modal is open for this recipe, update the button
                if (currentRecipeId === recipeId) {
                    favoriteBtn.innerHTML = '<i class="far fa-heart"></i> Add to Favorites';
                }
            }
        }
        
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && recipeModal.style.display === 'block') {
                closeRecipeModal();
            }
        });