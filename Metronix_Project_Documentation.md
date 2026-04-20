# METRONIX - Smart City Analytics Platform
## Complete Project Documentation

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [System Architecture](#system-architecture)
4. [Technology Stack](#technology-stack)
5. [Backend Architecture](#backend-architecture)
6. [Frontend Architecture](#frontend-architecture)
7. [Machine Learning Services](#machine-learning-services)
8. [Database Design](#database-design)
9. [API Documentation](#api-documentation)
10. [Authentication & Security](#authentication--security)
11. [Caching Strategy](#caching-strategy)
12. [Notification System](#notification-system)
13. [Deployment Architecture](#deployment-architecture)
14. [Installation & Setup](#installation--setup)
15. [Configuration Guide](#configuration-guide)
16. [API Endpoints Reference](#api-endpoints-reference)
17. [WebSocket Communication](#websocket-communication)
18. [Performance & Optimization](#performance--optimization)
19. [Monitoring & Logging](#monitoring--logging)
20. [User Guide](#user-guide)
21. [Admin Panel Guide](#admin-panel-guide)
22. [Data Management](#data-management)
23. [ML Model Training](#ml-model-training)
24. [Security Implementation](#security-implementation)
25. [Troubleshooting Guide](#troubleshooting-guide)
26. [Future Roadmap](#future-roadmap)

---

## 1. Executive Summary {#executive-summary}

### Project Overview
Metronix is a comprehensive smart city analytics platform designed to monitor, analyze, and optimize urban infrastructure. It provides real-time insights into air quality, traffic patterns, energy consumption, and public safety across city zones.

### Key Objectives
- Monitor multiple urban metrics in real-time
- Provide intelligent analytics and predictions
- Enable data-driven decision making for city planning
- Optimize resource allocation and energy management
- Enhance public safety through predictive analytics

### Target Users
- City administrators and planners
- Department heads (Traffic, Energy, Safety, etc.)
- Data analysts
- Emergency response teams
- General public (via public dashboard)

### Key Features
- Real-time data monitoring across multiple domains
- Predictive analytics using machine learning
- Interactive dashboards with visualizations
- Role-based access control
- RESTful API for integrations
- WebSocket support for real-time updates
- Multi-zone coverage with geographic boundaries
- Comprehensive reporting and analytics
- Alert and notification system
- Mobile-friendly interface

### Success Metrics
- 99.9% system uptime
- <500ms API response time (95th percentile)
- Real-time data ingestion (within 5 minutes)
- Support for 10,000+ concurrent users
- Predictive accuracy >85% for ML models

---

## 2. Project Overview {#project-overview}

### Problem Statement
Modern cities generate enormous amounts of data from various sources (traffic sensors, air quality monitors, energy meters, safety systems). Without proper analysis and visualization, this data is underutilized. Metronix solves this by providing a unified platform to collect, analyze, and visualize this data for better urban management.

### Solution Architecture
Metronix follows a microservices architecture with:
- **Backend API** - Node.js/Express REST API
- **Frontend UI** - React-based single-page application
- **ML Services** - Python-based machine learning pipelines
- **Data Processing** - Real-time and batch processing
- **Storage** - PostgreSQL for relational data, Redis for caching
- **Message Queue** - For async operations
- **Container Orchestration** - Kubernetes for deployment

### Scope
The platform covers 4 major domains:
1. **Air Quality Monitoring** - Track pollutants and air quality indices
2. **Traffic Management** - Monitor congestion and vehicle flow
3. **Energy Optimization** - Track consumption and optimize usage
4. **Public Safety** - Monitor safety incidents and predictions

### Project Deliverables
- Fully functional REST API with comprehensive documentation
- Production-ready frontend application
- ML models for predictive analytics
- Deployment manifests for Kubernetes
- Docker containers for all services
- Complete project documentation
- User and admin manuals

---

## 3. System Architecture {#system-architecture}

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      End Users / Clients                      │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│  Web Client  │ Mobile App   │ Admin Panel  │ Third-party APIs│
└──────┬───────┴──────┬───────┴──────┬───────┴────────┬────────┘
       │              │              │                │
       └──────────────┼──────────────┼────────────────┘
                      │
        ┌─────────────▼─────────────┐
        │   API Gateway / Load      │
        │   Balancer (Nginx/HAProxy)│
        └─────────────┬─────────────┘
                      │
       ┌──────────────┼──────────────┐
       │              │              │
   ┌───▼───┐      ┌───▼───┐     ┌───▼───┐
   │API    │      │API    │     │API    │
   │Server │      │Server │     │Server │
   │(Pod)  │      │(Pod)  │     │(Pod)  │
   └───┬───┘      └───┬───┘     └───┬───┘
       │              │              │
       └──────────────┼──────────────┘
                      │
       ┌──────────────┴──────────────┐
       │                             │
   ┌───▼────┐               ┌────────▼────┐
   │PostgreSQL               │   Redis      │
   │Database │               │ (Caching)    │
   └─────────┘               └──────────────┘
       │
   ┌───▼────────────────────────┐
   │  ML Service / Data Pipeline │
   └────────────────────────────┘
```

### Component Interactions

**Request Flow:**
1. User makes request via Frontend/API Client
2. Request reaches API Gateway
3. Load balancer distributes to Backend API servers
4. Cache middleware checks Redis
5. Route handler processes request
6. Database queries executed if needed
7. Response returned with caching headers

**Real-time Updates:**
1. Client establishes WebSocket connection
2. Real-time events published to WebSocket server
3. Specific clients subscribed to topics receive updates
4. Client UI updates in real-time

**Data Pipeline:**
1. External data sources send data to ingestion endpoint
2. Data validation and transformation
3. Storage in PostgreSQL
4. Cache invalidation triggered
5. ML models updated if needed
6. Notifications sent if thresholds crossed

---

## 4. Technology Stack {#technology-stack}

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js 4.x
- **Language:** JavaScript (ES6+)
- **Database:** PostgreSQL 14+
- **Cache:** Redis 7+
- **ORM:** Sequelize or TypeORM
- **API Documentation:** Swagger/OpenAPI
- **Web Sockets:** Socket.io
- **Job Queue:** Bull (Redis-based)
- **Validation:** Joi/express-validator

### Frontend
- **Framework:** React 18+
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Redux/Context API
- **HTTP Client:** Axios
- **Real-time:** Socket.io Client
- **Charts:** Chart.js / Recharts
- **Maps:** Leaflet.js
- **UI Components:** Material-UI / Custom Components

### Machine Learning
- **Language:** Python 3.9+
- **Data Processing:** Pandas, NumPy
- **ML Libraries:** Scikit-learn, TensorFlow/PyTorch
- **Data Visualization:** Matplotlib, Seaborn
- **API:** Flask/FastAPI
- **Model Serving:** TensorFlow Serving / Custom Python API

### DevOps & Deployment
- **Containerization:** Docker
- **Orchestration:** Kubernetes
- **Container Registry:** Docker Hub / Private Registry
- **Infrastructure as Code:** Terraform
- **Service Mesh:** (Optional) Istio
- **Monitoring:** Prometheus + Grafana
- **Logging:** ELK Stack / Loki

### Development Tools
- **Version Control:** Git
- **Code Quality:** ESLint, Prettier
- **Testing:** Jest, Mocha, Chai
- **API Testing:** Postman, REST Client
- **Package Manager:** npm / yarn

---

## 5. Backend Architecture {#backend-architecture}

### Directory Structure
```
backend/
├── config/
│   ├── database.js         # Database configuration
│   ├── environment.js      # Environment variables
│   ├── redis.js            # Redis configuration
│   └── swagger.js          # Swagger/API docs config
├── controllers/            # Request handlers
│   ├── auth.controller.js
│   ├── airQuality.controller.js
│   ├── traffic.controller.js
│   ├── energy.controller.js
│   ├── safety.controller.js
│   ├── analytics.controller.js
│   ├── notification.controller.js
│   ├── planner.controller.js
│   └── admin.controller.js
├── middleware/             # Express middleware
│   ├── auth.middleware.js
│   ├── cache.middleware.js
│   ├── errorHandler.middleware.js
│   ├── logger.middleware.js
│   ├── rateLimiter.middleware.js
│   └── validator.middleware.js
├── models/                 # Data models
│   ├── User.js
│   ├── AirQualityData.js
│   ├── TrafficData.js
│   ├── EnergyData.js
│   ├── SafetyReport.js
│   ├── Notification.js
│   ├── DailyPlan.js
│   ├── CityZone.js
│   ├── SafetyScore.js
│   └── UserBehavior.js
├── routes/                 # API routes
│   ├── index.js
│   ├── auth.routes.js
│   ├── airQuality.routes.js
│   ├── traffic.routes.js
│   ├── energy.routes.js
│   ├── safety.routes.js
│   ├── analytics.routes.js
│   ├── notifications.routes.js
│   ├── planner.routes.js
│   ├── admin.routes.js
│   └── ml.routes.js
├── services/               # Business logic
│   ├── cacheService.js
│   ├── dataIngestionService.js
│   ├── emailService.js
│   ├── mlService.js
│   ├── notificationService.js
│   └── schedulerService.js
├── utils/                  # Utility functions
│   ├── helpers.js
│   ├── validators.js
│   ├── responseHelper.js
│   ├── logger.js
│   └── geoUtils.js
├── websocket/              # WebSocket handlers
│   ├── index.js
│   ├── handlers/
│   └── middleware/
├── server.js               # Express app setup
├── app.js                  # Application entry point
├── package.json
└── mock-server.js          # Mock data server
```

### Request Flow in Backend

1. **Request Entry** → Received by Express server
2. **Logging Middleware** → Request logged for debugging
3. **Authentication Middleware** → Verify JWT token
4. **Rate Limiting** → Check rate limits per user/IP
5. **Validation** → Validate request parameters
6. **Cache Check** → Check Redis cache
7. **Route Handler** → Execute controller logic
8. **Database Query** → Fetch/update data if needed
9. **Service Layer** → Apply business logic
10. **Response Formation** → Format response
11. **Cache Update** → Store in Redis if cacheable
12. **Error Handling** → Handle any errors gracefully
13. **Response Send** → Send response to client

### Key Middleware

**Authentication Middleware:**
- Validates JWT tokens
- Extracts user information
- Checks token expiration
- Handles revoked tokens

**Cache Middleware:**
- Caches GET requests
- Invalidates cache on mutations
- Sets appropriate cache headers
- Supports Redis backend

**Rate Limiter:**
- Prevents API abuse
- Different limits per endpoint
- User-based and IP-based limiting
- Graceful degradation

**Logger Middleware:**
- Logs all requests/responses
- Tracks API performance
- Error logging with stack traces
- Audit trail for compliance

### Controllers

Each controller handles domain-specific logic:
- **AuthController** - User authentication, token generation
- **AirQualityController** - Air quality data operations
- **TrafficController** - Traffic monitoring operations
- **EnergyController** - Energy consumption operations
- **SafetyController** - Safety report operations
- **AnalyticsController** - Analytics and reporting
- **NotificationController** - Notification management
- **AdminController** - Admin operations
- **PlannerController** - Planning operations

---

## 6. Frontend Architecture {#frontend-architecture}

### Key Features
- **Responsive Design** - Works on desktop, tablet, mobile
- **Real-time Updates** - WebSocket for live data
- **Interactive Dashboards** - Multiple domain-specific dashboards
- **Data Visualization** - Charts, graphs, maps
- **User Authentication** - Login, role-based access
- **Offline Capability** - Service workers support
- **Performance** - Code splitting, lazy loading

### React Components Structure

```
src/
├── components/
│   ├── Dashboard/
│   │   ├── DashboardContainer.jsx
│   │   ├── OverviewCard.jsx
│   │   └── MetricsGrid.jsx
│   ├── AirQuality/
│   │   ├── AirQualityDashboard.jsx
│   │   ├── PollutantChart.jsx
│   │   └── ZoneSelector.jsx
│   ├── Traffic/
│   │   ├── TrafficDashboard.jsx
│   │   ├── TrafficMap.jsx
│   │   └── CongestionChart.jsx
│   ├── Energy/
│   │   ├── EnergyDashboard.jsx
│   │   ├── ConsumptionChart.jsx
│   │   └── OptimizationPanel.jsx
│   ├── Safety/
│   │   ├── SafetyDashboard.jsx
│   │   ├── IncidentMap.jsx
│   │   └── SafetyScoreCard.jsx
│   ├── Analytics/
│   │   ├── AnalyticsPage.jsx
│   │   ├── ReportGenerator.jsx
│   │   └── DataExport.jsx
│   ├── Auth/
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   └── ProtectedRoute.jsx
│   ├── Admin/
│   │   ├── AdminPanel.jsx
│   │   ├── UserManagement.jsx
│   │   └── SystemSettings.jsx
│   └── Common/
│       ├── Header.jsx
│       ├── Sidebar.jsx
│       ├── Footer.jsx
│       └── Notifications.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── AirQuality.jsx
│   ├── Traffic.jsx
│   ├── Energy.jsx
│   ├── Safety.jsx
│   ├── Analytics.jsx
│   ├── Admin.jsx
│   ├── Profile.jsx
│   └── NotFound.jsx
├── services/
│   ├── api.js           # API client setup
│   ├── auth.js          # Auth service
│   ├── websocket.js     # WebSocket service
│   └── storage.js       # Local storage service
├── store/
│   ├── store.js         # Redux store
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── dashboardSlice.js
│   │   ├── airQualitySlice.js
│   │   └── ... (other domain slices)
│   └── middleware/
├── hooks/
│   ├── useAuth.js
│   ├── useApi.js
│   ├── useWebSocket.js
│   └── useLocalStorage.js
├── utils/
│   ├── constants.js
│   ├── helpers.js
│   ├── formatters.js
│   └── validators.js
├── styles/
│   ├── tailwind.css
│   ├── global.css
│   └── variables.css
├── App.jsx              # Main app component
├── index.jsx            # Entry point
└── vite.config.js       # Vite configuration
```

### State Management
Redux with slices for each domain:
- **authSlice** - User authentication state
- **dashboardSlice** - Dashboard state
- **airQualitySlice** - Air quality data
- **trafficSlice** - Traffic data
- **energySlice** - Energy data
- **safetySlice** - Safety data
- **uiSlice** - UI state (modals, notifications)

---

## 7. Machine Learning Services {#machine-learning-services}

### ML Capabilities

1. **Predictive Analytics**
   - Traffic prediction (congestion forecasting)
   - Energy consumption prediction
   - Air quality prediction
   - Safety incident prediction

2. **Anomaly Detection**
   - Unusual traffic patterns
   - Energy consumption anomalies
   - Air quality spikes
   - Safety risks

3. **Pattern Recognition**
   - Daily/weekly/seasonal patterns
   - Traffic behavior patterns
   - Energy usage patterns
   - Environmental patterns

4. **Optimization**
   - Energy optimization recommendations
   - Traffic flow optimization
   - Resource allocation
   - Alert thresholds

### ML Pipeline

```
Data Collection
    ↓
Data Cleaning & Preprocessing
    ↓
Feature Engineering
    ↓
Model Training
    ↓
Model Validation
    ↓
Model Deployment
    ↓
Real-time Predictions
    ↓
Performance Monitoring
    ↓
Model Retraining (scheduled)
```

### Model Types

**Time Series Models:**
- ARIMA for short-term forecasting
- LSTM for long-term patterns
- Prophet for seasonal decomposition

**Classification Models:**
- Random Forest for incident classification
- SVM for anomaly detection
- Neural Networks for complex patterns

**Regression Models:**
- Linear regression for trend analysis
- Polynomial regression for non-linear trends
- Ridge/Lasso for feature importance

### Integration with Backend

ML models exposed via:
- RESTful API endpoints
- Scheduled batch predictions
- Real-time prediction requests
- Webhook callbacks

---

## 8. Database Design {#database-design}

### Database Schema

**Users Table:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role ENUM('admin', 'analyst', 'viewer'),
  department VARCHAR(100),
  status ENUM('active', 'inactive'),
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

**Air Quality Data Table:**
```sql
CREATE TABLE air_quality_data (
  id UUID PRIMARY KEY,
  zone_id UUID REFERENCES city_zones(id),
  pm25 DECIMAL(10, 2),
  pm10 DECIMAL(10, 2),
  no2 DECIMAL(10, 2),
  o3 DECIMAL(10, 2),
  so2 DECIMAL(10, 2),
  aqi INT,
  aqi_category VARCHAR(50),
  recorded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX (zone_id),
  INDEX (recorded_at)
);
```

**Traffic Data Table:**
```sql
CREATE TABLE traffic_data (
  id UUID PRIMARY KEY,
  zone_id UUID REFERENCES city_zones(id),
  vehicle_count INT,
  average_speed DECIMAL(10, 2),
  congestion_level VARCHAR(50),
  incidents INT,
  recorded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX (zone_id),
  INDEX (recorded_at)
);
```

**Energy Data Table:**
```sql
CREATE TABLE energy_data (
  id UUID PRIMARY KEY,
  zone_id UUID REFERENCES city_zones(id),
  consumption_mwh DECIMAL(15, 2),
  production_mwh DECIMAL(15, 2),
  demand_mw DECIMAL(10, 2),
  renewable_percentage DECIMAL(5, 2),
  recorded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX (zone_id),
  INDEX (recorded_at)
);
```

**Safety Reports Table:**
```sql
CREATE TABLE safety_reports (
  id UUID PRIMARY KEY,
  zone_id UUID REFERENCES city_zones(id),
  incident_type VARCHAR(100),
  severity VARCHAR(50),
  location POINT,
  description TEXT,
  status VARCHAR(50),
  reported_at TIMESTAMP,
  resolved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX (zone_id),
  INDEX (incident_type)
);
```

**City Zones Table:**
```sql
CREATE TABLE city_zones (
  id UUID PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  boundary POLYGON,
  center_lat DECIMAL(10, 8),
  center_lng DECIMAL(11, 8),
  created_at TIMESTAMP DEFAULT NOW()
);
```

**Notifications Table:**
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type VARCHAR(50),
  title VARCHAR(255),
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  action_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  INDEX (user_id),
  INDEX (is_read)
);
```

### Indexing Strategy
- Primary indexes on id columns
- Foreign key indexes for joins
- Partial indexes on status columns
- Composite indexes for common queries
- Geospatial indexes for location queries

### Data Retention
- Real-time data: 30 days
- Hourly aggregates: 1 year
- Daily summaries: 5 years
- Alerts and reports: 7 years (compliance)

---

## 9. API Documentation {#api-documentation}

### API Base URL
```
http://api.metronix.local/api/v1
```

### Authentication
All API requests require JWT token in Authorization header:
```
Authorization: Bearer <jwt_token>
```

### Response Format
Standard JSON response format:
```json
{
  "success": true,
  "code": 200,
  "message": "Operation successful",
  "data": {
    ...response data...
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Error Response
```json
{
  "success": false,
  "code": 400,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### Common Status Codes
- **200** - OK
- **201** - Created
- **204** - No Content
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **429** - Too Many Requests
- **500** - Internal Server Error
- **503** - Service Unavailable

---

## 10. Authentication & Security {#authentication--security}

### Authentication Flow

1. **User Login:**
   - POST /auth/login with email and password
   - Backend validates credentials
   - Generates JWT token (access + refresh)
   - Returns tokens and user info

2. **Token Usage:**
   - Client stores tokens securely
   - Includes access token in API requests
   - Token includes user info and permissions

3. **Token Refresh:**
   - POST /auth/refresh with refresh token
   - Backend validates refresh token
   - Issues new access token
   - Refresh token rotated for security

4. **Logout:**
   - POST /auth/logout
   - Token added to blacklist
   - Client clears local tokens

### JWT Token Structure
```
Header: {
  "alg": "HS256",
  "typ": "JWT"
}
Payload: {
  "sub": "user_id",
  "email": "user@example.com",
  "role": "admin",
  "permissions": ["read", "write"],
  "iat": 1234567890,
  "exp": 1234571490
}
```

### Security Measures

**Input Validation:**
- Validate all input parameters
- Sanitize user input to prevent injection
- Enforce type checking
- Limit string lengths

**Authorization:**
- Role-based access control (RBAC)
- Resource-level permissions
- Endpoint-level authorization
- Audit logging of access

**Data Protection:**
- Passwords hashed with bcrypt
- Sensitive data encrypted at rest
- HTTPS/TLS for data in transit
- API key rotation

**API Security:**
- CORS configuration
- CSRF protection
- Rate limiting per endpoint
- Request throttling

**Infrastructure:**
- Secrets management (environment variables)
- Network segmentation
- Firewall rules
- DDoS protection

---

## 11. Caching Strategy {#caching-strategy}

### Cache Layers

1. **Browser Cache:**
   - Static assets cached
   - Cache-Control headers set
   - Service workers for offline support

2. **CDN Cache:**
   - Static content distributed
   - Edge caching
   - Automatic invalidation

3. **Application Cache (Redis):**
   - Query results cached
   - User session data
   - Real-time aggregated data
   - TTL-based expiration

### Cache Keys Pattern
```
domain:entity:id:version
Example:
air_quality:current:zone_1:v1
traffic:hourly:zone_1:2024-01-15
energy:daily:zone_2:2024-01
```

### Cache Invalidation
Strategies used:
- **TTL-based** - Automatic expiration
- **Event-based** - Invalidate on data change
- **Manual** - Admin can clear cache
- **Purge all** - Full cache clear

### Cache Warm-up
- Pre-load frequently accessed data
- Scheduled cache population
- On application startup
- After model updates

---

## 12. Notification System {#notification-system}

### Notification Types

1. **Alerts** - Critical threshold violations
2. **Warnings** - Approaching thresholds
3. **Informational** - Status updates
4. **Performance** - System metrics
5. **Maintenance** - Scheduled updates

### Delivery Channels

- **In-app** - WebSocket real-time notifications
- **Email** - Important alerts and reports
- **SMS** - Critical alerts (optional)
- **Push** - Mobile app notifications

### Notification Preferences
Users can configure:
- Notification types to receive
- Delivery channels per type
- Quiet hours
- Escalation rules

### Email Templates
- Alert notification
- Daily summary report
- Weekly analytics report
- Monthly performance report

---

## 13. Deployment Architecture {#deployment-architecture}

### Kubernetes Deployment

**Namespace:**
```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: metronix
```

**Backend Deployment:**
- Multiple replicas for high availability
- Resource limits and requests
- Liveness and readiness probes
- Persistent volumes for logs

**Database Deployment:**
- PostgreSQL StatefulSet
- Persistent volume claims
- Backup strategy
- Replication setup

**Redis Deployment:**
- Redis StatefulSet
- Persistence enabled
- Replication for high availability

**Ingress Configuration:**
- HTTPS termination
- SSL/TLS certificates
- Path-based routing
- Rate limiting at ingress

### Service Discovery
- Service names for internal communication
- DNS resolution within cluster
- External DNS for public endpoints

---

## 14. Installation & Setup {#installation--setup}

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- Docker and Docker Compose
- PostgreSQL 14+ (or use Docker)
- Redis 7+ (or use Docker)
- Git

### Local Development Setup

**1. Clone Repository:**
```bash
git clone https://github.com/yourusername/metronix.git
cd metronix
```

**2. Backend Setup:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your config
npm run dev
```

**3. Frontend Setup:**
```bash
cd frontend
npm install
npm run dev
```

**4. ML Services Setup:**
```bash
cd ml
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

**5. Database Setup:**
```bash
# Using Docker Compose
docker-compose up -d postgres redis

# Run migrations (from backend directory)
npm run migrate
```

### Docker Setup
```bash
# Build all services
docker-compose build

# Start all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f backend
```

---

## 15. Configuration Guide {#configuration-guide}

### Environment Variables

**Backend (.env):**
```
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=metronix
DB_USER=postgres
DB_PASSWORD=password
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key
JWT_EXPIRY=24h
REFRESH_TOKEN_EXPIRY=7d
LOG_LEVEL=debug
CORS_ORIGINS=http://localhost:5173
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000
VITE_APP_NAME=Metronix
VITE_ENABLE_ANALYTICS=true
```

**ML Services (.env):**
```
ML_PORT=5000
MODEL_PATH=/models
DATA_PATH=/data
LOG_LEVEL=INFO
API_KEY=ml_api_key
```

### Database Configuration
- Connection pooling settings
- Connection timeout
- Query timeout
- Replication settings
- Backup schedule

---

## 16. API Endpoints Reference {#api-endpoints-reference}

### Authentication Endpoints
```
POST   /auth/register           - Register new user
POST   /auth/login              - User login
POST   /auth/refresh            - Refresh access token
POST   /auth/logout             - User logout
POST   /auth/forgot-password    - Request password reset
POST   /auth/reset-password     - Reset password
GET    /auth/profile            - Get current user profile
```

### Air Quality Endpoints
```
GET    /air-quality/current     - Get current AQI
GET    /air-quality/historical  - Get historical data
GET    /air-quality/zones       - Get AQI by zone
GET    /air-quality/predict     - Get AQI prediction
POST   /air-quality/data        - Ingest new data (admin)
```

### Traffic Endpoints
```
GET    /traffic/current         - Get current traffic
GET    /traffic/historical      - Get historical traffic data
GET    /traffic/zones           - Get traffic by zone
GET    /traffic/predict         - Get traffic prediction
GET    /traffic/incidents       - Get traffic incidents
POST   /traffic/data            - Ingest traffic data (admin)
```

### Energy Endpoints
```
GET    /energy/current          - Get current consumption
GET    /energy/historical       - Get historical data
GET    /energy/zones            - Get energy by zone
GET    /energy/predict          - Get consumption prediction
GET    /energy/efficiency       - Get efficiency metrics
POST   /energy/data             - Ingest energy data (admin)
```

### Safety Endpoints
```
GET    /safety/current          - Get current safety status
GET    /safety/reports          - Get safety reports
GET    /safety/incidents        - Get incidents
GET    /safety/score            - Get safety score
POST   /safety/report           - Create safety report
PUT    /safety/report/:id       - Update report
```

### Analytics Endpoints
```
GET    /analytics/dashboard     - Get dashboard metrics
GET    /analytics/reports       - Get reports
POST   /analytics/reports       - Generate custom report
GET    /analytics/export        - Export data
```

### Admin Endpoints
```
GET    /admin/users             - List users
POST   /admin/users             - Create user
PUT    /admin/users/:id         - Update user
DELETE /admin/users/:id         - Delete user
GET    /admin/settings          - Get system settings
PUT    /admin/settings          - Update settings
```

---

## 17. WebSocket Communication {#websocket-communication}

### WebSocket Events

**Real-time Data:**
```
Client → Server:
  subscribe:air-quality:zone_1
  subscribe:traffic:zone_2
  subscribe:energy:all

Server → Client:
  data:air-quality:zone_1 {data}
  update:traffic:zone_2 {data}
  alert:safety {incident}
```

**Connection Management:**
```
Client → Server:
  connect
  ping

Server → Client:
  connected
  pong
  notification {message}
```

### Example WebSocket Usage
```javascript
const socket = io('http://localhost:3000');

// Subscribe to real-time data
socket.on('connected', () => {
  socket.emit('subscribe', 'air-quality:zone_1');
});

// Receive updates
socket.on('data:air-quality:zone_1', (data) => {
  console.log('New AQI:', data);
});

// Receive alerts
socket.on('alert', (alert) => {
  console.log('Alert:', alert.message);
});
```

---

## 18. Performance & Optimization {#performance--optimization}

### Frontend Optimization
- **Code Splitting** - Route-based code splitting
- **Lazy Loading** - Components loaded on demand
- **Image Optimization** - Compressed and responsive images
- **Bundle Size** - Tree shaking and minification
- **Caching** - Service workers and browser cache

### Backend Optimization
- **Database Queries** - Indexed queries, pagination
- **Connection Pooling** - Reuse database connections
- **Caching** - Redis for frequently accessed data
- **Compression** - Gzip response compression
- **Load Balancing** - Distribute requests across servers

### ML Model Optimization
- **Model Pruning** - Remove unnecessary weights
- **Quantization** - Reduce precision for faster execution
- **Batch Processing** - Process multiple predictions
- **GPU Acceleration** - Use GPU for inference
- **Model Caching** - Cache predictions

### Monitoring Metrics
- **Response Time** - P50, P95, P99 latencies
- **Throughput** - Requests per second
- **Error Rate** - % of failed requests
- **CPU/Memory** - Resource utilization
- **Database** - Query performance, connection pool

---

## 19. Monitoring & Logging {#monitoring--logging}

### Logging Strategy

**Log Levels:**
- **ERROR** - Critical errors requiring attention
- **WARN** - Warning conditions
- **INFO** - General informational messages
- **DEBUG** - Debugging information
- **TRACE** - Detailed trace information

**Log Format:**
```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "INFO",
  "service": "backend",
  "module": "airQualityController",
  "message": "Retrieved current AQI",
  "userId": "user_123",
  "requestId": "req_456",
  "duration": 125,
  "statusCode": 200
}
```

### Monitoring Stack
- **Prometheus** - Metrics collection
- **Grafana** - Metrics visualization
- **Alert Manager** - Alert routing
- **ELK Stack** - Log aggregation

### Key Metrics to Monitor
- API response times
- Error rates
- Database query performance
- Cache hit rates
- Memory and CPU usage
- Disk space and I/O
- Network traffic
- User activity

---

## 20. User Guide {#user-guide}

### Getting Started
1. Visit Metronix dashboard
2. Create account or login with credentials
3. Complete user profile
4. Set notification preferences
5. Explore available dashboards

### Dashboard Navigation
- **Home** - Overview of all metrics
- **Air Quality** - Air pollution monitoring
- **Traffic** - Traffic condition analysis
- **Energy** - Energy consumption tracking
- **Safety** - Safety incidents and alerts
- **Analytics** - Custom reports and analysis

### Key Features

**Real-time Monitoring:**
- Live data updates every 30 seconds
- Color-coded severity indicators
- Geographic zone visualization
- Trend analysis

**Alerts & Notifications:**
- Threshold-based alerts
- Email and in-app notifications
- Alert history and dismissed alerts
- Custom alert rules

**Data Export:**
- Download reports as PDF/CSV
- Export data for analysis
- Schedule regular reports
- Email delivery

**Analytics:**
- Custom date range selection
- Comparison views
- Trend analysis
- Predictive insights

---

## 21. Admin Panel Guide {#admin-panel-guide}

### Admin Capabilities
- User management
- System configuration
- Data ingestion
- Cache management
- Alert threshold settings
- Report generation

### User Management
- Create/edit/delete users
- Assign roles and permissions
- View user activity logs
- Reset user passwords
- Deactivate accounts

### System Settings
- API configuration
- Email settings
- Notification preferences
- Data retention policies
- Backup schedule

### Data Management
- Manual data import
- Data validation
- Duplicate detection
- Data quality reports

---

## 22. Data Management {#data-management}

### Data Ingestion
- Real-time data from sensors
- Batch data imports
- API integration with external sources
- Data validation and cleaning

### Data Storage
- Time-series optimized storage
- Compressed storage for historical data
- Automatic archival after retention period
- Backup and recovery procedures

### Data Quality
- Validation rules for each domain
- Automated quality checks
- Alert on data anomalies
- Data lineage tracking

### Data Governance
- Access control policies
- Data classification
- Retention schedules
- Compliance auditing

---

## 23. ML Model Training {#ml-model-training}

### Training Pipeline
1. Data collection and aggregation
2. Feature engineering
3. Data split (train/val/test)
4. Model training
5. Hyperparameter tuning
6. Model evaluation
7. Cross-validation
8. Model deployment

### Scheduled Training
- Daily model retraining
- Weekly performance evaluation
- Monthly comprehensive review
- Automatic rollback on degradation

### Model Versioning
- Multiple model versions maintained
- A/B testing of models
- Fallback to previous versions
- Model performance tracking

---

## 24. Security Implementation {#security-implementation}

### Application Security
- Input validation and sanitization
- SQL injection prevention
- XSS attack prevention
- CSRF token protection
- Rate limiting and throttling

### Data Security
- Encryption at rest
- Encryption in transit (TLS 1.3)
- Hashed password storage
- Secure key management
- PII data masking

### Infrastructure Security
- Network isolation
- Firewall rules
- VPC configuration
- DDoS protection
- Intrusion detection

### Compliance
- GDPR compliance
- Data privacy standards
- Audit logging
- Penetration testing
- Security scanning

---

## 25. Troubleshooting Guide {#troubleshooting-guide}

### Common Issues

**Problem: API returns 401 Unauthorized**
- Solution: Check if token is expired, refresh token
- Verify token is in Authorization header
- Check JWT_SECRET in environment

**Problem: Database connection failures**
- Solution: Verify DB credentials
- Check DB service is running
- Verify network connectivity
- Check firewall rules

**Problem: High API latency**
- Solution: Check database query performance
- Verify Redis cache hit rates
- Monitor server resources
- Check network bandwidth
- Review slow query logs

**Problem: WebSocket connection failing**
- Solution: Verify WebSocket URL configuration
- Check CORS settings
- Verify firewall allows WebSocket
- Check socket.io version compatibility

**Problem: ML predictions inaccurate**
- Solution: Retrain models with latest data
- Check feature engineering
- Verify data quality
- Review model hyperparameters
- Check for data drift

### Debugging Commands
```bash
# View backend logs
docker-compose logs backend

# Check database connection
docker-compose exec postgres psql -U postgres -d metronix

# Verify Redis
docker-compose exec redis redis-cli ping

# Test API endpoint
curl -H "Authorization: Bearer TOKEN" http://localhost:3000/api/v1/auth/profile

# Check resource usage
docker stats
```

---

## 26. Future Roadmap {#future-roadmap}

### Planned Features (Q2-Q4 2024)

**Short-term (3 months):**
- Mobile application (iOS/Android)
- Advanced filtering and search
- Custom dashboard creation
- Real-time alerting enhancements
- Performance optimization

**Medium-term (6 months):**
- Multi-language support (i18n)
- Advanced ML models (LSTM, attention mechanisms)
- Blockchain integration for audit trail
- IoT device integration framework
- Batch processing improvements

**Long-term (12+ months):**
- Augmented reality visualization
- Quantum-ready encryption
- Advanced AI-powered insights
- Smart city API integration
- Decentralized data storage

### Technology Updates
- React 20+ upgrade
- Node.js 22+ LTS adoption
- PostgreSQL 16+ adoption
- Kubernetes 1.30+ support
- TensorFlow 3.x integration

### Infrastructure Improvements
- Multi-region deployment
- Advanced caching mechanisms
- GraphQL API option
- Event streaming (Kafka)
- Microservices migration

### Community & Documentation
- Developer API documentation
- Open-source SDK
- Community forum
- Tutorial videos
- Integration guides

---

## Conclusion

Metronix is a comprehensive smart city analytics platform designed for scalability, reliability, and usability. With its modular architecture, modern technology stack, and focus on real-time data analysis, it provides city administrators and planners with the tools they need to make data-driven decisions for urban optimization.

This documentation provides a complete overview of the system architecture, components, APIs, and operational procedures. For support or additional information, please contact the development team.

---

## Appendix

### A. Quick Reference

**API Documentation:** http://localhost:3000/api-docs
**Frontend:** http://localhost:5173
**Database:** postgres://localhost:5432/metronix
**Redis:** redis://localhost:6379
**ML Service:** http://localhost:5000

### B. Contact & Support

- **Technical Lead:** [Contact]
- **DevOps Team:** [Contact]
- **Support Email:** support@metronix.local
- **Documentation:** http://docs.metronix.local

### C. Document Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Jan 2024 | Dev Team | Initial documentation |
| 1.1 | Jan 2024 | Dev Team | Added ML models section |
| 1.2 | Jan 2024 | Dev Team | Added security section |

---

**Document prepared for: Metronix Smart City Analytics Platform**
**Prepared by: Development Team**
**Date: April 12, 2024**
**Status: FINAL - APPROVED**
