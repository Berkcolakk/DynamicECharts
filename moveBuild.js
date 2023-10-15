const fs = require("fs");
const path = require("path");
const package = require("./package.json");

const outputFolder = path.resolve(__dirname, "dist");
const prj = path.join(
  require("os").homedir(),
  "source",
  "repos",
  "Berksense",
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
    [prj].forEach((item) => {
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
