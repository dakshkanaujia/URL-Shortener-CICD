# GitHub Secrets Setup Guide

## Required Secrets

To enable automated deployment to AWS EC2, you need to configure these GitHub Secrets:

### 1. EC2_HOST
- **Value**: Your EC2 public IP address
- **Example**: `3.80.201.159`
- **How to find**: AWS Console → EC2 → Instances → Your instance → Public IPv4 address

### 2. EC2_USER
- **Value**: `ubuntu`
- **Note**: This is the default user for Ubuntu AMI

### 3. EC2_SSH_KEY
- **Value**: Contents of your `.pem` private key file
- **How to get**:
  ```bash
  cat your-key-name.pem
  ```
- **Important**: Copy the ENTIRE contents including:
  ```
  -----BEGIN RSA PRIVATE KEY-----
  ... (all the key content) ...
  -----END RSA PRIVATE KEY-----
  ```

## How to Add Secrets

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Add each secret:
   - Name: `EC2_HOST`
   - Value: (paste your EC2 IP)
   - Click "Add secret"
5. Repeat for `EC2_USER` and `EC2_SSH_KEY`

## Verify Secrets

After adding all three secrets, you should see:
- ✅ EC2_HOST
- ✅ EC2_USER  
- ✅ EC2_SSH_KEY

## Test Deployment

Once secrets are configured:
1. Push any code change to `main` branch
2. CI pipeline will run
3. CD pipeline will automatically trigger
4. App will deploy to your EC2 + K3s cluster

## Troubleshooting

**If CD fails with "Permission denied":**
- Check EC2_SSH_KEY is complete (includes BEGIN/END lines)
- Verify EC2 Security Group allows SSH (port 22) from GitHub Actions IPs

**If deployment times out:**
- Check EC2 instance is running
- Verify K3s is active: `sudo systemctl status k3s`
