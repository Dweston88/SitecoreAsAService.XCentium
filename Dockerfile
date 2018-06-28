FROM sclmmacr.azurecr.io/sitecore-lmm:latest

# Copy FE Source to Theming/XCentium
COPY ["dist", "/inetpub/wwwroot/theming/Xcentium/dist"]

