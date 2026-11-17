# Austin Sternberg - Portfolio Site



## 🎨 Design
The design borrows from [asternberg.xyz](https://asternberg.xyz):
- Dark slate palette with a teal accent
- Faint dithered WebGL noise field behind the page
- Gabarito display name that animates in, with letter weights that respond to the cursor
- Be Vietnam Pro body text and pill-shaped buttons

## 🚀 Technologies
- **Svelte** - Modern reactive framework
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Vercel** - Deployment platform

## 📁 Project Structure
```
├── src/
│   ├── App.svelte          # Main component with portfolio links
│   ├── Field.svelte        # WebGL background field
│   ├── kinetic.ts          # Cursor-driven letter weights
│   ├── app.css             # Site styling
│   └── main.js             # Application entry point
├── public/
│   ├── *.png               # Logo assets
│   ├── *.svg               # SVG icons and organic shapes
│   └── organic-blob*.svg   # Custom floating elements
└── package.json
```


## 🛠️ Development
```bash

# Install dependencies
npm install

# Start development server
npm run dev
# or
npx vite

# Build for production
npm run build
```

## 🎯 Features
- **Responsive Design** - Works on all device sizes
- **Glassmorphism UI** - Modern frosted glass effects
- **Smooth Animations** - Floating elements and hover effects
- **Interactive Elements** - Glowing buttons and logo animations
- **Organic Shapes** - Custom SVG blobs for atmospheric design
- **Performance Optimized** - Fast loading with Vite

## 🌟 About
Portfolio site showcasing my work and involvement in various tech organizations at Kent State University, designed with a beautiful Frutiger Aero aesthetic featuring glassmorphism effects and organic animations.
