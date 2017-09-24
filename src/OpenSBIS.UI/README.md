# OpenSBIS Web Client and API

## Development Build
Before you can run locally, you will need a postgresql database, OpenSBIS API, and oauth server configured. The easiest way to set this up would be to run the solution's docker-composer file and then stop the opensbis/webui container. (Optional: comment out the website section to save resources) And then continuing with the following sets:

### Dev-Build: Pre-Build 
* npm install (if it hasn't been run on the current directory)
* set your environment variables (once per console window, see below)

### Dev-Build: Setting Environment Variables
Here's a quick quide for setting up environment variables for local testing in powershell:

<pre>
$env:ASPNETCORE_ENVIRONMENT="Development"
$env:ASPNETCORE_URLS="https://*:5005"
$env:IDSRV_URL="http://localhost:5002"
$env:IDSRV_API="api1"
$env:API_URL="http://localhost:5001"
</pre>

### Dev-Build: Build
* dotnet watch run

The react js files will auto rebuild and so will the application when changes are made to cs files.

## Testing Docker Build
If you need to test the docker build without composer, you can run:
* docker build -t opensbis/webserver .
* docker run -it -p 5000:80 opensbis/webserver

## Publish
It is recommended that you publish with the docker composer file at the root of this solution. If you are publishing without docker and you and need a production build: Set the ASPNETCORE_ENVIRONMENT variable to Production and then run:

* dotnet publish -o dist -c Release

This will regenerate both the vendor and app bundles. Now when you run the app (dotnet run again), the browser will receive fully minified resources.