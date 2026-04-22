function format(num){
  return Math.round(num).toLocaleString();
}

function daysToReachBalance(startBalance, targetBalance){
  const APY = 0.10;
  const DAYS = 365;
  const dailyRate = APY / DAYS;

  const MAX_CAP = 4250000000;

  function dailyInterest(balance){
    if (balance < 5000) return 0;
    return balance * dailyRate;
  }

  let balance = startBalance;
  let days = 0;

  while(balance < targetBalance && days < 100 * 365){
    balance += dailyInterest(balance);

    if(balance >= MAX_CAP){
      return { days, capped: true };
    }

    days++;
  }

  return { days, capped: false };
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

  const MAX_CAP = 4250000000;
  const WARNING_CAP = 3750000000;

  const balanceInput = Number(document.getElementById("balance").value);
  const dailyInput = Number(document.getElementById("daily").value);
  const goalInput = Number(document.getElementById("goal").value);

  let output = "";
  let notices = "";

  function dailyInterest(balance){
    if (balance < 5000) return 0;
    return balance * dailyRate;
  }

  function balanceAfterDays(balance, days){
    for(let i = 0; i < days; i++){
      balance += dailyInterest(balance);

      if(balance >= MAX_CAP){
        return MAX_CAP;
      }
    }
    return balance;
  }

  function requiredBalanceForDaily(daily){
    return daily / dailyRate;
  }

  function checkCaps(value){
    if(value >= MAX_CAP){
      notices += "<br><b>⚠ Your goal meets or exceeds the maximum</b><br>";
      notices += "An account cannot exceed 4,250,000,000 coins. Any extra coins may be lost.<br>";
    }
    else if(value >= WARNING_CAP){
      notices += "<br><b>⚠ Your goal is near the maximum</b><br>";
      notices += "At 3,750,000,000 coins, you will no longer be able to receive coins from other players.<br>";
    }
  }

  // 💰 Required balance for daily
  if(dailyInput){

    const neededBalance = requiredBalanceForDaily(dailyInput);

    output += "<b>Required Balance for Desired Daily Deposit</b><br>";
    output += "To earn " + format(dailyInput) + " coins daily, you need about ";
    output += format(neededBalance) + " coins in the bank.<br><br>";

    checkCaps(neededBalance);
  }

  // 🎯 Time to goal balance
  if(balanceInput && goalInput){

    const targetBalance = Math.min(goalInput, MAX_CAP);
    const result = daysToReachBalance(balanceInput, targetBalance);

    const t = formatTime(result.days);

    output += "<br><b>Time to Reach Goal Balance</b><br>";

    if(goalInput > MAX_CAP){
      output += "Your goal exceeds the maximum bank cap.<br>";
    }

    if(result.capped){
      output += "You will hit the maximum bank cap before reaching your goal.<br>";
    }

    output += "It will take ";
    output += t.years + " years, " + t.months + " months, ";
    output += t.weeks + " weeks, " + t.days + " days ";
    output += "to reach your goal balance.<br>";

    checkCaps(goalInput);
  }
  // 📈 Timeline projection (ONLY current balance provided)
  if (balanceInput && !dailyInput && !goalInput) {

    const oneMonth = balanceAfterDays(balanceInput, 30);
    const oneYear = balanceAfterDays(balanceInput, 365);
    const fiveYears = balanceAfterDays(balanceInput, 365 * 5);

    output += "<br><b>Bank balance growth, if left untouched....</b><br>";

    output += "After 1 month: " + format(oneMonth) + " coins<br>";
    output += "After 1 year: " + format(oneYear) + " coins<br>";
    output += "After 5 years: " + format(fiveYears) + " coins<br><br>";

    checkCaps(fiveYears);
  }
  
  if(!balanceInput && !dailyInput && !goalInput){
    output = "Enter a bank balance, a desired deposit, or a goal balance.";
  }

  document.getElementById("output").innerHTML = output + notices;
}
