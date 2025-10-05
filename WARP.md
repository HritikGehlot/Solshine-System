# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Solshine Systems Website is a modern, responsive static website for solar panel installation and renewable energy solutions. Built with clean HTML5, CSS3, and vanilla JavaScript, featuring a professional solar-themed design.

## Architecture & Structure

### Frontend Architecture
- **Static Website**: No build process required - pure HTML/CSS/JavaScript
- **Multi-page Structure**: 5 main pages (Home, About, Services, Projects, Contact)
- **Component-based CSS**: Modular styles with CSS custom properties (variables)
- **Progressive Enhancement**: Vanilla JavaScript for interactivity with graceful degradation

### Key Components
- **Navigation System**: Fixed header with mobile hamburger menu, smooth scrolling
- **Interactive Elements**: FAQ accordion, project filters, contact form validation
- **Animation System**: Scroll-triggered animations, hover effects, parallax elements
- **Responsive Design**: Mobile-first approach with breakpoints at 480px, 768px, 1024px

### File Structure
```
/
├── index.html           # Homepage with hero, services overview, stats
├── about.html          # Company info, team, values, certifications  
├── services.html       # Service descriptions, process, financing
├── projects.html       # Portfolio gallery, testimonials, case studies
├── contact.html        # Contact form with validation, FAQ section
├── css/main.css        # Single stylesheet with CSS variables and modular components
├── js/main.js          # All JavaScript functionality in one file
└── README.md           # Project documentation
```

## Common Development Commands

### Local Development
```bash
# Start local server (Python 3)
python -m http.server 8000

# Alternative with Node.js
npx http-server

# Open in browser
open http://localhost:8000
```

### Testing & Validation
```bash
# HTML validation (requires html5validator)
html5validator --root . --also-check-css

# Check responsive design
open -a "Google Chrome" --args --device-metrics-override=375,667,2
```

## Code Patterns & Standards

### CSS Architecture
- **CSS Custom Properties**: All colors, fonts, spacing defined in `:root`
- **Color Palette**: Solar-themed (golden yellow #f59e0b, sky blue #0ea5e9, green #10b981)
- **Utility Classes**: `.container`, `.section-header`, `.highlight`, `.btn` variants
- **Component Naming**: BEM-inspired naming (e.g., `.nav-container`, `.hero-content`)

### JavaScript Structure
- **Module Pattern**: Functions organized by feature (navigation, forms, animations)
- **Event-driven**: DOM content loaded initializer with feature-specific init functions
- **Progressive Enhancement**: All functionality checks for element existence before binding

### Key JavaScript Components
```javascript
// Main initialization
initializeNavigation()      // Mobile menu, header scroll effects
initializeScrollEffects()   // Smooth scrolling, scroll animations
initializeFormHandling()    // Contact form validation & submission
initializeFAQ()            // Accordion functionality
initializeProjectFilters() // Portfolio filtering system
initializeAnimations()     // Hover effects, parallax, ripple effects
```

### Form Handling
- **Client-side Validation**: Email, phone, required fields
- **Async Simulation**: 2-second timeout simulating API calls
- **User Feedback**: Loading states, success messages, error display

## Design System

### Typography
- **Primary Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Scale**: Responsive with CSS clamp() for fluid typography

### Component Library
- **Buttons**: `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-large`
- **Cards**: `.service-card`, `.project-card`, `.team-card`, `.testimonial-card`
- **Forms**: Styled inputs, selects, checkboxes with custom validation states

### Animation System
- **Scroll Animations**: Intersection Observer API for performance
- **Hover Effects**: CSS transitions with JavaScript enhancements  
- **Timing**: Staggered animations with calculated delays (index * 0.1s)

## Development Workflow

### Making Changes
1. Edit HTML files directly for content updates
2. Modify CSS variables in `:root` for theme changes
3. Add new JavaScript functionality to appropriate init function
4. Test across different viewport sizes using browser dev tools

### Adding New Pages
1. Copy existing HTML structure from similar page
2. Update navigation active states in header
3. Add any new CSS components to `main.css`
4. Initialize page-specific JavaScript in `main.js`

### Performance Considerations
- Images should be optimized and added to `/images` directory
- Consider lazy loading for image-heavy sections
- CSS and JS are intentionally in single files to minimize HTTP requests
- External dependencies limited to Google Fonts and Font Awesome

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge - latest versions)
- Uses modern CSS (Grid, Flexbox, Custom Properties)
- JavaScript uses ES6+ features without transpilation

## Deployment
Static files can be deployed to any web server or CDN:
- GitHub Pages
- Netlify  
- Vercel
- Traditional web hosting

No build process required - deploy files directly.