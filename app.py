from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import random as rand
import json
import shutil
import profileDecompiler



app = Flask(__name__)
CORS(app)


@app.route('/uploadSeedFile', methods=['POST'])
def upload():
    try:
        userIP=request.remote_addr
        with open("uploads.json", "r") as f:
            visits = json.load(f)
        if userIP in visits:
            visits[userIP]+=1
        else:
            visits[userIP]=1
        with open("uploads.json", "w") as f:
            json.dump(visits, f, indent=2)
    except:
        print("Couldnt log the IP")
    if 'file' not in request.files:
        return 'No file part', 400
    file = request.files['file']
    if file.filename == '':
        return 'No selected file', 400
        
    # Read the file as binary
    file_content = file.read()
    # Process your file content here
    try:
        decompiledSave = profileDecompiler.decompile(file_content)
        decompiledSaveJson = json.loads(decompiledSave)
        return jsonify(decompiledSaveJson)
    except Exception as e:
        return jsonify({"Error": str(e)}), 500
    
@app.route('/getRun', methods=['POST'])
def getRun():
    reqJson = request.form.get('runNum')
    print(reqJson)
    with open("leaderboardsNew.json", "r") as f:
        leaderboard = json.load(f)
    try:
        indexNum = int(reqJson)
        leaderboardRun = leaderboard[int(reqJson)]
        return jsonify({"Run": leaderboardRun})
    except Exception as e:
        return jsonify({"Error": str(e)}), 500

@app.route('/getLeaderboards', methods=['GET'])
def getLeaderboards():
    try:
        userIP=request.remote_addr
        with open("visitsLeaderboard.json", "r") as f:
            visits = json.load(f)
        if userIP in visits:
            visits[userIP]+=1
        else:
            visits[userIP]=1
        with open("visitsLeaderboard.json", "w") as f:
            json.dump(visits, f, indent=2)
    except:
        print("Couldnt log the IP")
    try:
        with open("leaderboardsNew.json", "r") as f:
            leaderboards = json.load(f)
        thing=jsonify(leaderboards)
        return thing
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/getLeaderboardsOld', methods=['GET'])
def getLeaderboardsOld():
    try:
        userIP=request.remote_addr
        with open("visitsLeaderboard.json", "r") as f:
            visits = json.load(f)
        if userIP in visits:
            visits[userIP]+=1
        else:
            visits[userIP]=1
        with open("visitsLeaderboard.json", "w") as f:
            json.dump(visits, f, indent=2)
    except:
        print("Couldnt log the IP")
    try:
        with open("leaderboards.json", "r") as f:
            leaderboards = json.load(f)
        thing=jsonify(leaderboards)
        return thing
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/getRunOfTheMonth', methods=['GET'])
def getRunOfTheMonth():
    try:
        with open("runOfTheMonth.json", "r") as f:
            RoTM = json.load(f)[0]
        #with open("leaderboardsNew.json", "r") as f:
            #actualRun = json.load(f)[RoTM]
        actualRun = RoTM
        with open("leaderboardsNew.json", "r") as f:
            leaderboards = json.load(f)
        ID = 0
        found=False
        for run in leaderboards:
            if not found:
                if run == actualRun:
                    found=True
                else:
                    ID += 1
        actualRun["runID"] = ID
        return jsonify(actualRun)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/addToLeaderboard', methods=['POST'])
