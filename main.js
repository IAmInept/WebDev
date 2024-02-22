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
const optIngredients = document.getElementsByName("ingredient");
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
const fieldsetBevIngredients = document.getElementById("bevIngredients");
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
let isOrderPrinted;
let orderCost;
let strOrderItems;
let orderItems = [];
let ingredientArray = [];
let localStorageKeyArray = [];
let localStorageItems = [];
let localStorageCost
let localStorageSize

fieldsetDrinkSize.addEventListener("change", checkSizeCost);
fieldsetDrinkType.addEventListener("change", drinkTypeChange);
// ----
btnOrder.addEventListener("click", addToOrder);
btnPlaceOrder.addEventListener("click", placeOrder);
btnSaveFav.addEventListener("click", saveFavourite);
btnOrderFave.addEventListener("click", orderFavourite);
btnResetPage.addEventListener("click", initialiseStartup);
// ----
optMilkshakeExtra.forEach(item => item.addEventListener("change", checkMilkshakeExtra));
optIngredients.forEach(item => item.addEventListener("change", getIngredientsTotal));

// on load
initialiseStartup();

// ---------------------------------------------------------
function initialiseStartup() {
    console.log("Startup initialised");
    getData();
    setVariables();
    uncheckItems();
    hideExtras();
    console.log("Startup configured.");
}

function getData() {
    fetch("ingredients.json")
        .then(res => res.json())

        .then(data => processData(data));
}

function processData(data) {
    ingredientArray = data;

    let output = "<legend>Ingredients</legend>";

    for (let i in ingredientArray) {
        output += `<div> <input type="checkbox" name="${ingredientArray[i].name}" id="${ingredientArray[i].id}" value="${ingredientArray[i].value}"> <label for="${ingredientArray[i].id}">${ingredientArray[i].value}</label> </div>`;
    }
    fieldsetBevIngredients.innerHTML = output;
    optIngredients.forEach(item => item.addEventListener("change", getIngredientsTotal));
}

// ---------------------------------------------------------

function setVariables() {
    localStorage.clear();
    orderItems = [];
    localStorageItems = [];
    localStorageCost = [];
    localStorageSize = [];
    localStorageKeyArray = [];
    bevSizeCost = 3.20;
    milkshakeExtraCost = 0;
    isDrinkChecked = false;
    isIngredientChecked = 0;
    isOrderSubmitted = false;
    isOrderPrinted = false;
    localStorageCost = 0
    enableOrderButton();
    currentDrinkCost = bevSizeCost;
    orderCost = 0;
    localStorage.clear()
    txtCost.innerText = `${"£" + currentDrinkCost.toFixed(2)}`;
}

function uncheckItems() {
    document.getElementById("drinkType_milkshake").checked = false;
    document.getElementById("drinkType_smoothie").checked = false;

    for (let ingredient in optIngredients) {
        optIngredients[ingredient].checked = false;
    }

    for (let extra in optMilkshakeExtra) {
        optMilkshakeExtra[extra].checked = false;
    }

    document.getElementById("sizeM").checked = true;
    document.getElementById("smoothieBase_orangeJuice").checked = true;
    document.getElementById("milkshakeBase_skimmedMilk").checked = true;
}

