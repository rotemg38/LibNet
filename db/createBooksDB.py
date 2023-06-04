import csv
import json
import random
from datetime import datetime, timedelta

# Set input and output file paths
input_file = './books.csv'
output_file = 'libNetBooks.json'

max_books = 2501

# Define a function to generate a random date
def random_date():
    start_date = datetime.now() - timedelta(days=365*10)
    end_date = datetime.now()
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    return start_date + timedelta(days=random_number_of_days)

# Define a function to generate a random category
def random_category():
    categories = ["Fiction", "Non-fiction", "Science Fiction", "Romance", "Mystery"]
    return random.choice(categories)

# Define a function to generate a random summary
def random_summary():
    #summaries = ["Lorem ipsum dolor sit amet", "Consectetur adipiscing elit", "Sed do eiusmod tempor incididunt"]
    #return random.choice(summaries)
    return "No available summary, sorry!"

# Define a function to generate a random language
def random_language():
    languages = ["English", "French", "German", "Spanish", "Hebrew"]
    return random.choice(languages)

# Define a function to generate a random location
def random_location():
    locations = ["youth", "kids", "adults"]
    return random.choice(locations)


serieses = []
for k in range(1,int(max_books*0.1)):
    serieses.append(None)

for j in range(1,max_books):
    serieses.append("series"+ str(j))

# Define a function to generate a random series name
def random_series():
    return random.choice(serieses)

i = 1
# Open the input file for reading
with open(input_file, newline='', encoding='latin-1') as csvfile:
    reader = csv.DictReader(csvfile, delimiter=';')

    # Initialize an empty list to hold the book data
    books = []

    # Loop through each row in the input file
    for row in reader:
        if i == max_books: #max books!
            break
        if len(row["Book-Title"]) <=25 and row["Book-Title"].isalpha():
            # Generate a random number for numPages and copies
            num_pages = random.randint(100, 500)
            copies = random.randint(1, 10)
            
            # Generate random language and summary
            language = random_language()
            summary = random_summary()

            # Generate random location
            location = random_location()
            try:
                # Create a new book object with the desired schema and random values
                book = {
                    "idBook": i,
                    "bookName": row["Book-Title"],
                    "category": random_category(),
                    "author": row["Book-Author"],
                    "picBook": row["Image-URL-L"],
                    "publishing": row["Publisher"],
                    "publishingYear": int(row["Year-Of-Publication"]),
                    "numPages": num_pages,
                    "summary": summary,
                    "copies": copies,
                    "copyAvailable": copies,
                    "language": language,
                    "location": location,
                    "seriesName": random_series(),
                    "createdAt": random_date().strftime("%Y-%m-%dT%H:%M:%S.%fZ")
                }

                # Append the new book object to the list of books
                books.append(book)
                i+=1
            except ValueError as e:
                print(e)
                print(row)
                raise(Exception)
            

    # Write the list of books to the output file as JSON
    with open(output_file, 'w') as json_out:
        json.dump(books, json_out, indent=4)

print(f"JSON file '{output_file}' with {i-1} books generated successfully.")
