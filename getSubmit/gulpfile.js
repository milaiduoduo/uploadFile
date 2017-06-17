const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('compileToES5',function(){
    return gulp.src(['src/**/*.js'])
        .pipe(babel({presets:['es2015','stage-0']}))
        .pipe(gulp.dest('./build'))
});

gulp.task('default',['compileToES5'],()=>{
    gulp.watch(['src/**/*.js'],['compileToES5'])
    console.log('task flish!!');
});