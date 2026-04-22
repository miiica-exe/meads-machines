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
      notices += "<br><b>⚠ Maximum Cap Reached</b><br>";
      notices += "An account cannot exceed 4,250,000,000 coins. Any extra coins may be lost.<br>";
    }
    else if(value >= WARNING_CAP){
      notices += "<br><b>⚠ Warning Threshold Reached</b><br>";
      notices += "At 3,750,000,000 coins, you will no longer be able to receive coins from other players.<br>";
    }
  }

  // =========================
  // BASE PROJECTIONS
  // =========================
  if(balanceInput){

    const monthBal = balanceAfterDays(balanceInput, 30);
    const yearBal = balanceAfterDays(balanceInput, 365);
    const fiveYearBal = balanceAfterDays(balanceInput, 365 * 5);

    output += "<b>Future projections from current bank balance:</b><br>";
    output += "<table border='1' cellpadding='5' cellspacing='0'>";

    output += "<tr>";
    output += "<th>Timeframe</th>";
    output += "<th>in 1 Month</th>";
    output += "<th>in 1 Year</th>";
    output += "<th>in 5 Years</th>";

    const hasGoal = !!goalInput || !!dailyInput;
    if (hasGoal) output += "<th>Goal</th>";

    output += "</tr>";

    // -------------------------
    // BASE ROW
    // -------------------------
    output += "<tr><td>Daily Deposit</td>";

    output += "<td>" + format(dailyInterest(monthBal)) + "</td>";
    output += "<td>" + format(dailyInterest(yearBal)) + "</td>";
    output += "<td>" + format(dailyInterest(fiveYearBal)) + "</td>";

    // -------------------------
    // GOAL COLUMN LOGIC
    // -------------------------
    if (hasGoal) {

      const effectiveGoal = goalInput > 0
        ? goalInput
        : requiredBalanceForDaily(dailyInput);

      const goalMonth = balanceAfterDays(effectiveGoal, 30);
      const goalYear = balanceAfterDays(effectiveGoal, 365);
      const goalFive = balanceAfterDays(effectiveGoal, 365 * 5);

      const goalDaily = dailyInterest(effectiveGoal);

      output += "<td>";
      output += "Start: " + format(effectiveGoal) + "<br>";
      output += "Daily: " + format(goalDaily) + "<br>";
      output += "1M: " + format(goalMonth) + "<br>";
      output += "1Y: " + format(goalYear) + "<br>";
      output += "5Y: " + format(goalFive);
      output += "</td>";

      checkCaps(effectiveGoal);
    }

    output += "</tr>";
    output += "</table><br>";

    checkCaps(monthBal);
    checkCaps(yearBal);
    checkCaps(fiveYearBal);
  }

  // =========================
  // DAILY REQUIREMENT ONLY
  // =========================
  if(dailyInput && !goalInput){

    const neededBalance = requiredBalanceForDaily(dailyInput);

    output += "<b>Required Balance for Desired Daily Deposit</b><br>";
    output += "To earn " + format(dailyInput) + " coins daily, you need about ";
    output += format(neededBalance) + " coins in the bank.<br><br>";

    checkCaps(neededBalance);
  }

  // =========================
  // TIME TO GOAL
  // =========================
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

  if(!balanceInput && !dailyInput && !goalInput){
    output = "Enter a bank balance, a desired deposit, or a goal balance.";
  }

  document.getElementById("output").innerHTML = output + notices;
}

