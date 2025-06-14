# Reformando tu Futuro - Website

A modern construction and renovation company website built with Astro, featuring responsive carousels, lightbox gallery, and customer review system.

### CI/CD Pipeline

This project has automated CI/CD configured for continuous deployment:

#### **Vercel Integration**

- **Account**: reformandotufuturo.tech@gmail.com
- **Automatic deployments** are configured for:
  - **Master branch** → Production deployment
  - **Develop branch** → Preview deployment

#### **Deployment Process**

1. **Push to develop** → Triggers preview deployment for testing
2. **Push to master** → Triggers production deployment
3. **Pull requests** → Generate preview deployments for review

#### **Branch Strategy**

- `master` - Production-ready code
- `develop` - Development and testing
- Feature branches → Create PR to `develop`

All deployments are automatic and include:

- ✅ Build verification
- ✅ Environment variable injection
- ✅ Performance optimization
- ✅ CDN distributiononal construction company website
- 📱 **Responsive**: Optimized for all devices and screen sizes
- 🖼️ **Project Galleries**: Multiple responsive carousels for different project types
- 🔍 **Lightbox Gallery**: Full-screen image viewer with navigation
- ⭐ **Customer Reviews**: Integrated review system with Supabase
- 🎨 **Smooth Animations**: Professional animations and transitions
- 🚀 **Fast Performance**: Built with Astro for optimal loading speeds

## 🚀 Project Structure

```text
/
├── public/                     # Static assets
│   ├── css/                   # Stylesheets
│   │   ├── carousel.css       # Carousel styling
│   │   ├── lightbox.css       # Lightbox gallery styling
│   │   └── style.css          # Main styles
│   ├── js/                    # JavaScript files
│   │   ├── multi-carousel.js  # Carousel functionality
│   │   ├── lightbox.js        # Lightbox functionality
│   │   └── animations.js      # Page animations
│   └── images/                # Image assets
│       ├── logo.jpg           # Company logo
│       └── projects/          # Project photos
│           ├── reforma-integral/    # Complete renovation photos
│           ├── reforma-banos/       # Bathroom renovation photos
│           └── durante-obra/        # Construction process photos
├── src/
│   ├── components/
│   │   ├── ProjectCarousel.astro    # Reusable carousel component
│   │   └── Review.astro             # Customer review component
│   ├── layouts/
│   │   └── Layout.astro             # Main page layout
│   ├── lib/
│   │   └── supabase.ts              # Supabase configuration
│   ├── pages/
│   │   ├── index.astro              # Homepage
│   │   ├── api/                     # API routes
│   │   └── review/                  # Review system pages
│   └── types/
│       └── review.ts                # TypeScript types
└── package.json
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (for reviews functionality)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd reformando-tu-futuro.com
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (see [Environment Variables](#environment-variables) section)

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:4321`

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## � Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Supabase Configuration (for customer reviews)
PUBLIC_SUPABASE_URL=your_supabase_project_url
PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Example:
# PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
# PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Setting up Supabase

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Create the reviews table** with the following SQL:

   ```sql
   CREATE TABLE reviews (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     rating INTEGER CHECK (rating >= 1 AND rating <= 5),
     comment TEXT,
     created_at TIMESTAMP DEFAULT NOW(),
     approved BOOLEAN DEFAULT FALSE
   );
   ```

3. **Get your credentials** from Project Settings > API
   - Copy the Project URL to `PUBLIC_SUPABASE_URL`
   - Copy the anon public key to `PUBLIC_SUPABASE_ANON_KEY`

## 🖼️ Managing Project Images

### Adding New Project Categories

1. **Create a new folder** in `public/images/projects/`:

   ```
   public/images/projects/your-new-category/
   ```

2. **Add images** with sequential naming:

   ```
   01.jpeg, 02.jpeg, 03.jpeg, etc.
   ```

3. **Update the homepage** (`src/pages/index.astro`):

   ```astro
   // Add new image array
   const yourNewCategoryImages = Array(numberOfImages)
     .fill(0)
     .map((_, index) =>
       `images/projects/your-new-category/${index < 9 ? "0".concat((index + 1).toString()) : index + 1}.jpeg`
     );
   ```

4. **Add the carousel** to the projects section:
   ```astro
   <ProjectCarousel
     category="Your New Category"
     images={yourNewCategoryImages}
     altPrefix="Your Category"
     id="your-category-id"
   />
   ```

### Updating Existing Images

1. **Replace images** in the corresponding folders:

   - `public/images/projects/reforma-integral/` - Complete renovations
   - `public/images/projects/reforma-banos/` - Bathroom renovations
   - `public/images/projects/durante-obra/` - Construction process

2. **Keep the naming convention**: 01.jpeg, 02.jpeg, etc.

3. **Update image counts** in `src/pages/index.astro` if needed:
   ```astro
   const reformaIntegralImages = Array(11) // Change number here
   const reformaBanosImages = Array(17)    // Change number here
   const duranteObraImages = Array(6)      // Change number here
   ```

### Supported Image Formats

- **JPEG** (.jpeg, .jpg) - Recommended for photos
- **PNG** (.png) - For images with transparency
- **WebP** (.webp) - Modern format for better compression

### Image Optimization Tips

- **Recommended size**: 1200px - 1920px width for best quality
- **File size**: Keep under 500KB per image for fast loading
- **Aspect ratio**: Maintain consistent ratios within each category

## 🎨 Customization

### Colors and Branding

- **Main styles**: Edit `public/css/style.css`
- **Carousel styles**: Edit `public/css/carousel.css`
- **Lightbox styles**: Edit `public/css/lightbox.css`

### Company Information

Update company details in `src/pages/index.astro`:

- Contact information
- Address
- Business hours
- Services offered

### Logo and Branding

Replace logos in `public/images/`:

- `logo.jpg` - Main logo
- `logo-inverted.jpg` - Logo for dark backgrounds
- `logo-horizontal.jpg` - Horizontal version
- `favicon.svg` - Browser favicon

## 🚀 Deployment

### Building for Production

```bash
npm run build
```

This creates a `dist/` folder with the production build.

### Deployment Options

- **Netlify**: Connect your Git repository for automatic deployments
- **Vercel**: Import project from Git for seamless deployment
- **Static hosting**: Upload `dist/` folder to any static host

### Environment Variables in Production

Remember to set your environment variables in your hosting platform:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

## 📱 Features Overview

### Responsive Carousels

- **Mobile**: 1 image per view
- **Tablet**: 2 images per view
- **Desktop**: 3 images per view
- **Large screens**: 4 images per view

### Lightbox Gallery

- Click any image to open full-screen view
- Navigate with arrows, keyboard, or swipes
- Shows image counter and category
- Responsive design for all devices

## 📞 Support

For support or questions about this website:

- **Email**: reformandotufuturo.tech@gmail.com
