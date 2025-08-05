# Import necessary libraries and modules
from bson.objectid import ObjectId
from flask import Flask, request, jsonify, send_from_directory
from pymongo import MongoClient
import os
import sys

# Import custom modules for database interactions
import usersDatabase as usersDB
import projectsDatabase as projectsDB
import hardwareDatabase as hardwareDB
from config import config

# Initialize a new Flask web application - specify static files are in build directory
app = Flask(__name__, static_folder='build')

# Configure Flask from environment variables
app.config['DEBUG'] = config.flask_debug

@app.route('/api', methods=['POST'])
def api():
    data = request.json
    if data['input'] == 'githard':
        return jsonify({'response': 'Hello, team githard!'})
    else:
        return jsonify({'response': 'User Not Found'}), 404

# Catch-all route - ensures that any route not handled by the back-end API
# will be handled by the front-end, which is necessary for client-side routing
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

def get_mongodb_client():
    """Get MongoDB client using secure connection string from environment variables"""
    try:
        if not config.validate_config():
            raise ValueError("Invalid MongoDB configuration")
        
        connection_string = config.get_mongodb_connection_string()
        client = MongoClient(connection_string, tlsAllowInvalidCertificates=True)
        
        # Test the connection
        client.admin.command('ping')
        return client
        
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        return None

# Test MongoDB connection on startup (but don't exit if it fails)
try:
    test_client = get_mongodb_client()
    if test_client:
        test_client.close()
        print("✓ MongoDB connection successful")
    else:
        print("⚠ MongoDB connection failed, but continuing startup")
except Exception as e:
    print(f"⚠ Failed to connect to MongoDB: {e}")
    print("App will start but database features may not work")

# Route for user login
@app.route('/login', methods=['POST'])
def login():        
    # Extract data from request
    data = request.get_json()
    # Connect to MongoDB
    client = get_mongodb_client()
    # Attempt to log in the user using the usersDB module
    userId = data.get('userId')
    password = data.get('password')
    
    result = usersDB.login(client, userId, password)
    client.close()

    if result == "success":
        return jsonify({'status': 'success', 'message': 'Login successful'})
    elif result == "wrong_password":
        return jsonify({'status': 'failure', 'message': 'Incorrect password'}), 401
    elif result == "user_not_found":
        return jsonify({'status': 'failure', 'message': 'User not found'}), 404



# Route for the main page (Work in progress)
@app.route('/main')
def mainPage():
    # Extract data from request

    # Connect to MongoDB
    client = get_mongodb_client()

    # Fetch user projects using the usersDB module

    # Close the MongoDB connection
    client.close()

    # Return a JSON response
    return jsonify({})

# Route for joining a project
@app.route('/join_project', methods=['POST'])
def join_project():
    # Extract data from request
    data = request.get_json()
    userId = data.get('userId')    
    projectId = data.get('projectId')
    # Connect to MongoDB
    client = get_mongodb_client()
    # Attempt to join the project using the usersDB module
    resultProj = projectsDB.addUser(client, projectId, userId)
    resultUser = usersDB.joinProject(client, userId, projectId)    
    # Close the MongoDB connection
    client.close()
    # Return a JSON response
    if resultUser == resultProj == "Project joined successfully":
        return jsonify({'status': 'success', 'message': resultUser})
    elif resultUser == "Project already joined":
        return jsonify({'status': 'failure', 'message': resultUser}), 409
    elif resultProj == "Project does not exist":
        return jsonify({'status': 'failure', 'message': resultProj}), 404
    else:
        return jsonify({'status': 'failure', 'message': "one is wrong"}), 404

# Route for adding a new user
@app.route('/add_user', methods=['POST'])
def add_user():
    # Extract data from request
    data = request.get_json()
    # Connect to MongoDB
    client = get_mongodb_client()
    # Attempt to log in the user using the usersDB module
    userId = data.get('userId')
    password = data.get('password')
    result = usersDB.addUser(client, userId, password)
    # Close the MongoDB connection   
    client.close()

    if result == "User added successfully":
        return jsonify({'status': 'success', 'message': result})
    elif result == "UserId already exists":
        return jsonify({'status': 'failure', 'message': result}), 409

