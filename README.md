# ProhostAI Website

This is the self-hosted marketing website and vendor directory for ProhostAI, built with Next.js 15, TypeScript, and TailwindCSS.

## Features

- **Marketing Pages**: Homepage, pricing, about, and other landing pages
- **Blog**: MDX-powered blog with SEO optimization
- **Vendor Directory**: Public directory of service providers for property managers
- **Performance**: Static generation for optimal loading speeds
- **SEO Optimized**: Full metadata and structured data support

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Project Structure

```
website/
├── app/                    # Next.js app directory
│   ├── (marketing)/       # Marketing pages
│   ├── blog/             # Blog listing and posts
│   ├── directory/        # Vendor directory
│   └── layout.tsx        # Root layout
├── components/           # Reusable components
├── content/             # Blog content (MDX)
├── lib/                # Utilities and API clients
└── public/            # Static assets
```

## Adding Blog Posts

Create a new MDX file in `content/blog/`:

```mdx
---
title: "Your Post Title"
date: "2024-01-20"
author: "Author Name"
excerpt: "Brief description"
tags: ["tag1", "tag2"]
published: true
---

Your content here...
```

## Environment Variables

Create `.env.local`:

```env
# Backend API URL (for vendor directory)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import to Vercel
3. Deploy

### Self-Hosted
```bash
npm run build
npm start
```

## Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Lint code

## License

Proprietary - ProhostAI
