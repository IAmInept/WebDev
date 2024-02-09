// Preliminary Check to ensure Javascript file loads on startup.
console.log("main.js has loaded successful");

const btnOrder = document.getElementById("addOrder");
const btnPlaceOrder = document.getElementById("placeOrder");
const btnResetPage = document.getElementById("resetPage");
const btnSaveFav = document.getElementById("saveFavourite");
const btnOrderFave = document.getElementById("orderFavourite");

const drinkSizeArray = document.getElementsByName("sizeSelection");
const ingredientArray = document.getElementsByName("ingredients");
const smoothieBaseArray = document.getElementsByName("itemBaseSmoothie");
const milkshakeBaseArray = document.getElementsByName("itemBaseMilkshake");
const drinkSize = document.getElementById("bevSize");
const drinkTypeList = document.getElementsByName("drinkType");
const milkshakeExtra = document.getElementsByName("milkshakeExtraItem");

const smoothieBase = document.getElementById("smoothieBase");
const milkshakeBase = document.getElementById("milkshakeBase");
const milkshakeBaseExtra = document.getElementById("milkshakeExtra");
const drinkType = document.getElementById("drinkType");
const fieldsetCurrentOrder = document.getElementById("displayOrder");
const fieldsetTotalPrice = document.getElementById("displayOrderPrice");

const txtCost = document.getElementById("cost");
const txtOrderTotal = document.getElementById("orderTotal");
const txtFinalOrderPrice = document.getElementById("orderTotalCost");

let drinkCost;
let sizeCost;
let milkshakeExtraCost;
let ingredientTotal;
let orderCost;
let orderItems = [];

drinkSize.addEventListener("change", checkSizeCost);
drinkType.addEventListener("change", drinkTypeChange);
btnOrder.addEventListener("click", addToOrder);
btnPlaceOrder.addEventListener("click", placeOrder);
btnSaveFav.addEventListener("click", saveFavourite);
btnOrderFave.addEventListener("click", orderFavourite);
btnResetPage.addEventListener("click", initialiseStartup);
milkshakeExtra.forEach(item => item.addEventListener("change", checkMilkshakeExtra));
ingredientArray.forEach(item => item.addEventListener("change", getIngredientsTotal));

initialiseStartup();

// ---------------------------------------------------------

function initialiseStartup() {
    console.log("Startup initialised");
    setVariables();
    uncheckItems();
    hideExtras();
    console.log("Startup configured.");
}
function resetDrinkField() {
    sizeCost = 3.20;
    drinkCost = sizeCost;
    milkshakeExtraCost = 0;
    txtCost.innerText = `${"£" + drinkCost.toFixed(2)}`;
    uncheckItems();
    hideExtras();
}
function setVariables() {
    sizeCost = 3.20;
    milkshakeExtraCost = 0;
    ingredientTotal = 0;
    btnSaveFav.disabled = ingredientTotal === 0;
    orderItems = [];
    drinkCost = sizeCost;
    orderCost = 0;
    txtCost.innerText = `${"£" + drinkCost.toFixed(2)}`;
}
function uncheckItems() {
    document.getElementById("drinkType_milkshake").checked = false;
    document.getElementById("drinkType_smoothie").checked = false;

    document.getElementById("bevIngredients_banana").checked = false;
    document.getElementById("bevIngredients_strawberry").checked = false;
    document.getElementById("bevIngredients_cranberry").checked = false;
    document.getElementById("bevIngredients_raspberry").checked = false;
    document.getElementById("bevIngredients_chocolate").checked = false;

    document.getElementById("milkshakeExtra_malt").checked = false;
    document.getElementById("milkshakeExtra_marshmallows").checked = false;
    document.getElementById("milkshakeExtra_whippedCream").checked = false;
    document.getElementById("milkshakeExtra_flake").checked = false;

    document.getElementById("sizeM").checked = true;
    document.getElementById("smoothieBase_orangeJuice").checked = true;
    document.getElementById("milkshakeBase_skimmedMilk").checked = true;
}
function hideExtras() {
    smoothieBase.classList.add("hidden");
    milkshakeBase.classList.add("hidden");
    milkshakeBaseExtra.classList.add("hidden");
    fieldsetCurrentOrder.classList.add("hidden");
    fieldsetTotalPrice.classList.add("hidden");
}
function unhideOrder() {
    fieldsetCurrentOrder.classList.remove("hidden");
    fieldsetTotalPrice.classList.remove("hidden");
}
// ---------------------------------------------------------

