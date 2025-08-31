# Rezk – Bridging Local Businesses & Job Seekers

**Rezk** is a web platform designed to connect small businesses with local job seekers.
It simplifies recruitment, promotes digital inclusion, and strengthens community economies by making employment opportunities more accessible.

---

## Key Features

### UI/UX

* Clean, minimalist design with an intuitive flow.
* User-friendly layouts tailored for applicants and businesses.

### Frontend

* Developed using **React.js**.
* Reusable components and modular design.
* Dynamic job listing pages with search and filtering.
* Form validation for job posting and applicant registration.
* Integrated with backend APIs for real-time updates.

### Backend

* Built with **ASP.NET Core 8 (C#)**.
* **Entity Framework Core** for ORM and database operations.
* **ASP.NET Identity** for authentication and role-based access (Applicant, Business, Admin).
* Secure **JWT authentication** for API endpoints.
* Logging and exception handling with **Serilog**.
* RESTful APIs following best practices.
* OOP and SOLID principles applied to ensure maintainability and scalability.

### Database

* **SQL Server** used as the primary relational database.
* Code-First Migrations with EF Core.
* Relationships enforced between Applicants, Applications, and Businesses.
* Initial seeding with sample applicants and job listings.

---

## System Architecture

```
Rezk
│── frontend/                # React.js client-side app
│   ├── components/          # Reusable UI components
│   ├── context/             # Global context/state management
│   ├── api/                 # API service layer
│   ├── assets/              # Static assets (icons, images, styles)
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page-level views (Home, Login, Dashboard, etc.)
│   ├── App.jsx              # Root React component
│   ├── index.js             # Entry point
│   └── main.js              # Main app bootstrap
│
│── backend/                 # ASP.NET Core API
│   ├── Controllers/         # API endpoints (Applicants, Jobs, Businesses)
│   ├── Models/              # EF Core entity models
│   ├── Services/            # Business logic layer (SOLID applied)
│   ├── Data/                # DbContext + configurations
│   ├── Helpers/             # Utilities (JWT, mapping, etc.)
│   ├── Properties/          # App settings & metadata
│   └── Migrations/          # Database migrations
│
│── README.md                # Project overview
```

---

## Tech Stack

**Frontend**

* React.js + TypeScript
* Axios for API requests
* Bootstrap / Tailwind CSS

**Backend**

* ASP.NET Core 8
* Entity Framework Core
* ASP.NET Identity + JWT
* Serilog (logging)

**Database**

* SQL Server

**Version Control & Tools**

* Git & GitHub
* Visual Studio 2022
* Postman for API testing

---

## Screenshots

<img width="824" height="584" alt="image" src="https://github.com/user-attachments/assets/247e9471-02ff-413f-b706-2a3bc3cb1b8c" />
<img width="819" height="581" alt="image" src="https://github.com/user-attachments/assets/0aa58e6d-795f-4bcb-abe1-b1febc469f05" />
<img width="825" height="579" alt="image" src="https://github.com/user-attachments/assets/e8956f4c-7460-4203-951d-4dfa003632f6" />
<img width="482" height="743" alt="image" src="https://github.com/user-attachments/assets/ca0541d5-dc75-4576-b41d-886c7262930c" />
<img width="488" height="744" alt="image" src="https://github.com/user-attachments/assets/75fc23ce-c262-478c-a514-031370c66a78" />
<img width="777" height="686" alt="image" src="https://github.com/user-attachments/assets/e90a4329-0875-4a0d-b818-b2caa71259ff" />
<img width="514" height="632" alt="image" src="https://github.com/user-attachments/assets/c24d9b57-2b5d-4b8a-ab30-492ccad1a38d" />
<img width="519" height="636" alt="image" src="https://github.com/user-attachments/assets/21f40605-7f66-42cb-9b0b-cbac1736fc09" />
<img width="564" height="626" alt="image" src="https://github.com/user-attachments/assets/237565b1-d614-42f6-96c6-d83c4af5b06f" />

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/your-saraanbih/CIS-Hackathon.git
```

### Setup Backend (ASP.NET Core)

```bash
cd backend
dotnet restore
dotnet ef database update   # apply migrations
dotnet run
```

### Setup Frontend (React.js)

```bash
cd frontend
npm install
npm start
```

---

## Core Modules

**Applicant Management**

* Register and manage applicant profile.
* Apply for job opportunities.
* Track application status.

**Business Management**

* Register as a business owner.
* Post new job opportunities.
* Manage and review applicants.

**Admin Management**

* Oversee users, jobs, and applications.
* Handle reports and generate statistics.

**Job Search**

* Browse jobs by category, location, and type.
* Smart filtering and keyword-based search.

---

## Future Enhancements

* Mobile app (React Native / Flutter).
* AI-powered job recommendations based on applicant skills.
* Advanced analytics for businesses.
* Multi-language support.

---

## Contributors

* Mohamed Kardosha – Data Scientist
* Sara Nabih – Backend Developer
* Shahd Ayman – Backend Developer
* Romaisa Fetouh – UI/UX Designer
* Yomna Aly – UI/UX Designer
* Engy Alaa – Frontend Developer

---

## Why This Project Stands Out

* End-to-End Solution covering UI/UX, Frontend, and Backend.
* Clean architecture with OOP and SOLID principles.
* Scalable database with enforced relationships.
* Built with industry-standard technologies.
