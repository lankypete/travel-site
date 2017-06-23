var gulp = require("gulp"),
watch = require("gulp-watch"),
browserSync = require("browser-sync").create();

gulp.task('watch', function(){
	browserSync.init({
		notify: false,
		server: {
			baseDir : "app" //the base folder
		}
	});

	//syntax watch('file to be watched', what it will do)
	//this watches the index file for saves and then refreshes browser
	watch('./app/index.html', function (){
		browserSync.reload();
	});
	//watches css files for reload and calls the gulp styles task above
	watch('./app/assets/styles/**/*.css', function(){
		gulp.start('cssInject');
	});

	//watch for changes to javascript files
	watch('./app/assets/scripts/**/*.js', function() {
		gulp.start('scriptsRefresh'); //calls the gulp task that will then refresh the page
	});
});


gulp.task('cssInject', ['styles']/*<--dependencies*/, function() {
	return gulp.src('./app/temp/styles/styles.css')
	.pipe(browserSync.stream()); //injects the css directly into browser (without refresh)
});

gulp.task('scriptsRefresh', ['scripts'], function(){
	browserSync.reload();
});