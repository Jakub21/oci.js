const fs = require('fs');

const currentVersion = JSON.parse(fs.readFileSync(
  `${__dirname}/package.json`)).version;

const entryPoint = `${__dirname}/webIndex.js`;
const buildDir = `${__dirname}/build/`;
const buildFile = `${buildDir}/webUtils.js`;

let buildPackage = () => {
  fs.mkdirSync(buildDir, {recursive: true});
  const browserify = require('browserify')();
  browserify.add(entryPoint);
  let stream = browserify.bundle();
  let content = `// version ${currentVersion}\n`;
  stream.on('data', (data) => { content += data; });
  stream.on('end', () => { fs.writeFileSync(buildFile, content); });
}

let versionMatch = () => {
  const bundleVersion = fs.readFileSync(buildFile, 'utf-8').split('\n')[0]
    .split(' ').splice(-1)[0];
  return bundleVersion == currentVersion;
}

fs.stat(buildFile, (err) => {
  if (err == null) {
    if (versionMatch()) return;
  }
  buildPackage();
});

module.exports.path = buildFile;
