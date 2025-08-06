# Import necessary libraries and modules
from pymongo import MongoClient

'''
Structure of Hardware Set entry:
HardwareSet = {
    'hwSetName': hwSetName,
    'capacity': initCapacity,
    'availability': initCapacity
}
'''

# Function to create a new hardware set
def createHardwareSet(client, hwSetName, initCapacity):
    # Create a new hardware set in the database
    db = client['GitHard']
    hw_col = db['hardware']

    existing = hw_col.find_one({"hwSetName": hwSetName})
    if existing:
        return False, f"{hwSetName} set already exists"

    hw_set = {
        'hwSetName' : hwSetName,
        'capacity': initCapacity,
        'availability': initCapacity
    }

    hw_col.insert_one(hw_set)
    return True, "Hardware set created successfully!"

# Function to query a hardware set by its name
def queryHardwareSet(client, hwSetName):
    """
    Return a hardware data set, including hwSetName.
    Args:
        client: A MongoClient instance
        hwSetName(str): The Unique hardware name
    
    Returns:
        tuple:
            - bool: Indicate whether the hardware exists
            - dict or str: A hardware data set
    """
    db = client['GitHard']
    hw_col = db['hardware']

    hw_set = hw_col.find_one({"hwSetName": hwSetName})
    if not hw_set:
        return False, "Hardware set does not exist"

    return True, hw_set

# Function to update the availability of a hardware set
def updateAvailability(client, hwSetName, newAvailability):
    # Update the availability of an existing hardware set
    hw_col = client['GitHard']['hardware']

    hw_set = hw_col.find_one({"hwSetName": hwSetName})
    if not hw_set:
        return False
    
    currAvailability = hw_set.get('availability')
    currCapacity = hw_set.get("capacity")

    if currCapacity >= (currAvailability + newAvailability):
        hw_col.update_one({'hwSetName' : hwSetName}, {'$set':{'availability': currAvailability + newAvailability}})
        return True
    else:
        return False

# Function to request space from a hardware set
def requestSpace(client, hwSetName, amount):
    # Request a certain amount of hardware and update availability
    hw_col = client['GitHard']['hardware']

    hw_set = hw_col.find_one({"hwSetName": hwSetName})
    if not hw_set:
        return False

    currAvailability = hw_set.get('availability')

    if currAvailability >= amount:
        hw_col.update_one({'hwSetName' : hwSetName}, {'$set':{'availability': currAvailability - amount}})
        return True
    else:
        return False



# Function to get all hardware set names
def getAllHwSetNames(client):
    # Get and return a list of all hardware set names
    pass


