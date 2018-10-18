FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /app

# copy csproj and restore as distinct layers
COPY *.sln .
COPY dashboard/*.csproj ./dashboard/
RUN dotnet restore

# copy everything else and build app
COPY dashboard/. ./dashboard/
WORKDIR /app/dashboard
RUN dotnet publish -c Release -o out


FROM microsoft/dotnet:2.1-aspnetcore-runtime AS runtime
WORKDIR /app
COPY --from=build /app/dashboard/out ./
ENTRYPOINT ["dotnet", "dashboard.dll"]