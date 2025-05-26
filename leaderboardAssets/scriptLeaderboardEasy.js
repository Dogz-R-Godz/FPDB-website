const homeLink = "/home";
const roundPredictorLink = "/round-predictor";
const leaderboardLink = "/leaderboard";

window.location.href = "/leaderboard/detailed?gamemode=Easy%20Standard&hero=Any";

document.getElementById("homeBtn").addEventListener("click", function() {
    window.location.href = homeLink;
});

document.getElementById("roundBtn").addEventListener("click", function() {
    window.location.href = roundPredictorLink;
});

document.getElementById("leaderBtn").addEventListener("click", function() {
    window.location.href = leaderboardLink;
});

document.getElementById("closeBut").addEventListener("click", function() {
    var imageDiv = document.getElementById("individualRun");
    imageDiv.style.display = 'none';
})

var powerlessDiv = document.getElementById("powerlessRuns");
var poweredDiv = document.getElementById("poweredRuns");
var poweredLotnlessDiv = document.getElementById("lotnlessRuns");
var coopDiv = document.getElementById("coopRuns");

var powerless = document.getElementById("powerless");
var powered = document.getElementById("powered");
var poweredLotnless = document.getElementById("lotnless");
var coop = document.getElementById("coop");

document.getElementById("powerlessButton").addEventListener("click", function() {
    powerless.style.display = "block";
    powered.style.display = "none";
    poweredLotnless.style.display = "none";
    coop.style.display = "none";
})

document.getElementById("poweredButton").addEventListener("click", function() {
    powerless.style.display = "none";
    powered.style.display = "block";
    poweredLotnless.style.display = "none";
    coop.style.display = "none";
})

document.getElementById("poweredLotnlessButton").addEventListener("click", function() {
    powerless.style.display = "none";
    powered.style.display = "none";
    poweredLotnless.style.display = "block";
    coop.style.display = "none";
})

document.getElementById("coopButton").addEventListener("click", function() {
    powerless.style.display = "none";
    powered.style.display = "none";
    poweredLotnless.style.display = "none";
    coop.style.display = "block";
})



