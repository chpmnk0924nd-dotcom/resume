# Interactive Resume — Nicholas Deno

A modern, interactive resume built with HTML, CSS, and JavaScript. Inspired by [rleonardi.com/interactive-resume](http://www.rleonardi.com/interactive-resume/).

## Features

✨ **Smooth Scrolling Navigation** — Click nav links for smooth page transitions  
🎬 **Timeline Animations** — Experience items animate in on scroll  
⌨️ **Keyboard Navigation** — Arrow keys (↑ ↓) or vim keys (j/k) to navigate  
📱 **Responsive Design** — Looks great on mobile, tablet, and desktop  
🎨 **Modern Dark Theme** — Sleek, professional color scheme  
🚀 **Zero Dependencies** — Vanilla HTML, CSS, and JavaScript  

## Quick Start

### Option 1: Open in Browser
Simply double-click or right-click → Open `index.html` in your browser.

### Option 2: Local Development Server
If you want live reload capability:

```bash
# Using Python 3
python -m http.server 8000

# Then open your browser:
# http://localhost:8000
```

```bash
# Using Node.js (if available)
npx http-server

# Then open your browser:
# http://localhost:8080
```

## File Structure

```
Resume/
├── index.html      # Main resume content
├── styles.css      # Styling and layout
├── script.js       # Interactive features and animations
└── README.md       # This file
```

## Customization

### Edit Your Information
1. Open `index.html` in your text editor
2. Find and replace:
   - Name: "Nicholas Deno"
   - Email, LinkedIn, GitHub links
   - Summary, experience, education, skills

### Change Colors
In `styles.css`, find the `:root` section and modify:
```css
:root{
  --bg:#0f1720;           /* Background color */
  --accent:#0ea5a4;       /* Highlight color */
  --muted:#94a3b8;        /* Secondary text color */
  --text:#e6eef6;         /* Main text color */
}
```

### Adjust Layout
- Modify `max-width` in `.container` for wider/narrower layout
- Adjust `padding` values in `.panel` for spacing
- Change `grid-template-columns` in `.skills-grid` for skills layout

## Interaction Guide

- **Mouse**: Click nav links to navigate
- **Keyboard**: 
  - Arrow Up/Down to move between sections
  - `j` / `k` as vim-style alternatives
  - Direct hash navigation: `index.html#skills`
- **Scroll**: Timeline items reveal with animations

## Deployment Options

### GitHub Pages (Free)
1. Create a GitHub repository
2. Upload these files
3. Enable GitHub Pages in repository settings
4. Access at: `yourusername.github.io/resume-repo`

### Netlify (Free)
1. Drag and drop this folder to [netlify.com](https://netlify.com)
2. Get a live URL instantly

### Vercel (Free)
1. Connect your GitHub repo to [vercel.com](https://vercel.com)
2. Auto-deploys on every push

### Traditional Hosting
Upload all files to any web host (GoDaddy, Bluehost, etc.)

## Browser Support

Works in all modern browsers:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers

## Tips

- Keep content concise — less is more
- Use the timeline for reverse chronological order
- Update skills regularly based on your learning
- Test on mobile before sharing
- Add a favicon: place `favicon.ico` in the root folder

## License

Free to use and modify for your personal resume.

---

**Last Updated:** February 2026  
Built with ❤️ as an interactive resume
