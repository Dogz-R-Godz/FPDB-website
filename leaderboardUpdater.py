import json

with open("leaderboardsNew.json", "r") as f:
    leaderboards = json.load(f)

x=0


newLeaderboard = []

for run in leaderboards:
    run2 = run
    run2["hero"] = [run2["hero"]]
    newLeaderboard.append(run2)

with open("leaderboardsNew.json", "w") as f:
    json.dump(newLeaderboard, f, indent=2)