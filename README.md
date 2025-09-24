# Maseru Assessment Project

A full-stack employee management system built as an internal promotion assessment project. This application demonstrates proficiency in modern web development technologies including .NET Core, React, Next.js, and the Shesha framework.

## 📋 Project Overview

This assessment project showcases the implementation of a comprehensive employee management system with the following core features:

- **Employee Management**: Create, read, update, and delete employee records
- **Skills Management**: Associate and manage employee skills
- **Advanced Search & Filtering**: Search employees with various filters
- **Responsive UI**: Modern, mobile-friendly interface built with Ant Design
- **API-First Architecture**: RESTful API endpoints with Swagger documentation
- **Test Coverage**: Unit tests for critical business logic

## 🏗️ Architecture

The project follows a modular architecture with clear separation of concerns:

```
assessment-maseru/
├── backend/                    # .NET Core Web API
│   ├── src/
│   │   ├── Module/
│   │   │   ├── Maseru.Assesment.Domain/      # Domain models and business logic
│   │   │   └── Maseru.Assesment.Application/ # Application services and DTOs
│   │   ├── Maseru.Assesment.Web.Core/        # Web core infrastructure
│   │   └── Maseru.Assesment.Web.Host/        # Web API host
│   └── test/                   # Unit tests
├── frontend/                   # Next.js React Application
│   └── src/
│       ├── app/               # Next.js app directory
│       ├── components/        # React components
│       ├── providers/         # Context providers
│       └── api/              # API integration
├── database/                  # Database backups and scripts
└── README.md
```

## 🛠️ Technology Stack

### Backend
- **Framework**: .NET 8.0
- **Architecture**: Clean Architecture with Domain-Driven Design
- **ORM**: NHibernate with Shesha Framework
- **Authentication**: ABP (ASP.NET Boilerplate) Framework
- **API Documentation**: Swagger/OpenAPI
- **Testing**: xUnit with Shouldly assertions
- **Database**: SQL Server / PostgreSQL

### Frontend
- **Framework**: Next.js 14.2.4 (React 18)
- **UI Library**: Ant Design 5.18.2
- **Styling**: Styled Components
- **State Management**: React Context + Providers
- **HTTP Client**: Restful React
- **Language**: TypeScript
- **Build Tool**: Next.js built-in bundler

### Key Dependencies
- **Shesha Framework**: v0.34.0 - Low-code platform framework
- **ABP Framework**: v9.0.0 - Application framework for .NET
- **FluentMigrator**: v5.0.0 - Database migrations
- **Moment.js**: Date/time manipulation
- **Lodash**: Utility library

## 🚀 Getting Started

### Prerequisites
- .NET 8.0 SDK
- Node.js (v18 or later)
- SQL Server or PostgreSQL
- Visual Studio 2022 or VS Code

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Restore NuGet packages:**
   ```bash
   dotnet restore
   ```

3. **Update database connection string** in `src/Maseru.Assesment.Web.Host/appsettings.json`

4. **Build the solution:**
   ```bash
   dotnet build
   ```

5. **Run the application:**
   ```bash
   cd src/Maseru.Assesment.Web.Host
   dotnet run
   ```

The API will be available at `https://localhost:5001` with Swagger documentation at `/swagger`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API endpoint** in `.env` file:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://localhost:5001
   ```

4. **Generate API client:**
   ```bash
   npm run generate-fetcher
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`

### Database Setup

The project includes database backups in the `database/` directory:
- `assessment-backup.bacpac` - SQL Server backup
- `ShaProjectName-PostgreSql.backup` - PostgreSQL backup

Import the appropriate backup file based on your database choice.

## 📱 Features

### Employee Management
- **CRUD Operations**: Complete employee lifecycle management
- **Employee Fields**: ID, Name, Email, Phone, Date of Birth, Address
- **Auto-generated Employee IDs**: 6-character unique identifiers
- **Data Validation**: Comprehensive client and server-side validation

### Skills Management
- **Associate Skills**: Link multiple skills to employees
- **Skills CRUD**: Create, update, and delete skills
- **Skills Filtering**: Filter employees by skills

### Advanced Features
- **Search**: Full-text search across employee data
- **Filtering**: Multi-criteria filtering with persistent settings
- **Responsive Design**: Mobile-first responsive UI
- **API Documentation**: Auto-generated Swagger documentation
- **Error Handling**: Comprehensive error handling and user feedback

## 🧪 Testing

### Backend Tests
```bash
cd backend
dotnet test
```

Tests cover:
- Employee domain logic
- Business rule validation
- Employee ID generation
- Data access operations

### Frontend Testing
```bash
cd frontend
npm run lint          # ESLint code quality checks
npm run build         # Build verification
```

## 🔧 Development Scripts

### Backend
- `dotnet build` - Build the solution
- `dotnet test` - Run unit tests
- `dotnet run` - Start the API server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate-fetcher` - Generate API client

## 📊 API Endpoints

Key API endpoints include:

- `GET /api/employees` - Get all employees with filtering
- `POST /api/employees` - Create new employee
- `GET /api/employees/{id}` - Get employee by ID
- `PUT /api/employees/{id}` - Update employee
- `DELETE /api/employees/{id}` - Delete employee
- `GET /api/employees/{id}/skills` - Get employee skills
- `POST /api/employees/{id}/skills` - Add skill to employee

Full API documentation available at `/swagger` when running the backend.

## 🏆 Assessment Highlights

This project demonstrates:

1. **Full-Stack Development**: Complete end-to-end application development
2. **Modern Technologies**: Use of current frameworks and best practices
3. **Clean Architecture**: Well-structured, maintainable codebase
4. **API Design**: RESTful API with proper HTTP semantics
5. **Testing**: Unit test coverage for critical functionality
6. **User Experience**: Intuitive, responsive user interface
7. **Code Quality**: Consistent coding standards and documentation

## 📝 License

This project is part of an internal promotion assessment and is proprietary to the organization.

## 👤 Developer

**Maseru Kganyago**
*Software Developer Assessment Project*

---

*This project was developed as part of an internal promotion assessment to demonstrate full-stack development capabilities and proficiency in modern web technologies.*
