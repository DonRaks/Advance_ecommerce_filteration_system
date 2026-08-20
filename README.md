# 🚀 Advanced E-Commerce Catalog & Filtration System

[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white)](https://greensock.com/gsap/)

A state-of-the-art, high-performance E-Commerce web application built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, and **GSAP (GreenSock Animation Platform)**. 

Featuring real-time multi-criteria product filtering, sorting algorithms, responsive mobile slide-over drawers, smooth grid stagger animations, and detailed product page views.

---

## ✨ Features

- 🎨 **Modern Aesthetics & Glassmorphism**: Tailored indigo/slate color palette, fluid typography, glassmorphism banners, and dynamic UI elements.
- ⚡ **GSAP Animations**:
  - **Hero Banner**: Intro timeline reveal and infinite floating card loop (`sine.easeInOut`).
  - **Catalog Grid**: Staggered product entrance (`stagger: 0.06s`) on fetch, filter, and pagination changes.
  - **Micro-Interactions**: Hover scale zooms, button elastic bounces, and cart badge pulses.
  - **Product Detail Gallery**: Image cross-fade scale transitions and smooth slide-in layouts.
- 🔍 **Advanced Multi-Criteria Filtration System**:
  - Search query filtering across titles and categories.
  - Category radio selection with instant active filter count.
  - Custom price range inputs (Min / Max bounds).
  - Popular tag chip filtering (`#apple`, `#fashion`, `#shoes`, etc.).
  - One-click active filter chip removal & reset button.
- 📊 **Dynamic Sorting**:
  - Default order.
  - Price: Low to High / High to Low.
  - Highest Rated items.
- 📱 **Fully Responsive Layout**:
  - Desktop sticky sidebar.
  - Mobile slide-over off-canvas drawer with backdrop blur.
- 🛒 **Interactive Product Detail View**:
  - Image gallery thumbnail switcher.
  - Quantity counter selector.
  - Simulated cart feedback CTA button.
  - Verified seller badge & trust guarantee badges.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Core UI library & component state management |
| **TypeScript 6** | Strict type safety and autocompletion |
| **Vite 8** | Next-generation frontend build tooling & dev server |
| **Tailwind CSS v4** | Modern utility-first styling system |
| **GSAP 3** | High-performance smooth animations & timelines |
| **Lucide React** | Sleek icon set |
| **React Router v7** | Single-page application routing |
| **Axios** | Asynchronous HTTP data fetching from DummyJSON API |

---

## 📁 Directory Structure

```text
Ecommerce-App/
├── index.html              # HTML5 Entry Point
├── package.json            # Dependencies & Scripts
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
└── src/
    ├── main.tsx            # Application entry mounting
    ├── App.tsx             # Root Layout & Router setup
    ├── index.css           # Custom CSS layer & scrollbar styling
    └── components/
        ├── BookCard.tsx       # Animated Product Card component
        ├── FilterContext.tsx  # Global Filter State Context
        ├── Header.tsx         # Sticky Header Navigation Bar
        ├── HeroBanner.tsx     # Animated Promotional Hero Section
        ├── MainContent.tsx    # Catalog Grid & Sorting Toolbar
        ├── PopularBlogs.tsx   # Sidebar Blog Stories Widget
        ├── ProductPage.tsx    # Detailed Product View & Gallery
        ├── Sidebar.tsx        # Desktop & Mobile Filter Drawer
        └── TopSellers.tsx     # Verified Merchants Widget
```

---

## 🚦 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18+) and **npm** installed.

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DonRaks/Advance_ecommerce_filteration_system.git
   cd Advance_ecommerce_filteration_system
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for Production:**
   ```bash
   npm run build
   ```

5. **Preview Production Build:**
   ```bash
   npm run preview
   ```

---

## 🤝 Contributing

Contributions are welcome! Follow these steps to submit changes:

1. Fork the Project.
2. Create a Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
