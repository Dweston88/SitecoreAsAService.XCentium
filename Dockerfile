FROM sclmmacr.azurecr.io/sitecore-lmm:latest

WORKDIR /install

# Install NodeJS and Gulp
ADD ["https://nodejs.org/dist/v8.11.3/node-v8.11.3-x64.msi", "/install/node-v8.11.3-x64.msi"]
RUN ["msiexec.exe", "/i", "node-v8.11.3-x64.msi", "/qn"]
RUN ["npm", "install", "--global", "gulp-cli"]

# Copy FE Source to Theming/XCentium
COPY [".", "/inetpub/wwwroot/Theming/Xcentium"]

