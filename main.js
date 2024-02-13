// Preliminary Check to ensure Javascript file loads on startup.
console.log("main.js has loaded successful");

const btnOrder = document.getElementById("addOrder");
const btnPlaceOrder = document.getElementById("placeOrder");
const btnSaveFav = document.getElementById("saveFavourite");
const btnOrderFave = document.getElementById("orderFavourite");
const btnResetPage = document.getElementById("resetPage");
// ----
const optDrinkSize = document.getElementsByName("sizeSelection");
const optDrinkTypeList = document.getElementsByName("drinkType");
const optIngredients = document.getElementsByName("ingredients");
const optSmoothieBase = document.getElementsByName("itemBaseSmoothie");
const optMilkshakeBase = document.getElementsByName("itemBaseMilkshake");
const optMilkshakeExtra = document.getElementsByName("milkshakeExtraItem");
// ----
const fieldsetDrinkSize = document.getElementById("bevSize");
const fieldsetDrinkType = document.getElementById("drinkType");
const fieldsetSmoothieBase = document.getElementById("smoothieBase");
const fieldsetMilkshakeBase = document.getElementById("milkshakeBase");
const fieldsetMilkshakeBaseExtra = document.getElementById("milkshakeExtra");
const fieldsetCurrentOrder = document.getElementById("displayOrder");
const fieldsetTotalPrice = document.getElementById("displayOrderPrice");
// ----
const txtCost = document.getElementById("cost");
const txtOrderTotal = document.getElementById("orderTotal");
const txtFinalOrderPrice = document.getElementById("orderTotalCost");

let currentDrinkCost;
let bevSizeCost;
let milkshakeExtraCost;
let isDrinkChecked;
let isIngredientChecked;
let isOrderSubmitted;
let orderCost;
let orderItems = [];

fieldsetDrinkSize.addEventListener("change", checkSizeCost);
fieldsetDrinkType.addEventListener("change", drinkTypeChange);
// ----
optIngredients.forEach(item => item.addEventListener("change", getIngredientsTotal));
optMilkshakeExtra.forEach(item => item.addEventListener("change", checkMilkshakeExtra));
// ----
btnOrder.addEventListener("click", addToOrder);
btnPlaceOrder.addEventListener("click", placeOrder);
btnSaveFav.addEventListener("click", saveFavourite);
btnOrderFave.addEventListener("click", orderFavourite);
btnResetPage.addEventListener("click", initialiseStartup);

// on load
initialiseStartup();

// ---------------------------------------------------------

function initialiseStartup() {
    console.log("Startup initialised");
    setVariables();
    uncheckItems();
    hideExtras();
    console.log("Startup configured.");
}

// ---------------------------------------------------------

function setVariables() {
    orderItems = [];
    bevSizeCost = 3.20;
    milkshakeExtraCost = 0;
    isDrinkChecked = 0;
    isIngredientChecked = 0;
    isOrderSubmitted = 0
    enableOrderButton();
    currentDrinkCost = bevSizeCost;
    orderCost = 0;
    localStorage.clear()
    txtCost.innerText = `${"£" + currentDrinkCost.toFixed(2)}`;
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

function resetDrinkField() {
    bevSizeCost = 3.20;
    isIngredientChecked = 0;
    isDrinkChecked = 0;
    isIngredientChecked = 0;
    enableOrderButton();
    currentDrinkCost = bevSizeCost;
    milkshakeExtraCost = 0;
    txtCost.innerText = `${"£" + currentDrinkCost.toFixed(2)}`;
    uncheckItems();
    hideExtras();
}

function hideExtras() {
    fieldsetSmoothieBase.classList.add("hidden");
    fieldsetMilkshakeBase.classList.add("hidden");
    fieldsetMilkshakeBaseExtra.classList.add("hidden");
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
        fieldsetSmoothieBase.classList.remove("hidden");
        fieldsetMilkshakeBase.classList.add("hidden");
        fieldsetMilkshakeBaseExtra.classList.add("hidden");
        isDrinkChecked = 1
        enableOrderButton();

    } else if (document.getElementById("drinkType_milkshake").checked) { // checks if milkshake radio button is checked.
        console.log("Milkshake has been Selected, Displaying relevant fields.");
        fieldsetMilkshakeBase.classList.remove("hidden");
        fieldsetMilkshakeBaseExtra.classList.remove("hidden");
        fieldsetSmoothieBase.classList.add("hidden");
        isDrinkChecked = 1
        enableOrderButton();
    }
}