def addToLeaderboard():
    print("here")
    try:
        # Get JSON data from the form
        entry_data = json.loads(request.form.get('entryData'))
        password = "" #Change password when running
        if entry_data['password'] == password:
            
        
            # Get image file
            if request.form.get("oldLeaderboard") == "yes":
                print("here")

                if 'imageFile' not in request.files:
                    return jsonify({"error": "No image file provided"}), 400
                    
                image_file = request.files['imageFile']
                custom_filename = request.form.get('customFilename')
                
                if not custom_filename:
                    return jsonify({"error": "No filename provided"}), 400
                
                # Determine directory based on category
                if "CHIMPS" in entry_data['category']:
                    image_dir = "leaderboard/CHIMPS/images"
                elif "Easy" in entry_data['category']:
                    image_dir = "leaderboard/Easy/images"
                elif "PrimaryOnly" in entry_data['category']:
                    image_dir = "leaderboard/PrimaryOnly/images"
                else:
                    return jsonify({"error": "Invalid category"}), 400
                
                # image_dir = "leaderboard/Images"
                
                # Create directory if it doesn't exist
                import os
                os.makedirs(image_dir, exist_ok=True)
                
                # Save the file
                image_path = os.path.join(image_dir, custom_filename)
                image_file.save(image_path)
                
                # Load current leaderboards
                try:
                    with open("leaderboards.json", "r") as f:
                        leaderboards = json.load(f)
                except (FileNotFoundError, json.JSONDecodeError):
                    leaderboards = {}
                
                # Add new entry to appropriate category
                category = entry_data['category']
                if category not in leaderboards:
                    leaderboards[category] = []
                
                entry_data['category'] = entry_data['statedCategory']
                entry_data.pop('statedCategory')
                entry_data.pop('password')

                
                runIndex = 0
                runRound = entry_data["round"]
                for run in leaderboards[category]:
                    if run["round"] > runRound:
                        runIndex+=1

                # Add entry to leaderboard
                leaderboards[category].insert(runIndex, entry_data)

                if "Easy" in category:
                    runIndex = 0
                    runRound = entry_data["round"]
                    for run in leaderboards["EasyTotal"]:
                        if run["round"] > runRound:
                            runIndex+=1

                    # Add entry to leaderboard
                    leaderboards["EasyTotal"].insert(runIndex, entry_data)
                
                # Save updated leaderboards
                with open("leaderboards.json", "w") as f:
                    json.dump(leaderboards, f, indent=2)
                    
                return jsonify({"success": True, "message": "Leaderboard entry added"})
            else:
                print("other here")

                if 'imageFile' not in request.files:
                    return jsonify({"error": "No image file provided"}), 400
                    
                image_file = request.files['imageFile']
                custom_filename = request.form.get('customFilename')
                
                if not custom_filename:
                    return jsonify({"error": "No filename provided"}), 400
                
                # Determine directory based on category
                
                
                image_dir = "leaderboard/Images"
                
                # Create directory if it doesn't exist
                import os
                os.makedirs(image_dir, exist_ok=True)
                
                # Save the file
                image_path = os.path.join(image_dir, custom_filename)
                image_file.save(image_path)
                
                # Load current leaderboards
                try:
                    with open("leaderboardsNew.json", "r") as f:
                        leaderboards = json.load(f)
                except (FileNotFoundError, json.JSONDecodeError):
                    leaderboards = {}

                entry_data.pop("category")
                entry_data.pop('statedCategory')
                entry_data.pop('password')
                entry_data['hero'] = entry_data['hero'].split(", ")
                entry_data['Coop'] = entry_data['coop']
                entry_data.pop('coop')
                entry_data['usesBugs'] = entry_data['bugged']
                entry_data.pop('bugged')
                
                # Add new entry to appropriate category
                
                runIndex = 0
                runRound = entry_data["round"]
                for run in leaderboards:
                    if run["round"] > runRound:
                        runIndex+=1
                
                
                # Add entry to leaderboard
                leaderboards.insert(runIndex, entry_data)
                
                # Save updated leaderboards
                with open("leaderboardsNew.json", "w") as f:
                    json.dump(leaderboards, f, indent=2)
                    
                return jsonify({"success": True, "message": "Leaderboard entry added"})

        return jsonify({"error": "Incorrect password"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/')
def index():
    try:
        userIP=request.remote_addr
        with open("visits.json", "r") as f:
            visits = json.load(f)
        if userIP in visits:
            visits[userIP]+=1
        else:
            visits[userIP]=1
        with open("visits.json", "w") as f:
            json.dump(visits, f, indent=2)
    except:
        print("Couldnt log the IP")
    icon_to_use = f"Icon{rand.randint(0, 2)}.png"
    shutil.copy(icon_to_use, "tempIcon.png")
    shutil.move("tempIcon.png", "icon.png")
    print("Sending HTML")
    return send_from_directory('', 'baseWebsiteIndex.html')

@app.route('/get-image/<image_name>')
def get_image(image_name):
    print(image_name)
    try:
        # Adjust the path to where your images are stored
        #image_path = image_name
        return send_file(image_name, mimetype='image/jpeg')
    except FileNotFoundError:
        return jsonify({"error": "Image not found"}), 404
    
@app.route('/get-image2/<path:path>')
def get_image2(path):
    print(path)
    try:
        # Adjust the path to where your images are stored
        #image_path = image_name
        return send_file(path, mimetype='image/jpeg')
    except FileNotFoundError:
        return jsonify({"error": "Image not found"}), 404

@app.route('/<path:path>')
def static_files(path):
    
    if "." not in path:
        try:
            userIP=request.remote_addr
            with open("visits.json", "r") as f:
                visits = json.load(f)
            if userIP in visits:
                visits[userIP]+=1
            else:
                visits[userIP]=1
            with open("visits.json", "w") as f:
                json.dump(visits, f, indent=2)
        except:
            print("Couldnt log the IP")
        if "home" in path:
            print("Sending home HTML")
            return send_from_directory('', 'home/index.html')
        if "round-predictor" in path:
            print("Sending round HTML")
            return send_from_directory('', 'round-predictor/index.html')
        if "leaderboard" in path:
            print("Sending leaderboard HTML")
            if "detailed" in path:
                return send_from_directory('', 'leaderboard/Detailed/index.html')
            if "individual" in path:
                return send_from_directory('', 'leaderboard/IndividualRun/index.html')
            if "chimps" in path:
                return send_from_directory('', 'leaderboard/CHIMPS/index.html')
            if "easy" in path:
                return send_from_directory('', 'leaderboard/Easy/index.html')
            if "primaryonly" in path:
                return send_from_directory('', 'leaderboard/PrimaryOnly/index.html')
            return send_from_directory('', 'leaderboard/index.html')
    if "home/" in path:
        pathNew = "home/" + path.split("/")[-1]
    elif "round-predictor/" in path:
        pathNew = "round-predictor/" + path.split("/")[-1]
    elif "leaderboardAssets/" in path:
        pathNew = "leaderboardAssets/" + path.split("/")[-1]
    elif "leaderboard/" in path:
        if "detailed" in path:
            pathNew = "leaderboard/Detailed/" + path.split("/")[-1]
        if "individual" in path:
            pathNew = "leaderboard/IndividualRun/" + path.split("/")[-1]
        if "chimps" in path: 
            pathNew = "leaderboard/CHIMPS/" + path.split("/")[-1]
        elif "easy" in path:
            pathNew = "leaderboard/Easy/" + path.split("/")[-1]
        elif "primaryonly" in path: 
            pathNew = "leaderboard/PrimaryOnly/" + path.split("/")[-1]
        else:
            pathNew = "leaderboard/" + path.split("/")[-1]
    elif "Fonts/" in path:
        pathNew = "Fonts/" + path.split("/")[-1]
    elif "roundPredictorAssets/" in path:
        pathNew = "roundPredictorAssets/" + path.split("/")[-1]
    
    else:
        pathNew = path.split("/")[-1]
    if ".json" not in pathNew and ".log" not in pathNew:
        print(f"Sending file {pathNew}")
        return send_from_directory('', pathNew)
    return jsonify({"error": "Nope. Not today. Not happening."}), 404
    

# Start the background thread
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
