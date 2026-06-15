# SIGMA Frontend Repository Overview

## 1. Introduction

This repository (`sigma-frontend`) contains the frontend application for **SIGMA** — Sistem Informasi Manajemen Akademik. The application is designed to manage academic information, student data, SPP billing/payments, lecturer data, and reports in a unified interface.

The project is built with **React** (v19), **Vite** (v7), and **Tailwind CSS** (v4). It integrates with:

* **Node.js/Express Backend** (hosted on Vercel) for Authentication and Database management via **Axios**.
* Custom local state management and APIs for academic operations.

The UI is designed to provide a highly interactive, responsive, and modern dashboard experience.

---

## 2. Project Purpose and Workflow

### Purpose

* Deliver a complete **academic management portal** for administrators/management.
* Support **student data management** (CRUD operations, class management, grade entry, CSV import/export, and attendance).
* Manage **SPP billing** (payment tracking, details, and status updates).
* Manage **lecturer information** (CRUD operations and attendance).
* Generate and export **reports** (academic and financial) to CSV format.

### High-Level User Workflow

1. **Authentication**: Users log in/register via the Express/Node.js backend API using Axios.
2. **Dashboard**: Access statistical summaries (total students, lecturers, SPP payment status, total collection).
3. **Data Management**:
   * **Mahasiswa**: Browse lists, manage classes (input grades, CSV upload/export), check attendance, edit student master profiles.
   * **Dosen**: Browse lists, input/edit profile data, check attendance.
   * **SPP**: View payments, check detail billing, update status.
   * **Laporan**: View generated reports, create new reports, export to CSV.

---

## 3. Folder Structure

### `/` (Root)

* `README.md` — Project documentation (this file)
* `package.json` / `package-lock.json` — Project dependencies
* `vite.config.js` — Vite setup
* `.env` — Environment variables (ignored)
* `.gitignore` — Ignored files

### `/src`

#### 1) Entry & Routing

* `main.jsx` — App entry point
* `App.jsx` — Routing logic (layouts, public + protected routes)
* `components/ProtectedRoute.jsx` — Redirects unauthenticated users

#### 2) Components

* `components/sidebar/Sidebar.jsx` — Main vertical sidebar navigation (collapsible, mobile-responsive)
* `components/navbar/Navbar.jsx` / `components/footer/Footer.jsx` — Brand components

#### 3) Pages

* **Login / Register** — User authentication (Integrates with Vercel API via Axios)
* **Dashboard** — Statistical widgets, pie charts (SPP Status), and recent logs
* **Mahasiswa** — List, Manage Kelas, Input Nilai, Absensi, Master, Import CSV
* **SPP** — List, Detail, Manage, Status edit
* **Dosen** — List, Detail, Form, Absensi, Input Absensi
* **Laporan** — List, Buat, CSV export

#### 4) Services (API)

Inside `src/services/`:

* `authApi.js` — Authentication services
* `sessionListener.js` — Session management and local storage helper

#### 5) Styles

All CSS files are placed inside `src/styles/`:

* `_variables.css` — Core Design System tokens (colors, radii, shadows)
* `index.css` — Global styles, reset, and utilities
* `sidebar.css` — Navigation sidebar styling
* `login.css` — Auth page styling
* `dashboard.css` — Dashboard page layout & widgets
* `modules.css` — Shared styles for all CRUD module pages

---

## 4. Getting Started Guide

### Prerequisites

* Node.js 18+
* npm

### Setup Steps

#### 1. Clone Repository

```bash
git clone https://github.com/sigma-ai-system/frontEnd-sigma.git
cd sigma-frontend
```

#### 2. Install Dependencies

```bash
npm install
```

#### 3. Run Development Server

```bash
npm run dev
```

#### 4. Build for Production

```bash
npm run build
npm run deploy
```

---

## 5. Testing & Quality

### Manual Testing Checklist

#### Authentication
* Signup (integrates with `https://sigma-backend-gules.vercel.app/api/auth/register` via Axios)
* Login, logout

#### Dashboard
* Counter widget matching dummy data
* Conic gradient SPP payment status display
* Activity feed rendering

#### Mahasiswa Module
* Search and filters by class
* Adding student profiles (form validations)
* Drag & Drop zone on Import CSV page
* Grade entry form and attendance list

#### Dosen Module
* View lecturer details and edit fields
* Input lecturer attendance

#### SPP Module
* View student billing details
* Update SPP statuses

#### Laporan Module
* Create/generate reports
* Trigger CSV export mockup alert
