# Pokefinder

A modern Pokédex application built with **React** and **TypeScript**, powered by the **PokeAPI**. The project was designed as a portfolio piece, focusing on clean architecture, responsive UI, and efficient data management.

## ✨ Features

* 🔍 Search Pokémon by name with debounced input
* ♾️ Infinite scrolling with progressive loading
* 🏷️ Filter Pokémon by type
* 📊 Detailed Pokémon modal with:

  * Stats
  * Abilities
  * Types
  * Artwork
* 🌳 Evolution tree rendering, including branching evolutions
* ⚔️ Complete moves list with sorting by:

  * Level
  * Power
  * Type
  * Damage class
  * Name
* 📖 Move descriptions and detailed information
* 💾 In-memory caching to reduce redundant API requests
* 📱 Fully responsive interface
* 🎨 Glassmorphism-inspired design

---

## 🖼️ Preview

> You can try it live clicking right here!


<img width="1047" height="852" alt="image" src="https://github.com/user-attachments/assets/d7459074-5f6a-4c72-8b2b-2c95f9d0bb78" />

<img width="865" height="815" alt="image" src="https://github.com/user-attachments/assets/cb3b9f20-d7bc-46bf-8b0e-34d052e7af76" />



---

## 🛠️ Tech Stack

* React 19
* TypeScript
* Vite
* Tailwind CSS
* Axios
* Lucide React

---

## 🏗️ Architecture

The project follows a layered structure to keep responsibilities separated and improve maintainability.

```txt
src/
├── components/   # Reusable UI components
├── constants/    # Application constants and mappings
├── hooks/        # State management and business logic
├── pages/        # Route-level components
├── services/     # API layer and shared cache
├── types/        # TypeScript definitions
└── utils/        # Helper functions
```

### Design Principles

* **Separation of Concerns** – UI, business logic, and data access are isolated.
* **Reusable Components** – Components are designed to be composable and maintainable.
* **Optimized Data Fetching** – Shared caching minimizes duplicate requests.
* **Type Safety** – End-to-end TypeScript usage for better reliability and developer experience.

---

## 🚀 Getting Started

### Prerequisites

* Node.js 20+
* npm

### Installation

```bash
npm install
```

### Run in Development

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Run Linter

```bash
npm run lint
```

### Preview Production Build

```bash
npm run preview
```

---

## 📡 Data Source

This project uses the excellent [PokeAPI](https://pokeapi.co/) to retrieve:

* Pokémon data
* Stats
* Abilities
* Evolution chains
* Moves and move details

---

## 🎯 Project Goals

Pokefinder was built to explore and demonstrate:

* Frontend architecture and code organization
* API consumption and data transformation
* State management patterns
* Performance optimizations through caching
* Responsive and accessible UI design
* Building production-quality portfolio projects

---

## 🔮 Future Improvements

* Favorites system
* Dark/Light theme switcher
* Unit and integration tests
* Offline support with persistent caching
* Pokémon comparison feature

---

## 📄 License

This project was created for educational and portfolio purposes.

Feel free to explore the code and adapt ideas to your own projects. Attribution is appreciated.
