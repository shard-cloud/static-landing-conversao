FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy source files
COPY . .

# Build static files
RUN npm run build

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:80/health.html').then(r => r.ok ? process.exit(0) : process.exit(1))" || exit 1

EXPOSE 80

# Serve with production-ready static server
CMD ["npm", "start"]

