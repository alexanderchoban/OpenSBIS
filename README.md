# OpenSBIS
Open Small Business Inventory System is a free and simple inventory system designed for small businesses. This application is built on ASP.NET Core and React.

## Build
* npm install -g webpack (one time only)
* set your environment variable of ASPNETCORE_ENVIRONMENT to Development (once per console window)
* npm install (if it hasn't been run on the current directory)
* dotnet run

## Publish
Make a production build. Set the ASPNETCORE_ENVIRONMENT variable to Production and then run:

* dotnet publish -o dist -c Release

This will regenerate both the vendor and app bundles. Now when you run the app (dotnet run again), the browser will receive fully minified resources.

## Docker
* docker build -t opensbis .
* docker run -it -p 5000:80 opensbis