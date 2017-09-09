FROM microsoft/aspnetcore-build:1.1.2 AS builder

RUN mkdir /home/OpenSBIS.API
WORKDIR /home/OpenSBIS.API

# copy package and proj files and run restores, this will cache this process
COPY ./*.csproj /home/OpenSBIS.API/
RUN dotnet restore

# build the app into the dist folder
COPY . /home/OpenSBIS.API/
RUN dotnet publish -o dist -c Release

# copy built files to hosting container
FROM microsoft/aspnetcore:1.1.2
WORKDIR /dist
COPY --from=builder /home/OpenSBIS.API/dist .
ENTRYPOINT ["dotnet", "OpenSBIS.API.dll"]