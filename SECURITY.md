# Security Policy

## Security Scanning in CI/CD

This project implements comprehensive security scanning as part of the CI/CD pipeline:

### 1. SAST (Static Application Security Testing)
- **Tool**: GitHub CodeQL
- **Purpose**: Detects security vulnerabilities in source code
- **Checks**: OWASP Top 10, CWE patterns, code quality issues
- **Results**: Available in GitHub Security tab

### 2. SCA (Software Composition Analysis)
- **Tool**: npm audit
- **Purpose**: Identifies vulnerabilities in dependencies
- **Threshold**: Moderate severity and above
- **Action**: Fails build on critical/high vulnerabilities

### 3. Container Security Scanning
- **Tool**: Trivy
- **Purpose**: Scans Docker images for OS and library vulnerabilities
- **Severity**: Reports CRITICAL and HIGH issues
- **Integration**: Results uploaded to GitHub Security tab

## Reporting a Vulnerability

If you discover a security vulnerability, please email the maintainers directly rather than opening a public issue.

## Security Best Practices

1. **Secrets Management**: Never commit secrets to the repository
2. **Dependencies**: Regularly update dependencies to patch vulnerabilities
3. **Container Images**: Use minimal base images and scan regularly
4. **Access Control**: Use GitHub Secrets for sensitive credentials
