import json

def count_records():
    with open('/home/domingo/web-avanzado/vue-group-04/scrapper/output.json') as file:
        data = json.load(file)
        count = len(data)
    return count

if __name__ == '__main__':
    count = count_records()
    print(f'The number of records is: {count}')