# Import necessary libraries and modules
from bson.objectid import ObjectId
from flask import Flask, request, jsonify
from pymongo import MongoClient
import os
import sys

# Import custom modules for database interactions
import usersDatabase as usersDB
import projectsDatabase as projectsDB
import hardwareDatabase as hardwareDB
from config import config

# Initialize a new Flask web application
app = Flask(__name__)

# Configure Flask from environment variables
app.config['DEBUG'] = config.flask_debug

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
        sys.exit(1)

# Test MongoDB connection on startup
try:
    test_client = get_mongodb_client()
    test_client.close()
    print("✓ MongoDB connection successful")
except Exception as e:
    print(f"✗ Failed to connect to MongoDB: {e}")
    print("Please check your environment variables in .env file")
    sys.exit(1)


@app.route('/api', methods=['POST'])
def api():
    data = request.json
    if data['input'] == 'Jason':
        return jsonify({'response': 'Hello, Jason!'})
    else:
        return jsonify({'response': 'User not found'}), 404

# Route for user login
@app.route('/login', methods=['POST'])
def login():
    # Extract data from request

    # Connect to MongoDB
    client = get_mongodb_client()

    # Attempt to log in the user using the usersDB module

    # Close the MongoDB connection
    client.close()

    # Return a JSON response
    return jsonify({})

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

    # Connect to MongoDB
    client = get_mongodb_client()

    # Attempt to join the project using the usersDB module

    # Close the MongoDB connection
    client.close()

    # Return a JSON response
    return jsonify({})

# Route for adding a new user
@app.route('/add_user', methods=['POST'])
def add_user():
    # Extract data from request

    # Connect to MongoDB
    client = get_mongodb_client()

    # Attempt to add the user using the usersDB module

    # Close the MongoDB connection
    client.close()

    # Return a JSON response
    return jsonify({})

# Route for getting the list of user projects
@app.route('/get_user_projects_list', methods=['POST'])
def get_user_projects_list():
    # Extract data from request

    # Connect to MongoDB
    client = get_mongodb_client()

    # Fetch the user's projects using the usersDB module

    # Close the MongoDB connection
    client.close()

    # Return a JSON response
    return jsonify({})

# Route for creating a new project
@app.route('/create_project', methods=['POST'])
def create_project():
    # Extract data from request

    # Connect to MongoDB
    client = get_mongodb_client()

    # Attempt to create the project using the projectsDB module

    # Close the MongoDB connection
    client.close()

    # Return a JSON response
    return jsonify({})

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
    # Extract data from request

    # Connect to MongoDB
    client = get_mongodb_client()

    # Fetch hardware set information using the hardwareDB module

    # Close the MongoDB connection
    client.close()

    # Return a JSON response
    return jsonify({})

# Route for checking out hardware
@app.route('/check_out', methods=['POST'])
def check_out():
    # Extract data from request

    # Connect to MongoDB
    client = get_mongodb_client()

    # Attempt to check out the hardware using the projectsDB module

    # Close the MongoDB connection
    client.close()

    # Return a JSON response
    return jsonify({})

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

# Route for creating a new hardware set
@app.route('/create_hardware_set', methods=['POST'])
def create_hardware_set():
    # Extract data from request

    # Connect to MongoDB
    client = get_mongodb_client()

    # Attempt to create the hardware set using the hardwareDB module

    # Close the MongoDB connection
    client.close()

    # Return a JSON response
    return jsonify({})

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
    app.run(debug=config.flask_debug, host='0.0.0.0', port=5001)

