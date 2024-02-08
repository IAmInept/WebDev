// Preliminary Check to ensure Javascript file loads on startup.
console.log("main.js has loaded successful");

// Defining Constant functions tied to Document ID's
const drinkSize = document.getElementById("bevSize");
const smoothieBase = document.getElementById("smoothieBase");
const milkshakeBase = document.getElementById("milkshakeBase");
const milkshakeBaseExtra = document.getElementById("milkshakeExtra");
const drinkType = document.getElementById("drinkType");
const resetPage = document.getElementById("resetPage");
const saveFav = document.getElementById("saveFavourite");
const orderFave = document.getElementById("orderFavourite");
const milkshakeExtra = document.getElementsByName("milkshakeExtraItem");
const txtCost = document.getElementById("cost");

//establishing variable costs for cost processing and display.
let orderSize;
let orderCost;
let sizeCost;
let milkshakeExtraCost;

//Adding change event listener and calling function to check what is checked and apply appropriate feature.
drinkSize.addEventListener("change", checkSizeCost)
drinkType.addEventListener("change", drinkTypeChange)
resetPage.addEventListener("click", initialiseStartup)
saveFav.addEventListener("click", saveFavourite)
orderFave.addEventListener("click", orderFavourite)
milkshakeExtra.forEach(item => item.addEventListener("change", checkMilkshakeExtra))


//Calling start function
initialiseStartup()


// ---------------------------------------------------------

function initialiseStartup() {
    console.log("Startup initialised")
    setVariables()
    uncheckItems()
    hideExtras()
    console.log("Startup configured.")
}
function setVariables() {
    milkshakeExtraCost = 0;
    sizeCost = 3.20;
    orderCost = sizeCost + milkshakeExtraCost
    txtCost.innerText = `${"£" + orderCost.toFixed(2)}`
    //setting default drink and smoothieBase to checked
}
function uncheckItems() {
    //setting either drink type to unchecked
    document.getElementById("drinkType_milkshake").checked = false
    document.getElementById("drinkType_smoothie").checked = false
    //unchecking all ingredients
    document.getElementById("bevIngredients_banana").checked = false
    document.getElementById("bevIngredients_strawberry").checked = false
    document.getElementById("bevIngredients_cranberry").checked = false
    document.getElementById("bevIngredients_raspberry").checked = false
    document.getElementById("bevIngredients_chocolate").checked = false
    //unchecking all milkshake extras
    document.getElementById("milkshakeExtra_malt").checked = false
    document.getElementById("milkshakeExtra_marshmallows").checked = false
    document.getElementById("milkshakeExtra_whippedCream").checked = false
    document.getElementById("milkshakeExtra_flake").checked = false
    // setting default choices to checked.
    document.getElementById("sizeM").checked = true
    document.getElementById("smoothieBase_orangeJuice").checked = true
    document.getElementById("milkshakeBase_skimmedMilk").checked = true
}
function hideExtras() {
    //hiding additional fieldset that are not needed to be shown
    smoothieBase.classList.add("hidden");
    milkshakeBase.classList.add("hidden");
    milkshakeBaseExtra.classList.add("hidden");
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
     orderSize = "Small";
 } else if (document.getElementById("sizeM").checked) {
     sizeCost = 3.20;
     orderSize = "Medium";
 } else if (document.getElementById("sizeL").checked) {
     sizeCost = 3.70;
     orderSize = "Large";
 } else {
     sizeCost = 4.50;
     orderSize = "Extra Large";
 }
    orderCost = sizeCost + milkshakeExtraCost
 txtCost.innerText = `${"£" + orderCost.toFixed(2)}`
}

// ---------------------------------------------------------

function checkMilkshakeExtra() {
    if (this.value == "malt") {
        if (this.checked) {
            milkshakeExtraCost += 0.85;
        } else {
            milkshakeExtraCost -= 0.85;
        }
    } else if (this.value == "marshmallows") {
        if (this.checked) {
            milkshakeExtraCost += 0.85;
        } else {
            milkshakeExtraCost -= 0.85;
        }
    } else if (this.value == "whippedCream") {
        if (this.checked) {
            milkshakeExtraCost += 0.85;
        } else {
            milkshakeExtraCost -= 0.85;
        }
    } else if (this.value == "flake") {
        if (this.checked) {
            milkshakeExtraCost += 0.85;
        } else {
            milkshakeExtraCost -= 0.85;
        }
    }
    orderCost = sizeCost + milkshakeExtraCost
    txtCost.innerText = `${"£" + orderCost.toFixed(2)}`
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
