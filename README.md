# Restaurant Menu App 🍽️

A beautiful, mobile-first restaurant menu designed for customers to browse and prepare orders from their table.

## ✨ Features

*   **Categorized Menu** - Easy navigation through appetizers, mains, and more.
*   **My Order** - Customers can build a temporary order list.
*   **Multi-Language** - English, Greek, and Italian support.
*   **Themeable** - Change the entire look with one color variable.
*   **Data Driven** - Menu items managed via simple JSON files.

## 🚀 Quick Start (Docker)

1.  **Run the app:**
    ```bash
    docker-compose up
    ```
2.  **Open in browser:** `http://localhost:3000`

## 🎨 Customization

### Change Theme Color
Open `src/index.css` and change the `--theme-color` HEX code. The entire app (banners, buttons, interactions, and favicon) will update automatically!

```css
:root {
  --theme-color: #e06c0d; /* Your Brand Color */
}
```

### Edit Menu & Categories
Data is stored in `src/data/`:
*   **`items.json`**: Add/remove dishes, prices, and descriptions.
*   **`categories.json`**: Manage menu categories.
*   **`translations.ts`**: Update the Restaurant Name and UI texts.

### Reorder Language Options
Open `src/components/LanguageSwitcher.tsx` (lines 14-18) and reorder the `languages` array to change button order.

## 📦 Deployment
This app is ready for **GitHub Pages**. Push to `main` and the included workflow will handle the rest.

## 🔄 Sync with Demo Repository

To rebase another repository on this main branch, use the following commands:

```bash
git remote add demo https://github.com/lishhhhmm-menu/demo.git
git fetch demo
git rebase demo/main
git push --force-with-lease # optional
```

## License
Copyright © 2026. All Rights Reserved.
This software is proprietary and may not be copied, modified, or distributed without explicit permission.
