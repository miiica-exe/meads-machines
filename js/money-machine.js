
function format(num){
  return Math.round(num).toLocaleString();
}

function calculate() {

  const APY = 0.10;
  const DAYS = 365;
  const dailyRate = APY / DAYS;

  const balanceInput = Number(document.getElementById("balance").value);
  const dailyInput = Number(document.getElementById("daily").value);

  let output = "";

  function dailyInterest(balance){
    if (balance < 5000) return 0;
    return balance * dailyRate;
  }

  function balanceAfterDays(balance, days){
    for(let i = 0; i < days; i++){
      balance += dailyInterest(balance);
    }
    return balance;
  }

  function requiredBalanceForDaily(daily){
    return daily / dailyRate;
  }

  if(balanceInput){

    const currentDaily = dailyInterest(balanceInput);

    const weekBal = balanceAfterDays(balanceInput, 7);
    const monthBal = balanceAfterDays(balanceInput, 30);
    const yearBal = balanceAfterDays(balanceInput, 365);
    const fiveYearBal = balanceAfterDays(balanceInput, 365*5);

    output += "<b>From Current Bank Balance</b><br>";
    output += "Daily deposit now: " + format(currentDaily) + " coins<br><br>";

    output += "If untouched:<br>";
    output += "1 week daily deposit: " + format(dailyInterest(weekBal)) + " coins<br>";
    output += "1 month daily deposit: " + format(dailyInterest(monthBal)) + " coins<br>";
    output += "1 year daily deposit: " + format(dailyInterest(yearBal)) + " coins<br>";
    output += "5 years daily deposit: " + format(dailyInterest(fiveYearBal)) + " coins<br><br>";

  }

  if(dailyInput){

    const neededBalance = requiredBalanceForDaily(dailyInput);

    output += "<b>Required Balance for Desired Daily Deposit</b><br>";
    output += "To earn " + format(dailyInput) + " coins daily, you need about ";
    output += format(neededBalance) + " coins in the bank.<br>";

  }

  if(!balanceInput && !dailyInput){
    output = "Enter a bank balance, a desired daily deposit, or both.";
  }

  document.getElementById("output").innerHTML = output;

}

