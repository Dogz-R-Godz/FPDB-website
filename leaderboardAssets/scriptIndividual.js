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

const urlParams = new URLSearchParams(window.location.search);

var defaultRun = "0";
if (urlParams.has("runNum")) {
    defaultRun = urlParams.get("runNum");
}

var defaultCategorySpot = "0";
if (urlParams.has("categoryNum")) {
    defaultCategorySpot = urlParams.get("categoryNum");
}

const formData = new FormData();
formData.append('runNum', defaultRun); // Use 'profile' as the key for the server

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

var leaderboard = []

function doResize() {
    console.log(window.innerWidth);
    var container = document.getElementById("imageContainer");
    if (window.innerWidth < 1870) {
        container.style.width = "100%";
    }
    else {
        container.style.width = "48%";
    }
    console.log(container.style.position);

}

addEventListener("resize", (event) => doResize());

doResize()

fetch('/getLeaderboards', {
    method: 'GET',
})
.then(response => 
    response.json()
)
.then(data => {
    leaderboard = data;
    doRunStuff(leaderboard);
})
.catch((error) => {
    console.error('Error:', error);
});



function doRunStuff(leaderboard) {
    fetch('/getRun', {
        method: 'POST',
        body: formData
    })
    .then(response => 
        response.json()
    )
    .then(data => {
        var runData = data['Run']
        console.log(runData);

        var imageToReq = runData.imageLink
        const img = document.getElementById('displayedImage');
        img.src = `/get-image2/${imageToReq}`;
        img.style.display = 'block';
        
        // Handle image load error
        img.onerror = function() {
            alert('Error loading image. The image may not exist.');
            img.style.display = 'none';
        };

        var runGamemode = runData['gamemode']

        var gamemodePosition = 0;

        for (let i = 0; i < leaderboard.length; i++) {
            var leaderboardRun = leaderboard[i];
            if (leaderboardRun.gamemode == runGamemode) {
                if (leaderboardRun.round > runData.round) {
                    gamemodePosition++;
                }
            }
        }

        const explainer = document.getElementById('heroExplainer');

        for (let i = 0; i < runData.hero.length; i++) {
            var hero = runData.hero[i];
            heroSrcName = hero.replaceAll(" ", "");
            var heroInfoDiv = document.createElement('div');
            heroInfoDiv.className = 'heroInfo';
            var heroImg = document.createElement('img');
            heroImg.className = 'heroImg';
            heroImg.src = `/get-image2/leaderboardAssets/${heroSrcName}.webp`;
            var heroTxt = document.createElement('p');
            heroTxt.className = 'heroName';
            heroTxt.textContent = hero;

            heroInfoDiv.appendChild(heroImg);
            heroInfoDiv.appendChild(heroTxt);

            explainer.appendChild(heroInfoDiv);

        }
        
        // const heroImg = document.getElementById('heroImg');
        // heroImg.src = `/get-image2/leaderboardAssets/${heroSrcName}.webp`;

        // const heroTxt = document.getElementById('heroName');
        // heroTxt.textContent = runData.hero;

        const roundTxt = document.getElementById('roundTo');
        const positionTxt = document.getElementById('overallPos');
        const gamemodePosTxt = document.getElementById('gamemodePos');
        const gamemodeTxt = document.getElementById('gamemode');
        const runnerTxt = document.getElementById('runner');
        const mapTxt = document.getElementById('map');
        const versionTxt = document.getElementById('version');
        const notesTxt = document.getElementById('notes');

        roundTxt.textContent = "Round: " + runData.round.toLocaleString();
        positionTxt.textContent = "Overall position: #" + (Number(defaultRun) + 1).toString();
        gamemodePosTxt.textContent = "Gamemode position: #" + (Number(gamemodePosition) + 1).toString();
        gamemodeTxt.textContent = "Gamemode: " + runData.gamemode;
        runnerTxt.textContent = "Runner: " + runData.runner;
        mapTxt.textContent = "Map: " + runData.map;
        versionTxt.textContent = "Version: " + runData.version;
        runData.notes = runData.notes.replaceAll("\n", "    <br>")
        notesTxt.innerHTML = "Notes: " + runData.notes;

        const linksDiv = document.getElementById('links');
        for (let i = 0; i<runData.links.length;i++) {
            var linkCombo = document.createElement('div');
            linkCombo.className = 'linkCombo';

            var label = document.createElement('h1');
            label.className = "linkName";
            label.textContent = runData.links[i].name + ": ";
            linkCombo.appendChild(label);


            if (runData.links[i].link.includes("youtu") & !runData.links[i].link.includes("channel/") & !runData.links[i].link.includes("@")) {
                // var videoId = runData.links[i].link.replaceAll("https://m.youtube.com/watch?v=", "");
                // var videoId = runData.links[i].link.split("v=")[1];
                // videoId = videoId.split("&")[0];
                // console.log(videoId);
                var videoId = youtube_parser(runData.links[i].link);
                if (videoId)
                console.log(videoId)
                var videoEmbed = document.createElement('iframe');
                videoEmbed.src = "https://www.youtube.com/embed/" + videoId;
                videoEmbed.className = "ytVideoEmbed";
                linkCombo.appendChild(videoEmbed);
            }
            else {
                var link = document.createElement("a");
                link.className = "nonYtLink";
                link.textContent = "here";
                link.target = "_blank";
                link.href = runData.links[i].link;
                linkCombo.appendChild(link);
            }
            linksDiv.appendChild(linkCombo);
        }
        if (runData.links.length == 0) {
            linksDiv.style.display = "none";
        }
        const qualitiesDiv = document.getElementById('qualitiesContainer');
        if (runData.usesBugs) {
            var bugDiv = document.createElement("div");
            bugDiv.className = "qualityDiv";
            var templeBugIcon = document.createElement("img");
            templeBugIcon.className = "qualityBadge";
            templeBugIcon.src = "../leaderboardAssets/templeBug.png";

            var buggedRunTxt = document.createElement("div");
            buggedRunTxt.className = "runQualityTooltip";
            buggedRunTxt.textContent = "Bugged run";

            bugDiv.appendChild(templeBugIcon);
            bugDiv.appendChild(buggedRunTxt);
            qualitiesDiv.appendChild(bugDiv);
        }

        if (runData.Coop) {
            var coopDiv = document.createElement("div");
            coopDiv.className = "qualityDiv";
            var coopIcon = document.createElement("img");
            coopIcon.className = "qualityBadge";
            coopIcon.src = "../leaderboardAssets/CoopModicon.png";
            coopIcon.addEventListener('click', function() {
                window.location.href = "https://github.com/iXendeRouS/SoloCoopMod";
            })

            var coopRunTxt = document.createElement("div");
            coopRunTxt.className = "runQualityTooltip";
            coopRunTxt.textContent = "Coop run";

            coopDiv.appendChild(coopIcon);
            coopDiv.appendChild(coopRunTxt);
            qualitiesDiv.appendChild(coopDiv);
        }

        if (runData.modded) {
            var moddedDiv = document.createElement("div");
            moddedDiv.className = "qualityDiv";
            var moddedIcon = document.createElement("img");
            moddedIcon.className = "qualityBadge";
            moddedIcon.src = "../leaderboardAssets/QOLModicon.png";

            var moddedRunTxt = document.createElement("div");
            moddedRunTxt.className = "runQualityTooltip";
            moddedRunTxt.textContent = "QOL modded run";

            moddedDiv.appendChild(moddedIcon);
            moddedDiv.appendChild(moddedRunTxt);
            qualitiesDiv.appendChild(moddedDiv);
        }

        if (runData.noMk) {
            var noMkDiv = document.createElement("div");
            noMkDiv.className = "qualityDiv";
            var noMkIcon = document.createElement("img");
            noMkIcon.className = "qualityBadge";
            noMkIcon.src = "../leaderboardAssets/nomk.png";

            var noMkRunTxt = document.createElement("div");
            noMkRunTxt.className = "runQualityTooltip";
            noMkRunTxt.textContent = "No MK run";

            noMkDiv.appendChild(noMkIcon);
            noMkDiv.appendChild(noMkRunTxt);
            qualitiesDiv.appendChild(noMkDiv);
        }
        
        if (runData.powerless) {
            var powerlessDiv = document.createElement("div");
            powerlessDiv.className = "qualityDiv";
            var powerlessIcon = document.createElement("img");
            powerlessIcon.className = "qualityBadge";
            powerlessIcon.src = "../leaderboardAssets/powerless.png";

            var powerlessRunTxt = document.createElement("div");
            powerlessRunTxt.className = "runQualityTooltip";
            powerlessRunTxt.textContent = "Powerless run";

            powerlessDiv.appendChild(powerlessIcon);
            powerlessDiv.appendChild(powerlessRunTxt);
            qualitiesDiv.appendChild(powerlessDiv);
        }

        if (runData.noHero) {
            var noHeroDiv = document.createElement("div");
            noHeroDiv.className = "qualityDiv";
            var noHeroIcon = document.createElement("img");
            noHeroIcon.className = "qualityBadge";
            noHeroIcon.src = "../leaderboardAssets/noheroes.png";

            var noHeroRunTxt = document.createElement("div");
            noHeroRunTxt.className = "runQualityTooltip";
            noHeroRunTxt.textContent = "No Hero run";

            noHeroDiv.appendChild(noHeroIcon);
            noHeroDiv.appendChild(noHeroRunTxt);
            qualitiesDiv.appendChild(noHeroDiv);
        }

        


    })
    .catch((error) => {
        console.error('Error:', error);
    });
}