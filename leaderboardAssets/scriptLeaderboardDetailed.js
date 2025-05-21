const homeLink = "/home";
const roundPredictorLink = "/round-predictor";
const leaderboardLink = "/leaderboard";



document.getElementById("homeBtn").addEventListener("click", function() {
    window.location.href = homeLink;
});

document.getElementById("roundBtn").addEventListener("click", function() {
    window.location.href = roundPredictorLink;
});

document.getElementById("leaderBtn").addEventListener("click", function() {
    window.location.href = leaderboardLink;
});

var borderColours = ["#d4af37", "#c4c4c4", "#ce8946"];


maps = [
    "Any",
    "Alpine Run", 
    "Candy Falls", 
    "Carved", 
    "Cubism", 
    "End Of The Road", 
    "Four Circles", 
    "Frozen Over", 
    "Hedge", 
    "In The Loop", 
    "Logs", 
    "Lotus Island", 
    "Middle Of The Road", 
    "Monkey Meadow", 
    "One Two Tree", 
    "Park Path", 
    "Resort", 
    "Scrapyard", 
    "Skates", 
    "Spa Pits", 
    "Tar Pits",
    "The Cabin", 
    "Tinkerton", 
    "Tower Center", 
    "Tree Stump", 
    "Winter Park", 


    "Adora's Temple", 
    "Balance", 
    "Bazaar", 
    "Bloonarius Prime", 
    "Chutes", 
    "Covered Garden", 
    "Cracked", 
    "Downstream", 
    "Encrypted", 
    "Firing Range", 
    "Haunted", 
    "KartsNDarts", 
    "Luminous Cove", 
    "Moon Landing", 
    "Polyphemus", 
    "Protect The Yacht", 
    "Quarry", 
    "Quiet Street", 
    "Rake", 
    "Spice Islands", 
    "Spring Spring", 
    "Streambed", 
    "Sulfur Springs", 
    "Water Park", 


    "Ancient Portal", 
    "Another Brick", 
    "Cargo", 
    "Castle Revenge", 
    "Cornfield", 
    "Dark Path",
    "Enchanted Glade", 
    "Erosion", 
    "Geared", 
    "High Finance", 
    "Last Resort", 
    "Mesa", 
    "Midnight Mansion", 
    "Off The Coast", 
    "Pat's Pond", 
    "Peninsula", 
    "Spillway", 
    "Sunker Columns", 
    "Underground", 
    "X-Factor", 


    "#OUCH", 
    "Blons", 
    "Bloody Puddles", 
    "Dark Castle", 
    "Dark Dungeons", 
    "Flooded Valley", 
    "Glacial Trail", 
    "Infernal", 
    "Muddy Puddles", 
    "Quad", 
    "Ravine", 
    "Sanctuary", 
    "Workshop"
]

var gamemodes = [
    "Any",
    "Easy Standard", 
    "Primary Only", 
    "Deflation", 

    "Medium Standard", 
    "Military Only", 
    "Apopalypse", 
    "Reverse", 

    "Hard Standard", 
    "Magic Monkeys Only", 
    "Double HP MOABs", 
    "Half Cash", 
    "Alternate Bloons Rounds", 
    "Impoppable", 
    "CHIMPS"
]


const urlParams = new URLSearchParams(window.location.search);

var defaultMap = "Any";
if (urlParams.has("map")) {
    defaultMap = urlParams.get("map");
}
var defaultGamemode = "Any";
if (urlParams.has("gamemode")) {
    defaultGamemode = urlParams.get("gamemode");
}
var defaultRound = "0";
if (urlParams.has("minRound")) {
    defaultRound = urlParams.get("minRound");
}
var minRound = document.getElementById('minRound');
minRound.value = defaultRound;
var defaultHero = ["Any"];
if (urlParams.has("hero")) {
    defaultHero = urlParams.getAll("hero");
}


var defaultExtras = urlParams.getAll("extras");
var defaultAnyExtras = ["Coop", "Uses Bugs", "QOL Mods"]
console.log(defaultExtras);


