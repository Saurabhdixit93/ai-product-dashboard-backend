# AI Product Dashboard Backend

This repository contains the backend components for an AI product's dashboard. It includes a Node.js server using Express to serve API endpoints, and a Python script for generating mock AI predictions.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

To run this project, you need to have the following software installed:

- Node.js (https://nodejs.org/)
- Python (https://www.python.org/)

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/saurabhdixit93/ai-product-dashboard-backend.git
   ```

````

2. Navigate to the project directory:

   ```bash
   cd ai-product-dashboard-backend
   ```

3. Install Node.js dependencies:

   ```bash
   npm install
   ```

4. Create mock data files:

   - Create `metrics.json` and `predictions.json` files in the project directory with initial mock data.

## Usage

1. Start the Node.js server:

   ```bash
   node index.js
   ```

2. Access the API endpoints in your browser or using a tool like Postman:

   - Mock Metrics: `http://localhost:3000/api/metrics`
   - Mock Predictions: `http://localhost:3000/api/predictions`

## Endpoints

- **GET /api/metrics**: Retrieve mock AI model metrics data in JSON format.

- **GET /api/predictions**: Retrieve simulated AI predictions and actual results for data visualization.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
````
