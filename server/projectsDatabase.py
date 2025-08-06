# Import necessary libraries and modules
from pymongo import MongoClient

import hardwareDatabase as hardwareDB

'''
Structure of Project entry:
Project = {
    'projectName': projectName,
    'projectId': projectId,
    'description': description,
    'hwSets': {HW1: 0, HW2: 10, ...},
    'users': [user1, user2, ...]
}
'''

# Function to query a project by its ID
def queryProject(client, projectId):
    # Query and return a project from the database
    pass

# Function to create a new project
def createProject(client, projectName, projectId, description):
    """
     Create a new project in the MongoDB project collection.

    Args:
        client: A MongoClient instance.
        projectName (str): The user's username.
        projectId(str): The user's password (plaintext or hashed, depending on usage).
        descriotun(str): describe project

    Returns:
        string: indicating if project created.
    """
    projects_collection = client["GitHard"]["projects"]
    project = projects_collection.find_one({"projectId": projectId})
    if project:
        return "ProjectId already taken"
    else:
        project_data = {
            "projectName": projectName,
            "description":description,
            "projectId":projectId
        }
        projects_collection.insert_one(project_data)
        return "Project added successfully"

# Function to add a user to a project
def addUser(client, projectId, userId):
    """
     A user join a project.

    Args:
        client: A MongoClient instance.
        projectId (str): Project's id
        userId(str): User's id.

    Returns:
        string: indicating if project created.
    """
    projects_collection = client["GitHard"]["projects"]
    project = projects_collection.find_one({"projectId": projectId})
    if not project:
        return "Project does not exist"
    projects_collection.update_one(
    {"projectId": projectId},
    {"$push": {"users": userId}}
    )
    return "Project joined successfully"


# Function to update hardware usage in a project
def updateUsage(client, projectId, hwSetName):
    # Update the usage of a hardware set in the specified project
    pass

# Function to check out hardware for a project
def checkOutHW(client, projectId, hwSetName, qty, userId=None):
    # Check out hardware for the specified project and update availability
    hw = hardwareDB.queryHardwareSet(client, hwSetName)
    if not hw or hw['availability'] < qty:
        return False

    # update the hardware valibility
    newAvail = hw['availability'] - qty
    hardwareDB.updateAvailability(client, hwSetName, newAvail)

    # add tge aty project to the hw sets 
    client.projects.update_one(
        { 'projectId': projectId },
        { '$inc': { f"hwSets.{hwSetName}": qty } },
        upsert=True
    )

    return True

# Function to check in hardware for a project
def checkInHW(client, projectId, hwSetName, qty, userId):
    # Check in hardware for the specified project and update availability
    pass

