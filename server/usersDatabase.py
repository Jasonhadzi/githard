# Import necessary libraries and modules
from pymongo import MongoClient

import projectsDatabase as projectsDB

'''
Structure of User entry:
User = {
    'username': username,
    'userId': userId,
    'password': password,
    'projects': [project1_ID, project2_ID, ...]
}
'''

# Function to add a new user
def addUser(client, username, userId, password):
    # Add a new user to the database
    pass

# Helper function to query a user by username and userId
def __queryUser(client, username, userId):
    # Query and return a user from the database
    pass

# Function to log in a user
def login(client, username, userId, password):
    """
     Authenticate a user by checking their username, userId, and password in the MongoDB users collection.

    Args:
        client: A MongoClient instance.
        username (str): The user's username.
        userId (str): The user's unique ID.
        password (str): The user's password (plaintext or hashed, depending on usage).

    Returns:
        string: indicating if user is found, wrong password, or success.
    """
    users_collection = client["GitHard"]["users"]
    user = users_collection.find_one({"username": username, "userId": userId})

    if not user:
        return "user_not_found"
    elif user["password"] != password:
        return "wrong_password"
    else:
        return "success"

# Function to add a user to a project
def joinProject(client, userId, projectId):
    # Add a user to a specified project
    pass

# Function to get the list of projects for a user
def getUserProjectsList(client, userId):
    # Get and return the list of projects a user is part of
    pass

