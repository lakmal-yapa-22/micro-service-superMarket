🏗️ Microservices Architecture Guide

A modular approach where a software system is divided into small, independent services that communicate through APIs.

📋 Table of Contents

Overview
Monolithic vs Microservices
Key Concepts
Architecture Components
Example Implementation
Benefits & Challenges
Best Practices
Getting Started

🔍 Overview
Microservices architecture is a software development approach where applications are built as a collection of small, independent services that communicate over well-defined APIs. Each service is:

Independently deployable
Loosely coupled
Organized around business capabilities
Owned by a small team

🏛️ Monolithic vs Microservices
1. Monolithic Architecture (පැරණි විදිහ)
┌─────────────────────────────────┐
│        Single Application       │
├─────────────────────────────────┤
│  UI + Backend + DB + Business   │
│           Logic                 │
└─────────────────────────────────┘
✅ Advantages:

Simple to develop for small projects
Easy to test and deploy initially
Single codebase to manage

❌ Disadvantages:

Changes affect entire system
Difficult to scale individual components
Cannot split development teams effectively
Limited technology stack flexibility

2. N-tier Architecture (Layered)
┌─────────────────────────────────┐
│     Presentation Layer          │
├─────────────────────────────────┤
│     Business Logic Layer        │
├─────────────────────────────────┤
│     Data Access Layer           │
└─────────────────────────────────┘
Better than monolith but still one big application.
3. Microservices Architecture (Modern Scalable Method)
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Service   │  │   Service   │  │   Service   │
│      A      │  │      B      │  │      C      │
└─────────────┘  └─────────────┘  └─────────────┘
       │                │                │
       └────────────────┼────────────────┘
                        │
              ┌─────────────┐
              │ API Gateway │
              └─────────────┘
🔑 Key Concepts
1. Service Decomposition
Backend එක කොටස් කොටස් වලට කඩනවා domain-based functionality අනුව:

Customer Service - Handle customer logic
Order Service - Handle orders
Inventory Service - Handle stock
Payment Service - Handle payments

2. Independent Deployment

හැම service එකම independently deploy කරන්න පුළුවන්
එකක් update කරද්දි අනෙකාට effect වෙන්නෙ නෑ
Different release cycles for each service

3. Technology Diversity
yamlCustomer Service: Java + MySQL
Inventory Service: Node.js + MongoDB  
Payment Service: Python + PostgreSQL
Order Service: .NET + SQL Server
4. Database Strategies
Option 1: Shared Database
┌─────────┐  ┌─────────┐  ┌─────────┐
│Service A│  │Service B│  │Service C│
└────┬────┘  └────┬────┘  └────┬────┘
     │            │            │
     └────────────┼────────────┘
                  ▼
            ┌─────────────┐
            │   Database  │
            └─────────────┘
Option 2: Database per Service
┌─────────┐    ┌─────────┐    ┌─────────┐
│Service A│    │Service B│    │Service C│
└────┬────┘    └────┬────┘    └────┬────┘
     ▼              ▼              ▼
┌─────────┐    ┌─────────┐    ┌─────────┐
│  DB A   │    │  DB B   │    │  DB C   │
└─────────┘    └─────────┘    └─────────┘
5. Communication Patterns
Synchronous Communication
javascript// REST API calls
const customerData = await fetch('http://customer-service:8081/api/customers/123');
const orderData = await fetch('http://order-service:8083/api/orders', {
    method: 'POST',
    body: JSON.stringify(orderPayload)
});
Asynchronous Communication
javascript// Message Queue (RabbitMQ/Kafka)
orderService.publish('order.created', {
    orderId: '12345',
    customerId: 'cust-001',
    items: [...]
});
🏗️ Architecture Components
API Gateway

Single entry point for all client requests
Request routing to appropriate services
Authentication & authorization
Rate limiting & monitoring

Service Registry

Service discovery mechanism
Health checking
Load balancing

Configuration Management

Centralized configuration
Environment-specific settings
Dynamic configuration updates

