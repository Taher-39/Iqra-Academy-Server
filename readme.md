Certainly! Below is the markdown file (`readme.md`) with step-by-step installation instructions for your `iqra-academy-server` project:

# iqra-academy-server

## Description
This is a starter template for a Node.js application built with TypeScript, Express.js, and MongoDB using Mongoose.

## Installation

### Step 1: Clone the Repository

```bash
git clone <repository_url>
cd iqra-academy-server
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Variables
Create a `.env` file in the root directory and add your environment variables. For example:
```dotenv
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mydatabase
```

### Step 4: Build TypeScript
If you plan to run the project in production mode, you need to build TypeScript files to JavaScript.
```bash
npm run build
```

### Step 5: Start the Server
```bash
npm run start:prod
```
This command starts the server in production mode.

### Development Mode
If you're working on the project and want to run it in development mode with automatic restart on file changes, use the following command:
```bash
npm run start:dev
```

## Scripts

### Build TypeScript
To manually compile TypeScript files to JavaScript, you can run:
```bash
npm run build
```

### Linting
To lint your TypeScript files using ESLint, run:
```bash
npm run lint
```
To automatically fix linting issues, run:
```bash
npm run lint:fix
```

### Code Formatting
To format your code using Prettier, run:
```bash
npm run format
```
To fix formatting issues automatically, run:
```bash
npm run format:fix
```

### Testing
This project doesn't have any testing scripts configured yet. You can add testing frameworks and scripts as needed.

## License
This project is licensed under the ISC License. See the LICENSE file for details.
```

Feel free to customize the installation steps and add more information specific to your project as needed.