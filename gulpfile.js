const gulp = require('gulp');

gulp.task('optimize-images', async () => {
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

gulp.task('post:install', gulp.series('optimize-images'));