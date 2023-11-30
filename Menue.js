// Import necessary packages
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const host = 'localhost'

// Initialize Express app
const app = express();
const port = 3000;

// Use middleware to parse JSON data
app.use(cors());
app.use(bodyParser.json());

// Sample data (initial menu items)
let menuItems = [
    {
        id: 1,
        name: 'Chicken Alfredo',
        description: 'Creamy Alfredo sauce with grilled chicken',
        ingredients: ['Chicken', 'Pasta', 'Alfredo Sauce'],
        price: 12.99,
        category: 'main course'
    },
    // Add more menu items as needed
];

// Endpoint to get all menu items
app.get('/menu-items', (req, res) => {
    res.json(menuItems);
});

// Endpoint to get menu items by category
app.get('/menu-items/:category', (req, res) => {
    const category = req.params.category.toLowerCase();
    const filteredItems = menuItems.filter(item => item.category.toLowerCase() === category);
    res.json(filteredItems);
});

// Endpoint to add a new menu item
app.post('/menu-items', (req, res) => {
    const newItem = req.body;
    newItem.id = menuItems.length + 1; // Generate a new ID
    menuItems.push(newItem);
    res.json(newItem);
});

// Endpoint to update a menu item by ID
app.put('/menu-items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    const updatedItem = req.body;

    menuItems = menuItems.map(item => {
        if (item.id === itemId) {
            return { ...item, ...updatedItem };
        }
        return item;
    });

    res.json(menuItems.find(item => item.id === itemId));
});

// Endpoint to delete a menu item by ID
app.delete('/menu-items/:id', (req, res) => {
    const itemId = parseInt(req.params.id);
    menuItems = menuItems.filter(item => item.id !== itemId);
    res.json({ message: 'Menu item deleted successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
