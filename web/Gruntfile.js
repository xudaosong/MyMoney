'use strict';

module.exports = function (grunt) {

    // 注入业务文件时，重新定义路径
    var injector_transform = function (filepath) {
        if (filepath.indexOf('browser_upgrade') > 0 || filepath.indexOf('php-session') > 0)
            return;
        filepath = filepath.replace('.tmp/', '../.tmp/');
        return '<script src="' + filepath + '"></script>'
    };
    // 获取需要注入的业务文件
    var injector_getFiles = function (dir) {
        var files = {};
        var dirfull = dir + '/';
        grunt.file.recurse(dirfull, function (abspath, rootdir, subdir, filename) {
            if (subdir === undefined && grunt.file.match('*.html', filename)) {
                files[dirfull + filename] = [dirfull + '*.module.js', dirfull + '*.js', dirfull + '**/*.module.js', dirfull + '**/*.js', '.tmp/web/*.views.js'];
            }
        });
        return files;
    };

    // 自动加载Grunt插件
    require('load-grunt-tasks')(grunt);

    // 计算grunt任务的运行时间
    require('time-grunt')(grunt);
    // 全局的配置文件
    var appConfig = {
        src: 'src',
        timestamp: new Date().getTime(),
        dist: 'dist'
    };


    grunt.initConfig({

        // 配置文件
        yeoman: appConfig,


        // 代码检查
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= yeoman.src %>/{,*/}*.js'
                ]
            }
        },

        // 清除目录
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/{,*/}*'
                    ]
                }]
            }
        },

        // 解析CSS文件并且添加浏览器前缀到CSS规则里
        autoprefixer: {
            options: {
                browsers: ['last 2 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/css/',
                    src: '{,*/}*.css',
                    dest: '.tmp/css/'
                }]
            }
        },

        // 自动注入Bower的组件
        wiredep: {
            html: {
                src: ['<%= yeoman.src %>/index.html']
            }
        },

        // 编译SASS文件
        compass: {
            dist: {
                options: {
                    sassDir: '<%= yeoman.src %>/scss',
                    cssDir: '<%= yeoman.src %>/css',
                    imagesDir: '<%= yeoman.src %>/images',
                    httpPath: '/web/',
                    force: true
                }
            }
        },

        // 给CSS和JS文件的链接添加时间戳，防止浏览器缓存
        cachebreaker: {
            dist: {
                options: {
                    match: ['base.min.js', 'base.min.css', 'money.min.js', 'money.min.css'],
                    replacement: '<%= yeoman.timestamp %>'
                },
                files: {
                    src: ['<%= yeoman.dist %>/**/*.html']
                }
            }
        },

        // 准备配置文件。配置文件是根据结构化的文件（如html）里面的块声明来生成的。
        // 最终把这些应用替换成优化后的文件引用。
        // 在这个过程中，为每个优化的步骤生成了很多的名为generated的子任务，这些优化的步骤每步都是一个grunt插件
        useminPrepare: {
            html: ['<%= yeoman.src %>/*.html'],
            options: {
                dest: '<%= yeoman.dist %>'/*,
                flow: {
                    html: {
                        steps: {
                            //js: ['concat'*//*, 'uglifyjs'*//*],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }*/
            }
        },

        // 把结构化文件（html）的块声明里面的文件引用替换。
        // 如果那些脚本文件有打过版本声明的，将会用版本声明的文件应用来替换。
        // 这个个过程会直接修改结构化文件（如html）的内容。
        usemin: {
            html: ['<%= yeoman.dist %>/*.html'],
            options: {
                assetsDirs: ['dist/js','dist/css']
            }
            //css: ['<%= yeoman.dist %>/css/{,}*.css'],
            //options: {
            //    blockReplacements: {
            //        css: function (block) {
            //            return 'asdf';
            //            console.log(block);
            //            return '<link rel="stylesheet" href="/web' + block.dest + '">';
            //        },
            //        js: function (block) {
            //            return '<script src="/web' + block.dest + '"></script>';
            //        }
            //    }
            //}
        },

        // 压缩图片
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>/images',
                    src: ['{,*/}*.{png,jpg,jpeg,gif}', '!*-icon/**'],
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },

        // 压缩HTML文件
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // 添加，移除和重建 AngularJS 依赖注入注解，防止uglify压缩后，因为AngularJS没有显式注入，导致代码运行异常
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/js',
                    src: '*.js',
                    dest: '.tmp/concat/js'
                }]
            }
        },
        html2js: {
            options: {
                base: '.',
                singleModule: true,
                useStrict: true,
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            views: {
                options: {
                    module: 'money.views',
                    rename: function (moduleName) {
                        return moduleName.replace('src/', '');
                    }
                },
                files: [{
                    src: ['<%= yeoman.src %>/*/*.html'],
                    dest: '.tmp/web/money.views.js'
                }]
            }
        },
        // 复制文件
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.src %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.html'
                    ]
                }]
            }
        },

        // 并行运行一组任务
        concurrent: {
            dist: [
                'compass:dist'
            ]
        },

        // 注入本地的业务JS文件到HTML
        injector: {
            options: {
                addRootSlash: false,
                ignorePath: ['<%= yeoman.src %>/'],
                transform: injector_transform
            },
            localDependencies: {
                files: (injector_getFiles('src'))
            }
            //js: {
            //    options: {
            //        ignorePath: ['<%= yeoman.src %>/'],
            //        starttag: '<!-- injector:js -->',
            //        endtag: '<!-- endinjector -->',
            //        transform: injector_transform
            //    },
            //    files: (injector_getFiles('src'))
            //}
        }
    });


    grunt.registerTask('build', [
        'clean:dist',
        'html2js',
        'wiredep',
        'injector',
        'copy:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'cssmin',
        'uglify',
        'usemin',
        'cachebreaker',
        'htmlmin',
        'imagemin'
    ]);

    // 压缩图片任务
    grunt.registerTask('images', [
        'imagemin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'build'
    ]);
};
