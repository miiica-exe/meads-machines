
function parseLitter(input) {

  if (input.includes("-")) {
    let parts = input.split("-");
    let min = parseFloat(parts[0]);
    let max = parseFloat(parts[1]);
    return (min + max) / 2;
  }

  return parseFloat(input);
}

function getChance(motherEth, fatherEth) {

  if (motherEth && fatherEth) return 2550;
  if (motherEth) return 2750;
  if (fatherEth) return 2800;

  return 3000;
}

function formatNumber(num) {
  return Math.round(num).toLocaleString();
}

function calculate() {

  let litterInput = document.getElementById("litterInput").value;
  let motherEth = document.getElementById("motherEth").checked;
  let fatherEth = document.getElementById("fatherEth").checked;

  let litterSize = parseLitter(litterInput);
  let chance = getChance(motherEth, fatherEth);

  let pairsNeeded = chance / litterSize;
  let stonesNeeded = Math.ceil(pairsNeeded);
  let coinCost = stonesNeeded * 15000;

  document.getElementById("pairs").innerText =
    "Pairs Needed: " + formatNumber(pairsNeeded);

  document.getElementById("stones").innerText =
    "Minty Stones Needed: " + formatNumber(stonesNeeded);

  document.getElementById("cost").innerText =
    "Coin Cost: " + formatNumber(coinCost);
}