# Route for getting the list of user projects
@app.route('/get_user_projects_list', methods=['POST'])
def get_user_projects_list():
    # Extract data from request
    data = request.get_json()
    # Connect to MongoDB
    client = get_mongodb_client()

    # Fetch the user's projects using the usersDB module
    userId = data.get('userId')
    result = usersDB.getUserProjectsList(client, userId)
    # Close the MongoDB connection
    client.close()
    # Return a JSON response
    return jsonify({"status": "success", "projects": result})

# Route for creating a new project
@app.route('/create_project', methods=['POST'])
def create_project():
    # Extract data from request
    data = request.get_json()
    # Connect to MongoDB
    client = get_mongodb_client()
    # Attempt to create the project using the projectsDB module
    userId = data.get('userId')
    projectName = data.get("projectName")
    projectId = data.get("projectId")
    description = data.get("description")
    if not userId:
        return jsonify({"status": "failure", "message": "User ID missing"}), 401
    result = projectsDB.createProject(client, projectName, projectId, description)
    # Close the MongoDB connection
    client.close()
    # Return a JSON response
    if result == "Project added successfully":
        return jsonify({'status': 'success', 'message': result})
    elif result == "ProjectId already taken":
        return jsonify({'status': 'failure', 'message': result}), 409

# Route for getting project information
@app.route('/get_project_info', methods=['POST'])
def get_project_info():
    # Extract data from request

    # Connect to MongoDB
    client = get_mongodb_client()

    # Fetch project information using the projectsDB module

    # Close the MongoDB connection
    client.close()

    # Return a JSON response
    return jsonify({})

# Route for getting all hardware names
@app.route('/get_all_hw_names', methods=['POST'])
def get_all_hw_names():
    # Connect to MongoDB
    client = get_mongodb_client()

    # Fetch all hardware names using the hardwareDB module

    # Close the MongoDB connection
    client.close()

    # Return a JSON response
    return jsonify({})

# Route for getting hardware information
@app.route('/get_hw_info', methods=['POST'])
def get_hw_info():
    #use chat to refine code 
    # Extract data from request
    data = request.get_json()
    hwSetName = data.get('hwSetName')

    # Connect to MongoDB
    client = get_mongodb_client()

    # Fetch hardware set information using the hardwareDB module
    hw = hardwareDB.queryHardwareSet(client, hwSetName)
    # Close the MongoDB connection
    client.close()
    if hw:
        return jsonify({
            'capacity': hw['capacity'],
            'availability': hw['availability']
        })
    else:
        # Return a JSON response
        return jsonify({'error': 'Hardware set not found'}), 404

# Route for checking out hardware
@app.route('/check_out', methods=['POST'])
def check_out():
    # Extract data from request
    data = request.get_json()
    hwSetName = data.get('hwSetName')
    qty = int(data.get('qty'))
    projectId = data.get('projectId')
    # Connect to MongoDB
    client = get_mongodb_client()

    # Attempt to check out the hardware using the projectsDB module
    result = projectsDB.checkOutHW(client, projectId, hwSetName, qty)
    # Close the MongoDB connection
    client.close()

    # Return a JSON response
    return jsonify({'sucess':result})

# Route for checking in hardware
@app.route('/check_in', methods=['POST'])
def check_in():
    # Extract data from request

    # Connect to MongoDB
    client = get_mongodb_client()

    # Attempt to check in the hardware using the projectsDB module

    # Close the MongoDB connection
    client.close()

    # Return a JSON response
    return jsonify({})

# # Route for creating a new hardware set (no need to create hardware set in this project)
# @app.route('/create_hardware_set', methods=['POST'])
# def create_hardware_set():
#     # Extract data from request

#     # Connect to MongoDB
#     client = get_mongodb_client()

#     # Attempt to create the hardware set using the hardwareDB module

#     # Close the MongoDB connection
#     client.close()

#     # Return a JSON response
#     return jsonify({})

# Route for checking the inventory of projects
@app.route('/api/inventory', methods=['GET'])
def check_inventory():
    # Connect to MongoDB
    client = get_mongodb_client()

    # Fetch all projects from the HardwareCheckout.Projects collection

    # Close the MongoDB connection
    client.close()

    # Return a JSON response
    return jsonify({})

# Main entry point for the application
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=False, host='0.0.0.0', port=port)

