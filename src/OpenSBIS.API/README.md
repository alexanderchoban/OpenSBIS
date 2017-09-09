### Dev-Build: Setting Environment Variables
Here's a quick quide for setting up environment variables for local testing in powershell:

<pre>
$env:ASPNETCORE_ENVIRONMENT="Development"
$env:ASPNETCORE_URLS="https://*:5006"
$env:ConnectionString="User ID=opensbis;Password=FbaMCxGDtq69Frmk;Host=localhost;Port=5432;Database=opensbis;"
$env:IDSRV_URL="http://localhost:5002"
$env:IDSRV_API="api1"
$env:WEB_URL="http://localhost:5000"
</pre>