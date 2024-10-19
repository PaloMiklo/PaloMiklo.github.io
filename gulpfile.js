const gulp = require('gulp');
const replace = require('gulp-replace');

gulp.task('optimize-images', async _ => {
    const imagemin = (await import('gulp-imagemin')).default;
    const mozjpeg = (await import('imagemin-mozjpeg')).default;
    const optipng = (await import('imagemin-optipng')).default;
    const svgo = (await import('imagemin-svgo')).default;

    return gulp.src('./src/assets/**/*.{png,jpg,jpeg,gif,svg}')
        .pipe(imagemin([
            mozjpeg({ quality: 75, progressive: true }),
            optipng({ optimizationLevel: 5 }),
            svgo({
                plugins: [
                    { removeViewBox: false },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest('src/assets'));
});

gulp.task('build-date', _ => {
    const now = new Date();
    const buildDate = now.toISOString();
    
    return gulp.src('./src/environments/environment.prod.ts') 
        .pipe(replace(/buildDate: '.*'/, `buildDate: '${buildDate}'`)) 
        .pipe(gulp.dest('./src/environments/')) 
        .on('end', () => console.log(`⚠️ Build date set to ${buildDate}`));
});

gulp.task('post:install', gulp.series('optimize-images'));
gulp.task('build:date', gulp.series('build-date'));