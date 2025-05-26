# Nacky App

A modern personal portfolio and blog application built with Next.js and TypeScript, showcasing projects, skills, and providing a platform for content creation.

## ✨ Features

- **Personal Portfolio**: Showcase projects, skills, and professional timeline
- **Blog System**: Create and manage blog posts with rich content
- **Contact Form**: Integrated contact functionality with email notifications
- **Language Progress**: GitHub language statistics visualization
- **Responsive Design**: Mobile-first design with modern UI components
- **SEO Optimized**: Built-in structured data and SEO optimization

## 🚀 Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: Custom component library
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation

### Development Tools
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Lefthook
- **Environment**: Node.js 18+

### Backend & Services
- **Email**: Resend API for contact form
- **Deployment**: Vercel (implied)

## 📁 Project Structure

```
├── apps/
│   └── web/                    # Main Next.js application
│       ├── app/               # App Router pages and layouts
│       ├── components.json    # shadcn/ui configuration
│       ├── features/          # Feature-based components
│       │   ├── Blog/         # Blog functionality
│       │   ├── Home/         # Homepage features
│       │   └── Layout/       # Layout components
│       └── public/           # Static assets
├── packages/                  # Shared packages (workspace)
├── turbo.json                # Turborepo configuration
└── pnpm-workspace.yaml       # pnpm workspace configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18 or higher
- pnpm 10.6.2 or higher

### Installation

1. Clone the repository:
```bash
git clone https://github.com/nackyAir/nacky_app.git
cd nacky_app
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Required environment variables:
- `RESEND_API_KEY`: Your Resend API key for email functionality
- `ADMIN_EMAIL`: Email address to receive contact form submissions

### Development

Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Building

Build the application for production:
```bash
pnpm build
```

### Other Commands

- `pnpm lint`: Run ESLint
- `pnpm fmt`: Format code with Prettier
- `pnpm clean`: Clean build artifacts

## 🎨 Features Overview

### Portfolio Sections
- **Project Timeline**: Chronological showcase of projects and achievements
- **Skills & Technologies**: Visual representation of technical skills
- **Language Progress**: GitHub language statistics integration
- **Social Links**: Professional social media connections

### Blog System
- Create and edit blog posts
- Rich content support
- SEO-optimized blog pages

### Contact System
- Contact form with validation
- Email notifications via Resend
- Professional inquiry handling

## 🔧 Configuration

### Site Configuration
The site configuration is managed in `apps/web/config/siteConfig.tsx`, including:
- Social media links
- Site metadata
- Contact information

### SEO Setup
Comprehensive SEO configuration is documented in `apps/web/SEO_SETUP.md`

## 📝 Development Guidelines

- Follow TypeScript best practices
- Use the established component structure in `features/`
- Maintain consistent code formatting with Prettier
- Write meaningful commit messages
- Test thoroughly before submitting PRs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Submit a pull request

## 📄 License

This project is private and proprietary.

## 👤 Author

**nackyAir**
- GitHub: [@nackyAir](https://github.com/nackyAir)
- X: [@naoki__0509](https://x.com/naoki__0509)
- Instagram: [@nacky_coffee](https://www.instagram.com/nacky_coffee)

---

Built with ❤️ using Next.js and TypeScript
