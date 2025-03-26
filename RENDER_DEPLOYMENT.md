# Deploying the EGO 2D to 3D Converter to Render

This guide explains how to deploy the EGO 2D to 3D Converter tool to [Render](https://render.com), a cloud platform for hosting web applications.

## Prerequisites

- A Render account
- Access to the EGO GitHub repository
- GitHub repository connected to your Render account

## Deployment Steps

### 1. Connect Your Repository to Render

1. Log in to your Render dashboard at https://dashboard.render.com
2. Click on "New" and select "Blueprint" from the dropdown menu
3. Connect your GitHub account if you haven't already
4. Select the EGO repository from the list
5. Render will automatically detect the `render.yaml` file and configure the services

### 2. Configure Environment Variables (Optional)

If you need additional environment variables beyond those specified in `render.yaml`:

1. Select the service from your dashboard
2. Go to the "Environment" tab
3. Add any additional environment variables needed

### 3. Deploy the Service

1. Click "Create Blueprint"
2. Render will automatically deploy the services defined in `render.yaml`
3. Wait for the build and deployment to complete

## Service Configuration

The `render.yaml` file defines the following services:

1. **Web Service (ego-2d-to-3d-converter)**
   - Node.js application
   - Builds with `npm install && npm run build`
   - Starts with `npm start`
   - Runs on port 10000
   - Health check at `/health`

2. **Documentation Site (ego-converter-docs)**
   - Static site
   - Builds with `npm run build-docs`
   - Serves content from `./docs-build`

## Accessing the Deployed Application

Once deployed, your application will be available at:

- Web Service: `https://ego-2d-to-3d-converter.onrender.com`
- Documentation: `https://ego-converter-docs.onrender.com`

## Monitoring and Logs

To monitor your application and view logs:

1. Go to your Render dashboard
2. Select the service you want to monitor
3. View the "Logs" tab for real-time logs
4. Check the "Metrics" tab for performance data

## Troubleshooting

If you encounter issues during deployment:

1. Check the build logs for errors
2. Verify that all required environment variables are set
3. Ensure the repository has the necessary files (`package.json`, `server.js`, etc.)
4. Check that the health check endpoint (`/health`) is responding correctly

## Updating the Deployment

The service is configured for automatic deployment. Any changes pushed to the main branch will trigger a new deployment.

To manually trigger a deployment:

1. Go to your Render dashboard
2. Select the service
3. Click "Manual Deploy" and select "Deploy latest commit"

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Node.js on Render](https://render.com/docs/deploy-node-express-app)
- [Environment Variables on Render](https://render.com/docs/environment-variables)

## Document Maintenance

**Version**: 1.0.0  
**Last Updated**: March 26, 2025  
**Update Frequency**: As needed  

### Update Triggers
- Changes to deployment configuration
- Updates to Render platform features
- Changes to application architecture
- New environment variables or configuration requirements
- Updates to build or deployment processes

### Changelog
| Date | Version | Changes | Author |
|------|---------|---------|--------|
| March 26, 2025 | 1.0.0 | Initial version | EGO Development Team |

### Review Checklist
- [ ] Deployment steps are accurate and up-to-date
- [ ] Service configuration details are correct
- [ ] Environment variable information is complete
- [ ] Troubleshooting section addresses common issues
- [ ] Links to external resources are valid