function drinkTypeChange() {
    if (document.getElementById("drinkType_smoothie").checked) { // checks if smoothie radio button is checked.
        console.log("Smoothie has been selected, Displaying relevant fields."); // logs to confirm if statement is functioned
        smoothieBase.classList.remove("hidden");
        milkshakeBase.classList.add("hidden");
        milkshakeBaseExtra.classList.add("hidden");
    } else if (document.getElementById("drinkType_milkshake").checked) { // checks if milkshake radio button is checked.
        console.log("Milkshake has been Selected, Displaying relevant fields.");
        milkshakeBase.classList.remove("hidden");
        milkshakeBaseExtra.classList.remove("hidden");
        smoothieBase.classList.add("hidden");
    }
}
function checkSizeCost() {
 if (document.getElementById("sizeS").checked) {
     sizeCost = 2.70;
 } else if (document.getElementById("sizeM").checked) {
     sizeCost = 3.20;
 } else if (document.getElementById("sizeL").checked) {
     sizeCost = 3.70;
 } else {
     sizeCost = 4.50;
 }
    drinkCost = sizeCost + milkshakeExtraCost;
 txtCost.innerText = `${"£" + drinkCost.toFixed(2)}`;
}

// ---------------------------------------------------------

function checkMilkshakeExtra() {
    if (this.checked) {
        milkshakeExtraCost += 0.85;
    } else {
        milkshakeExtraCost -= 0.85;
    }
    drinkCost = sizeCost + milkshakeExtraCost;
    txtCost.innerText = `${"£" + drinkCost.toFixed(2)}`;
}
function addToOrder(){
    if (document.getElementById("drinkType_smoothie").checked) {
        getItemValue(drinkSizeArray);
        getItemValue(drinkTypeList);
        getItemValue(ingredientArray);
        getItemValue(smoothieBaseArray);
        printOrder();
    } else if (document.getElementById("drinkType_milkshake").checked) {
        getItemValue(drinkSizeArray);
        getItemValue(drinkTypeList);
        getItemValue(ingredientArray);
        getItemValue(milkshakeBaseArray);
        getItemValue(milkshakeExtra);
        printOrder();
    }
}
function printOrder() {
    orderItems.push("£" + drinkCost.toFixed("2") + "\n");
    let strOrderItems = orderItems.join(" ");
    txtOrderTotal.innerText = `${strOrderItems}`;
    orderCost += drinkCost;
    txtFinalOrderPrice.innerText = `${"£"+ orderCost.toFixed(2)}`;
    resetDrinkField();
    unhideOrder();
}
function getItemValue(input) {
    for (let i = 0; i < input.length; i++) {
        if (input[i].checked) {
            orderItems.push(input[i].value);
            txtOrderTotal.innerText = `${orderItems}`;
        }
    }
}
function getIngredientsTotal() {
        if (this.checked) {
            ingredientTotal += 1;
            btnSaveFav.disabled = ingredientTotal === 0;
        } else {
            ingredientTotal -= 1;
            btnSaveFav.disabled = ingredientTotal === 0;
    }
}
function placeOrder() {
    alert("Your order has been placed, your final cost is " + `${"£"+ orderCost.toFixed(2)}`);
    initialiseStartup();
}

// ---------------------------------------------------------

function saveFavourite() {
    // write to json file
    console.log("Order Saved");
}
function orderFavourite() {
    console.log("Grabbing Order");
    // load & read json file
    console.log("Order Loaded");
}
