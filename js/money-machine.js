function format(num){
  return Math.round(num).toLocaleString();
}
function daysToReachBalance(startBalance, targetBalance){
  const APY = 0.10;
  const DAYS = 365;
  const dailyRate = APY / DAYS;

  function dailyInterest(balance){
    if (balance < 5000) return 0;
    return balance * dailyRate;
  }

  let balance = startBalance;
  let days = 0;

  // Prevent infinite loops if unreachable
  while(balance < targetBalance && days < 100 * 365){
    balance += dailyInterest(balance);
    days++;
  }

  return days;
}

function formatTime(days){
  const years = Math.floor(days / 365);
  days %= 365;

  const months = Math.floor(days / 30);
  days %= 30;

  const weeks = Math.floor(days / 7);
  days %= 7;

  return { years, months, weeks, days };
}

function calculate() {
  const APY = 0.10;
  const DAYS = 365;
  const dailyRate = APY / DAYS;

  const balanceInput = Number(document.getElementById("balance").value);
  const dailyInput = Number(document.getElementById("daily").value);
  const yearlyInput = Number(document.getElementById("yearly").value);

  console.log(balanceInput, dailyInput, yearlyInput);
  
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
  
  function requiredBalanceForYearly(yearly){
    return yearly / APY;
  }

  if(balanceInput){

    const currentDaily = dailyInterest(balanceInput);

    const weekBal = balanceAfterDays(balanceInput, 7);
    const monthBal = balanceAfterDays(balanceInput, 30);
    const yearBal = balanceAfterDays(balanceInput, 365);
    const fiveYearBal = balanceAfterDays(balanceInput, 365*5);

    // Table for future daily deposit and balance
    output += "<b>Future projections from current bank balance:</b><br>";
    output += "<table border='1' cellpadding='5' cellspacing='0'>";
    output += "<tr><th>Timeframe</th><th>1 Week</th><th>1 Month</th><th>1 Year</th><th>5 Years</th></tr>";

    // Row for daily deposit
    output += "<tr><td>Daily Deposit</td>";
    output += "<td>" + format(dailyInterest(weekBal)) + "</td>";
    output += "<td>" + format(dailyInterest(monthBal)) + "</td>";
    output += "<td>" + format(dailyInterest(yearBal)) + "</td>";
    output += "<td>" + format(dailyInterest(fiveYearBal)) + "</td>";
    output += "</tr>";

    // Row for bank balance
    output += "<tr><td>Bank Balance</td>";
    output += "<td>" + format(weekBal) + "</td>";
    output += "<td>" + format(monthBal) + "</td>";
    output += "<td>" + format(yearBal) + "</td>";
    output += "<td>" + format(fiveYearBal) + "</td>";
    output += "</tr>";

    output += "</table><br>";
  }

  if(dailyInput){

    const neededBalance = requiredBalanceForDaily(dailyInput);

    output += "<b>Required Balance for Desired Daily Deposit</b><br>";
    output += "To earn " + format(dailyInput) + " coins daily, you need about ";
    output += format(neededBalance) + " coins in the bank.<br><br>";

  }

  if(yearlyInput){

  const neededBalanceYearly = requiredBalanceForYearly(yearlyInput);

  output += "<b>Required Balance for Desired Yearly Deposit</b><br>";
  output += "To earn " + format(yearlyInput) + " coins per year, you need about ";
  output += format(neededBalanceYearly) + " coins in the bank.<br>";

}
  if(!balanceInput && !dailyInput && !yearlyInput){
    output = "Enter a bank balance, a desired deposit, or both.";
  }

    // TIME TO GOAL)
if(balanceInput && dailyInput){

  const targetBalance = requiredBalanceForDaily(dailyInput);
  const daysNeeded = daysToReachBalance(balanceInput, targetBalance);
  const t = formatTime(daysNeeded);

  output += "<br><b>Time to Reach Daily Deposit Goal</b><br>";
  output += "If left untouched, it will take ";
  output += t.years + " years, " + t.months + " months, ";
  output += t.weeks + " weeks, " + t.days + " days ";
  output += "to reach your daily deposit goal.<br>";
}

if(balanceInput && yearlyInput){

  const targetBalance = requiredBalanceForYearly(yearlyInput);
  const daysNeeded = daysToReachBalance(balanceInput, targetBalance);

  const years = Math.floor(daysNeeded / 365);
  const remainingDays = daysNeeded % 365;

  // months with decimals (optional as requested)
  const monthsDecimal = Math.round((remainingDays / 30) * 10) / 10;

  output += "<br><b>Time to Reach Yearly Deposit Goal</b><br>";
  output += "If left untouched, it will take approximately ";
  output += years + " years, " + monthsDecimal + " months ";
  output += "to reach your yearly deposit goal.<br>";
}

  document.getElementById("output").innerHTML = output;

}

