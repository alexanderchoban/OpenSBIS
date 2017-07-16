# OpenSBIS
Open Small Business Inventory System is a free and simple inventory system designed for small businesses. This application is built on ASP.NET Core and React.

## Build
* set ASPNETCORE_ENVIRONMENT=Development or export ASPNETCORE_ENVIRONMENT=Development
* dotnet run

## Publish
Make a production build. Set the ASPNETCORE_ENVIRONMENT variable to Production and then run:

* webpack --config webpack.config.vendor.js
* webpack

This will regenerate both the vendor and app bundles. Now when you run the app (dotnet run again), the browser will receive fully minified resources.