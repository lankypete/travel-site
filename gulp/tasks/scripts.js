var gulp = require('gulp'),
webpack = require('webpack');

//task to automate running webpack when saving
gulp.task('scripts', function(callback) {
	webpack(require('../../webpack.config.js'), function(err, stats) {
		if (err) {
			console.log(err.toString());
		}

		console.log(stats.toString()); //logs to the terminal some useful stats
		callback(); //so that gulp know that webpack completed
	});
});