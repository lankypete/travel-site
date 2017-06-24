var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require("browser-sync").create();

//task to preview the Dist folder in the browser
gulp.task('previewDist', function(){
	browserSync.init({
		notify: false,
		server: {
			baseDir : "dist" //the base folder
		}
	});
});


//task to delete the dist folder before running
gulp.task('deleteDistFolder', function(){
	return del("./dist");
});

//task to cope all other folders that files that may be require (maybe in a wordpress site)
gulp.task('copyGeneralFiles', ['deleteDistFolder', 'icons'/*may as well rebuild sprite*/], function(){
	var pathsToCopy = [
		'./app//**/*',
		'!./app/index.html',
		'!./app/assets/images/**',
		'!./app/assets/scripts/**',
		'!./app/assets/styles/**',
		'!./app/temp/',
		'!./app/temp/**'
	]

	return gulp.src(pathsToCopy)
		.pipe(gulp.dest("./dist"))
});

//copy all images to dist folder and compress the images
gulp.task('optimizeImages', ['deleteDistFolder', 'styles', 'scripts'/*this triggers a fresh rebuild of the styles and scripts, may as well*/], function() {
	//use square brackets to add multiple paths
	//use ! to exclude 
	return gulp.src(['./app/assets/images/**/*', '!./app/assets/images/icons', '!./app/assets/images/icons/**/*'])
		//pipe to compress filesize
		.pipe(imagemin({
			progressive: true,
			interlaced: true,
			multipass: true
		}))
		.pipe(gulp.dest("./dist/assets/images"));
});

//usemin task to minimize and move scripts and styles
gulp.task('usemin',['deleteDistFolder'], function() {
	return gulp.src("./app/index.html")
		.pipe(usemin({
			css: [function(){
				//the first function is where we perfrom the revesion on the file
				//return rev fil so that gulp knows when it completes
				return rev();
			}, function() {
				//this is where we will compress the css file
				return cssnano();
			}],
			js: [function(){
				return rev();
			}, function(){
				return uglify();
			}]
		}))
		.pipe(gulp.dest("./dist"));
});

//this task will be called and won't do anything, just run other tasks
gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'usemin']);
























