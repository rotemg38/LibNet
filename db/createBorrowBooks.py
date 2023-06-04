import json
import random
from datetime import datetime, timedelta

# Number of users and books
num_users = 1000
num_books = 2500

# Total number of rows
total_rows = 1500

# Random seed for reproducibility (optional)
random.seed(42)

# Output file path
output_file = 'libNetBorrowBooks.json'

# Generate borrow data
borrow_data = []

user_ids = list(range(1, num_users + 1))
book_ids = list(range(1, num_books + 1))

random.shuffle(user_ids)
random.shuffle(book_ids)


# Generate borrow data for each combination

for i in range(total_rows):
    id_user = user_ids[i % num_users]
    id_book = book_ids[i % num_books]
    borrow_date = datetime.now() - timedelta(days=random.randint(1, 365))
    return_date = borrow_date + timedelta(days=random.randint(1, 30))
    borrow_data.append({
        'idUser': id_user,
        'idBook': id_book,
        'dateBorrow': borrow_date.strftime("%Y-%m-%d %H:%M:%S"),
        'returnDate': return_date.strftime("%Y-%m-%d %H:%M:%S"),
        'numLong': 0,
        'status': 'returned'
    })
    random.shuffle(user_ids)
    random.shuffle(book_ids)
    if i%250 == 0:
        print("Progress: " +str(i) +" / "+str(total_rows))

# Write borrow data to JSON file
with open(output_file, 'w') as jsonfile:
    json.dump(borrow_data, jsonfile, indent=4)

print(f"JSON file '{output_file}' generated successfully.")