fetch('/getLeaderboards', {
    method: 'GET',
})
.then(response => 
    response.json()
)
.then(data => {
    console.log(data);
    var powerlessData = data["EasyPowerless"];
    var poweredData = data["EasyPowered"];
    var poweredLotnlessData = data["EasyPoweredLotnless"];
    var coopData = data["EasyCoop"];

    var currBuggedAmount = 0;
    for (let i = 0; i < powerlessData.length; i++) {
        var isCurrentlyBuggedRun = false
        var newButton = document.createElement('button');

        var currData = powerlessData
        var addative = "";
        
        var placement = (i-currBuggedAmount+1).toString();
        if (currData[i].modded == 1 | currData[i].bugged == 1){
            addative = " *";
            placement = " ";
            currBuggedAmount++;
            isCurrentlyBuggedRun = true;
        }
        newButton.textContent = "#" + placement + " | r" + powerlessData[i].round.toString() + " by " + powerlessData[i].runner.toString() + " | v" + powerlessData[i].version.toString() + addative
        newButton.addEventListener("click", function() {
            var imageToReq = powerlessData[i].imageLink
            const img = document.getElementById('displayedImage');
            img.src = `/get-image2/${imageToReq}`;
            img.style.display = 'block';
            
            // Handle image load error
            img.onerror = function() {
                alert('Error loading image. The image may not exist.');
                img.style.display = 'none';
            };
            var imageDiv = document.getElementById("individualRun");
            imageDiv.style.display = 'flex';

            var cat = document.getElementById("category");
            var her = document.getElementById("hero");
            var links = document.getElementById("links");
            var notes = document.getElementById("notes");
            var modded = document.getElementById("modded");

            cat.textContent = "Category: " + powerlessData[i].category.toString();
            her.textContent = "Hero: " + powerlessData[i].hero.toString();
            links.textContent = "Links: ";
            for (let j = 0; j < powerlessData[i].links.length; j++) {
                var newLink = document.createElement("a");
                newLink.textContent = powerlessData[i].links[j].name.toString() + ", ";
                newLink.href = powerlessData[i].links[j].link.toString();
                links.appendChild(newLink)
            };
            notes.textContent = "Notes: " + powerlessData[i].notes.toString();
            if (powerlessData[i].modded == 1) {
                modded.textContent = "Modded."
            }
            else {
                modded.textContent = "Not modded."
            }
            if (powerlessData[i].bugged == 1) {
                bugged.textContent = "Bugged."
            }
            else {
                bugged.textContent = "Not bugged."
            }


            //category, hero, links, notes

        });
        if (isCurrentlyBuggedRun == true) {
            newButton.className = "greyedButton"
        }
        powerlessDiv.appendChild(newButton)
        //powerlessDiv.innerHTML += "<p>#" + (i+1).toString() + " | r" + chimpsData[i].round.toString() + " by " + chimpsData[i].runner.toString() + " | v" + chimpsData[i].version.toString()
    }
    currBuggedAmount = 0;
    for (let i = 0; i < poweredData.length; i++) {
        var isCurrentlyBuggedRun = false
        var newButton = document.createElement('button');

        var currData = poweredData
        var addative = "";
        
        var placement = (i-currBuggedAmount+1).toString();
        if (currData[i].modded == 1 | currData[i].bugged == 1){
            addative = " *";
            placement = " ";
            currBuggedAmount++;
            isCurrentlyBuggedRun = true;
        }
        newButton.textContent = "#" + placement + " | r" + poweredData[i].round.toString() + " by " + poweredData[i].runner.toString() + " | v" + poweredData[i].version.toString() + addative
        newButton.addEventListener("click", function() {
            var imageToReq = poweredData[i].imageLink
            const img = document.getElementById('displayedImage');
            img.src = `/get-image2/${imageToReq}`;
            img.style.display = 'block';
            
            // Handle image load error
            img.onerror = function() {
                alert('Error loading image. The image may not exist.');
                img.style.display = 'none';
            };
            var imageDiv = document.getElementById("individualRun");
            imageDiv.style.display = 'flex';

            var cat = document.getElementById("category");
            var her = document.getElementById("hero");
            var links = document.getElementById("links");
            var notes = document.getElementById("notes");
            var modded = document.getElementById("modded");
            var bugged = document.getElementById("bugged");

            cat.textContent = "Category: " + poweredData[i].category.toString();
            her.textContent = "Hero: " + poweredData[i].hero.toString();
            links.textContent = "Links: ";
            for (let j = 0; j < poweredData[i].links.length; j++) {
                var newLink = document.createElement("a");
                newLink.textContent = poweredData[i].links[j].name.toString() + ", ";
                newLink.href = poweredData[i].links[j].link.toString();
                links.appendChild(newLink)
            };
            notes.textContent = "Notes: " + poweredData[i].notes.toString();
            if (poweredData[i].modded == 1) {
                modded.textContent = "Modded."
            }
            else {
                modded.textContent = "Not modded."
            }
            if (poweredData[i].bugged == 1) {
                bugged.textContent = "Bugged."
            }
            else {
                bugged.textContent = "Not bugged."
            }


            //category, hero, links, notes

        });
        if (isCurrentlyBuggedRun == true) {
            newButton.className = "greyedButton"
        }
        poweredDiv.appendChild(newButton)
        //poweredDiv.innerHTML += "<p>#" + (i+1).toString() + " | r" + chimpsData[i].round.toString() + " by " + chimpsData[i].runner.toString() + " | v" + chimpsData[i].version.toString()
    }
    currBuggedAmount = 0;
    for (let i = 0; i < poweredLotnlessData.length; i++) {
        var isCurrentlyBuggedRun = false
        var newButton = document.createElement('button');

        var currData = poweredLotnlessData
        var addative = "";
        
        var placement = (i-currBuggedAmount+1).toString();
        if (currData[i].modded == 1 | currData[i].bugged == 1){
            addative = " *";
            placement = " ";
            currBuggedAmount++;
            isCurrentlyBuggedRun = true;
        }
        newButton.textContent = "#" + placement + " | r" + poweredLotnlessData[i].round.toString() + " by " + poweredLotnlessData[i].runner.toString() + " | v" + poweredLotnlessData[i].version.toString() + addative
        newButton.addEventListener("click", function() {
            var imageToReq = poweredLotnlessData[i].imageLink
            const img = document.getElementById('displayedImage');
            img.src = `/get-image2/${imageToReq}`;
            img.style.display = 'block';
            
            // Handle image load error
            img.onerror = function() {
                alert('Error loading image. The image may not exist.');
                img.style.display = 'none';
            };
            var imageDiv = document.getElementById("individualRun");
            imageDiv.style.display = 'flex';

            var cat = document.getElementById("category");
            var her = document.getElementById("hero");
            var links = document.getElementById("links");
            var notes = document.getElementById("notes");
            var modded = document.getElementById("modded");
            var bugged = document.getElementById("bugged");

            cat.textContent = "Category: " + poweredLotnlessData[i].category.toString();
            her.textContent = "Hero: " + poweredLotnlessData[i].hero.toString();
            links.textContent = "Links: ";
            for (let j = 0; j < poweredLotnlessData[i].links.length; j++) {
                var newLink = document.createElement("a");
                newLink.textContent = poweredLotnlessData[i].links[j].name.toString() + ", ";
                newLink.href = poweredLotnlessData[i].links[j].link.toString();
                links.appendChild(newLink)
            };
            notes.textContent = "Notes: " + poweredLotnlessData[i].notes.toString();
            if (poweredLotnlessData[i].modded == 1) {
                modded.textContent = "Modded."
            }
            else {
                modded.textContent = "Not modded."
            }
            if (poweredLotnlessData[i].bugged == 1) {
                bugged.textContent = "Bugged."
            }
            else {
                bugged.textContent = "Not bugged."
            }


            //category, hero, links, notes

        });
        if (isCurrentlyBuggedRun == true) {
            newButton.className = "greyedButton"
        }
        poweredLotnlessDiv.appendChild(newButton)
        //poweredLotnlessDiv.innerHTML += "<p>#" + (i+1).toString() + " | r" + chimpsData[i].round.toString() + " by " + chimpsData[i].runner.toString() + " | v" + chimpsData[i].version.toString()
    }
    currBuggedAmount = 0;
    for (let i = 0; i < coopData.length; i++) {
        var isCurrentlyBuggedRun = false
        var newButton = document.createElement('button');

        var currData = coopData
        var addative = "";
        
        var placement = (i-currBuggedAmount+1).toString();
        if (currData[i].modded == 1 | currData[i].bugged == 1){
            addative = " *";
            placement = " ";
            currBuggedAmount++;
            isCurrentlyBuggedRun = true;
        }
        newButton.textContent = "#" + placement + " | r" + coopData[i].round.toString() + " by " + coopData[i].runner.toString() + " | v" + coopData[i].version.toString() + addative
        newButton.addEventListener("click", function() {
            var imageToReq = coopData[i].imageLink
            const img = document.getElementById('displayedImage');
            img.src = `/get-image2/${imageToReq}`;
            img.style.display = 'block';
            
            // Handle image load error
            img.onerror = function() {
                alert('Error loading image. The image may not exist.');
                img.style.display = 'none';
            };
            var imageDiv = document.getElementById("individualRun");
            imageDiv.style.display = 'flex';

            var cat = document.getElementById("category");
            var her = document.getElementById("hero");
            var links = document.getElementById("links");
            var notes = document.getElementById("notes");
            var modded = document.getElementById("modded");
            var bugged = document.getElementById("bugged");

            cat.textContent = "Category: " + coopData[i].category.toString();
            her.textContent = "Hero: " + coopData[i].hero.toString();
            links.textContent = "Links: ";
            for (let j = 0; j < coopData[i].links.length; j++) {
                var newLink = document.createElement("a");
                newLink.textContent = coopData[i].links[j].name.toString() + ", ";
                newLink.href = coopData[i].links[j].link.toString();
                links.appendChild(newLink)
            };
            notes.textContent = "Notes: " + coopData[i].notes.toString();
            if (coopData[i].modded == 1) {
                modded.textContent = "Modded."
            }
            else {
                modded.textContent = "Not modded."
            }
            if (coopData[i].bugged == 1) {
                bugged.textContent = "Bugged."
            }
            else {
                bugged.textContent = "Not bugged."
            }


            //category, hero, links, notes

        });
        if (isCurrentlyBuggedRun == true) {
            newButton.className = "greyedButton"
        }
        coopDiv.appendChild(newButton)
        //powerlessDiv.innerHTML += "<p>#" + (i+1).toString() + " | r" + chimpsData[i].round.toString() + " by " + chimpsData[i].runner.toString() + " | v" + chimpsData[i].version.toString()
    }
    // for (let i = 0; i < easyData.length; i++) {
    //     easyDiv.innerHTML += "<p>#" + (i+1).toString() + " | r" + easyData[i].round.toString() + " by " + easyData[i].runner.toString() + " | " + easyData[i].version.toString()
    // }
    // for (let i = 0; i < primData.length; i++) {
    //     primDiv.innerHTML += "<p>#" + (i+1).toString() + " | r" + primData[i].round.toString() + " by " + primData[i].runner.toString() + " | v" + primData[i].version.toString()
    // }

})
.catch((error) => {
    console.error('Error:', error);
});

