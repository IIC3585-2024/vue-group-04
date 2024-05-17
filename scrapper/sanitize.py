import json

# Define the path to the input and output files
input_file = 'output.json'
output_file = 'output.sanitized.json'

# Read the input file with utf-8 encoding
with open(input_file, 'r', encoding='utf-8') as f:
    data = f.read()

# Remove jump lines and common unicode characters
sanitized_data = data.replace('\n', '').replace('\r', '').replace('\u2028', '').replace('\u2029', '')

# Convert the sanitized data to a JSON object
json_data = json.loads(sanitized_data)

# Function to remove leading and trailing whitespace from all keys and values
def sanitize_data(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, str):
                data[key] = value.strip().replace('\n', '')
            elif isinstance(value, (dict, list)):
                sanitize_data(value)
    elif isinstance(data, list):
        for item in data:
            sanitize_data(item)

# Call the sanitize_data function to sanitize the JSON data
sanitize_data(json_data)

# Write the pretty JSON data to the output file with utf-8 encoding
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(json_data, f, indent=4, ensure_ascii=False)

print("Sanitization complete. Output written to output.sanitized.json.")
