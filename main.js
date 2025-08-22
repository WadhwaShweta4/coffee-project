"use strict";

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

const coffeeContainer = document.querySelector('#coffees');
const roastSelection = document.querySelector('#roast-selection');
const searchInput = document.querySelector('#search-name');
const addForm = document.querySelector('#add-coffee-form');
const newCoffeeName = document.querySelector('#new-coffee-name');
const newCoffeeRoast = document.querySelector('#new-coffee-roast');

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

function renderCoffees(coffeesToRender) {
    coffeeContainer.innerHTML = coffeesToRender.map(renderCoffee).join('');
}

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

function addCoffee(e) {
    e.preventDefault();
    const newCoffee = {
        id: coffees.length ? coffees[coffees.length - 1].id + 1 : 1,
        name: newCoffeeName.value,
        roast: newCoffeeRoast.value
    };
    coffees.push(newCoffee);
    updateCoffees();
    addForm.reset();
}

roastSelection.addEventListener('change', updateCoffees);
searchInput.addEventListener('input', updateCoffees);
addForm.addEventListener('submit', addCoffee);

coffees.sort((a, b) => a.id - b.id);
renderCoffees(coffees);
