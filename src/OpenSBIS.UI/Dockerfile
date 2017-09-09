FROM microsoft/aspnetcore-build:1.1.2 AS builder
ARG API_URL="http://localhost:5001"

RUN mkdir /home/OpenSBIS.UI
WORKDIR /home/OpenSBIS.UI

# copy package and proj files and run restores, this will cache this process
COPY ./package.json /home/OpenSBIS.UI/
COPY ./tsconfig.json /home/OpenSBIS.UI/
COPY ./*.csproj /home/OpenSBIS.UI/
RUN npm install && npm install -g webpack && dotnet restore && npm install

# build the app into the dist folder
RUN set API_URL = ${API_URL}
COPY . /home/OpenSBIS.UI/
RUN dotnet publish -o dist -c Release

# copy built files to hosting container
FROM microsoft/aspnetcore:1.1.2
RUN apt update -y && apt install -y npm
WORKDIR /dist
COPY --from=builder /home/OpenSBIS.UI/dist .
ENTRYPOINT ["dotnet", "OpenSBIS.UI.dll"]