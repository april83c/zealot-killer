FROM node:18-bullseye-slim

WORKDIR /app

# Install only essential build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
    && ln -sf python3 /usr/bin/python \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build TypeScript code
RUN npm run build || (echo "Build script not found, creating one" && \
    echo '{"scripts":{"build":"tsc"}}' > tsconfig-build.json && \
    npx json -I -f package.json -e "this.scripts=Object.assign(this.scripts||{}, {build:'tsc'})" && \
    npm run build)

# Create a health check endpoint for CapRover
RUN mkdir -p /app/dist/health && \
    echo 'const http = require("http"); \
    const server = http.createServer((req, res) => { \
      if (req.url === "/health") { \
        res.writeHead(200); \
        res.end("OK"); \
      } else { \
        res.writeHead(404); \
        res.end(); \
      } \
    }); \
    server.listen(80); \
    console.log("Health check server running on port 80"); \
    \
    // Start the main bot application \
    require("../index.js");' > /app/dist/health/server.js

# Set environment variables
ENV NODE_ENV=production

# Wait for MongoDB to be ready before starting the application
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.9.0/wait /wait
RUN chmod +x /wait

# Start with health check server and wait for MongoDB
CMD /wait && node /app/dist/health/server.js