function checkSizeCost() {
 if (document.getElementById("sizeS").checked) {
     bevSizeCost = 2.70;
 } else if (document.getElementById("sizeM").checked) {
     bevSizeCost = 3.20;
 } else if (document.getElementById("sizeL").checked) {
     bevSizeCost = 3.70;
 } else {
     bevSizeCost = 4.50;
 }
    currentDrinkCost = bevSizeCost + milkshakeExtraCost;
 txtCost.innerText = `${"£" + currentDrinkCost.toFixed(2)}`;
}

// ---------------------------------------------------------

function checkMilkshakeExtra() {
    if (this.checked) {
        milkshakeExtraCost += 0.85;
    } else {
        milkshakeExtraCost -= 0.85;
    }
    currentDrinkCost = bevSizeCost + milkshakeExtraCost;
    txtCost.innerText = `${"£" + currentDrinkCost.toFixed(2)}`;
}

function addToOrder(){
    if (document.getElementById("drinkType_smoothie").checked) {
        isOrderSubmitted = 1
        getItemValue(optDrinkSize);
        getItemValue(optDrinkTypeList);
        getItemValue(optIngredients);
        getItemValue(optSmoothieBase);
        printOrder();
    } else if (document.getElementById("drinkType_milkshake").checked) {
        isOrderSubmitted = 1
        getItemValue(optDrinkSize);
        getItemValue(optDrinkTypeList);
        getItemValue(optIngredients);
        getItemValue(optMilkshakeBase);
        getItemValue(optMilkshakeExtra);
        printOrder();
    }
}

function printOrder() {
    orderItems.push("£" + currentDrinkCost.toFixed(2) + "\n");
    let strOrderItems = orderItems.join(" ");
    txtOrderTotal.innerText = `${strOrderItems}`;
    orderCost += currentDrinkCost;
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
            isIngredientChecked += 1;
            enableOrderButton();
        } else {
            isIngredientChecked -= 1;
            enableOrderButton();
        }
}

function enableOrderButton() {
    btnOrderFave.disabled = localStorage.length === 0;
    btnOrder.disabled = isDrinkChecked === 0 || isIngredientChecked === 0;
    btnSaveFav.disabled = (isDrinkChecked === 0 || isIngredientChecked === 0) && isOrderSubmitted === 0;
    btnPlaceOrder.disabled = isOrderSubmitted === 0
    if (btnOrder.disabled === false) {
        console.log("'Add to Order' Button has been enabled.")
        }

}

function placeOrder() {
    alert("Your order has been placed, your final cost is " + `${"£"+ orderCost.toFixed(2)}`);
    initialiseStartup();
}

// ---------------------------------------------------------

function saveFavourite() {
   localStorage.setItem("Drink Size", document.querySelector('input[name="sizeSelection"]:checked').value);
   localStorage.setItem("Drink Type", document.querySelector('input[name="drinkType"]:checked').value);
    let ingredients = document.querySelectorAll('input[name="ingredients"]:checked')

    for (let i = 0; i < ingredients.length; i++) {
        localStorage.setItem(`${'Ingredients' + i}`, ingredients[i].value)
    }
    if (document.getElementById("drinkType_smoothie").checked) {
        localStorage.setItem("Smoothie Base", document.querySelector('input[name="itemBaseSmoothie"]:checked').value)
    } else if (document.getElementById("drinkType_milkshake").checked) {
        localStorage.setItem("Milkshake Base", document.querySelector('input[name="itemBaseMilkshake"]:checked').value)
        let milkshakeExtra = document.querySelectorAll('input[name="milkshakeExtraItem"]:checked')
        for (let i = 0; i < milkshakeExtra.length; i++) {
            localStorage.setItem(`${'Milkshake Extras' + i}`, milkshakeExtra[i].value)
        }
    }
    localStorage.setItem("Cost", currentDrinkCost)
    enableOrderButton()
    console.log("Order has been Written to Local Storage.");
}
function orderFavourite() {
    console.log("Grabbing Order");
    // let customerOrder = []
    // for (let i = 0; i < localStorage.length; i++) {
    //     customerOrder.push(localStorage.getItem(i));
    // }

    console.log("Order Loaded");
}
