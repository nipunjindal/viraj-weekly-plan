import pandas as pd
import json

# Read the Excel file
df = pd.read_excel('weekly_plan.xlsx')

# Convert the DataFrame to a list of dictionaries
plan_data = df.to_dict(orient='records')

# Write the JSON data to a file
with open('data/plan.json', 'w') as f:
    json.dump(plan_data, f, indent=4)

print("Conversion to JSON complete. The file is at data/plan.json")
