const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fs = require("fs");
const { spawn } = require("child_process");

app.use(bodyParser.json());

// Set up API endpoints
app.get("/api/metrics", (req, res) => {
  try {
    const metricsData = readJsonFileSync("metrics.json");
    res.json(metricsData);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving metrics data" });
  }
});

// app.get("/api/predictions", (req, res) => {
//   try {
//     const predictionsData = readJsonFileSync("predictions.json");

//     // Generate new predictions using Python script
//     // generatePredictions((newPredictions) => {
//     //   predictionsData.push(...newPredictions);

//     //   // Update predictions.json file
//     //   fs.writeFileSync(
//     //     "predictions.json",
//     //     JSON.stringify(predictionsData, null, 2)
//     //   );

//     //   res.json(predictionsData);
//     // });
//     res.json(predictionsData);
//   } catch (error) {
//     res.status(500).json({ error: "Error retrieving predictions data" });
//   }
// });

// Helper function to read JSON file synchronously
// ...

app.get("/api/predictions", (req, res) => {
  try {
    const predictionsData = readJsonFileSync("predictions.json");

    // Generate new predictions using Python script
    const pythonProcess = spawn("python", ["ai_predictions.py"]);
    let newPredictions = "";

    pythonProcess.stdout.on("data", (data) => {
      newPredictions += data.toString();
    });

    pythonProcess.on("close", () => {
      try {
        newPredictions = JSON.parse(newPredictions);
        predictionsData.push(...newPredictions);

        // Update predictions.json file
        fs.writeFileSync(
          "predictions.json",
          JSON.stringify(predictionsData, null, 2)
        );

        res.json(predictionsData);
      } catch (error) {
        res
          .status(500)
          .json({ error: "Error processing new predictions data" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Error retrieving predictions data" });
  }
});

// ...

function readJsonFileSync(filename) {
  const rawData = fs.readFileSync(filename);
  return JSON.parse(rawData);
}

// Call Python script to generate predictions
function generatePredictions(callback) {
  const pythonProcess = spawn("python", ["ai_predictions.py"]);
  let newPredictions = "";

  pythonProcess.stdout.on("data", (data) => {
    newPredictions += data.toString();
  });

  pythonProcess.on("close", () => {
    newPredictions = JSON.parse(newPredictions);
    callback(newPredictions);
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
