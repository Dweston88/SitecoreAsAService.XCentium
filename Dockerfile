FROM sclmmacr.azurecr.io/sitecore-lmm:latest

# Copy FE Source to Theming/XCentium
COPY [".", "/inetpub/wwwroot/theming/XCentium"]

