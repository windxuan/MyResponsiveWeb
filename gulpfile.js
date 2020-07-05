// gulp的所有任务，需要定义在这个文件中

// 首先，申明一个依赖的加载项 -- 比如：依赖gulp本身
var gulp = require("gulp");
var rev = require("gulp-rev"); // 插件：给每个文件添加版本号 通过计算所得的HASH码修改文件名
var revReplace = require("gulp-rev-replace");
var useref = require("gulp-useref"); // 插件作用：自动合并,自动打包代码
var filter = require("gulp-filter"); // 过滤代码：在代码运行过程中将某些代码过滤出来
var uglify = require("gulp-uglify"); // 压缩JS代码的插件
var csso = require("gulp-csso"); // 压缩CSS代码的插件

gulp.task("default", function () {
    var jsFilter = filter("**/*.js", { restore: true }); // 获取到所有js文件
    var cssFilter = filter("**/*.css", { restore: true }); // 获取到所有css文件
    var indexHtmlFilter = filter(["**/*", "!**/index.html"], { restore: true }); // 获取到所有除了index.html(入口文件)之外的所有文件

    return gulp
        .src("src/index.html") // src -- 拿到需要处理的文件-index
        .pipe(useref()) // 第一步处理：分析并拿到<build>注释标识中的每一个文件      Concatenate with gulp-useref
        .pipe(jsFilter) // 第二步处理：从流中，筛选出所有js文件
        .pipe(uglify()) // 第三步：压缩筛选出的JS文件      Minify any javascript sources
        .pipe(jsFilter.restore) // 第四步：将压缩好的JS文件放回归到流中
        .pipe(cssFilter) // 第五步：从流中，筛选出所有css文件
        .pipe(csso()) // 第六步：压缩筛选出的css文件     Minify any CSS sources
        .pipe(cssFilter.restore) // 第六步：将压缩好的css文件放回归到流中
        .pipe(indexHtmlFilter) // 第七步：筛选出 除了index.html(入口文件)之外的其他所有文件
        .pipe(rev()) // 第八步：为文件生成 HASH版本号和文件名      Rename the concatenated files (but not index.html)
        .pipe(indexHtmlFilter.restore) // 第九步：将第八步 -- 生成完成之后的所有文件回归到流中
        .pipe(revReplace()) // 第十步：把index.html中，对于文件的引用，替换新文件名      Substitute in new filenames
        .pipe(gulp.dest("dist")); // 流的最后，将流中处理完成之后的代码放入dist文件夹中。作为发布版本。
});

// gulp.task("task-name", function () {
//     console.log("Hello gulp!");
// });
