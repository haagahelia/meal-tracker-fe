# Project Structure Guide

This document explains the folder structure of the project and defines where new files should be placed. It helps maintain consistency and scalability across the codebase.

---

# 📁 Overview

The project follows a **feature-based architecture** with shared components and utilities separated into dedicated folders.

Main principles:

* `app/` → application setup (router, providers)
* `components/` → reusable UI and layout components
* `features/` → page-level business logic grouped by domain
* `lib/` → utilities and helpers
* `styles/` → global styles
* `docs/` → project documentation and rules

---

# 📁 src/app

Contains core application setup and configuration.

### Files:

* `providers.tsx` → global providers (e.g. React Query, Theme, Context Providers)
* `router.tsx` → application routing configuration

### ➕ Add here:

* Global app configuration
* Route definitions
* Context providers

---

# 📁 src/components (shared UI)

Reusable components used across multiple features.

### Expected structure:

* `layout/` → layout components
* `ui/` → basic reusable UI components

---

## 📁 src/components/layout

Layout-related components that define the structure of pages.

### Files:

* `AppLayout.tsx` → main application layout wrapper
* `BottomNav.tsx` → bottom navigation bar (note: spelling should be corrected from `BoottomNav.tsx`)
* `Header.tsx` → top navigation/header

### ➕ Add here:

* Navigation bars
* Page wrappers
* Layout shells

---

## 📁 src/components/ui

Low-level reusable UI elements (design system components).

### Files:

* `Button.tsx`
* `Card.tsx`
* `Page.tsx`

### ➕ Add here:

* Buttons, inputs, modals
* Reusable UI primitives
* Styled components

---

# 📁 src/features (feature-based modules)

Each feature represents a domain of the application. Each folder contains pages and logic specific to that feature.

---

## 📁 src/features/home

* `HomePage.tsx` → landing/home screen

### ➕ Add here:

* Home dashboard components
* Home-specific logic

---

## 📁 src/features/products

* `ProductsPage.tsx` → list of products
* `ProductDetailsPage.tsx` → single product view

### ➕ Add here:

* Product filters
* Product API logic (if feature-scoped)
* Product-related components

---

## 📁 src/features/recipes

* `RecipesPage.tsx`
* `RecipeDetailsPage.tsx`

### ➕ Add here:

* Recipe cards
* Recipe filtering/sorting logic

---

## 📁 src/features/settings

* `SettingsPage.tsx`

### ➕ Add here:

* User preferences
* Settings forms

---

## 📁 src/features/tracker

* `TrackerPage.tsx`

### ➕ Add here:

* Tracking logic (meals, calories, etc.)
* Charts and trackers

---

# 📁 src/lib

Utility functions and shared constants.

### Files:

* `cn.ts` → utility for className merging (e.g. clsx/tailwind-merge)
* `constants.ts` → global constants

### ➕ Add here:

* Helper functions
* Formatters
* API utilities (if not feature-specific)

---

# 📁 src/styles

Global styling.

### Files:

* `index.css` → global styles and Tailwind imports

### ➕ Add here:

* Global CSS rules
* Tailwind setup
* Theme variables

---

# 📁 src/docs

Project documentation.

### Contains:

* Contribution rules
* Architecture explanation
* Project guidelines

### ➕ Add here:

* Developer guides
* API documentation
* Architecture diagrams

---

# 📁 src/main.tsx

Entry point of the React application.

### Responsibilities:

* Bootstraps React app
* Mounts root component

---

# 📁 src/vite-env.d.ts

TypeScript definitions for Vite environment.

---

# 🚀 Summary: Where to place new files

| Type                     | Location                  |
| ------------------------ | ------------------------- |
| New page (feature-based) | `src/features/<feature>/` |
| Reusable UI component    | `src/components/ui/`      |
| Layout element           | `src/components/layout/`  |
| Utility function         | `src/lib/`                |
| Global configuration     | `src/app/`                |
| Styles                   | `src/styles/`             |
| Documentation            | `src/docs/`               |