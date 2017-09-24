FROM microsoft/aspnetcore-build:2 AS builder

RUN mkdir /home/OpenSBIS.UI
WORKDIR /home/OpenSBIS.UI

# copy package and proj files and run restores, this will cache this process
COPY ./*.csproj /home/OpenSBIS.UI/
RUN dotnet restore

# build the app into the dist folder
COPY . /home/OpenSBIS.UI/
RUN dotnet publish -o dist -c Release

# copy built files to hosting container
FROM microsoft/aspnetcore:2
RUN apt update -y && apt install -y gnupg gnupg2 gnupg1
RUN apt update -y && curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get install -y nodejs
WORKDIR /dist
COPY --from=builder /home/OpenSBIS.UI/dist .
ENTRYPOINT ["dotnet", "OpenSBIS.UI.dll"]