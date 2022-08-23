async function dinoData() {
    const Dinos = await fetch("./dino.json");
    const data = await Dinos.json();
    return data.Dinos;
}        
// Create Dino Constructor
class Dinosaur{
    constructor(species, name, weight, height, diet, where, when, fact){
        this.species = species;
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }
}
Dinosaur.prototype.randomFact = function() {
    return this.fact[Math.floor(Math.random() * this.fact.length)];
};
class Human extends Dinosaur{
    constructor(species, name, weight, height, diet) {
        super(species,name, weight, height, diet);
        this.name = name;
    }
}
// Create Dino Objects
document.getElementById("btn").addEventListener("click", () => {

    document.getElementById("dino-compare").style.display = "none";
    const grid = document.getElementById("grid");

    dinoData().then(dinoArray => {
        let dinosaurs = dinoArray.map(dino => new Dinosaur(dino.species, dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact));
        //get humanData
        const humanName = document.getElementById("name").value;
        const humanWeight = document.getElementById("weight").value;
        const humanHeight = parseInt(document.getElementById("feet").value) * 12 + parseInt(document.getElementById("inches").value);
        const humanDiet = document.getElementById("diet").value;
        const myHuman = new Human("human", humanName, humanWeight, humanHeight, humanDiet);
        //centering humanObject
        dinosaurs.splice(4,0, myHuman);
        console.log(dinosaurs)

        for (let i = 0; i<dinosaurs.length; i++){
            const gridTile = document.createElement("div");
            const gridTileHeader = document.createElement("h3");
            const gridTileText = document.createElement("p");
            const gridTileImg = document.createElement("img");
            
            //defining the output of each gritTile Item
            gridTileHeader.innerHTML = dinosaurs[i].name;
            gridTileText.innerHTML = dinosaurs[i].fact;
            gridTileImg.setAttribute("src", `./images/${dinosaurs[i].species}.png`);
            gridTile.classList.add("grid-item");
            //adding the gridTile to the grid
            gridTile.append(gridTileHeader);
            gridTile.append(gridTileImg);
            gridTile.append(gridTileText);
            grid.append(gridTile);

            //COMPARE METHODS
            const dinosaurObject = dinosaurs[i]
            //Compare weight
            const weightComparison = () => {
                if (humanWeight> dinosaurObject.weight){
                    return `${humanName} is ${humanWeight - dinosaurObject.weight} lbs heavier than ${dinosaurObject.species}`;
                } else {
                    return `${dinosaurObject.species} are ${dinosaurObject.weight - humanWeight} lbs heavier than ${humanName}`;
                };
            };
            //Compare height
            const heightComparison = () => {
                if (humanHeight > dinosaurObject.height){
                    return `${humanName} is ${humanHeight- dinosaurObject.height} inches taller than ${dinosaurObject.species}`;
                } else {
                    return `${dinosaurObject.species} are ${dinosaurObject.height - humanHeight} inches taller than ${humanName}`;
                };
            };
            //compare diet
            const dietComparison = () => {
                if ((humanDiet === "Carnivor" && dinosaurObject.diet === "carnivor") || (humanDiet === "Herbavor" && dinosaurObject === "herbavor")){
                return `${humanName} and ${dinosaurObject.species} share the same diet`;
                } else {
                    return `${humanName} and ${dinosaurObject.species} diet doesn't match`;
                };
            };
            //set randomFacts as description
            if (typeof dinosaurs[i].fact ==! "string") {
                gridTileText.innerHTML ="";
            } else if (i===4){ //remove human Fact
                gridTileText.innerHTML ="";
            } else if (i===8){
                gridTileText.innerHTML =dinosaurs[8].fact;
            }else { 
                dinosaurs[i].fact= [weightComparison(), dietComparison(), heightComparison()];
                gridTileText.innerHTML = dinosaurs[i].randomFact();
            };
        };
    });
});