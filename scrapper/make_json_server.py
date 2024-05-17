import json

# Read the input file
with open("output.sanitized.json", "r") as input_file:
    records = json.load(input_file)

# Add id to each record
for i, record in enumerate(records):
    record["id"] = i + 1

# Create the database object
database = {"walks": records}

# Write the database object to the output file
with open("db.json", "w") as output_file:
    json.dump(database, output_file, indent=4)
