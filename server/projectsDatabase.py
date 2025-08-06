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
    """
    Return a project data set, including projectId.
    Args:
        client: A MongoClient instance
        projectId(str): The Unique ID for project
    
    Returns:
        tuple:
            - bool: Indicate whether the project exists
            - dict or str: A project data set
    """
    pr_col = client["GitHard"]["projects"]

    pr_set = pr_col.find_one({"projectId": projectId})
    if not pr_set:
        return False, "Project does not exist"
    
    return True, pr_set

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
def updateUsage(client, projectId, hwSetName, qty):
    # Update the usage of a hardware set in the specified project
    project_col = client['GitHard']['projects']
    project = project_col.find_one({"projectId": projectId})

    if not project:
        print("Project does not exist")
        return False
    
    hw_sets = project.get("hwSets", {})
    if hwSetName not in hw_sets:
        hw_sets[hwSetName] = qty
    else:
        hw_sets[hwSetName] += qty

    project_col.update_one(
        {"projectId":projectId},
        {"$set":{"hwSets":hw_sets}}
    )
    return True

# Function to check out hardware for a project
def checkOutHW(client, projectId, hwSetName, qty, userId=None):
    # Check out hardware for the specified project and update availability
    db = client["GitHard"]

    project = db["projects"].find_one({"projectId": projectId})
    if not project:
        return "Project does not exist"
    
    user = db["users"].find_one({"userId": userId})
    if not user:
        return "User does not exist"
    
    hw = db["hardware"].find_one({"hwSetName":hwSetName})
    if not hw:
        return "Hardware does not exist"
    
    availableQty = hw["availability"]
    if availableQty < qty:
        return "Not enough units available to check out"
    
    hardwareDB.requestSpace(client, hwSetName, qty)
    updateUsage(client, projectId, hwSetName, qty)
    
    if userId not in project.get('users',[]):
        addUser(client, projectId, userId)
    
    return "Checked out successfully"

# Function to check in hardware for a project
def checkInHW(client, projectId, hwSetName, qty, userId):
    # Check in hardware for the specified project and update availability
    db = client["GitHard"]

    project = db["projects"].find_one({"projectId": projectId})
    if not project:
        return "Project does not exist"
    
    user = db["users"].find_one({"userId": userId})
    if not user:
        return "User does not exist"
    
    hw = db["hardware"].find_one({"hwSetName":hwSetName})
    if not hw:
        return "Hardware does not exist"

    currCapacity = hw.get("capacity")
    currAvailability = hw.get("availability")
    newQty = qty + currAvailability
    if currCapacity < newQty:
        return "Too big to check in"
    
    hardwareDB.updateAvailability(client, hwSetName, qty)
    updateUsage(client, projectId, hwSetName, -qty)

    if userId not in project.get('users',[]):
        addUser(client, projectId, userId)
    
    return "Checked in successfully"