const checkboxes = document.querySelectorAll('input');

checkboxes.forEach((checkbox) => {
    if (checkbox.type == "checkbox" & checkbox.name != "optionsExtras") {
        checkbox.checked = defaultHero.includes(checkbox.value);
    }

    else if (checkbox.type == "checkbox") {
        if (defaultExtras.length === 0){
            checkbox.checked = defaultAnyExtras.includes(checkbox.value);
        }
        else {
            checkbox.checked = defaultExtras.includes(checkbox.value);
        }
    }
});





const mapSelect = document.getElementById('mapSelect');
mapSelect.innerHTML = ''; // Clear existing options



for (const mapName in maps) {
    const option = document.createElement('option');
    option.value = maps[mapName]; // Use map name as the value
    option.textContent = maps[mapName]; // Display map name
    if (maps[mapName] == defaultMap) {
        option.selected="selected";
    }
    mapSelect.appendChild(option);
}

const gamemodeSelect = document.getElementById('gamemodeSelect');
gamemodeSelect.innerHTML = ''; // Clear existing options

for (const gamemode in gamemodes) {
    const option = document.createElement('option');
    option.value = gamemodes[gamemode]; // Use map name as the value
    option.textContent = gamemodes[gamemode]; // Display map name
    if (gamemodes[gamemode] == defaultGamemode) {
        option.selected="selected";
    }
    gamemodeSelect.appendChild(option);
}

function handleResize() {
    console.log(window.innerWidth);
    var container = document.getElementById("leaderboard");
    var filter = document.getElementById('filter');
    var leaderboardTrue = document.getElementById('leaderboardContainer')
    if (window.innerWidth < 1200) {
        container.style.flexWrap = "wrap";
        filter.style.width = "100%";
        leaderboardTrue.style.width = "100%";
    }
    else {
        container.style.flexWrap = "nowrap";
        filter.style.width = "20%";
        leaderboardTrue.style.width = "80%";
    }
    console.log(container.style.position);

}

handleResize()

addEventListener("resize", (event) => handleResize());

function updateURLWithSelections() {
    const newUrlParams = new URLSearchParams(); // Start with a fresh params object

    // 1. Single-value parameters (Map, Gamemode, MinRound)
    const mapSelectValue = document.getElementById('mapSelect').value;
    // Only add param if not "Any" (or your default unselected value)
    if (mapSelectValue && mapSelectValue !== "Any") {
        newUrlParams.set("map", mapSelectValue);
    }

    const gamemodeSelectValue = document.getElementById('gamemodeSelect').value;
    if (gamemodeSelectValue && gamemodeSelectValue !== "Any") {
        newUrlParams.set("gamemode", gamemodeSelectValue);
    }

    const minRoundValue = document.getElementById('minRound').value;
    // Only add param if not "0" (or your default unselected value)
    if (minRoundValue && minRoundValue !== "0") {
        newUrlParams.set("minRound", minRoundValue);
    }

    // 2. Multi-value parameters (Heroes)
    // Assuming hero checkboxes have name="heroOption"
    const selectedHeroCheckboxes = document.querySelectorAll('input[type="checkbox"][name="options"]:checked');
    console.log(selectedHeroCheckboxes)
    if (selectedHeroCheckboxes.length > 0) {
        selectedHeroCheckboxes.forEach(checkbox => {
            // If you have an "Any Hero" checkbox that, when checked, means no specific filter,
            // you might add logic here to skip appending if "Any Hero" is checked,
            // or append a special value like "Any".
            // For now, appending all checked specific heroes:
            newUrlParams.append("hero", checkbox.value);
        });
    }
    // If selectedHeroCheckboxes.length is 0, no 'hero' param will be added, implying "Any" or no filter.

    // 3. Multi-value parameters (Extras)
    // Assuming extras checkboxes have name="optionsExtras"
    const selectedExtraCheckboxes = document.querySelectorAll('input[type="checkbox"][name="optionsExtras"]:checked');
    const currentSelectedExtrasValues = [];
    selectedExtraCheckboxes.forEach(checkbox => {
        currentSelectedExtrasValues.push(checkbox.value);
    });

    const defaultAnyExtrasSet = ["Coop", "Uses Bugs", "QOL Mods"];
    // To determine if the current selection is the "default Any set"
    const sortedCurrentExtras = [...currentSelectedExtrasValues].sort();
    const sortedDefaultAnyExtras = [...defaultAnyExtrasSet].sort();

    const isDefaultAnySetSelected = sortedCurrentExtras.length === sortedDefaultAnyExtras.length &&
                                   sortedCurrentExtras.every((val, index) => val === sortedDefaultAnyExtras[index]);

    if (currentSelectedExtrasValues.length > 0 && !isDefaultAnySetSelected) {
        // If some extras are selected AND it's not the default "Any" set, add them to URL
        currentSelectedExtrasValues.forEach(extraValue => {
            newUrlParams.append("extras", extraValue);
        });
    }
    // If no extras are selected, or if the selection matches the default "Any" set,
    // no 'extras' param will be added. This makes an empty 'extras' param list in the URL
    // signify the "Any" (default) state for extras.

    // 4. Update the browser's URL
    const newQueryString = newUrlParams.toString();
    const newUrl = `${window.location.pathname}${newQueryString ? '?' + newQueryString : ''}`; // Add '?' only if there are params

    // Update URL without reloading page
    window.history.pushState({ path: newUrl }, '', newUrl);

    console.log("Browser URL updated to: " + window.location.href);
    console.log("Current search parameters: " + newQueryString);
}

