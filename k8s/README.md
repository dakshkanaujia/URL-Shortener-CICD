# Kubernetes Deployment

This directory contains Kubernetes manifests for deploying the URL Shortener to K3s on AWS EC2.

## Manifests

- `namespace.yaml` - Creates isolated namespace
- `deployment.yaml` - Deploys 2 replicas with health checks
- `service.yaml` - Exposes app on NodePort 30080

## Manual Deployment

```bash
kubectl apply -f namespace.yaml
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

## Verify Deployment

```bash
kubectl get pods -n url-shortener
kubectl get svc -n url-shortener
kubectl logs -n url-shortener -l app=url-shortener
```

## Access Application

```
http://<EC2-PUBLIC-IP>:30080
```

## Automated Deployment

The CD pipeline (`.github/workflows/cd.yml`) automatically deploys on successful CI completion.
