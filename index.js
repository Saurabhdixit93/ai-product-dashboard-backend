const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const fs = require("fs");
const { spawn } = require("child_process");

app.use(bodyParser.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONT_END_HOME_URL);
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});
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
