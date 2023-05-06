import csv
import json
import random
from datetime import datetime, timedelta

# Set input and output file paths
input_file = './mock_users.csv'
output_file = 'libNetUsers.json'

# Define a function to generate a random date
def random_date():
    start_date = datetime.now() - timedelta(days=365*10)
    end_date = datetime.now()
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    return start_date + timedelta(days=random_number_of_days)

# Define a function to generate a random addresses
def random_address():
    addresses = ["Tel Aviv, herzel", "Ramat Gan", "Tel Aviv", "Tel Aviv, Hashalom"]
    return random.choice(addresses)


picUsers = ["https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp", 
                "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava4-bg.webp", 
                "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp", 
                "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp",
                "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"]
for k in range(1,26):
    picUsers.append("https://mdbcdn.b-cdn.net/img/new/avatars/"+str(k)+".webp")
# Define a function to generate a random images
def random_picUser():
    return random.choice(picUsers)

i = 2
# Open the input file for reading
with open(input_file, newline='', encoding='latin-1') as csvfile:
    reader = csv.DictReader(csvfile, delimiter=',')

    # Initialize an empty list to hold the book data
    users = []
    users.append({"idUser":1,"firstName":"admin","lastName":"admin","picUser":"default_user.jpg","age":20,"createdAt":random_date().strftime("%Y-%m-%dT%H:%M:%S.%fZ"),"address":"tel aviv","password":"admin123","mail":"adminLibNet@gmail.com","isAdmin":True,"limitBooks":2})
    # Loop through each row in the input file
    for row in reader:
        # Generate a random number for age
        age = random.randint(18, 85)
        
        try:
            # Create a new user object with the desired schema and random values
            user = {
                "idUser": i,
                "firstName": row["firstName"],
                "lastName": row["lastName"],
                "mail": row["firstName"]+"@gmail.com",
                "age": age,
                "picUser": random_picUser(),
                "address": random_address(),
                "password": row["firstName"]+"123",
                "isAdmin": False,
                "limitBooks": 2,
                "createdAt": random_date().strftime("%Y-%m-%dT%H:%M:%S.%fZ")
            }

            # Append the new book object to the list of books
            users.append(user)
            i+=1
        except ValueError as e:
            print(e)
            print(row)
            raise(Exception)


    # Write the list of books to the output file as JSON
    with open(output_file, 'w') as json_out:
        json.dump(users, json_out, indent=4)

print(f"JSON file '{output_file}' generated successfully.")
