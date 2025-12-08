# SLICE & SPICE: FOODS THAT MAKE LIFE NICE

## 📋 Project Overview

Slice & Spice is a beautiful, user-friendly recipe discovery website
that helps you find, save, and cook delicious meals. No coding knowledge
required - just open and start cooking!

## 🌐 Live Demo

Simply open the index.html file in any web browser to start using the
website immediately.

## 🎯 Features

### 🔍 Recipe Discovery

-   Search recipes by name, ingredient, or cuisine
-   Browse by popular categories (Chicken, Pasta, Dessert, etc.)
-   Quick search buttons for instant results
-   Random recipe generator for inspiration

### ❤️ Personal Collection

-   Save favorite recipes for quick access
-   Favorites are stored locally (no login required)
-   Manage your saved recipes easily

### 📱 User-Friendly Design

-   Works perfectly on phones, tablets, and computers
-   Clean, intuitive interface
-   Beautiful food photography
-   Step-by-step instructions

### 🎨 Visual Appeal

-   Warm, food-friendly color scheme
-   Recipe cards with images and details
-   Smooth animations and transitions
-   Easy-to-read typography

## 📁 File Structure

    recipe-website/
    ├── index.html          # Main webpage structure
    ├── style.css           # Design and styling
    └── script.js           # Website functionality

## 🚀 Quick Start Guide

### Step 1: Open the Website

-   Locate the three files (index.html, style.css, script.js)
-   Make sure all files are in the same folder
-   Double-click index.html to open in your web browser

### Step 2: Start Exploring

-   **Search Recipes:** Type in the search bar at the top
-   **Browse Categories:** Click on any category image
-   **View Details:** Click any recipe card to see full instructions
-   **Save Favorites:** Click the heart button when viewing a recipe

### Step 3: Cook & Enjoy

-   Follow the step-by-step instructions
-   Use the ingredient list for shopping
-   Watch video tutorials when available
-   Save your successful recipes

## 🍳 How to Use Key Features

### Searching for Recipes

1.  Type your search term (e.g., "pasta", "chicken curry")
2.  Press Enter or click the Search button
3.  Browse through the results

### Using Quick Search

-   Click any quick button: Chicken, Pasta, Dessert, Vegetarian, or Beef
-   The website automatically shows relevant recipes

### Saving Favorites

1.  Click any recipe to open details
2.  Click the "Add to Favorites" button (heart icon)
3.  Find your saved recipes in the sidebar under "My Favorites"

### Removing Favorites

-   Click the ❌ button next to any recipe in your favorites list\
    **OR**\
-   Open the recipe and click "Remove from Favorites"

### Getting Random Recipes

-   Click the "Random Recipe" button above the recipe grid
-   Discover new recipes you might not have searched for

## 📱 Mobile Usage Tips

-   Tap recipe cards to view details
-   Swipe or scroll to browse
-   Use search bar at the top for quick finds
-   Sidebar moves to bottom on mobile devices
-   Pinch to zoom on recipe instructions if needed

## 🔧 For Customization (Optional)

### Change Colors

-   Open **style.css**
-   Find the `:root` section
-   Change the hex color codes
-   Save and refresh

### Add More Quick Search Buttons

Add inside `<div class="quick-search">`:

``` html
<button class="quick-btn" data-search="seafood">Seafood</button>
```

### Modify Categories

-   Open **script.js**
-   Find:\
    `displaySidebarCategories(currentCategories.slice(0, 8))`
-   Change the number to show more/fewer categories

## ⚠️ Troubleshooting Guide

  Problem                 Solution
  ----------------------- ----------------------------------------------
  Recipes won't load      Check your internet connection
  Website looks broken    Make sure all 3 files are in the same folder
  Favorites disappeared   Don't clear browser history/cache
  Images not showing      Refresh the page (Ctrl + F5)
  Search not working      Try a different search term
  Can't click on mobile   Use finger tap instead of mouse click

### Common Issues

**"No recipes found" message**\
- Try a broader term\
- Use quick search\
- Check internet

**Website looks different on phone**\
- Normal responsive behavior

**Can't save favorites**\
- Click the heart icon\
- Check for blocked pop-ups\
- Try a different browser

## 🌐 Technical Notes

### How Recipes Are Loaded

-   Recipes come from **TheMealDB**
-   No personal data collected
-   Favorites saved locally only

### Browser Compatibility

-   Google Chrome (recommended)
-   Firefox
-   Safari
-   Edge
-   Mobile browsers

### Offline Usage

-   Recipes require internet
-   Saved favorites work offline
-   Recipe details need internet

## 📞 Support

Requires: - Modern web browser - Internet connection - All three files
in one folder\
No installation or registration required.

## 🎨 Design Philosophy

-   Orange/black/white color scheme
-   Clean typography
-   Card-based layout
-   Responsive design
-   Subtle animations

## 🔄 Updates and Maintenance

-   Replace the three files to update
-   Favorites remain stored in browser
-   Refresh to apply changes

## 📊 What's Stored Locally

-   Recipe favorites\
    No personal data, no analytics, no ads.

## 🏆 Best Practices for Users

-   Save recipes before cooking
-   Use categories for inspiration
-   Try random recipes
-   Watch tutorials for complex dishes
-   Share the files with friends

## 🙏 Acknowledgments

-   Recipe data from **TheMealDB**
-   Icons from **Font Awesome**
-   Food images from **Unsplash**

## 📝 License

Free for personal use.\
You may: - Use for personal cooking\
- Share with friends\
- Modify for personal use

Do not sell or redistribute commercially.

## 🍽️ Ready to Cook?

-   Open index.html\
-   Search for a recipe\
-   Save favorites\
-   Cook delicious meals

Happy Cooking! 🧑‍🍳👩‍🍳✨

**Last Updated:** December 2025\
**Version:** 1.0\
**Created With:** HTML, CSS, JavaScript
