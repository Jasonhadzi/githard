# Import necessary libraries and modules
from pymongo import MongoClient

import projectsDatabase as projectsDB

'''
Structure of User entry:
User = {
    'userId': userId,
    'password': password,
    'projects': [project1_ID, project2_ID, ...]
}
'''

# Function to add a new user
def addUser(client, userId, password):
    """
     Create a neww user in the MongoDB users collection.

    Args:
        client: A MongoClient instance.
        username (str): The user's username.
        password (str): The user's password (plaintext or hashed, depending on usage).

    Returns:
        string: indicating if user is added.
    """
    users_collection = client["GitHard"]["users"]
    user = users_collection.find_one({"userId": userId})
    if user:
        return "UserId already exists"
    else:
        user_data = {
            "userId": userId,
            "password": password,
            "projects":[]
        }
        users_collection.insert_one(user_data)
        return "User added successfully"

# # Helper function to query a user by username and userId (no need as we are using userId only)
# def __queryUser(client, username, userId):
#     # Query and return a user from the database
#     pass

# Function to log in a user
def login(client, userId, password):
    """
     Authenticate a user by checking their username, userId, and password in the MongoDB users collection.

    Args:
        client: A MongoClient instance.
        userId (str): The user's unique ID.
        password (str): The user's password (plaintext or hashed, depending on usage).

    Returns:
        string: indicating if user is found, wrong password, or success.
    """
    users_collection = client["GitHard"]["users"]
    user = users_collection.find_one({"userId": userId})

    if not user:
        return "user_not_found"
    elif user["password"] != password:
        return "wrong_password"
    else:
        return "success"

# Function to add a user to a project
def joinProject(client, userId, projectId):
    """
    Add a user to a specified project

    Args:
        client: A MongoClient instance.
        userId (str): The user's unique ID.
        projectId (str): The user's password (plaintext or hashed, depending on usage).

    Returns:
        string: indicating if user is found, wrong password, or success.
    """
    users_collection = client["GitHard"]["users"]
    user = users_collection.find_one({"userId": userId})


    if projectId in user.get("projects", []):
        return "Guide to Project Page"
    
    users_collection.update_one(
        {"userId": userId},
        {"$push": {"projects": projectId}}
    )
    return "Project joined successfully"

# Function to get the list of projects for a user
def getUserProjectsList(client, userId):
    """
    Get the list of projects for a user

    Args:
        client: A MongoClient instance.
        userId (str): The user's unique ID.

    Returns:
        List: projects the user joined
    """
    users_collection = client["GitHard"]["users"]
    user = users_collection.find_one({"userId": userId})

    if not user:
        return "User not found"

    return user.get("projects", [])
