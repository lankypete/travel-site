//styles.js
var gulp = require("gulp"),
postcss = require("gulp-postcss"),
autoprefixer = require("autoprefixer"),
cssvars = require("postcss-simple-vars"),
nested =require("postcss-nested"),
cssImport = require("postcss-import"),
mixins = require("postcss-mixins"),
hexrgba = require("postcss-hexrgba");

//the styles task pipes all css modules, and base files, and all into postcss, 
//and then to the final stylesheet inside the temp folder
//(called from gulp cssInject dependancies)
gulp.task('styles', function() {
	return gulp.src('./app/assets/styles/styles.css')
		.pipe(postcss([cssImport, mixins, nested, cssvars, hexrgba, autoprefixer]))
		.on('error', function(errorInfo){ //so that gulp tasks don't quit on accidental css error
			console.log(errorInfo.toString());
			this.emit('end');
		})
		.pipe(gulp.dest('./app/temp/styles'));
});