💡 Example Implementation: POS System
Service Breakdown
Service NameResponsibilityTechnologyDatabasePortCustomer ServiceRegister/Search CustomersJava Spring BootMySQL8081Product ServiceManage Items & InventoryNode.js ExpressMongoDB8082Order ServicePlace/View OrdersPython FastAPIPostgreSQL8083Payment ServiceProcess Payments.NET CoreSQL Server8084
Communication Flow
┌─────────────┐    API Calls    ┌─────────────┐
│   Frontend  │ ──────────────► │ API Gateway │
│   (React)   │                 │   (Nginx)   │
└─────────────┘                 └──────┬──────┘
                                       │
        ┌──────────────┬─────────────────┼─────────────────┬──────────────┐
        ▼              ▼                 ▼                 ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│  Customer   │ │   Product   │ │    Order    │ │   Payment   │ │   Notify    │
│   Service   │ │   Service   │ │   Service   │ │   Service   │ │   Service   │
│   :8081     │ │    :8082    │ │    :8083    │ │    :8084    │ │    :8085    │
└─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
Sample Docker Compose
yamlversion: '3.8'
services:
  api-gateway:
    image: nginx:alpine
    ports:
      - "80:80"
    depends_on:
      - customer-service
      - product-service
      - order-service

  customer-service:
    build: ./customer-service
    ports:
      - "8081:8081"
    environment:
      - DATABASE_URL=mysql://mysql:3306/customers
    depends_on:
      - mysql

  product-service:
    build: ./product-service
    ports:
      - "8082:8082"
    environment:
      - MONGO_URL=mongodb://mongo:27017/products
    depends_on:
      - mongo

  order-service:
    build: ./order-service
    ports:
      - "8083:8083"
    environment:
      - DATABASE_URL=postgresql://postgres:5432/orders
    depends_on:
      - postgres

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: customers

  mongo:
    image: mongo:latest

  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: orders
      POSTGRES_PASSWORD: postgres
💡 Benefits & Challenges
✅ Benefits
BenefitDescription🔁 ScalabilityScale only the services that need it🔒 Fault IsolationOne service failure doesn't bring down the entire system🔄 Development AgilityDifferent teams can work independently🚀 Fast DeploymentDeploy only the changed services🛠️ Technology DiversityUse the best tool for each specific job👥 Team AutonomySmall teams can own and maintain services
⚠️ Challenges
ChallengeMitigation StrategyComplex CommunicationUse API Gateway and service meshData ConsistencyImplement eventual consistency patternsMonitoring & DebuggingCentralized logging and distributed tracingNetwork LatencyOptimize service communication and cachingDevOps ComplexityUse containerization and orchestration tools
🎯 Best Practices
1. Service Design

Single Responsibility: Each service should have one business responsibility
Domain-Driven Design: Organize services around business domains
API-First Approach: Design APIs before implementation

2. Data Management

Database per Service: Avoid shared databases when possible
Event Sourcing: Use events to maintain data consistency
CQRS: Separate read and write operations

3. Communication

Asynchronous Messaging: Use for non-critical operations
Circuit Breaker Pattern: Prevent cascade failures
Retry Mechanisms: Handle temporary failures gracefully

4. Deployment & Operations

Containerization: Use Docker for consistent environments
Infrastructure as Code: Use tools like Terraform or CloudFormation
Blue-Green Deployment: Zero-downtime deployments

5. Monitoring & Observability

Centralized Logging: ELK Stack or similar
Distributed Tracing: Jaeger or Zipkin
Health Checks: Implement health endpoints
Metrics Collection: Prometheus and Grafana

🚀 Getting Started
Prerequisites

Docker & Docker Compose
Git
Your preferred programming languages
Basic understanding of REST APIs

Quick Start

Clone the repository
bashgit clone https://github.com/your-username/microservices-example.git
cd microservices-example

Start the services
bashdocker-compose up -d

Access the application

API Gateway: http://localhost
Customer Service: http://localhost:8081
Product Service: http://localhost:8082
Order Service: http://localhost:8083



Development Workflow

Create feature branch for each service
Develop and test service independently
Update API documentation
Deploy service to staging environment
Run integration tests
Deploy to production

📚 Additional Resources

Microservices Patterns by Chris Richardson
Building Microservices by Sam Newman
Spring Boot Microservices Tutorial
Docker Documentation
Kubernetes Documentation

🤝 Contributing

Fork the repository
Create your feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
## 📄 Documentation

Note:  
👉 [https://your-document-link.com](https://docs.google.com/document/d/1Z_6HyMTYfbUCyDeW1eX7mp2Vy0e-VgflMliMTQNeAI0/edit?usp=sharing)
