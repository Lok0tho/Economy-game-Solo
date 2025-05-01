const countries = {
  USA: { money: 1200, oil: 70, tech: 60, food: 100, population: 330 },
  China: { money: 1100, oil: 60, tech: 55, food: 120, population: 1400 },
  Germany: { money: 1000, oil: 40, tech: 70, food: 90, population: 80 },
  India: { money: 900, oil: 30, tech: 40, food: 130, population: 1350 }
};

const events = [
  "Oil Crisis",
  "Tech Boom",
  "Recession",
  "Population Surge",
  "Crop Failure",
  "Foreign Investment"
];

let playerCountry = null;

function startGame(country) {
  playerCountry = JSON.parse(JSON.stringify(countries[country]));
  playerCountry.name = country;
  document.getElementById("start-screen").classList.add("hidden");
  document.getElementById("game-ui").classList.remove("hidden");
  document.getElementById("player-country").innerText = `You are leading ${country}`;
  updateStats();
  logEvent(`Welcome, Leader of ${country}! Your economic journey begins.`);
}

function updateStats() {
  const s = playerCountry;
  document.getElementById("stats").innerHTML = `
    <strong>Money:</strong> $${s.money}M<br>
    <strong>Oil:</strong> ${s.oil} units<br>
    <strong>Tech:</strong> ${s.tech} pts<br>
    <strong>Food:</strong> ${s.food} units<br>
    <strong>Population:</strong> ${s.population}M
  `;
}

function trade() {
  if (playerCountry.oil >= 5) {
    playerCountry.oil -= 5;
    playerCountry.money += 200;
    logEvent("You traded oil for $200M.");
  } else {
    logEvent("Not enough oil to trade.");
  }
  updateStats();
}

function invest() {
  if (playerCountry.money >= 300) {
    playerCountry.money -= 300;
    playerCountry.tech += 15;
    logEvent("You invested $300M into technology.");
  } else {
    logEvent("Insufficient funds to invest.");
  }
  updateStats();
}

function nextTurn() {
  const event = events[Math.floor(Math.random() * events.length)];
  switch (event) {
    case "Oil Crisis":
      playerCountry.money += playerCountry.oil * 4;
      logEvent("Oil prices spiked! You gained money based on oil reserves.");
      break;
    case "Tech Boom":
      playerCountry.money += playerCountry.tech * 2;
      logEvent("Global tech boom! You profited from your tech.");
      break;
    case "Recession":
      playerCountry.money = Math.max(0, playerCountry.money - 300);
      logEvent("A recession hit. You lost $300M.");
      break;
    case "Population Surge":
      playerCountry.population += 20;
      logEvent("Population increased by 20M.");
      break;
    case "Crop Failure":
      playerCountry.food = Math.max(0, playerCountry.food - 30);
      logEvent("Crop failure! You lost 30 food units.");
      break;
    case "Foreign Investment":
      playerCountry.money += 500;
      logEvent("You received $500M in foreign investments.");
      break;
  }
  updateStats();
}

function logEvent(message) {
  const logBox = document.getElementById("log");
  logBox.innerHTML += `<p>${message}</p>`;
  logBox.scrollTop = logBox.scrollHeight;
}