function resetDrinkField() {
    bevSizeCost = 3.20;
    isIngredientChecked = 0;
    isDrinkChecked = false;
    currentDrinkCost = bevSizeCost;
    milkshakeExtraCost = 0;
    txtCost.innerText = `${"£" + currentDrinkCost.toFixed(2)}`;
    enableOrderButton();
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
    if (document.getElementById("drinkType_smoothie").checked) {
        fieldsetSmoothieBase.classList.remove("hidden");
        fieldsetMilkshakeBase.classList.add("hidden");
        fieldsetMilkshakeBaseExtra.classList.add("hidden");
        isDrinkChecked = true
        enableOrderButton();

    } else if (document.getElementById("drinkType_milkshake").checked) {
        fieldsetMilkshakeBase.classList.remove("hidden");
        fieldsetMilkshakeBaseExtra.classList.remove("hidden");
        fieldsetSmoothieBase.classList.add("hidden");
        isDrinkChecked = true
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
    isOrderSubmitted = true
    getItemValue(optDrinkSize);
    getItemValue(optDrinkTypeList);
    getItemValue(optIngredients);
    if (document.getElementById("drinkType_smoothie").checked) {
        getItemValue(optSmoothieBase);
    } else if (document.getElementById("drinkType_milkshake").checked) {
        getItemValue(optMilkshakeBase);
        getItemValue(optMilkshakeExtra);
    }
    printOrder();
}

function printOrder() {
    orderItems.push("£" + currentDrinkCost.toFixed(2) + "\n");
    strOrderItems = orderItems.join(", ");
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
    btnOrder.disabled = isDrinkChecked === false || isIngredientChecked === 0;
    btnSaveFav.disabled = isDrinkChecked === false || isIngredientChecked === 0;
    btnPlaceOrder.disabled = isOrderSubmitted === false;
    if (btnOrder.disabled === false) {
        }

}

function placeOrder() {
    alert("Your order has been placed, your final cost is " + `${"£"+ orderCost.toFixed(2)}`);
    initialiseStartup();
}

// ---------------------------------------------------------

function saveFavourite() {
    isOrderPrinted = false
    localStorage.clear();
   localStorage.setItem("Drink Size", document.querySelector('input[name="sizeSelection"]:checked').value);
   localStorage.setItem("Drink Type", document.querySelector('input[name="drinkType"]:checked').value);
    let localStorageIngredients = document.querySelectorAll('input[name="ingredient"]:checked')

    for (let items = 0; items < localStorageIngredients.length; items++) {
        localStorage.setItem(`${'Ingredients' + items}`, localStorageIngredients[items].value);
    }
    if (document.getElementById("drinkType_smoothie").checked) {
        localStorage.setItem("Smoothie Base", document.querySelector('input[name="itemBaseSmoothie"]:checked').value);
    } else if (document.getElementById("drinkType_milkshake").checked) {
        localStorage.setItem("Milkshake Base", document.querySelector('input[name="itemBaseMilkshake"]:checked').value);
        let milkshakeExtra = document.querySelectorAll('input[name="milkshakeExtraItem"]:checked');
        for (let i = 0; i < milkshakeExtra.length; i++) {
            localStorage.setItem(`${'Milkshake Extras' + i}`, milkshakeExtra[i].value);
        }
    }
    localStorage.setItem("Cost", currentDrinkCost);
    enableOrderButton();
}
function orderFavourite() {
    isOrderSubmitted = true;
    enableOrderButton();
    localStorageKeyArray = [];
    if (isOrderPrinted === false) {
        localStorageCost = parseFloat(localStorage.getItem("Cost"));
        localStorage.removeItem("Cost");
        localStorageSize = localStorage.getItem("Drink Size");
        localStorageItems.push(localStorageSize);
        localStorage.removeItem("Drink Size");
        for (let i = 0; i < localStorage.length; i++) {
            localStorageKeyArray.push(localStorage.key(i));
            localStorageItems.push(localStorage.getItem(localStorageKeyArray[i]));
        }
        localStorageItems.push("£" + parseFloat(localStorageCost).toFixed(2))
        // localStorageItems[localStorageItems.length - 1] = " £" + parseFloat(localStorageItems[localStorageItems.length - 1]).toFixed(2);
        isOrderPrinted = true;
    }
    orderItems.push(localStorageItems.join(", ") + "\n");
    unhideOrder();
    strOrderItems = orderItems.join();
    txtOrderTotal.innerText = `${strOrderItems}`;
    orderCost += localStorageCost
    txtFinalOrderPrice.innerText = `${"£"+ orderCost.toFixed(2)}`;
}