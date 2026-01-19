# Testing & Screenshot Guide

## 1. Testing Checklist

### ✅ Test 1: CI Pipeline
**Location:** GitHub → Actions → "CI/CD Pipeline"

**Verify:**
- [ ] All 11 stages pass (green checkmarks)
- [ ] Lint stage completes
- [ ] SAST (CodeQL) completes
- [ ] SCA (npm audit) completes
- [ ] Tests pass
- [ ] Docker build succeeds
- [ ] Trivy scan completes
- [ ] DockerHub push succeeds

**Screenshot:** Full CI pipeline view

---

### ✅ Test 2: CD Pipeline
**Location:** GitHub → Actions → "CD - Deploy to AWS K3s"

**Verify:**
- [ ] Triggers after CI success
- [ ] Deploy stage completes
- [ ] Health check passes
- [ ] DAST scan completes
- [ ] Smoke tests pass

**Screenshot:** Full CD pipeline view

---

### ✅ Test 3: Security Scans
**Location:** GitHub → Security → Code scanning

**Verify:**
- [ ] CodeQL results visible
- [ ] Trivy results visible
- [ ] No critical vulnerabilities

**Screenshots:**
- CodeQL results page
- Trivy results page

---

### ✅ Test 4: DockerHub
**Location:** hub.docker.com/r/dakshkanaujia/url-shortener

**Verify:**
- [ ] Image exists
- [ ] Latest tag present
- [ ] Recent push timestamp

**Screenshot:** DockerHub repository page

---

### ✅ Test 5: AWS EC2
**SSH to EC2:**
```bash
ssh -i url-shortener-cicd.pem ubuntu@3.80.201.159
```

**Run these commands:**
```bash
# Check K3s is running
sudo systemctl status k3s

# Check pods
kubectl get pods -n url-shortener

# Check service
kubectl get svc -n url-shortener

# Check logs
kubectl logs -n url-shortener -l app=url-shortener --tail=20
```

**Screenshots:**
- `kubectl get pods` output
- `kubectl get svc` output

---

### ✅ Test 6: Application Functionality

**Test from your laptop:**

**Test 1: Health Check**
```bash
curl http://3.80.201.159:30080/url/test
```
**Expected:** `{"error":"URL not found"}`

**Test 2: Create Short URL**
```bash
curl -X POST -H "Content-Type: application/json" \
  -d '{"url": "https://github.com"}' \
  http://3.80.201.159:30080/shorten
```
**Expected:** `{"slug":"abc123","url":"https://github.com"}`

**Test 3: Retrieve URL**
```bash
# Use the slug from previous response
curl http://3.80.201.159:30080/url/abc123
```
**Expected:** `{"slug":"abc123","url":"https://github.com"}`

**Test 4: Browser Test**
Open in browser:
```
http://3.80.201.159:30080/url/test
```

**Screenshots:**
- curl commands with responses
- Browser showing JSON response

---

## 2. Screenshot Checklist

### Required Screenshots (for report):

- [ ] **1. GitHub Actions - CI Pipeline**
  - Full workflow view
  - All stages green
  - Timestamp visible

- [ ] **2. GitHub Actions - CD Pipeline**
  - Full workflow view
  - All stages green
  - Deployment logs visible

- [ ] **3. GitHub Security - CodeQL**
  - Security tab
  - CodeQL analysis results
  - No critical issues

- [ ] **4. GitHub Security - Trivy**
  - Container scan results
  - Vulnerability summary

- [ ] **5. DockerHub Repository**
  - Image list
  - Latest tag
  - Push timestamp

- [ ] **6. Kubernetes Pods**
  - `kubectl get pods -n url-shortener`
  - 2/2 Running status

- [ ] **7. Kubernetes Service**
  - `kubectl get svc -n url-shortener`
  - NodePort 30080 visible

- [ ] **8. Application Working**
  - curl POST /shorten response
  - curl GET /url/:slug response
  - Or browser screenshot

- [ ] **9. AWS EC2 Console** (Optional)
  - Instance running
  - Public IP visible

---

## 3. How to Take Screenshots

### On Linux:
```bash
# Full screen
gnome-screenshot

# Select area
gnome-screenshot -a

# Or use Flameshot
flameshot gui
```

### On Windows:
- **Snipping Tool** (Win + Shift + S)
- **Full screen** (PrtScn)

### On Mac:
- **Area** (Cmd + Shift + 4)
- **Full screen** (Cmd + Shift + 3)

---

## 4. Organizing Screenshots

Create a folder:
```bash
mkdir ~/Desktop/project-screenshots
```

**Naming convention:**
```
1-ci-pipeline.png
2-cd-pipeline.png
3-security-codeql.png
4-security-trivy.png
5-dockerhub.png
6-k8s-pods.png
7-k8s-service.png
8-app-working.png
9-ec2-console.png
```

---

## 5. Testing Script

**Save this as `test.sh`:**
```bash
#!/bin/bash

echo "🧪 Testing URL Shortener..."
echo ""

# Test 1: Health check
echo "Test 1: Health Check"
curl -s http://3.80.201.159:30080/url/test
echo -e "\n"

# Test 2: Create short URL
echo "Test 2: Create Short URL"
response=$(curl -s -X POST -H "Content-Type: application/json" \
  -d '{"url": "https://github.com"}' \
  http://3.80.201.159:30080/shorten)
echo $response
echo ""

# Extract slug
slug=$(echo $response | grep -o '"slug":"[^"]*"' | cut -d'"' -f4)
echo "Generated slug: $slug"
echo ""

# Test 3: Retrieve URL
echo "Test 3: Retrieve URL"
curl -s http://3.80.201.159:30080/url/$slug
echo -e "\n"

echo "✅ All tests complete!"
```

**Run it:**
```bash
chmod +x test.sh
./test.sh
```

---

## 6. Verification Checklist

Before submitting, verify:

- [ ] CI pipeline passes completely
- [ ] CD pipeline deploys successfully
- [ ] App accessible at http://3.80.201.159:30080
- [ ] All 4 security scans complete
- [ ] 2 pods running in Kubernetes
- [ ] All screenshots taken
- [ ] Screenshots added to report
- [ ] Report is 8-10 pages
- [ ] GitHub repo is public
- [ ] README is comprehensive

---

## 7. Final Test Command

**Run this on EC2 to verify everything:**
```bash
echo "=== Kubernetes Status ==="
kubectl get nodes
kubectl get pods -n url-shortener
kubectl get svc -n url-shortener

echo -e "\n=== Application Test ==="
curl -X POST -H "Content-Type: application/json" \
  -d '{"url": "https://test.com"}' \
  http://localhost:30080/shorten

echo -e "\n=== K3s Status ==="
sudo systemctl status k3s --no-pager

echo -e "\n✅ Verification complete!"
```

---

**You're ready to document and submit!** 🎉
