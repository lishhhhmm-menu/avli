# Quick Start Guide

## 🐳 Docker Local Testing

### Step 1: Start the Container
```bash
docker-compose up
```

### Step 2: Open Browser
Navigate to: http://localhost:3000

### Step 3: Make Changes
- Edit files in `src/` folder
- Browser will auto-refresh

### Step 4: Stop Container
Press `Ctrl+C` or run:
```bash
docker-compose down
```

---

## 🚀 GitHub Pages Deployment

### Step 1: Create GitHub Repository
1. Go to GitHub and create a new repository named `menu`
2. Don't initialize with README (we already have one)

### Step 2: Update Vite Config
Edit `vite.config.ts` and change line 6:
```typescript
base: '/menu/',  // Change 'menu' to your repo name
```

### Step 3: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Restaurant menu app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/menu.git
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**

### Step 5: Deploy
- Push to `main` branch → Auto-deploys via GitHub Actions
- OR manually run: `npm run build && npm run deploy`

### Your app will be live at:
`https://YOUR_USERNAME.github.io/menu/`

---

## 📝 Important Notes

### Before First Build
The container needs to install dependencies. First time running:
```bash
docker-compose up --build
```

### If Changes Don't Reflect
1. Stop the container: `Ctrl+C`
2. Restart: `docker-compose up`

### Accessing Container Terminal
```bash
docker exec -it restaurant-menu-dev sh
```

---

## 🎨 Customization Tips

### Change Restaurant Name
`src/App.tsx` → Line 49

### Edit Menu Items
`src/data/menuData.ts`

### Change Colors
`src/index.css` → `:root` variables

### Toggle Basket / Ordering Feature
`src/data/config.json` → Set `"enableBasket": true` or `false`

### Update Favicon
Replace `public/menu-icon.svg`

---

## ⚡ Pro Tips

- **Mobile Testing**: Use `http://YOUR_LOCAL_IP:3000` on your phone
- **Production Build**: `npm run build` (creates `dist/` folder)
- **Preview Build**: `npm run preview`
- **Clean Restart**: `docker-compose down -v && docker-compose up --build`

---

## 🔧 Troubleshooting

**Container won't start?**
- Make sure Docker Desktop is running
- Check if port 3000 is available

**Changes not showing?**
- Check if files are saved
- Restart container if needed

**GitHub Pages not working?**
- Verify `base` in `vite.config.ts` matches repo name
- Check GitHub Actions tab for build errors
- Ensure GitHub Pages is enabled in Settings

---

Enjoy your restaurant menu app! 🍽️
