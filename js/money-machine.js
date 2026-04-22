function format(num){
  return Math.round(num).toLocaleString();
}

function daysToReachBalance(startBalance, targetBalance, dailyContribution){
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
    balance += dailyContribution;

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
  const weeklyInput = Number(document.getElementById("weekly").value);

  const dailyContribution = weeklyInput ? weeklyInput / 7 : 0;

  let output = "";
  let notices = "";

  function dailyInterest(balance){
    if (balance < 5000) return 0;
    return balance * dailyRate;
  }

  function balanceAfterDays(balance, days){
    for(let i = 0; i < days; i++){
      balance += dailyInterest(balance);
      balance += dailyContribution;

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
      notices += "<br><b>⚠ Maximum bank cap reached</b><br>";
      notices += "Limit: 4,250,000,000 coins.<br>";
    }
    else if(value >= WARNING_CAP){
      notices += "<br><b>⚠ Near max cap warning</b><br>";
      notices += "At 3.75B, you can’t receive player transfers.<br>";
    }
  }

  // 💰 Required balance for daily income
  if(dailyInput){
    const neededBalance = requiredBalanceForDaily(dailyInput);

    output += "<b>Required Balance for Daily Income</b><br>";
    output += "To earn " + format(dailyInput) + " coins daily, you need ~ ";
    output += format(neededBalance) + " coins.<br><br>";

    checkCaps(neededBalance);
  }

  // 🎯 Time to goal
  if(balanceInput && goalInput){

    const targetBalance = Math.min(goalInput, MAX_CAP);
    const result = daysToReachBalance(balanceInput, targetBalance, dailyContribution);

    const t = formatTime(result.days);

    output += "<br><b>Time to Reach Goal</b><br>";

    if(goalInput > MAX_CAP){
      output += "Goal exceeds max cap.<br>";
    }

    if(result.capped){
      output += "You will hit max cap before reaching goal.<br>";
    }

    output += `You willreach your goal in: ${t.years} years, ${t.months} months, ${t.weeks} weeks, ${t.days} days.<br>`;

    checkCaps(goalInput);
  }

  // 📈 Growth projection
  if(balanceInput && !dailyInput && !goalInput){

    const oneMonth = balanceAfterDays(balanceInput, 30);
    const oneYear = balanceAfterDays(balanceInput, 365);
    const fiveYears = balanceAfterDays(balanceInput, 365 * 5);

    output += "<br><b>Projected Growth</b><br>";

    output += "1 Month: " + format(oneMonth) + "<br>";
    output += "1 Year: " + format(oneYear) + "<br>";
    output += "5 Years: " + format(fiveYears) + "<br><br>";

    checkCaps(fiveYears);
  }

  if(!balanceInput && !dailyInput && !goalInput){
    output = "Enter a balance, goal, or daily income.";
  }

  document.getElementById("output").innerHTML = output + notices;
}
