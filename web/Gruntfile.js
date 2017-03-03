'use strict';

module.exports = function(grunt) {
    // 注入业务文件时，重新定义路径
    var injectorTransform = function(filepath) {
        if (filepath.indexOf('browser_upgrade') > 0 || filepath.indexOf('php-session') > 0) {
            return;
        }
        filepath = filepath.replace('.temp/', '../.temp/');
        return '<script src="' + filepath + '"></script>';
    };
    // 获取需要注入的业务文件
    var injectorGetFiles = function(dir) {
        var files = {};
        var dirfull = dir + '/';
        grunt.file.recurse(dirfull, function(abspath, rootdir, subdir, filename) {
            if (subdir === undefined && grunt.file.match('*.html', filename)) {
                files[dirfull + filename] = [dirfull + '*.module.js', dirfull + '*.js', dirfull + '**/*.module.js', dirfull + '**/*.js', '!src/bower_components/**'];
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
        dist: 'dist',
        timestamp: new Date().getTime()
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
            options: {
                force: true
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= yeoman.dist %>'
                    ]
                }]
            },
            temp: {
                files: [{
                    dot: true,
                    src: [
                        '.sass-cache',
                        '.temp'
                    ]
                }]
            }
        },

        // 复制文件
        copy: {
            options: {
                force: true
            },
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.src %>',
                    dest: '<%= yeoman.dist %>',
                    src: ['*.html']
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'src/bower_components/font-awesome/fonts',
                    dest: '<%= yeoman.dist %>/fonts',
                    src: ['**']
                }]
            }
        },
        ngconstant: {
            options: {
                space: '  ',
                wrap: '\'use strict\';\n\n {%= __ngModule %}',
                name: 'money.constant',
                dest: 'src/money.constant.js'
            },
            development: {
                constants: {
                    ENV: {
                        name: 'development',
                        apiEndpoint: 'http://localhost:3000'
                    }
                }
            },
            production: {
                constants: {
                    ENV: {
                        name: 'production',
                        apiEndpoint: 'http://localhost:333'
                    }
                }
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
                    cwd: '.temp/css/',
                    src: '{,*/}*.css',
                    dest: '.temp/css/'
                }]
            }
        },

        // 自动注入Bower的组件
        wiredep: {
            html: {
                src: ['<%= yeoman.src %>/*.html']
            }
        },

        // 编译SASS文件
        compass: {
            dist: {
                options: {
                    sassDir: '<%= yeoman.src %>/scss',
                    cssDir: '<%= yeoman.src %>/css',
                    imagesDir: '<%= yeoman.src %>/images',
                    httpImagesPath: '/images',
                    httpPath: '/web/',
                    force: true,
                    raw: 'Encoding.default_external = \'utf-8\'\n'
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
                staging: '.temp',
                dest: '<%= yeoman.dist %>'
            }
        },

        // 把结构化文件（html）的块声明里面的文件引用替换。
        // 如果那些脚本文件有打过版本声明的，将会用版本声明的文件应用来替换。
        // 这个个过程会直接修改结构化文件（如html）的内容。
        usemin: {
            html: ['<%= yeoman.dist %>/*.html'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>/js', '<%= yeoman.dist %>/css', '<%= yeoman.dist %>/images']
            }
        },

        // 压缩图片
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.src %>/images',
                    src: ['{,*/}*.{png,jpg,jpeg,gif,ico}', '!*-icon/**'],
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
                    cwd: '.temp/concat/js',
                    src: '*.js',
                    dest: '.temp/concat/js'
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
                    rename: function(moduleName) {
                        return moduleName.replace('src/', '');
                    }
                },
                files: [{
                    src: ['<%= yeoman.src %>/**/*.*.html', '!src/bower_components/**'],
                    dest: 'src/money.views.js'
                }]
            }
        },

        // 并行运行一组任务
        concurrent: {
            dist: [
                'compass:dist'
            ]
        },
        watch: {
            css: {
                files: ['src/scss/**/*.scss', '!src/bower_components/**'],
                tasks: ['compass'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['src/**/*.html', '!src/bower_components/**'],
                tasks: [],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['src/*.js', 'src/**/*.js', '!src/bower_components/**'],
                tasks: [],
                options: {
                    livereload: true
                }
            }
        },
        // 注入本地的业务JS文件到HTML
        injector: {
            options: {
                addRootSlash: false,
                lineEnding: grunt.util.linefeed,
                ignorePath: ['<%= yeoman.src %>/'],
                transform: injectorTransform
            },
            localDependencies: {
                files: (injectorGetFiles('src'))
            }
            //js: {
            //    options: {
            //        ignorePath: ['<%= yeoman.src %>/'],
            //        starttag: '<!-- injector:js -->',
            //        endtag: '<!-- endinjector -->',
            //        transform: injectorTransform
            //    },
            //    files: (injectorGetFiles('src'))
            //}
        }
    });

    grunt.registerTask('money.views', function() {
        grunt.file.write('src/money.views.js', 'angular.module(\'money.views\', []);');
    });

    grunt.registerTask('build', [
        'clean:dist',
        'ngconstant:production',
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
        'imagemin',
        'money.views',
        'clean:temp',
        'ngconstant:development'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'build'
    ]);
};
