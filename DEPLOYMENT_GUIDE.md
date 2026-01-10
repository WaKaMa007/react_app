# Deployment Workflow Guide

## How Changes Flow from GitHub to Live Website

### 🔄 Complete CI/CD Pipeline Flow

```
1. Developer pushes code to GitHub
   ↓
2. CodePipeline detects the push (webhook trigger)
   ↓
3. Source Stage: CodePipeline downloads code from GitHub
   ↓
4. Build Stage: CodeBuild runs buildspec.yml
   - Installs dependencies (npm install)
   - Builds React app (npm run build)
   - Syncs build/ folder to S3 bucket
   ↓
5. Website is live on S3!
```

## 📝 Making Changes and Seeing Them Live

### Step 1: Make Changes Locally

Edit any file in your React app:
- `src/App.js` - Main React component
- `src/App.css` - Styling
- `src/index.js` - Entry point
- `public/index.html` - HTML template

### Step 2: Commit and Push to GitHub

```bash
# Navigate to your source code directory
cd source_code

# Check what files changed
git status

# Add all changed files
git add .

# Commit with a descriptive message
git commit -m "Add interactive features: counter, color changer, live clock"

# Push to GitHub (this triggers the pipeline!)
git push origin master
```

### Step 3: Monitor the Pipeline

**Option A: AWS Console**
1. Go to AWS Console → CodePipeline
2. Click on `static-site-pipeline`
3. Watch the pipeline progress in real-time:
   - Source stage: Downloads from GitHub (usually ~30 seconds)
   - Build stage: Runs npm install and build (~2-5 minutes)
   - You'll see logs from CodeBuild

**Option B: CodeBuild Logs**
1. Go to AWS Console → CodeBuild
2. Click on `static-site-build`
3. View the latest build logs to see:
   - npm install progress
   - Build output
   - S3 sync status

### Step 4: Verify Changes Are Live

1. Get your website URL:
   ```bash
   terraform output website_url
   ```

2. Visit the URL in your browser (or refresh if already open)

3. You should see your changes!

## 🎯 Testing the Workflow

### Quick Test: Change the Version Number

1. Edit `src/App.js` and change the version:
   ```javascript
   <p className="version">Version: 2.1 | Build Date: {new Date().toLocaleDateString()}</p>
   ```

2. Commit and push:
   ```bash
   git add src/App.js
   git commit -m "Update version to 2.1"
   git push origin master
   ```

3. Wait ~3-5 minutes for the pipeline to complete

4. Refresh your website - you'll see Version: 2.1!

### Medium Test: Add a New Feature

1. Add a new button in `src/App.js`
2. Style it in `src/App.css`
3. Commit, push, wait, and verify!

## ⚡ Typical Deployment Times

- **Small changes (text, styles)**: 3-5 minutes
- **New dependencies**: 5-8 minutes
- **First build**: 5-10 minutes (more dependencies to download)

## 🐛 Troubleshooting

### Pipeline Not Triggering?
- Check if CodePipeline webhook is connected to GitHub
- Verify you pushed to the `master` branch (configured in pipeline.tf)
- Check CodePipeline → Settings → Webhooks

### Build Failing?
- Check CodeBuild logs for errors
- Verify `package.json` has all dependencies
- Check `buildspec.yml` syntax is correct
- Ensure `buildspec.yml` is in the root of your repo

### Changes Not Appearing?
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Verify the build succeeded in CodeBuild logs
- Check S3 bucket contents in AWS Console
- Verify bucket has public read access

### Website Not Accessible?
- Check S3 bucket has website hosting enabled
- Verify bucket policy allows public read access
- Check bucket public access block settings
- Try accessing: `http://<bucket-name>.s3-website-<region>.amazonaws.com`

## 📊 Pipeline Status Check

```bash
# Get pipeline status (requires AWS CLI configured)
aws codepipeline get-pipeline-state --name static-site-pipeline

# Get latest build status
aws codebuild list-builds-for-project --project-name static-site-build
```

## 🎨 Example Changes to Try

1. **Change the welcome message**
   ```javascript
   <h1>🎉 Hello from AWS!</h1>
   ```

2. **Add a new color to the gradient**
   ```css
   .bg-red {
     background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
   }
   ```

3. **Add a new interactive feature**
   ```javascript
   const [message, setMessage] = useState("Click the button!");
   ```

4. **Update the tech stack badges**
   Add or remove technologies from the badges section

## ✅ Best Practices

- Always test locally before pushing: `npm start`
- Write clear commit messages describing changes
- Push frequently to see incremental updates
- Monitor the first few deployments to ensure everything works
- Keep buildspec.yml simple and focused
- Don't commit `node_modules/` or `.env` files (use .gitignore)

