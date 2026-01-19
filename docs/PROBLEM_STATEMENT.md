# Problem Statement: URL Shortener with DevSecOps CI/CD

## 1. Background & Motivation

### The Problem
Modern software development requires rapid, reliable, and secure deployment of applications. Traditional manual deployment processes are:
- **Error-prone**: Human mistakes during deployment
- **Slow**: Manual testing and deployment takes hours
- **Insecure**: Security vulnerabilities discovered late in development cycle
- **Unreliable**: Inconsistent environments between dev and production

### Why This Project?
This project demonstrates a **production-grade DevSecOps pipeline** that addresses these challenges through:
- **Automation**: Zero-touch deployment from code commit to production
- **Security**: Multiple security scans at every stage (shift-left security)
- **Reliability**: Kubernetes orchestration with self-healing capabilities
- **Cloud Deployment**: Real-world AWS infrastructure

## 2. Application Overview

### URL Shortener Service
A RESTful API service that converts long URLs into short, shareable links.

**Core Functionality:**
- `POST /shorten` - Create shortened URL
- `GET /url/:slug` - Retrieve original URL

**Technology Stack:**
- **Runtime**: Node.js 18.x
- **Framework**: Express.js
- **Storage**: In-memory (demonstration purposes)
- **Containerization**: Docker
- **Orchestration**: Kubernetes (K3s)
- **Cloud**: AWS EC2

## 3. DevOps Challenges Addressed

### Challenge 1: Security Vulnerabilities
**Problem**: Security issues discovered in production are expensive to fix.

**Solution**: Shift-left security with multiple scanning layers:
- **SAST** (CodeQL): Detects code-level vulnerabilities
- **SCA** (npm audit): Identifies vulnerable dependencies
- **Container Scan** (Trivy): Finds OS/library vulnerabilities
- **DAST** (OWASP ZAP): Tests running application security

### Challenge 2: Manual Deployment
**Problem**: Manual deployments are slow and error-prone.

**Solution**: Fully automated CI/CD pipeline:
- Code push → Automatic build → Security scans → Deploy to AWS
- Zero manual intervention required
- Consistent, repeatable deployments

### Challenge 3: Application Reliability
**Problem**: Single container failures cause downtime.

**Solution**: Kubernetes orchestration:
- 2 replica pods for high availability
- Automatic restart on failure
- Load balancing across instances
- Self-healing infrastructure

### Challenge 4: Environment Consistency
**Problem**: "Works on my machine" syndrome.

**Solution**: Containerization with Docker:
- Identical environment from dev to production
- Reproducible builds
- Version-controlled infrastructure

## 4. CI/CD Pipeline Design

### CI Pipeline (11 Stages)
1. **Code Quality** - ESLint enforcement
2. **SAST** - CodeQL security analysis
3. **SCA** - Dependency vulnerability scan
4. **Unit Tests** - Jest test execution
5. **Build** - Application compilation
6. **Docker Build** - Container image creation
7. **Container Scan** - Trivy vulnerability detection
8. **Runtime Test** - Container validation
9. **DockerHub Push** - Artifact registry upload

### CD Pipeline (4 Stages)
1. **Deploy** - SSH to EC2, apply Kubernetes manifests
2. **Health Check** - Verify deployment success
3. **DAST** - OWASP ZAP security scan
4. **Smoke Tests** - API functionality validation

## 5. Security & Quality Controls

### Security Gates
- **Pre-commit**: Linting catches issues early
- **Build-time**: SAST and SCA prevent vulnerable code
- **Image-time**: Trivy blocks vulnerable containers
- **Runtime**: DAST validates deployed security

### Quality Gates
- **Code Quality**: ESLint + Prettier
- **Test Coverage**: Jest unit tests
- **Container Health**: Liveness/readiness probes
- **Deployment Validation**: Smoke tests

## 6. Infrastructure Architecture

### AWS Components
- **EC2 Instance**: t2.micro (free tier)
- **K3s Cluster**: Lightweight Kubernetes
- **Security Groups**: Firewall rules
- **Public IP**: Internet-accessible endpoint

### Kubernetes Resources
- **Namespace**: Isolated environment
- **Deployment**: 2 replica pods
- **Service**: NodePort load balancer
- **Resource Limits**: CPU/memory constraints

## 7. Expected Outcomes

### Automation
✅ Zero-touch deployment from git push to production  
✅ Automatic security scanning at every stage  
✅ Self-healing infrastructure with Kubernetes  

### Security
✅ Multiple security layers (SAST, SCA, Container, DAST)  
✅ Vulnerabilities caught before production  
✅ Security results in GitHub Security tab  

### Reliability
✅ High availability with 2 replicas  
✅ Automatic restart on failure  
✅ Load balancing across instances  

### Efficiency
✅ Deployment time: ~5 minutes (vs hours manually)  
✅ Consistent environments (dev = prod)  
✅ Repeatable, version-controlled process  

## 8. Success Metrics

| Metric | Target | Achieved |
|--------|--------|----------|
| Deployment Time | < 10 min | ✅ ~5 min |
| Security Scans | 4 layers | ✅ SAST, SCA, Container, DAST |
| Availability | 99%+ | ✅ 2 replicas + auto-restart |
| Automation | 100% | ✅ Zero manual steps |
| Cost | Free tier | ✅ $0/month |

## 9. Conclusion

This project demonstrates a **production-grade DevSecOps pipeline** that:
- Automates the entire software delivery lifecycle
- Implements security at every stage (shift-left)
- Deploys to real cloud infrastructure (AWS)
- Uses industry-standard tools (Kubernetes, Docker, GitHub Actions)
- Achieves zero-cost operation through AWS free tier

The pipeline is **scalable**, **secure**, and **production-ready**, showcasing modern DevOps best practices.
