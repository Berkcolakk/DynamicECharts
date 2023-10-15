const fs = require("fs");
const path = require("path");
const package = require("./package.json");

const outputFolder = path.resolve(__dirname, "dist");
const smartCity = path.join(
  require("os").homedir(),
  "source",
  "repos",
  "SmartCityFrontendReact",
  "src",
  "lib",
  package.name.substring(0, package.name.lastIndexOf("-react") - 1)
);
const smartCityAdminPanel = path.join(
  require("os").homedir(),
  "source",
  "repos",
  "SmartCityAdminPanelFrontend",
  "src",
  "lib",
  package.name.substring(0, package.name.lastIndexOf("-react") - 1)
);
fs.readdir(outputFolder, (err, files) => {
  if (err) {
    console.error("Error reading output folder: " + err.message);
    return;
  }
  files.forEach((file) => {
    const sourcePath = path.join(outputFolder, file);
    [smartCityAdminPanel, smartCity].forEach((item) => {
      const destinationPath = path.join(item, file);
      fs.copyFile(sourcePath, destinationPath, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`${file} moved to ${item}`);
        }
      });
    });
  });
});
