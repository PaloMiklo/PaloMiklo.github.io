const gulp = require('gulp');
const replace = require('gulp-replace');

gulp.task('build-date', _ => {
    const now = new Date();
    const buildDate = now.toISOString();

    return gulp.src('./src/environments/environment.prod.ts')
        .pipe(replace(/buildDate: '.*'/, `buildDate: '${buildDate}'`))
        .pipe(gulp.dest('./src/environments/'))
        .on('end', () => console.log(`⚠️ Build date set to ${buildDate}`));
});

gulp.task('build:date', gulp.series('build-date'));