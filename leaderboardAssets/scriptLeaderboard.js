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

document.getElementById("chimps").addEventListener("click", function() {
    window.location.href = "/leaderboard/detailed?gamemode=CHIMPS&hero=Any";
});
document.getElementById("easy").addEventListener("click", function() {
    window.location.href = "/leaderboard/detailed?gamemode=Easy%20Standard&hero=Any";
});
document.getElementById("primaryOnly").addEventListener("click", function() {
    window.location.href = "/leaderboard/detailed?gamemode=Primary%20Only&hero=Any";
});

fetch('/getRunOfTheMonth', {
    method: 'GET',
})
.then(response => 
    response.json()
)
.then(data => {
    console.log(data);
    var runData = data;

    var imageToReq = runData.imageLink
    const img = document.getElementById('RoTMImg');
    img.src = `/get-image2/${imageToReq}`;
    img.style.display = 'block';

    // const runner = document.getElementById('RoTMRunner');
    // runner.textContent = "Runner: " + data.runner;
    
    // const Round = document.getElementById('RoTMRound');
    // Round.textContent = "Round: " + data.round;

    const Notes = document.getElementById('RoTMNotes');
    Notes.textContent = "Notes: " + data.notes;

    const RoTM = document.getElementById('runOfTheMonth');
    RoTM.addEventListener('click', function() {
        window.location.href = "/leaderboard/individual?runNum=" + runData.runID.toString();
    });
})
.catch((error) => {
    console.error('Error:', error);
});



fetch('/getLeaderboards', {
    method: 'GET',
})
.then(response => 
    response.json()
)
.then(data => {
    console.log(data);
    var chimpsDiv = document.getElementById("chimpsRuns");
    var chimpsData = data;
    var easyDiv = document.getElementById("easyRuns");
    var easyData = data;
    var primDiv = document.getElementById("primaryRuns");
    var primData = data;
    var currBuggedAmount = 0;

    var currUnbuggedAmount = 0;
    
    for (let i = 0; i < chimpsData.length; i++) {
        if (i < chimpsData.length) {
            var currData = chimpsData
            
            if (currData[i].gamemode == "CHIMPS"){
                
                if (currUnbuggedAmount < 3){
                    if (currData[i].modded === 0 & currData[i].usesBugs === 0){
                        currUnbuggedAmount++;
        
                        var run = document.createElement("div");
                        run.className = "run";
    
                        var leftSide = document.createElement("div");
                        leftSide.className = "leftSide";
        
                        var placement = "#" + (currUnbuggedAmount).toString();
        
                        var placementElement = document.createElement("h1");
                        placementElement.className = "runNum";
                        placementElement.textContent = placement;
        
                        var runner = document.createElement("h1");
                        runner.className = "runner";
                        runner.textContent = currData[i].runner.toString();
    
                        leftSide.appendChild(placementElement);
                        leftSide.appendChild(runner);
                        
                        var rightSide = document.createElement("div");
                        rightSide.className = "rightSide";
        
                        var roundAt = document.createElement("h1");
                        roundAt.className = "roundAt";
                        roundAt.textContent = "r" + currData[i].round.toString();
        
                        var version = document.createElement("h1");
                        version.className = "version";
                        version.textContent = currData[i].version.toString();
    
                        rightSide.appendChild(roundAt);
                        rightSide.appendChild(version);
        
                        run.appendChild(leftSide);
                        run.appendChild(rightSide);
                        run.style.borderColor = borderColours[currUnbuggedAmount-1];
                        chimpsDiv.appendChild(run);
                    }
                }
            }
            
            
        }
        
    }
    currBuggedAmount = 0;
    currUnbuggedAmount = 0;
    for (let i = 0; i < easyData.length; i++) {
        if (i < easyData.length) {
            var currData = easyData
            if (currUnbuggedAmount < 3 & currData[i].gamemode.includes("Easy")){
                if (currData[i].modded === 0 & currData[i].usesBugs === 0){
                    currUnbuggedAmount++;
    
                    var run = document.createElement("div");
                    run.className = "run";

                    var leftSide = document.createElement("div");
                    leftSide.className = "leftSide";
    
                    var placement = "#" + (currUnbuggedAmount).toString();
    
                    var placementElement = document.createElement("h1");
                    placementElement.className = "runNum";
                    placementElement.textContent = placement;
    
                    var runner = document.createElement("h1");
                    runner.className = "runner";
                    runner.textContent = currData[i].runner.toString();

                    leftSide.appendChild(placementElement);
                    leftSide.appendChild(runner);
                    
                    var rightSide = document.createElement("div");
                    rightSide.className = "rightSide";
    
                    var roundAt = document.createElement("h1");
                    roundAt.className = "roundAt";
                    roundAt.textContent = "r" + currData[i].round.toString();
    
                    var version = document.createElement("h1");
                    version.className = "version";
                    version.textContent = currData[i].version.toString();

                    rightSide.appendChild(roundAt);
                    rightSide.appendChild(version);
    
                    run.appendChild(leftSide);
                    run.appendChild(rightSide);
                    run.style.borderColor = borderColours[currUnbuggedAmount-1];
                    easyDiv.appendChild(run);
                }
            }
        }
    }
    currBuggedAmount = 0;
    currUnbuggedAmount = 0;
    for (let i = 0; i < primData.length; i++) {
        if (i < primData.length) {
            var currData = primData
            if (currUnbuggedAmount < 3 & currData[i].gamemode.includes("Primary")){
                console.log(currData[i]);
                if (currData[i].modded === 0 & currData[i].usesBugs === 0){
                    currUnbuggedAmount++;
    
                    var run = document.createElement("div");
                    run.className = "run";

                    var leftSide = document.createElement("div");
                    leftSide.className = "leftSide";
    
                    var placement = "#" + (currUnbuggedAmount).toString();
    
                    var placementElement = document.createElement("h1");
                    placementElement.className = "runNum";
                    placementElement.textContent = placement;
    
                    var runner = document.createElement("h1");
                    runner.className = "runner";
                    runner.textContent = currData[i].runner.toString();

                    leftSide.appendChild(placementElement);
                    leftSide.appendChild(runner);
                    
                    var rightSide = document.createElement("div");
                    rightSide.className = "rightSide";
    
                    var roundAt = document.createElement("h1");
                    roundAt.className = "roundAt";
                    roundAt.textContent = "r" + currData[i].round.toString();
    
                    var version = document.createElement("h1");
                    version.className = "version";
                    version.textContent = currData[i].version.toString();

                    rightSide.appendChild(roundAt);
                    rightSide.appendChild(version);
    
                    run.appendChild(leftSide);
                    run.appendChild(rightSide);
                    run.style.borderColor = borderColours[currUnbuggedAmount-1];
                    primDiv.appendChild(run);
                }
            }
        }
    }

})
.catch((error) => {
    console.error('Error:', error);
});

