"use strict";

// Coffee Data
let coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

// Elements
const coffeeContainer = document.querySelector('#coffees');
const roastSelection = document.querySelector('#roast-selection');
const searchInput = document.querySelector('#search-name');
const addForm = document.querySelector('#add-coffee-form');

// 🔹 CHANGED: newCoffeeName is now a <select>, not a text input
const newCoffeeName = document.querySelector('#new-coffee-name');
const newCoffeeRoast = document.querySelector('#new-coffee-roast');

// Render a single coffee card
function renderCoffee(coffee) {
    return `
        <div class="col-md-4">
            <div class="card shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title">${coffee.name}</h5>
                    <p class="card-text text-muted">Roast: ${coffee.roast}</p>
                </div>
            </div>
        </div>
    `;
}

// Render all coffees
function renderCoffees(coffeesToRender) {
    coffeeContainer.innerHTML = coffeesToRender.map(renderCoffee).join('');
}

// Filter and Search Logic
function updateCoffees() {
    const roastValue = roastSelection.value;
    const searchTerm = searchInput.value.toLowerCase();

    let filtered = coffees.filter(coffee => {
        const matchesRoast = roastValue === "all" || coffee.roast === roastValue;
        const matchesName = coffee.name.toLowerCase().includes(searchTerm);
        return matchesRoast && matchesName;
    });

    renderCoffees(filtered);
}

// Add New Coffee
function addCoffee(e) {
    e.preventDefault();

    // 🔹 Since newCoffeeName is now a <select>, we just read the selected value
    const name = newCoffeeName.value;
    const roast = newCoffeeRoast.value;

    const newCoffee = {
        id: coffees.length ? coffees[coffees.length - 1].id + 1 : 1,
        name: name,
        roast: roast
    };

    coffees.push(newCoffee);
    updateCoffees();
    addForm.reset();
}

// Event Listeners
roastSelection.addEventListener('change', updateCoffees);
searchInput.addEventListener('input', updateCoffees);
addForm.addEventListener('submit', addCoffee);

// Initial Render (sorted by ID ascending)
coffees.sort((a, b) => a.id - b.id);
renderCoffees(coffees);
