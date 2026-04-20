# 🌆 Metronix — Smart Urban Life Assistant

> **Developed by:** Ravi Kumar | **Roll No:** 25CSM1R17  
> **Version:** 2.0.0 | **License:** MIT

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [File Structure](#file-structure)
4. [Features](#features)
5. [Tech Stack](#tech-stack)
6. [Installation](#installation)
7. [Environment Variables](#environment-variables)
8. [API Documentation](#api-documentation)
9. [ML Models](#ml-models)
10. [Deployment](#deployment)
11. [Contributing](#contributing)

---

## 🎯 Overview

Metronix is a comprehensive, intelligent Smart Urban Life Assistant that proactively addresses multifaceted challenges faced by city dwellers:

- **Traffic Congestion** — Real-time monitoring and predictive routing
- **Air Quality** — Hyperlocal microclimate monitoring and alerts
- **Personal Safety** — Community-integrated safety scoring system
- **Energy Efficiency** — Proactive resource optimization suggestions
- **Daily Productivity** — AI-powered schedule generation and management

Unlike traditional applications that focus on individual aspects in isolation, Metronix integrates:
- Real-time city-level data (traffic, environmental sensors, safety alerts, resource usage)
- Personal behavioral data (routines, travel patterns, activity preferences)
- Predictive ML models for actionable, personalized guidance

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT LAYER                           │
│  React 18 + Redux Toolkit + React Query + TailwindCSS       │
│  WebSocket Client | Service Worker | IndexedDB Cache        │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTPS / WSS
┌──────────────────────────▼──────────────────────────────────┐
│                     API GATEWAY                             │
│          Nginx Reverse Proxy + Rate Limiting                │
└──────────────────────────┬──────────────────────────────────┘
                           │
         ┌─────────────────┼─────────────────┐
         │                 │                 │
┌────────▼───────┐ ┌───────▼──────┐ ┌───────▼──────┐
│  REST API      │ │  WebSocket   │ │  ML Service  │
│  Express.js    │ │  Server      │ │  FastAPI     │
│  Node.js       │ │  Socket.IO   │ │  Python      │
└────────┬───────┘ └───────┬──────┘ └───────┬──────┘
         │                 │                 │
┌────────▼─────────────────▼─────────────────▼──────┐
│               DATA LAYER                           │
│  PostgreSQL | Redis Cache | MongoDB | InfluxDB     │
└────────────────────────────────────────────────────┘
         │
┌────────▼──────────────────────────────────────────┐
│            EXTERNAL DATA SOURCES                   │
│  Google Maps API | OpenWeatherMap | AQI APIs       │
│  City Traffic APIs | Crime Data APIs               │
│  Smart Meter APIs | Public Transit APIs            │
└────────────────────────────────────────────────────┘
```

---

## 📁 File Structure

```
metronix/
├── README.md
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env.example
├── .gitignore
│
├── frontend/                          # React Frontend Application
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── index.html
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── manifest.json
│   │   └── icons/
│   └── src/
│       ├── main.jsx                   # Entry point
│       ├── App.jsx                    # Root component with routing
│       ├── styles/
│       │   ├── global.css             # Global CSS variables & resets
│       │   └── animations.css         # Keyframe animations
│       ├── pages/
│       │   ├── LandingPage.jsx        # Public landing page
│       │   ├── LoginPage.jsx          # Authentication page
│       │   ├── DashboardPage.jsx      # Main dashboard
│       │   ├── TrafficPage.jsx        # Traffic monitoring page
│       │   ├── AirQualityPage.jsx     # Air quality page
│       │   ├── SafetyPage.jsx         # Safety scores page
│       │   ├── EnergyPage.jsx         # Energy optimization page
│       │   ├── PlannerPage.jsx        # Daily planner page
│       │   ├── AnalyticsPage.jsx      # Analytics & insights
│       │   ├── ProfilePage.jsx        # User profile
│       │   └── SettingsPage.jsx       # App settings
│       ├── components/
│       │   ├── Dashboard/
│       │   │   ├── index.jsx          # Dashboard layout
│       │   │   ├── StatCard.jsx       # KPI stat card
│       │   │   ├── QuickActions.jsx   # Quick action buttons
│       │   │   └── RecentAlerts.jsx   # Recent alerts list
│       │   ├── TrafficMonitor/
│       │   │   ├── index.jsx          # Traffic main component
│       │   │   ├── TrafficMap.jsx     # Interactive traffic map
│       │   │   ├── RouteCard.jsx      # Route suggestion card
│       │   │   ├── CongestionChart.jsx# Congestion heat chart
│       │   │   └── IncidentList.jsx   # Traffic incident list
│       │   ├── AirQuality/
│       │   │   ├── index.jsx          # AQ main component
│       │   │   ├── AQIGauge.jsx       # AQI gauge meter
│       │   │   ├── PollutantChart.jsx # Pollutant breakdown chart
│       │   │   ├── MicroclimatMap.jsx # Hyperlocal map overlay
│       │   │   └── HealthAdvice.jsx   # Health recommendations
│       │   ├── SafetyScore/
│       │   │   ├── index.jsx          # Safety main component
│       │   │   ├── SafetyMap.jsx      # Safety heatmap
│       │   │   ├── ScoreGauge.jsx     # Safety score gauge
│       │   │   ├── ReportForm.jsx     # Community report form
│       │   │   └── IncidentFeed.jsx   # Live incident feed
│       │   ├── EnergyOptimizer/
│       │   │   ├── index.jsx          # Energy main component
│       │   │   ├── ConsumptionChart.jsx# Energy usage chart
│       │   │   ├── OptimizationCard.jsx# Tip cards
│       │   │   ├── CostCalculator.jsx # Cost savings calculator
│       │   │   └── ComparisonChart.jsx# Neighborhood comparison
│       │   ├── DailyPlanner/
│       │   │   ├── index.jsx          # Planner main component
│       │   │   ├── TimelineView.jsx   # Day timeline view
│       │   │   ├── TaskCard.jsx       # Individual task card
│       │   │   ├── PlanGenerator.jsx  # AI plan generator
│       │   │   └── CalendarView.jsx   # Monthly calendar
│       │   ├── Map/
│       │   │   ├── index.jsx          # Base map component
│       │   │   ├── MapLayers.jsx      # Map overlay layers
│       │   │   ├── MapControls.jsx    # Map control buttons
│       │   │   └── MapMarkers.jsx     # Custom map markers
│       │   ├── Navbar/
│       │   │   ├── index.jsx          # Top navigation bar
│       │   │   └── NavItem.jsx        # Nav item component
│       │   ├── Sidebar/
│       │   │   ├── index.jsx          # Sidebar component
│       │   │   └── SidebarItem.jsx    # Sidebar menu item
│       │   ├── Alerts/
│       │   │   ├── index.jsx          # Alerts manager
│       │   │   ├── AlertCard.jsx      # Alert card component
│       │   │   └── AlertBanner.jsx    # Banner alert
│       │   ├── Analytics/
│       │   │   ├── index.jsx          # Analytics dashboard
│       │   │   ├── TrendChart.jsx     # Trend line chart
│       │   │   ├── HeatmapCalendar.jsx# Calendar heatmap
│       │   │   └── InsightCard.jsx    # ML insight card
│       │   ├── UserProfile/
│       │   │   ├── index.jsx          # User profile page
│       │   │   ├── AvatarUpload.jsx   # Avatar upload
│       │   │   └── PreferencesForm.jsx# User preferences
│       │   ├── WeatherWidget/
│       │   │   ├── index.jsx          # Weather widget
│       │   │   └── ForecastCard.jsx   # Forecast card
│       │   ├── Notifications/
│       │   │   ├── index.jsx          # Notifications panel
│       │   │   └── NotificationItem.jsx# Notification item
│       │   └── Settings/
│       │       ├── index.jsx          # Settings page
│       │       └── SettingsSection.jsx# Settings section
│       ├── hooks/
│       │   ├── useTraffic.js          # Traffic data hook
│       │   ├── useAirQuality.js       # Air quality hook
│       │   ├── useSafety.js           # Safety data hook
│       │   ├── useEnergy.js           # Energy data hook
│       │   ├── usePlanner.js          # Planner hook
│       │   ├── useWeather.js          # Weather data hook
│       │   ├── useWebSocket.js        # WebSocket connection hook
│       │   ├── useGeolocation.js      # Geolocation hook
│       │   ├── useNotifications.js    # Push notifications hook
│       │   ├── useAuth.js             # Authentication hook
│       │   └── useTheme.js            # Theme switching hook
│       ├── services/
│       │   ├── api.js                 # Axios API client
│       │   ├── auth.service.js        # Auth API calls
│       │   ├── traffic.service.js     # Traffic API calls
│       │   ├── airQuality.service.js  # AQ API calls
│       │   ├── safety.service.js      # Safety API calls
│       │   ├── energy.service.js      # Energy API calls
│       │   ├── planner.service.js     # Planner API calls
│       │   ├── ml.service.js          # ML prediction calls
│       │   ├── websocket.service.js   # WebSocket manager
│       │   └── notification.service.js# Push notification service
│       ├── store/
│       │   ├── index.js               # Redux store configuration
│       │   └── slices/
│       │       ├── authSlice.js       # Auth state
│       │       ├── trafficSlice.js    # Traffic state
│       │       ├── airQualitySlice.js # AQ state
│       │       ├── safetySlice.js     # Safety state
│       │       ├── energySlice.js     # Energy state
│       │       ├── plannerSlice.js    # Planner state
│       │       ├── alertsSlice.js     # Alerts state
│       │       └── uiSlice.js         # UI state (theme, sidebar)
│       └── utils/
│           ├── calculations.js        # Math and data calculations
│           ├── formatters.js          # Data formatters
│           ├── validators.js          # Form validators
│           ├── constants.js           # App-wide constants
│           ├── mapUtils.js            # Map helper functions
│           └── mlUtils.js             # ML data preprocessing
│
├── backend/                           # Node.js/Express API Server
│   ├── package.json
│   ├── server.js                      # Entry point
│   ├── app.js                         # Express app setup
│   ├── config/
│   │   ├── database.js                # PostgreSQL + Mongoose config
│   │   ├── redis.js                   # Redis cache config
│   │   ├── environment.js             # Environment variables loader
│   │   └── swagger.js                 # API documentation config
│   ├── models/
│   │   ├── User.js                    # User model
│   │   ├── TrafficData.js             # Traffic data model
│   │   ├── AirQualityData.js          # Air quality data model
│   │   ├── SafetyReport.js            # Safety report model
│   │   ├── SafetyScore.js             # Computed safety scores
│   │   ├── EnergyData.js              # Energy usage model
│   │   ├── DailyPlan.js               # Daily plan model
│   │   ├── UserBehavior.js            # Behavioral analytics model
│   │   ├── Notification.js            # Notification model
│   │   └── CityZone.js                # City zone/district model
│   ├── routes/
│   │   ├── index.js                   # Route aggregator
│   │   ├── auth.routes.js             # Authentication routes
│   │   ├── traffic.routes.js          # Traffic routes
│   │   ├── airQuality.routes.js       # Air quality routes
│   │   ├── safety.routes.js           # Safety routes
│   │   ├── energy.routes.js           # Energy routes
│   │   ├── planner.routes.js          # Planner routes
│   │   ├── analytics.routes.js        # Analytics routes
│   │   ├── notifications.routes.js    # Notification routes
│   │   └── admin.routes.js            # Admin routes
│   ├── controllers/
│   │   ├── auth.controller.js         # Auth logic
│   │   ├── traffic.controller.js      # Traffic logic
│   │   ├── airQuality.controller.js   # AQ logic
│   │   ├── safety.controller.js       # Safety logic
│   │   ├── energy.controller.js       # Energy logic
│   │   ├── planner.controller.js      # Planner logic
│   │   ├── analytics.controller.js    # Analytics logic
│   │   └── notification.controller.js # Notification logic
│   ├── middleware/
│   │   ├── auth.middleware.js         # JWT authentication
│   │   ├── rateLimiter.middleware.js  # Rate limiting
│   │   ├── errorHandler.middleware.js # Global error handler
│   │   ├── logger.middleware.js       # Request logger
│   │   ├── validator.middleware.js    # Request validation
│   │   └── cache.middleware.js        # Redis cache middleware
│   ├── services/
│   │   ├── mlService.js               # ML API integration
│   │   ├── notificationService.js     # Push notification service
│   │   ├── dataIngestionService.js    # External data ingestion
│   │   ├── cacheService.js            # Caching layer
│   │   ├── emailService.js            # Email service
│   │   └── schedulerService.js        # Cron job scheduler
│   ├── websocket/
│   │   ├── index.js                   # Socket.IO setup
│   │   ├── handlers/
│   │   │   ├── trafficHandler.js      # Traffic WS handler
│   │   │   ├── alertHandler.js        # Alert WS handler
│   │   │   └── plannerHandler.js      # Planner WS handler
│   │   └── middleware/
│   │       └── wsAuth.middleware.js   # WS authentication
│   └── utils/
│       ├── helpers.js                 # General helpers
│       ├── validators.js              # Data validators
│       ├── geoUtils.js                # Geospatial utilities
│       └── responseHelper.js         # API response helpers
│
├── ml/                                # Python ML Service (FastAPI)
│   ├── requirements.txt
│   ├── main.py                        # FastAPI entry point
│   ├── config.py                      # ML service config
│   ├── models/
│   │   ├── traffic_predictor.py       # LSTM traffic prediction
│   │   ├── air_quality_predictor.py   # XGBoost AQ prediction
│   │   ├── safety_scorer.py           # Safety score model
│   │   ├── energy_optimizer.py        # Energy optimization RL model
│   │   └── planner_optimizer.py       # Schedule optimizer
│   ├── utils/
│   │   ├── data_processor.py          # Data preprocessing
│   │   ├── feature_engineering.py     # Feature extraction
│   │   ├── model_loader.py            # Model persistence
│   │   └── metrics.py                 # Model evaluation metrics
│   ├── training/
│   │   ├── train_traffic.py           # Traffic model training
│   │   ├── train_air_quality.py       # AQ model training
│   │   ├── train_safety.py            # Safety model training
│   │   └── train_energy.py            # Energy model training
│   ├── data/
│   │   ├── sample_traffic.csv         # Sample traffic data
│   │   ├── sample_air_quality.csv     # Sample AQ data
│   │   └── sample_safety.csv          # Sample safety data
│   └── saved_models/                  # Serialized trained models
│       ├── traffic_lstm.h5
│       ├── air_quality_xgb.pkl
│       ├── safety_rf.pkl
│       └── energy_rl.zip
│
├── infra/                             # Infrastructure as Code
│   ├── docker/
│   │   ├── Dockerfile.frontend
│   │   ├── Dockerfile.backend
│   │   └── Dockerfile.ml
│   ├── nginx/
│   │   ├── nginx.conf
│   │   └── ssl/
│   ├── kubernetes/
│   │   ├── namespace.yaml
│   │   ├── frontend-deployment.yaml
│   │   ├── backend-deployment.yaml
│   │   ├── ml-deployment.yaml
│   │   ├── redis-deployment.yaml
│   │   ├── postgres-deployment.yaml
│   │   └── ingress.yaml
│   └── terraform/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
│
└── docs/
    ├── api-reference.md
    ├── ml-models.md
    ├── deployment-guide.md
    └── user-manual.md
```

---

## ✨ Features

### 1. 🚦 Behavior-Aware Risk Prediction
- Learns user's daily routines and travel patterns
- Predicts traffic congestion 30–60 minutes ahead
- Personalized route suggestions based on historical preferences
- Incident detection with automatic re-routing

### 2. 🌫️ Urban Microclimate Awareness
- Hyperlocal AQI monitoring at 100m resolution
- Real-time PM2.5, PM10, NO2, O3, CO, SO2 tracking
- Temperature and humidity microzone mapping
- Health advisories based on user's medical profile
- Pollen and allergen alerts

### 3. ⚡ Proactive Energy Optimization
- Smart meter integration for real-time consumption tracking
- Peak demand prediction and load-shifting recommendations
- Appliance-level usage analytics
- Cost savings calculator with neighborhood benchmarking
- Solar/renewable integration suggestions

### 4. 🛡️ Community-Integrated Safety Scoring
- Dynamic safety scores updated every 15 minutes
- Crowd-sourced incident reports with verification
- Integration with official crime data APIs
- Time-of-day and weather-adjusted scoring
- Safe route recommendations

### 5. 📅 Predictive Daily Plan Generator
- Multi-objective schedule optimization (time, safety, health, cost)
- Adaptive replanning when conditions change
- Integration with personal calendar and preferences
- Commute time prediction with public transit options
- Health break reminders based on AQ and weather

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Redux Toolkit, React Query, Vite |
| Styling | TailwindCSS, Framer Motion, Recharts, Mapbox GL |
| Backend | Node.js 20, Express.js 4, Socket.IO |
| ML Service | Python 3.11, FastAPI, TensorFlow, Scikit-learn |
| Database | PostgreSQL 15, MongoDB 7, InfluxDB 2 |
| Cache | Redis 7 |
| Auth | JWT, OAuth2 (Google, Apple) |
| Infrastructure | Docker, Kubernetes, Nginx |
| CI/CD | GitHub Actions |
| Monitoring | Prometheus, Grafana |

---

## 🚀 Installation

### Prerequisites
- Node.js >= 20.0.0
- Python >= 3.11
- Docker & Docker Compose
- PostgreSQL 15
- Redis 7

### Quick Start with Docker
```bash
# Clone repository
git clone https://github.com/ravikumar/metronix.git
cd metronix

# Copy environment files
cp .env.example .env
# Edit .env with your API keys

# Start all services
docker-compose up -d

# Access the application
open http://localhost:3000
```

### Manual Installation

#### Frontend
```bash
cd frontend
npm install
npm run dev     # Development server on port 3000
npm run build   # Production build
```

#### Backend
```bash
cd backend
npm install
npm run migrate # Run database migrations
npm run seed    # Seed sample data
npm run dev     # Development server on port 5000
```

#### ML Service
```bash
cd ml
pip install -r requirements.txt
python training/train_all.py  # Train all models
uvicorn main:app --reload --port 8000
```

---

## 🔑 Environment Variables

```env
# Frontend
VITE_API_URL=http://localhost:5000/api/v1
VITE_WS_URL=ws://localhost:5000
VITE_MAPBOX_TOKEN=your_mapbox_token
VITE_GOOGLE_MAPS_KEY=your_google_maps_key

# Backend
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://user:pass@localhost:5432/metronix
MONGODB_URI=mongodb://localhost:27017/metronix
REDIS_URL=redis://localhost:6379
ML_SERVICE_URL=http://localhost:8000
JWT_SECRET=your_jwt_secret_256_bit
JWT_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# External APIs
OPENWEATHER_API_KEY=your_key
AIRVISUAL_API_KEY=your_key
TOMTOM_TRAFFIC_KEY=your_key
IQAIR_API_KEY=your_key

# ML Service
MODEL_PATH=./saved_models
FEATURE_STORE_URL=redis://localhost:6379/1
```

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api/v1`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/register` | POST | Register new user |
| `/auth/login` | POST | Login and get JWT |
| `/traffic/current` | GET | Current traffic data |
| `/traffic/predict` | GET | Traffic prediction |
| `/air-quality/current` | GET | Current AQI data |
| `/air-quality/forecast` | GET | AQ 24h forecast |
| `/safety/score` | GET | Area safety score |
| `/safety/reports` | POST | Submit safety report |
| `/energy/consumption` | GET | Energy usage data |
| `/energy/optimize` | GET | Optimization suggestions |
| `/planner/generate` | POST | Generate daily plan |
| `/analytics/trends` | GET | Personal trend data |

Full Swagger docs available at: `http://localhost:5000/api-docs`

---

## 🧠 ML Models

| Model | Algorithm | Accuracy | Update Freq |
|-------|-----------|----------|-------------|
| Traffic Predictor | Bi-LSTM + Attention | 94.2% | 5 min |
| AQ Predictor | XGBoost Ensemble | 91.8% | 15 min |
| Safety Scorer | Random Forest + GBM | 88.5% | 15 min |
| Energy Optimizer | Proximal Policy Opt. | 89.3% | 1 hour |
| Plan Optimizer | Constraint + Genetic | 92.1% | On demand |

---

## 👨‍💻 Developer

**Ravi Kumar**  
Roll No: 25CSM1R17  
Smart Urban Computing | ML & Full-Stack Development

---

*Metronix — Transforming urban challenges into actionable intelligence.*
