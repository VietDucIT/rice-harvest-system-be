# Update rice price from DB to .csv files (just 4 rices: OM 18, OM 5451, IR 504, Đài thơm 8)
import pymongo
import csv

myClient = pymongo.MongoClient('mongodb://localhost:27017/')
myDatabase = myClient['RICE_HARVEST_SYSTEM']
mySrcCollection = myDatabase['riceprices']
myDesCollection = myDatabase['predictionriceprices']

rices = ['OM 18', 'OM 5451', 'IR 504', 'Đài thơm 8']
om18 = []
om5451 = []
ir504 = []
daiThom8 = []

for x in mySrcCollection.find({'rice': {'$in': rices}}, {'_id': 0, 'price': 0, 'createdAt': 0, 'updatedAt': 0, '__v': 0}).sort('createdAt'):
  if x['rice'] == 'OM 18':
    om18.append([x['date'], x['average']])
  elif x['rice'] == 'OM 5451':
    om5451.append([x['date'], x['average']])
  elif x['rice'] == 'IR 504':
    ir504.append([x['date'], x['average']])
  elif x['rice'] == 'Đài thơm 8':
    daiThom8.append([x['date'], x['average']])

# Save data of OM 18
with open('src/data/om18.csv', 'w') as file:
  writer = csv.writer(file)
  writer.writerow(['Date', 'Price'])
  writer.writerows(om18)

# Save data of OM 5451
with open('src/data/om5451.csv', 'w') as file:
  writer = csv.writer(file)
  writer.writerow(['Date', 'Price'])
  writer.writerows(om5451)

# Save data of IR 504 
with open('src/data/ir504.csv', 'w') as file:
  writer = csv.writer(file)
  writer.writerow(['Date', 'Price'])
  writer.writerows(ir504)

# Save data of Dai Thom 8
with open('src/data/daiThom8.csv', 'w') as file:
  writer = csv.writer(file)
  writer.writerow(['Date', 'Price'])
  writer.writerows(daiThom8)
  