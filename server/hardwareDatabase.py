# Import necessary libraries and modules
from pymongo import MongoClient

'''
Structure of Hardware Set entry:
HardwareSet = {
    'hwName': hwSetName,
    'capacity': initCapacity,
    'availability': initCapacity
}
'''

# Function to create a new hardware set
def createHardwareSet(client, hwSetName, initCapacity):
    # Create a new hardware set in the database
    pass

# Function to query a hardware set by its name
def queryHardwareSet(client, hwSetName):
    # Query and return a hardware set from the database
    return client.hardwareSets.find_one({ 'hwName': hwSetName })#return the hrdware sets by name

# Function to update the availability of a hardware set
def updateAvailability(client, hwSetName, newAvailability):
    # Update the availability of an existing hardware 
    #chat had to help em with this one to refine the code. 
    result = client.hardwareSets.update_one(
        { 'hwName': hwSetName },
        { '$set': { 'availability': newAvailability } }
    )
    return result.modified_count > 0

# Function to request space from a hardware set
def requestSpace(client, hwSetName, amount):
    # Request a certain amount of hardware and update availability
    pass

# Function to get all hardware set names
def getAllHwNames(client):
    # Get and return a list of all hardware set names
    pass

