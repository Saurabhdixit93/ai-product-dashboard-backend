import sys
import random
import json

def simulate_prediction(input_data):
    prediction = random.choice([0, 1])
    actual = random.choice([0, 1])
    return {
        "input": input_data,
        "prediction": prediction,
        "actual": actual
    }

# Generate new predictions
new_predictions = [simulate_prediction([random.random() for _ in range(3)]) for _ in range(5)]

# Print the new predictions as JSON
sys.stdout.write(json.dumps(new_predictions))
sys.stdout.flush()
