# Meal Tracker Frontend

> [!WARNING]  
> Please read the [Contribution Rules](./docs/contribution-rules.md) before working on this project.
> Following the workflow is required for all contributors.

> [!IMPORTANT]
> Before contributing, please review the [Project Structure](./docs/project-structure.md) to understand where new files should be created and the purpose of each folder.

## ⚙️ Prerequisites

Before running the project, make sure you have the following installed:

### 🐳 Docker (recommended)

* Install Docker Desktop: [https://www.docker.com/](https://www.docker.com/)
* Make sure Docker is running before executing any commands

### 💻 Node.js (optional, for local run without Docker)

* Install Node.js (LTS): [https://nodejs.org/en](https://nodejs.org/en)

---

This project is a React + Vite frontend application with Docker support for development and production.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/username/meal-tracker-fe.git
cd meal-tracker-fe
```

---

## 🐳 Run with Docker (Recommended)

### Development Environment
Start the Vite dev server with hot reloading and live code changes:

```bash
docker-compose up dev
```

- Builds the development image with cached dependencies for faster rebuilds.
- Access at: 👉 [http://localhost:5173](http://localhost:5173)
- Includes volume mounts for source code and polling for file watching (optimized for Windows).

### Production Environment
Build and run the optimized production app served via Nginx:

```bash
docker-compose build prod
docker-compose up prod
```

- Builds the app to `dist`, serves with Nginx on port 80.
- Includes custom `nginx.conf` for SPA routing, gzip compression, and security headers (e.g., CSP, XSS protection).
- Access at: 👉 [http://localhost](http://localhost)

### What happens in both environments:
* Docker images are built using multi-stage builds for efficiency.
* Dependencies are installed with caching for speed.
* For dev: Vite server starts with hot reload.
* For prod: Nginx serves the static build with optimized config.

---

## 💻 Run Locally (Without Docker)

### Install dependencies:

```bash
npm install
```

### Start development server:

```bash
npm run dev
```

---

## 🏗️ Production Build

### Using Docker Compose (Recommended):

```bash
docker-compose build prod
docker-compose up prod
```

- This uses the production stage with Nginx and custom config for secure, performant serving.

### Manual Docker Build (Alternative):

```bash
docker build -t meal-tracker .
docker run -p 80:80 meal-tracker
```

### Open in browser:

👉 [http://localhost](http://localhost)

---

## 📦 Project Structure

* **React + Vite** for frontend development
* **TypeScript** for type safety
* **TailwindCSS** for styling
* **Docker** for containerized environment
* **Nginx** for production serving

---

## ✅ Summary

1. Clone repository
2. For development: `docker-compose up dev` → Open [http://localhost:5173](http://localhost:5173)
3. For production: `docker-compose build prod && docker-compose up prod` → Open [http://localhost](http://localhost)

---

## 📌 Notes

* Docker is recommended for consistent environment setup
* Local run is faster but may require manual dependency management

---

## 📄 License

This project is private and intended for educational or internal use.