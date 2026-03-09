# 4-help AI - Deployment Guide

## Repository

**GitHub:** https://github.com/privateKerr21/4-Help-AI.git

## Vercel Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import from GitHub: `privateKerr21/4-Help-AI`
4. Click "Deploy"
5. Done! Your app will be live at: `https://your-project-name.vercel.app`

### Option 2: Deploy via CLI

```bash
cd "Clients/LifeTraq/Projects/4-help-App"
vercel --prod
```

Follow the prompts to link to your Vercel account.

## Configuration

The app is pre-configured with:
- `vercel.json` for routing
- Agent ID embedded in code
- Standalone HTML at root (`/index.html`)

## Access Your App

After deployment, the app will be available at:
```
https://your-vercel-url.vercel.app
```

The root URL (`/`) will automatically load the 4-help voice assistant.

## Custom Domain (Optional)

To use a custom domain:
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `4help.lifetraq.com`)
3. Follow DNS configuration instructions

## Environment Variables

Currently, no environment variables are needed. The Agent ID is embedded in the code.

If you want to add environment variables later:
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add: `ELEVENLABS_AGENT_ID` = `agent_2701kh4p4ehpe03a94h8pmhbxxa6`
3. Update code to read from `process.env.ELEVENLABS_AGENT_ID`

## Troubleshooting

### Deployment fails
- Check Vercel build logs
- Ensure all files are committed and pushed
- Verify `vercel.json` is valid JSON

### App doesn't load
- Check that `index.html` exists at root
- Verify Vercel routing in `vercel.json`
- Check browser console for errors

### Microphone doesn't work
- Ensure you're accessing via HTTPS (Vercel provides this automatically)
- Check browser permissions
- Test in different browser

## Continuous Deployment

Vercel automatically deploys when you push to the `main` branch:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel will detect the push and redeploy automatically within 30-60 seconds.
