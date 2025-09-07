// Initial quotes array
let quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Life is what happens when you're busy making other plans.", category: "Life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", category: "Dreams" },
    { text: "Be the change you wish to see in the world.", category: "Inspiration" },
    { text: "The only impossible journey is the one you never begin.", category: "Motivation" }
];

// DOM Elements
const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const categorySelect = document.getElementById('categorySelect');
const addCategoryBtn = document.getElementById('addCategoryBtn');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');

// Initialize the application
function init() {
    populateCategories();
    showRandomQuote();
    setupEventListeners();
}

// Populate categories dropdown
function populateCategories() {
    // Clear existing options except "All Categories"
    while (categorySelect.options.length > 1) {
        categorySelect.remove(1);
    }
    
    // Get unique categories
    const categories = [...new Set(quotes.map(quote => quote.category))];
    
    // Add categories to dropdown
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
}

// Show random quote based on selected category
function showRandomQuote() {
    const selectedCategory = categorySelect.value;
    let filteredQuotes = quotes;
    
    // Filter quotes by category if not "all"
    if (selectedCategory !== 'all') {
        filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
    }
    
    if (filteredQuotes.length === 0) {
        quoteDisplay.innerHTML = '<p class="quote-text">No quotes available for this category.</p>';
        return;
    }
    
    // Get random quote
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    
    // Update DOM
    quoteDisplay.innerHTML = `
        <p class="quote-text">"${randomQuote.text}"</p>
        <p class="quote-category">— ${randomQuote.category}</p>
    `;
}

// Add new quote
function addQuote() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();
    
    if (!text || !category) {
        alert('Please enter both quote text and category');
        return;
    }
    
    // Add new quote to array
    quotes.push({ text, category });
    
    // Update categories dropdown
    populateCategories();
    
    // Clear input fields
    newQuoteText.value = '';
    newQuoteCategory.value = '';
    
    // Show success message
    alert('Quote added successfully!');
}

// Add new category
function addCategory() {
    const categoryName = prompt('Enter new category name:');
    if (categoryName && categoryName.trim()) {
        // Add category to dropdown
        const option = document.createElement('option');
        option.value = categoryName.trim();
        option.textContent = categoryName.trim();
        categorySelect.appendChild(option);
    }
}

// Setup event listeners
function setupEventListeners() {
    newQuoteBtn.addEventListener('click', showRandomQuote);
    addQuoteBtn.addEventListener('click', addQuote);
    addCategoryBtn.addEventListener('click', addCategory);
    categorySelect.addEventListener('change', showRandomQuote);
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);