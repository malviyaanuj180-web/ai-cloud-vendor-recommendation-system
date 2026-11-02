# CloudWise — AI Cloud Vendor Recommendation System

CloudWise is a React frontend with a Java 21 / Spring Boot backend and MySQL recommendation history. The recommendation form sends workload requirements to the Java API, which scores eight cloud providers and returns ranked demo recommendations.

## Stack

- Frontend: React, Vite
- Backend: Java 21, Spring Boot 3.5.6, Maven
- Database: MySQL 8, Spring Data JPA / Hibernate
- API documentation: Swagger UI / OpenAPI

## Requirements

- Java JDK 21
- Maven 3.9+
- MySQL Server 8
- Node.js and npm

## Backend setup

1. Create the database:

   ```sql
   CREATE DATABASE cloud_recommendation_db;
   ```

2. From the repository root, set your local MySQL password in PowerShell (do not commit it):

   ```powershell
   $env:DB_PASSWORD = Read-Host "Enter your MySQL root password"
   ```

3. Run Spring Boot:

   ```powershell
   mvn spring-boot:run
   ```

The backend runs at `http://localhost:8080`. Keep this terminal open.

## Frontend setup

Open a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

The frontend uses `http://localhost:8080` by default for its API. To point it to another backend, create `frontend/.env.local` with:

```env
VITE_API_URL=http://localhost:8080
```

Restart the Vite development server after changing environment variables.

## Full CloudWise recommendation API

The React recommendation form calls:

`POST /api/recommendations`

Example JSON body:

```json
{
  "workload": "Machine Learning",
  "budget": 500,
  "cpu": 4,
  "ram": 16,
  "storage": 250,
  "traffic": "High",
  "priority": "Performance"
}
```

Supported workload values:
- `Web Application`
- `Mobile Application`
- `Machine Learning`
- `Data Analytics`
- `Database`
- `Development & Testing`
- `Storage & Backup`

Traffic values: `Low`, `Medium`, `High`, `Very High`.

Priority values: `Balanced`, `Lowest Cost`, `Performance`, `Scalability`, `Reliability`.

The response contains eight ranked provider options with fields including `provider`, `service`, `score`, `monthly_cost`, `currency`, `reason`, `description`, and `tradeoff`. The full input and top recommendation are stored in MySQL history.

## Other API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/providers` | List cloud providers |
| GET | `/api/recommend` | Legacy recommendation endpoint (INR demo estimates) |
| POST | `/api/recommendations` | Full CloudWise recommendation endpoint (USD demo estimates) |
| GET | `/api/history` | Read recommendation history |
| DELETE | `/api/history/{id}` | Delete one history record |

Swagger UI: `http://localhost:8080/swagger-ui/index.html`

## Pricing and recommendation disclaimer

All costs and provider capability ratings in the recommendation engine are illustrative demo values. They are not official provider quotations, live prices, or independently measured benchmarks. Verify actual regional prices, service availability, taxes, and limits with each provider before deployment. The CloudWise recommendation endpoint reports estimates in USD; the legacy endpoint retains its earlier INR response contract.

## Project structure

```text
frontend/                         React + Vite application
src/main/java/com/cloudrecommendation/
  controller/                     REST controllers
  dto/                            Request DTOs
  entity/                         JPA entities
  repository/                     Spring Data repositories
  service/                        Recommendation logic
src/main/resources/
  application.properties          MySQL and server configuration
```

## Security note

Keep `DB_PASSWORD` in your local environment. Never put database credentials in source files or commit `.env.local`.
