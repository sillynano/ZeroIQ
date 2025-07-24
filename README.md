# 🧠 ZeroIQ

> A project where you get "helpful information" with style! 🎨

A modern Next.js application with MongoDB integration, featuring a complete review system, user authentication, and beautiful UI components. Despite its playful name, ZeroIQ showcases modern web development practices.

## ✨ Features

- 🚀 **Next.js 15** with App Router and Turbopack
- ⚛️ **React 19** with latest features
- 🗄️ **MongoDB Atlas** for persistent data storage
- 📝 **Review System** with ratings and comments
- 👤 **User Authentication** (Guest/Project Owner roles)
- 🎨 **Tailwind CSS 4** for modern styling
- 🌙 **Dark/Light Mode** with next-themes
- 📱 **Responsive Design** with mobile-first approach
- 🧩 **Radix UI Components** for accessibility
- 🎭 **Beautiful UI** with shadcn/ui components
- 📊 **Charts & Data Visualization** with Recharts
- 🔧 **TypeScript** for type safety
- 🎪 **Rich Component Library** with 30+ components
- ⚡ **API Routes** for serverless backend functionality

## 🛠️ Tech Stack

### Core
- **Framework**: Next.js 15.3.5
- **Runtime**: React 19
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4

### UI Components
- **Base**: Radix UI primitives
- **Icons**: Lucide React
- **Animations**: Tailwind Animate CSS
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod validation


## 🧩 UI Components

This project includes a comprehensive set of UI components:

**Layout & Navigation**
- Sidebar, Navigation Menu, Breadcrumb, Pagination

**Form Controls**
- Input, Textarea, Select, Checkbox, Radio Group, Switch, Slider

**Data Display**
- Table, Card, Badge, Avatar, Progress, Charts

**Feedback**
- Alert, Dialog, Sheet, Popover, Tooltip, Sonner (toast)

**Interactive**
- Button, Dropdown Menu, Context Menu, Command Palette

## 🎨 Theming

The app supports both light and dark themes with seamless switching:

- Theme persistence across sessions
- System preference detection
- Custom theme toggle component
- Tailwind CSS dark mode support

## 🔧 VS Code Integration

Pre-configured VS Code settings for optimal development:

- **Debug Configurations**: Multiple launch configs for debugging
- **Tasks**: Quick commands for common operations
- **Extensions**: Recommended extensions for best experience

### Debug Options
- Start Development Server
- Debug Server-side Code
- Debug Client-side Code
- Full Stack Debugging

## � Deployment

### Deploy to Vercel

The easiest way to deploy ZeroIQ is using Vercel:

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables (see below)
   - Deploy!

3. **Environment Variables**:
   Set these in your Vercel dashboard:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_PROJECT_OWNER_PASSWORD=your_admin_password
   ```

4. **MongoDB Atlas Setup**:
   - Create a MongoDB Atlas cluster
   - Add your deployment IP to the allowlist
   - Create a database user with read/write permissions

📖 **Detailed deployment guide**: See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

## �📱 Responsive Design

Built with mobile-first approach:
- Responsive breakpoints
- Touch-friendly interactions
- Optimized for all screen sizes
- Progressive enhancement

## 🔧 Environment Setup

1. Copy `.env.example` to `.env.local`
2. Fill in your MongoDB connection string
3. Set your project owner password
4. Start the development server

## 📚 Learn More

### Next.js Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Next.js GitHub](https://github.com/vercel/next.js)

### UI Components
- [shadcn/ui](https://ui.shadcn.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Tailwind CSS](https://tailwindcss.com/)

### Database
- [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Mongoose Documentation](https://mongoosejs.com/)

**Remember**: Despite the name "ZeroIQ", this project is built with maximum intelligence and best practices! 🧠✨
