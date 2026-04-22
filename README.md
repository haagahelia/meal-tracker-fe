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

### Start the application:

```bash
docker compose up --build
```

### Open in browser:

👉 [http://localhost:5173](http://localhost:5173)

### What happens:

* Docker image is built
* Dependencies are installed
* Vite development server starts
* Hot reload is enabled

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

### Using Docker:

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
2. Run with Docker: `docker compose up --build`
3. Open [http://localhost:5173](http://localhost:5173)

---

## 📌 Notes

* Docker is recommended for consistent environment setup
* Local run is faster but may require manual dependency management

---

## 📄 License

This project is private and intended for educational or internal use.