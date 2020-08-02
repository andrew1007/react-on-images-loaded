var gulp = require('gulp');
// var initGulpTasks = require('react-component-gulp-tasks');
var git = require('gulp-git');
var deploy = require('gulp-gh-pages');
var path = require('path');
var connect = require('gulp-connect');
var exampleGulp = require('./tasks/example')


/**
 * Tasks are added by the react-component-gulp-tasks package
 *
 * See https://github.com/JedWatson/react-component-gulp-tasks
 * for documentation.
 *
 * You can also add your own additional gulp tasks if you like.
 */

var config = {
	component: {
		name: 'OnImagesLoaded',
		dependencies: [],
		lib: 'lib'
	},

	example: {
		src: 'example/src',
		dist: 'example/dist',
		files: [
			'index.html',
			'.gitignore'
		],
		scripts: [
			'example.js'
		],
		less: [
			'example.less'
		]
	}

};
exampleGulp(gulp, config)
// initGulpTasks(gulp, taskConfig);

gulp.task('dev:server', gulp.series(function () {
	connect.server({
		root: config.example.dist,
		fallback: path.join(config.example.dist, 'index.html'),
		port: config.example.port || process.env.PORT || 8000,
		livereload: true
	});
}));

gulp.task('dev', gulp.series('dev:server', 'watch:examples'));

gulp.task('publish:tag', gulp.series(function (done) {
	var pkg = JSON.parse(require('fs').readFileSync('./package.json'));
	var v = 'v' + pkg.version;
	var message = 'Release ' + v;

	git.tag(v, message, function (err) {
		if (err) throw err;

		git.push('origin', v, function (err) {
			if (err) throw err;
			done();
		});
	});
}));

gulp.task('publish:npm', gulp.series(function (done) {
	require('child_process')
		.spawn('npm', ['publish'], { stdio: 'inherit' })
		.on('close', done);
}));

if (config.example) {
	gulp.task('publish:examples', gulp.series('build:examples', function () {
		return gulp.src(config.example.dist + '/**/*').pipe(deploy());
	}));
	gulp.task(gulp.series('publish:tag', 'publish:npm', 'publish:examples'));
} else {
	gulp.task(gulp.series('release', 'publish:tag', 'publish:npm'));
}



