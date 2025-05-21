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