import json
from pymongo import MongoClient
# for db configuration
from dotenv.main import load_dotenv
import os

load_dotenv()

# MongoDB Atlas connection details
mongo_username = os.environ['MONGO_USER']
mongo_password = os.environ['MONGO_PASS']
mongo_host = os.environ['MONGO_HOST']
mongo_db = os.environ['MONGO_DB']

# JSON file path
json_file_books = 'libNetBooks.json'
json_file_users = 'libNetUsers.json'
json_file_ratings = 'libNetRatings.json'
json_file_borrowBooks = 'libNetBorrowBooks.json'

files = [("users", json_file_users), ("books", json_file_books), ("ratings", json_file_ratings), ("borrowbooks", json_file_borrowBooks)]
#files = [("books", json_file_books)]
# Connection URI for MongoDB Atlas
connection_uri = f"mongodb+srv://{mongo_username}:{mongo_password}@{mongo_host}/{mongo_db}?retryWrites=true&w=majority"

# Connect to MongoDB Atlas
client = MongoClient(connection_uri)
db = client[mongo_db]

for file in files:
    collection_name, file_name = file
    collection = db[collection_name]

    # Read data from JSON file
    with open(file_name, 'r') as file:
        data = json.load(file)

    # Insert data into MongoDB collection
    collection.insert_many(data)
    print(f"Data inserted into '{collection_name}' collection successfully.")

# Close MongoDB connection
client.close()


