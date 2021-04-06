import gulp from "gulp";
import pug from "gulp-pug";
import gsass from "gulp-sass";
import cleanCSS from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import imageOpt from "gulp-image";
import babel from "babelify";
import bro from "gulp-bro";
import del from "del";

gsass.compiler = require("node-sass");

const routes = {
	pug: {
		src: "./src/templates/*.pug",
		dest: ".",
	},
	img: {
		src: "./src/img/*",
		dest: "./img/",
	},
	scss: {
		watch: "./src/scss/**/*.scss",
		src: "./src/scss/styles.scss",
		dest: "css/",
	},
	js: {
		watch: "./src/js/**/*.js",
		src: "./src/js/main.js",
		dest: "scripts/",
	},
};

const clean = del([
	".index.html",
	routes.img.dest,
	routes.scss.dest,
	routes.js.dest,
]);
const page = () =>
	gulp.src(routes.pug.src).pipe(pug()).pipe(gulp.dest(routes.pug.dest));

const image = () =>
	gulp.src(routes.img.src).pipe(imageOpt()).pipe(gulp.dest(routes.img.dest));

const styles = () =>
	gulp
		.src(routes.scss.src)
		.pipe(gsass().on("error", gsass.logError))
		.pipe(autoprefixer({ browsers: [">99.5%"] }))
		.pipe(cleanCSS())
		.pipe(gulp.dest(routes.scss.dest));
const scripts = () => {
	gulp
		.src(routes.js.src)
		.pipe(
			bro({
				transform: [
					babel.configure({ presets: ["@babel/preset-env"] }),
					["uglifyify", { global: true }],
				],
			})
		)
		.pipe(gulp.dest(routes.js.dest));
};

const watch = () => {
	gulp.watch(routes.pug.src, pug),
		gulp.watch(routes.scss.watch, styles),
		gulp.watch(routes.img.src, image),
		gulp.watch(routes.js.watch, scripts);
};

const prepare = gulp.series([clean, img]);
const assets = gulp.series([page, styles, scripts]);
const postDev = gulp.parallel([watch]);

export const build = gulp.series([prepare, assets, postDev]);
