# Contribution Rules

## 📑 Table of Contents

* [General Principles](#-general-principles)
* [Branching Strategy](#-branching-strategy)
* [Commit Rules](#-commit-rules)
* [Pull Requests (PRs)](#-pull-requests-prs)
* [Testing Rules](#-testing-rules)
* [Dependency Rules](#-dependency-rules)
* [What NOT to do](#-what-not-to-do)
* [Good Practices](#-good-practices)
* [Creating a New Branch & Full Workflow](#-creating-a-new-branch--full-workflow)
* [Summary of Workflow](#-summary-of-workflow)

---

## 👥 General Principles

* Be respectful and professional in all communications.
* Follow the project structure and existing code style.
* Keep contributions focused and relevant.
* Avoid breaking changes without prior discussion.

---

## 🌿 Branching Strategy

* `main` branch is always stable and production-ready.
* Create a new branch for each feature or bug fix:

```bash
feature/short-description
fix/short-description
```

### Examples:

* `feature/login-page`
* `fix/navbar-bug`

---

## 🧾 Commit Rules

Write clear and meaningful commit messages.

### Format:

```
type: short description
```

### Types:

* `feat` – new feature
* `fix` – bug fix
* `refactor` – code improvement without behavior change
* `style` – formatting changes
* `docs` – documentation updates

### Examples:

```
feat: add meal tracking form
fix: resolve navbar alignment issue
docs: update README setup instructions
```

---

## 🔄 Pull Requests (PRs)

* Always create a PR before merging into `main`.
* PR must include a clear description of changes.
* Link related issues if applicable.
* Ensure code is tested before submitting.

### PR Checklist:

* [ ] Code runs without errors
* [ ] No console errors or warnings
* [ ] UI changes are responsive
* [ ] Code is formatted properly

---

## 🧪 Testing Rules

* Test your feature locally before pushing.
* Ensure existing features are not broken.
* If applicable, add test cases for new functionality.

---

## 📦 Dependency Rules

* Do NOT install unnecessary packages.
* Always check with the team before adding new dependencies.
* Keep `package.json` and `package-lock.json` consistent.

---

## 🚫 What NOT to do

* Do not push directly to `main`.
* Do not commit broken or unfinished code.
* Do not ignore linting or build errors.
* Do not remove or modify other developers’ code without discussion.

---

## ✅ Good Practices

* Write clean and readable code.
* Keep components small and reusable.
* Follow project structure.
* Ask for review when unsure.

---

## 🌱 Creating a New Branch & Full Workflow

This section explains the complete process of contributing a new feature or fix.

### 1. Start from the latest main branch

```bash
git checkout main
git pull origin main
```

---

### 2. Create a new branch

Use a descriptive name based on your task:

```bash
git checkout -b feature/your-feature-name
```

### Examples:

```bash
git checkout -b feature/meal-form-ui
git checkout -b fix/navbar-bug
```

---

### 3. Make your changes

* Implement your feature or bug fix
* Follow project structure and coding rules
* Test locally before committing

---

### 4. Stage and commit changes

```bash
git add .
git commit -m "feat: short description of changes"
```

Commit messages examples:

* `feat: add meal tracking form`
* `fix: resolve login redirect issue`

---

### 5. Push your branch to GitHub

```bash
git push -u origin feature/your-feature-name
```

---

### 6. Create a Pull Request (PR)

* Go to GitHub repository
* Click "Compare & pull request"
* Add clear description of changes
* Link related issues if needed

---

### 7. Code review process

* Wait for review from teammates
* Make requested changes if needed
* Update branch if required

---

### 8. Merge into main

After approval:

* Merge PR into `main`
* Delete feature branch (optional but recommended)

```bash
git branch -d feature/your-feature-name
```

---

## 🔁 Summary of Workflow

1. Pull latest main
2. Create feature branch
3. Make changes
4. Commit changes
5. Push branch
6. Open PR
7. Review & merge
8. Delete branch