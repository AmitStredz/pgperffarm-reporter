# PostgreSQL Performance Farm Frontend

A JavaScript/React-based frontend for visualizing PostgreSQL performance test results. This application allows users to navigate and analyze data collected from various performance tests run against different branches of PostgreSQL.

## Features

- Browse different performance test types (DBT-2, DBT-3, DBT-5, DBT-7)
- Select specific test plants (machines) running the tests
- Compare performance metrics across multiple PostgreSQL branches
- Filter results by date range
- Interactive charts visualizing performance over time
- Detailed commit information on hover/click
- Tabular view of all performance results

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd pgperffarm-frontend
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `src/components/` - Reusable React components
- `src/pages/` - Page components for different routes
- `src/services/` - API services for data fetching
- `src/utils/` - Utility functions
- `src/mock-data/` - Sample data for development

## Configuration

By default, the application uses mock data for development. To connect to a real backend:

1. Open `src/services/api.js`
2. Set `USE_MOCK_DATA` to `false`
3. Update `API_BASE_URL` to point to your backend server

## Demo

The application provides a visualization of performance metrics for:

- Different PostgreSQL tests (OLTP and DSS benchmarks)
- Multiple test plants
- Various PostgreSQL branches (HEAD, stable releases)
- Performance over time with commit details

## Usage

1. Start at the home page to select a test type
2. Choose a specific plant (machine) running the tests
3. Select one or more branches to compare
4. Optionally filter by date range
5. View the performance chart and table
6. Click on data points for detailed commit information

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## License

This project is licensed under the PostgreSQL License.
