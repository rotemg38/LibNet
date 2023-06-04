import csv
import json
import random
from datetime import datetime, timedelta

# Number of users and books
num_users = 1000
num_books = 2500

# Number of ratings per user
min_ratings_per_user = 5

# Number of random users to rate books
num_raters = 870

# Random seed for reproducibility (optional)
random.seed(42)

# Output file path
output_file = 'libNetRatings.json'

# Generate random ratings
ratings = []
users = random.sample(range(1, num_users + 1), num_raters)

# Define a function to generate a random date
def random_date():
    start_date = datetime.now() - timedelta(days=365*10)
    end_date = datetime.now()
    time_between_dates = end_date - start_date
    days_between_dates = time_between_dates.days
    random_number_of_days = random.randrange(days_between_dates)
    return start_date + timedelta(days=random_number_of_days)

for user in users:
    books = list(range(1, num_books + 1))#random.sample(range(1, num_books + 1), num_raters * min_ratings_per_user)
    for _ in range(min_ratings_per_user):
        book = random.choice(books)
        books.remove(book)
        created_at = random_date().strftime("%Y-%m-%dT%H:%M:%S.%fZ")
        rate_num = random.randint(1, 5)
        ratings.append({"idUser":user, "idBook":book, "createdAt":created_at, "rateNum":rate_num})

# Write ratings to json file
with open(output_file, 'w') as json_out:
        json.dump(ratings, json_out, indent=4)

print(f"JSON file '{output_file}' generated successfully.")
