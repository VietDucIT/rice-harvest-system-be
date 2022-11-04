# import sys
# print("Argument: " + sys.argv[1])

# print("Service Output")

import pymongo

print("Predict Access.")

myClient = pymongo.MongoClient("mongodb://localhost:27017/")
myDatabase = myClient["RICE_HARVEST_SYSTEM"]
mySrcCollection = myDatabase["riceprices"]
myDesCollection = myDatabase["predictionriceprices"]

for x in mySrcCollection.find({"isDeleted": False}, {"_id": 0, "createdAt": 0, "updatedAt": 0, "_v": 0}):
  print(x)
  y = myDesCollection.insert_one(x)
  print(y.inserted_id)

# for x in myDesCollection.find({}, {"_id": 0, "min": 0, "max": 0}):
#   print(x)
