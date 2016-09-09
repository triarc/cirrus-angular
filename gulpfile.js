var gulp = require('gulp');
var util = require('gulp-util');
var bump = require('gulp-bump');
var publish = require('gulp-publish');
var exec = require('child_process').exec;
var tslint = require('gulp-tslint');
var tslintReporter = require('gulp-tslint-jenkins-reporter');
var argv = require('yargs')
  .alias({ 'p': 'package', 'b': 'bump' })
  .argv;
var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;

gulp.task('e2e', function (done) {

  var serve = spawn(__dirname + '/node_modules/.bin/ng.cmd', ['serve', '-lr=false'], {cwd : process.cwd()});

  exec(__dirname + '/node_modules/.bin/ng.cmd e2e', function (err, stdout, stderr) {

    if(err){
      console.log(err);
    }

    console.log(stdout);

    spawn("taskkill", ["/pid", serve.pid, '/f', '/t']);
    done();
  });

});

gulp.task('bump', function () {
  var dir = getPackageDirectory('./src/components');
  var bumpType = argv.bump;

  if (!bumpType) {
    throw new util.PluginError({
      plugin: "angular2common",
      message: "missing bump parameter (major, minor, patch)"
    });
  }

  return gulp.src([`${dir}/package.json`])
    .pipe(bump({ type: bumpType }))
    .pipe(gulp.dest(dir));
});

gulp.task('publish-all',
  function (done) {
    var packageRoot = './dist/components';
    var dirs = getComponentDirectories(packageRoot);

    var waithandles = [];
    dirs.forEach(function (dir, i) {
      waithandles[i] = publishPackage(path.join(packageRoot, dir));
    });
    Promise.all(waithandles)
      .then(function () {
        done();
      });
  });

//get all component directories containing a package.json file
function getComponentDirectories(root) {
  var dirs = fs.readdirSync(root)
  .filter(function (file) {
    var isDirectory = fs.statSync(path.join(root, file)).isDirectory();

    if (!isDirectory)
      return false;

    if (!fs.existsSync(path.join(root, file, 'package.json')))
      return false;

    return true;
  });

  return dirs;
}

function publishPackage(path) {
  var promise = new Promise(function (resolve, reject) {
    exec(`npm publish ${path}`,
      function (err, stdout, stderr) {
        if (err) {
          if (err.message.indexOf('You cannot publish over the previously published version') === -1) {
            console.log(`publish failed with ${err}`);
            process.exit(1);
          } else {
            console.log(`package ${path} already published`);
          }
        } else {
          console.log(`publised successfully from ${path}`);
        }
        resolve();
      });
  });
  return promise;
}

gulp.task('build', ['bump'], function (cb) {
  exec('ng build', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('publish', ['bump', 'build'],
  function (cb) {
    exec(`npm publish ${getPackageDirectory('./dist/components')}`, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
    });
  });

gulp.task('lint', function () {
  return gulp.src('./src/**/*.ts')
    .pipe(tslint())
    .pipe(tslintReporter({
      filename: 'checkstyle-result.xml',
    }));
});

function getPackageDirectory(basePath) {
  var pkg = argv.package;

  if (!pkg) {
    throw new util.PluginError({
      plugin: "angular2common",
      message: "missing package parameter"
    });
  }

  var dir = `${basePath}/${pkg}`;
  if (!fs.existsSync(dir)) {
    throw new util.PluginError({
      plugin: "angular2common",
      message: "package does not exists"
    });
  }

  return dir;
}
