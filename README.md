\# AI Cloud Vendor Recommendation System



A Java Spring Boot backend that recommends cloud providers based on a user's budget, storage requirements, performance needs, and scalability preferences.



\## Features



\- Cloud provider recommendations

\- Budget-based recommendation requests

\- Storage, performance, and scalability parameters

\- Recommendation history stored using MySQL

\- REST API endpoints

\- Health-check endpoint

\- Swagger UI API documentation



\## Tech Stack



\- \*\*Language:\*\* Java 21

\- \*\*Backend Framework:\*\* Spring Boot 3.5.6

\- \*\*Build Tool:\*\* Maven

\- \*\*Database:\*\* MySQL 8

\- \*\*Database Integration:\*\* Spring Data JPA / Hibernate

\- \*\*API Documentation:\*\* Swagger UI / OpenAPI

\- \*\*Version Control:\*\* Git and GitHub



\## Prerequisites



Install the following before running the application:



\- Java JDK 21

\- Maven

\- MySQL Server 8

\- Git



\## Setup Instructions



\### 1. Clone the repository



```bash

git clone https://github.com/malviyaanuj180-web/ai-cloud-vendor-recommendation-system.git

cd ai-cloud-vendor-recommendation-system

```



\### 2. Create the database



Open MySQL and execute:



```sql

CREATE DATABASE cloud\_recommendation\_db;

```



\### 3. Configure database credentials



The application reads its database password from the `DB\_PASSWORD` environment variable.



In Windows PowerShell, set it for the current terminal session:



```powershell

$env:DB\_PASSWORD = "YOUR\_MYSQL\_PASSWORD"

```



Replace `YOUR\_MYSQL\_PASSWORD` with your local MySQL password. Do not commit your password to GitHub.



Check that `src/main/resources/application.properties` has the correct MySQL username and database URL for your machine.



\### 4. Run the application



From the project root, execute:



```powershell

mvn spring-boot:run

```



The API should be available at:



`http://localhost:8080`



Keep the PowerShell session open while the application is running.



\## API Endpoints



Base URL: `http://localhost:8080`



| Method | Endpoint | Purpose |

|---|---|---|

| GET | `/api/health` | Check application health |

| GET | `/api/providers` | Retrieve cloud providers |

| GET | `/api/recommend` | Get a cloud recommendation |

| GET | `/api/history` | Retrieve recommendation history |

| DELETE | `/api/history/{id}` | Delete a history entry |



\### Example recommendation request



```http

GET /api/recommend?budget=5000\&storage=100\&performance=medium\&scalability=medium

```



Example full URL:



`http://localhost:8080/api/recommend?budget=5000\&storage=100\&performance=medium\&scalability=medium`



The request supplies a budget of 5000, storage of 100, medium performance, and medium scalability. The actual response depends on the current recommendation logic.



\### Swagger UI



Once the application is running, open:



`http://localhost:8080/swagger-ui/index.html`



Use Swagger UI to inspect and test the available API operations.



\## Frontend Integration



The frontend can call the backend using the base URL:



`http://localhost:8080`



For example:



```javascript

const response = await fetch(

&#x20; "http://localhost:8080/api/recommend?budget=5000\&storage=100\&performance=medium\&scalability=medium"

);



const data = await response.json();

console.log(data);

```



If the frontend runs on a different port, configure CORS in the backend if required. Replace `localhost` with the backend machine's reachable address when testing across different devices.



\## Project Structure



```text

src/

└── main/

&#x20;   ├── java/com/cloudrecommendation/

&#x20;   │   ├── CloudRecommendationApplication.java

&#x20;   │   ├── controller/

&#x20;   │   │   ├── HealthController.java

&#x20;   │   │   ├── ProviderController.java

&#x20;   │   │   └── RecommendationController.java

&#x20;   │   ├── entity/

&#x20;   │   │   └── RecommendationHistory.java

&#x20;   │   ├── repository/

&#x20;   │   │   └── RecommendationHistoryRepository.java

&#x20;   │   └── service/

&#x20;   │       └── RecommendationService.java

&#x20;   └── resources/

&#x20;       └── application.properties

```



\## Current Scope



This repository contains the Java Spring Boot backend. The frontend is developed separately and can integrate through the REST API.



Cloud recommendations are based on the application's implemented logic. Verify provider pricing and service specifications against official cloud-provider sources before using recommendations for real deployments.



\## Author



Anuj Malviya



GitHub: https://github.com/malviyaanuj180-web



\---



This project is developed for learning, demonstration, and cloud vendor recommendation use cases.



