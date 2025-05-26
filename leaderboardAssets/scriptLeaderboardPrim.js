const homeLink = "/home";
const roundPredictorLink = "/round-predictor";
const leaderboardLink = "/leaderboard";

window.location.href = "/leaderboard/detailed?gamemode=Primary%20Only&hero=Any";

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

var regularDiv = document.getElementById("regularRuns");
var floodedDiv = document.getElementById("floodedRuns");
var coopDiv = document.getElementById("coopRuns");

var regular = document.getElementById("regular");
var flooded = document.getElementById("flooded");
var coop = document.getElementById("coop");

document.getElementById("regularButton").addEventListener("click", function() {
    regular.style.display = "block";
    flooded.style.display = "none";
    coop.style.display = "none";
})

document.getElementById("floodedButton").addEventListener("click", function() {
    regular.style.display = "none";
    flooded.style.display = "block";
    coop.style.display = "none";
})

document.getElementById("coopButton").addEventListener("click", function() {
    regular.style.display = "none";
    flooded.style.display = "none";
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
    var regularData = data["PrimaryOnly"];
    var floodedData = data["PrimaryOnlyFlooded"]
    var coopData = data["PrimaryOnlyCoop"];

    var currBuggedAmount = 0;
    for (let i = 0; i < regularData.length; i++) {
        var isCurrentlyBuggedRun = false
        var newButton = document.createElement('button');

        var currData = regularData
        var addative = "";
        
        var placement = (i-currBuggedAmount+1).toString();
        if (currData[i].modded == 1 | currData[i].bugged == 1){
            addative = " *";
            placement = " ";
            currBuggedAmount++;
            isCurrentlyBuggedRun = true;
        }
        newButton.textContent = "#" + placement + " | r" + regularData[i].round.toString() + " by " + regularData[i].runner.toString() + " | v" + regularData[i].version.toString() + addative
        newButton.addEventListener("click", function() {
            var imageToReq = regularData[i].imageLink
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

            cat.textContent = "Category: " + regularData[i].category.toString();
            her.textContent = "Hero: " + regularData[i].hero.toString();
            links.textContent = "Links: ";
            for (let j = 0; j < regularData[i].links.length; j++) {
                var newLink = document.createElement("a");
                newLink.textContent = regularData[i].links[j].name.toString() + ", ";
                newLink.href = regularData[i].links[j].link.toString();
                links.appendChild(newLink)
            };
            notes.textContent = "Notes: " + regularData[i].notes.toString();
            if (regularData[i].modded == 1) {
                modded.textContent = "Modded."
            }
            else {
                modded.textContent = "Not modded."
            }
            if (regularData[i].bugged == 1) {
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
        regularDiv.appendChild(newButton)
        //singleplayerDiv.innerHTML += "<p>#" + (i+1).toString() + " | r" + chimpsData[i].round.toString() + " by " + chimpsData[i].runner.toString() + " | v" + chimpsData[i].version.toString()
    }
    currBuggedAmount = 0;
    for (let i = 0; i < floodedData.length; i++) {
        var isCurrentlyBuggedRun = false
        var newButton = document.createElement('button');

        var currData = floodedData
        var addative = "";
        
        var placement = (i-currBuggedAmount+1).toString();
        if (currData[i].modded == 1 | currData[i].bugged == 1){
            addative = " *";
            placement = " ";
            currBuggedAmount++;
            isCurrentlyBuggedRun = true;
        }
        newButton.textContent = "#" + placement + " | r" + floodedData[i].round.toString() + " by " + floodedData[i].runner.toString() + " | v" + floodedData[i].version.toString() + addative
        newButton.addEventListener("click", function() {
            var imageToReq = floodedData[i].imageLink
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

            cat.textContent = "Category: " + floodedData[i].category.toString();
            her.textContent = "Hero: " + floodedData[i].hero.toString();
            links.textContent = "Links: ";
            for (let j = 0; j < floodedData[i].links.length; j++) {
                var newLink = document.createElement("a");
                newLink.textContent = floodedData[i].links[j].name.toString() + ", ";
                newLink.href = floodedData[i].links[j].link.toString();
                links.appendChild(newLink)
            };
            notes.textContent = "Notes: " + floodedData[i].notes.toString();
            if (floodedData[i].modded == 1) {
                modded.textContent = "Modded."
            }
            else {
                modded.textContent = "Not modded."
            }
            if (floodedData[i].bugged == 1) {
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
        floodedDiv.appendChild(newButton)
        //singleplayerDiv.innerHTML += "<p>#" + (i+1).toString() + " | r" + chimpsData[i].round.toString() + " by " + chimpsData[i].runner.toString() + " | v" + chimpsData[i].version.toString()
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
            if (regularData[i].modded == 1) {
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
        //singleplayerDiv.innerHTML += "<p>#" + (i+1).toString() + " | r" + chimpsData[i].round.toString() + " by " + chimpsData[i].runner.toString() + " | v" + chimpsData[i].version.toString()
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

