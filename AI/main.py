import pandas as pd

import matplotlib.pyplot as plt

# Sample data: symptoms and corresponding diseases
data = {
    'symptoms': ['fever', 'cough', 'fatigue', 'headache', 'sore throat'],
    'disease': ['Flu', 'Cold', 'COVID-19', 'Migraine', 'Strep Throat'],
    'count': [50, 30, 20, 15, 10]
}

# Create a DataFrame
df = pd.DataFrame(data)

# Function to suggest disease based on symptoms
def suggest_disease(symptom):
    if symptom in df['symptoms'].values:
        disease = df.loc[df['symptoms'] == symptom, 'disease'].values[0]
        return f"Suggested disease for symptom '{symptom}': {disease}"
    else:
        return "Symptom not found."

# Visualize the data
plt.bar(df['symptoms'], df['count'], color='skyblue')
plt.xlabel('Symptoms')
plt.ylabel('Count')
plt.title('Symptoms and Disease Count')
plt.xticks(rotation=45)
plt.tight_layout()  
plt.show()

# Example usage
user_symptom = input("Enter a symptom: ")
print(suggest_disease(user_symptom))