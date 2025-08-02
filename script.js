//reference all necessary HTML elements
const input = document.getElementById("search-input");
const search = document.getElementById("search-button");
const monsterName = document.getElementById("creature-name");
const monsterId = document.getElementById("creature-id");
const monsterWeight = document.getElementById("weight");
const monsterHeight = document.getElementById("height");
const monsterType = document.getElementById("types");
const monsterAbility = document.getElementById("abilities");
const monsterAbilityDescription = document.getElementById("ability-description");
const monsterHp = document.getElementById("hp");
const monsterAttack = document.getElementById("attack");
const monsterDefense = document.getElementById("defense");
const monsterSpecialAttack = document.getElementById("special-attack");
const monsterSpecialDefense = document.getElementById("special-defense");
const monsterSpeed = document.getElementById("speed");

//async function to,
  //wrap API call in try block that gets rid of extra spaces in front and end of input,
  //creates variable for API endpoint with url ending based on the input value,
  //issues GET call to that specific url endpoint with certain monster data,
  //await used to pause execution until response object is returned and stored,
  //stores parsed version of response as data to be referred to within main display function call,
  //with catch block identifying any errors and alerting them to user while clearing UI
const getMonsterData = async () => {
  try {
    const searchInput = input.value.trim();
    const url = (`https://rpg-creature-api.freecodecamp.rocks/api/creature/${searchInput}`)
    const res = await fetch(url);
    const data = await res.json();
    displayMonster(data);
  } catch (err) {
    monsterAbility.innerText = "Unable to display stats";
    alert("Creature not found");
    clear();
  }
};

//function that takes in data as paremeter and 
  //destructures monster data for key values to be referred to when filling UI text
const displayMonster = (data) => {
  const {
  id,
  name,
  weight,
  height,
  special: {
    name: abilityName,
    description: abilityDescription
  },
  stats: [
    { base_stat: hp },
    { base_stat: attack },
    { base_stat: defense },
    { base_stat: specialAttack },
    { base_stat: specialDefense },
    { base_stat: speed }
    ]
  } = data;

  //fill in each element of UI with text using temperate literals to call back to data 
  monsterName.innerText = `${name.toUpperCase(0)}`;
  monsterId.innerText = `#${id}`;
  monsterWeight.innerText = `Weight: ${weight}`;
  monsterHeight.innerText = `Height: ${height}`;
  monsterAbility.innerText = `${abilityName}`;
  monsterAbilityDescription.innerText = `${abilityDescription}`;
  monsterHp.innerText = `${hp}`;
  monsterAttack.innerText = `${attack}`;
  monsterDefense.innerText = `${defense}`;
  monsterSpecialAttack.innerText = `${specialAttack}`;
  monsterSpecialDefense.innerText = `${specialDefense}`;
  monsterSpeed.innerText = `${speed}`;

  //store typeNames variable that refers to types array in monster data and
    //calls map on it to create new array to run function against each element,
    //pulling out the values to display in all caps within the UI when necessary
  const typeNames = data.types.map(t => t.name.toUpperCase());
  
  //displays the type(s) of the monster in UI by applying map to capital types array to create
    //another array which holds type name(s) tied to the user input with a space added in between
  monsterType.innerHTML = typeNames
    .map(name => `<span id="type-name">${name}</span>`)
    .join(" ");
}

//function to clear text from any necessary UI elements
const clear = () => {
  input.value = "";
  monsterName.innerText = "";
  monsterId.innerText = "";
  monsterWeight.innerText = "";
  monsterHeight.innerText = "";
  monsterType.innerHTML = "";
  monsterAbility.innerText = "";
  monsterAbilityDescription.innerText = "";
  monsterHp.innerText = "";
  monsterAttack.innerText = "";
  monsterDefense.innerText = "";
  monsterSpecialAttack.innerText = "";
  monsterSpecialDefense.innerText = "";
  monsterSpeed.innerText = "";
}

//listener that runs main function whenever search button is clicked
search.addEventListener("click", getMonsterData);