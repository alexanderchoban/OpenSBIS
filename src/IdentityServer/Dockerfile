FROM microsoft/aspnetcore-build:1.1.2 AS builder

RUN mkdir /home/IdentityServer
WORKDIR /home/IdentityServer

# copy proj files and run restores, this will cache this process
COPY ./*.csproj /home/IdentityServer/
RUN dotnet restore

# build the app into the dist folder
COPY . /home/IdentityServer/
RUN dotnet publish -o dist -c Release

# copy built files to hosting container
FROM microsoft/aspnetcore:1.1.2
WORKDIR /dist
COPY --from=builder /home/IdentityServer/dist .
ENTRYPOINT ["dotnet", "IdentityServerWithAspNetIdentity.dll"]