var sortButton = document.getElementById("sortButton");
console.log(sortButton);
sortButton.addEventListener('click', function(){

    // const urlParams = new URLSearchParams(window.location.search);

    // const mapSelect = document.getElementById('mapSelect').value;
    // urlParams.set("map", mapSelect);

    // const gamemodeSelect = document.getElementById('gamemodeSelect').value;
    // urlParams.set("gamemode", gamemodeSelect);

    // const minRound = document.getElementById('minRound').value;
    // urlParams.set("minRound", minRound);

    // const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    // window.history.pushState({ path: newUrl }, '', newUrl);

    updateURLWithSelections()



    console.log("here");
    doLeaderboards();
});




function addRunToHtml(run, htmlDiv, runNumber, totalNumber) {
    var runDiv = document.createElement("div");
    runDiv.className = "playerRun";
    var left = document.createElement("div");
    left.className = "side";
    var left2 = document.createElement("div");
    left2.className = "side";
    var middle = document.createElement("div");
    middle.className = "side";
    var middle2 = document.createElement("div");
    middle2.className = "side";
    var right = document.createElement("div");
    right.className = "side";
    var right2 = document.createElement("div");
    right2.className = "side";

    var placement = document.createElement("p");
    placement.className = "runText";
    placement.textContent = "#" + (runNumber+1).toString();

    var runner = document.createElement("p");
    runner.className = "runText";
    runner.textContent = run.runner.toString();

    left.appendChild(placement);
    left2.appendChild(runner);

    var round = document.createElement("p");
    round.className = "runText";
    round.textContent = run.round.toString();

    var map = document.createElement("p");
    map.className = "runText";
    map.textContent = run.map.toString();

    middle.appendChild(round);
    middle2.appendChild(map);

    var gamemode = document.createElement("p");
    gamemode.className = "runText";
    gamemode.textContent = run.gamemode.toString();

    

    var hero = document.createElement("p");
    hero.className = "runText";
    hero.textContent = run.hero.toString();

    right.appendChild(gamemode);
    if (run.usesBugs == 1 & run.gamemode.toString() == "CHIMPS") {
        var templeBugDiv = document.createElement("div");
        templeBugDiv.className = "templeBugDiv";
        var templeBugIcon = document.createElement("img");
        templeBugIcon.className = "templeBugBadge";
        templeBugIcon.src = "../leaderboardAssets/templeBug.png";

        var buggedRunTxt = document.createElement("div");
        buggedRunTxt.className = "buggedRunTooltip";
        buggedRunTxt.textContent = "Bugged run";

        templeBugDiv.appendChild(templeBugIcon);
        templeBugDiv.appendChild(buggedRunTxt);
        
        right.appendChild(templeBugDiv)
    }
    right2.appendChild(hero);

    runDiv.appendChild(left);
    runDiv.appendChild(left2);
    runDiv.appendChild(middle);
    runDiv.appendChild(middle2);
    runDiv.appendChild(right);
    runDiv.appendChild(right2);

    runDiv.style.borderColor = borderColours[runNumber];

    runDiv.addEventListener('click', function() {
        window.location.href = "/leaderboard/individual?runNum=" + totalNumber.toString() + "&categoryNum=" + runNumber.toString();
    });

    htmlDiv.appendChild(runDiv);
}

