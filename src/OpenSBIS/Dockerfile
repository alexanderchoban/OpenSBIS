FROM microsoft/aspnetcore-build AS builder

RUN mkdir /home/OpenSBIS
WORKDIR /home/OpenSBIS

# copy package and proj files and run restores, this will cache this process
COPY ./package.json /home/OpenSBIS/
COPY ./tsconfig.json /home/OpenSBIS/
COPY ./*.csproj /home/OpenSBIS/
RUN npm install && npm install -g webpack && dotnet restore

# build the app into the dist folder
COPY . /home/OpenSBIS/
RUN dotnet publish -o dist -c Release

# copy built files to hosting container
FROM microsoft/aspnetcore
WORKDIR /dist
COPY --from=builder /home/OpenSBIS/dist .
ENTRYPOINT ["dotnet", "OpenSBIS.dll"]