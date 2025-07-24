# Vercel Deployment Guide for ZeroIQ

## Environment Variables Setup

When deploying to Vercel, you need to configure the following environment variables in your Vercel dashboard:

### Required Environment Variables:

1. **MONGODB_URI**
   ```
   mongodb+srv://nano:aGBCQD7X1WVCksMa@cluster0.lkbhthb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```

2. **NEXT_PUBLIC_PROJECT_OWNER_PASSWORD**
   ```
   Mustard!
   ```

## Deployment Steps:

### 1. Push to GitHub
```bash
git add .
git commit -m "Add MongoDB integration and reviews system"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Connect your GitHub repository
3. Import the ZeroIQ project
4. In the deployment settings, add the environment variables above
5. Deploy!

### 3. Environment Variables in Vercel Dashboard
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable:
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://nano:aGBCQD7X1WVCksMa@cluster0.lkbhthb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
   - Environment: Production, Preview, Development
   
   - Name: `NEXT_PUBLIC_PROJECT_OWNER_PASSWORD`
   - Value: `Mustard!`
   - Environment: Production, Preview, Development

### 4. MongoDB Security Considerations

For production deployment, consider:

1. **IP Whitelist**: Add your Vercel deployment IPs to MongoDB Atlas
2. **Database User**: Create a dedicated user with minimal required permissions
3. **Connection Limits**: Monitor connection usage in MongoDB Atlas
4. **Environment Separation**: Use different databases for development/production

### 5. Vercel Functions Configuration

Your API routes will automatically work as Vercel serverless functions:
- `/api/reviews` - GET/POST reviews
- `/api/reviews/[id]` - DELETE specific review
- `/api/reviews/stats` - GET review statistics

### 6. Build Configuration

The project is already configured for Vercel deployment with:
- ✅ Next.js 15 App Router
- ✅ TypeScript support
- ✅ Tailwind CSS
- ✅ Environment variables properly configured
- ✅ Serverless API routes

## Testing Deployment

After deployment, test these features:
1. Review creation and display
2. User authentication (guest/project owner)
3. Review deletion (project owner only)
4. Statistics calculation
5. Error pages (404, error boundary)

## Troubleshooting

If you encounter issues:

1. **Build Errors**: Check the build logs in Vercel dashboard
2. **API Errors**: Verify environment variables are set correctly
3. **Database Connection**: Check MongoDB Atlas network access and user permissions
4. **Environment Variables**: Ensure all required variables are set for all environments

## Production URL Structure

Once deployed, your app will be available at:
```
https://your-project-name.vercel.app
```

With these endpoints:
- `/` - Home page
- `/ai` - AI Consultant
- `/ratings` - Reviews and ratings management
- `/about` - About page
- `/api/reviews` - Reviews API
