# OpenSBIS
Open Small Business Inventory System is a free and simple inventory system designed for small businesses. This application is built on ASP.NET Core, React + Redux, and Docker.

## Compose
* docker-compose -f docker-compose.yml build
* docker-compose -f docker-compose.yml up

## Deployment
* Update the URLs in the compose files to the ones you will use in production.
* Build the images with compose, see above.
* Deploy via DockerHub or your prefered method.

## Development
* Install Node, Docker, ASP.Net Core
* Run npm install in the src/OpenSBIS.UI/ directory