function hideLoading() {
    const loading = document.getElementById('loading');
    loading.style.display = 'none';
}


function doLeaderboards() {
    const loading = document.getElementById('loading');
    loading.style.display = 'flex';
    const checkboxes = document.querySelectorAll('input[name="options"]');
    let selectedHeroes = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedHeroes.push(checkbox.value);
        }
    });

    const checkboxes2 = document.querySelectorAll('input[name="optionsExtras"]');
    let selectedExtras = [];

    checkboxes2.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedExtras.push(checkbox.value);
        }
    });
    fetch('/getLeaderboards', {
        method: 'GET',
    })
    .then(response => 
        response.json()
    )
    .then(data => {
        console.log(data);
    
        var runsDiv = document.getElementById("actualRuns");
        runsDiv.innerHTML = '';
    
        var filterMap = mapSelect.selectedOptions[0].value;
        var filterGamemode = gamemodeSelect.selectedOptions[0].value;
        var filterMinRound = document.getElementById("minRound").value;
        console.log(filterMap);
        var i2 = 0;
        var individualCategoryPos = 0;
        for (let i = 0; i < data.length; i++) {
            var currRun = data[i];
            var validRun = true

            var heroValid = false;
            for (let j = 0; j < selectedHeroes.length; j++) {
                if (currRun.hero.includes(selectedHeroes[j])) {
                    heroValid = true;
                }
            }
            if (selectedHeroes.includes("Any")){
                heroValid=true;
            }
            if (!heroValid) {
                validRun = false;
            }

            if (selectedExtras.includes("No Hero")) {
                if (currRun.noHero == 0) {
                    validRun = false;
                }
            }

            if (selectedExtras.includes("No Monkey Knowledge")) {
                if (currRun.noMk == 0) {
                    validRun = false;
                }
            }

            if (selectedExtras.includes("Space Restricted")) {
                if (currRun.spaceRestricted == 0) {
                    validRun = false;
                }
            }

            if (selectedExtras.includes("Powerless")) {
                if (currRun.powerless == 0) {
                    validRun = false;
                }
            }

            if (!selectedExtras.includes("Coop")) {
                if (currRun.Coop == 1) {
                    validRun = false;
                }
            }

            if (!selectedExtras.includes("Uses Bugs")) {
                if (currRun.usesBugs == 1) {
                    validRun = false;
                }
            }

            if (!selectedExtras.includes("QOL Mods")) {
                if (currRun.modded == 1) {
                    validRun = false;
                }
            }


            if (filterGamemode != "Any" & currRun.gamemode != filterGamemode) {
                validRun = false;
            }

            

            if (filterMap != "Any" & currRun.map != filterMap) {
                validRun = false;
            }

            if (filterMinRound > currRun.round) {
                validRun = false;
            }

            if (validRun) {
                addRunToHtml(currRun, runsDiv, i2, i);
                i2++;
            }
            
        }
        loading.style.display = "none";
    
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
    // setTimeout(hideLoading, 2000);
}


doLeaderboards()