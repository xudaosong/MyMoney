// Generated on 2016-01-05 using generator-ionic 0.8.0
'use strict';

var _ = require('lodash');
var path = require('path');
var cordovaCli = require('cordova');
var spawn = process.platform === 'win32' ? require('win-spawn') : require('child_process').spawn;

module.exports = function (grunt) {
// 注入业务文件时，重新定义路径
  var injectorTransform = function (filepath) {
    filepath = filepath.replace('.temp/', '../.temp/');
    return '<script src="' + filepath + '"></script>';
  };
  // 获取需要注入的业务文件
  var injectorGetFiles = function (dir) {
    var files = {};
    var dirfull = dir + '/';
    grunt.file.recurse(dirfull, function (abspath, rootdir, subdir, filename) {
      if (subdir === undefined && grunt.file.match('*.html', filename)) {
        files[dirfull + filename] = [dirfull + '*.module.js', dirfull + '*.js', dirfull + '**/*.module.js', dirfull + '**/*.js', '!app/bower_components/**','app/*.views.js'];
      }
    });
    return files;
  };
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: {
      // configurable paths
      app: 'app',
      scripts: 'js',
      styles: 'css',
      images: 'img',
      dist: 'www'
    },

    // Environment Variables for Angular App
    // This creates an Angular Module that can be injected via ENV
    // Add any desired constants to the ENV objects below.
    // https://github.com/diegonetto/generator-ionic/blob/master/docs/FAQ.md#how-do-i-add-constants
    ngconstant: {
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'money.constant',
        dest: '<%= yeoman.app %>/money.constant.js'
      },
      development: {
        constants: {
          ENV: {
            name: 'development',
            apiEndpoint: 'http://api.money.dev/'
          }
        }
      },
      production: {
        constants: {
          ENV: {
            name: 'production',
            apiEndpoint: 'http://api.money.com/'
          }
        }
      }
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep', 'newer:copy:app'],
        options: {
            livereload: true
        }
      },
      html: {
        files: ['<%= yeoman.app %>/**/*.html', '!<%= yeoman.app %>/bower_components/**'],
        tasks: ['newer:copy:app'],
        options: {
            livereload: true
        }
      },
      js: {
        files: ['<%= yeoman.app %>/**/*.js', '!<%= yeoman.app %>/bower_components/**'],
        tasks: ['newer:copy:app'],
        options: {
            livereload: true
        }
      },
      compass: {
        files: ['<%= yeoman.app %>/<%= yeoman.styles %>/**/*.{scss,sass}'],
        tasks: ['compass:server', 'autoprefixer', 'newer:copy:tmp'],
        options: {
            livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['ngconstant:development', 'newer:copy:app'],
        options: {
            livereload: true
        }
      }
    },

    // The actual grunt server settings
    // connect: {
    //   options: {
    //     port: 9000,
    //     // Change this to '0.0.0.0' to access the server from outside.
    //     hostname: '192.168.248.64'
    //   },
    //   dist: {
    //     options: {
    //       base: '<%= yeoman.dist %>'
    //     }
    //   },
    //   coverage: {
    //     options: {
    //       port: 9002,
    //       open: true,
    //       base: ['coverage']
    //     }
    //   }
    // },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= yeoman.app %>/{,*/}*.js'
      ]
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.temp',
            '<%= yeoman.dist %>/*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      server: {
        files: [{
          dot: true,
          src: [
            '.sass-cache',
            '.temp'
          ]
        }]
      }
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.temp/<%= yeoman.styles %>/',
          src: '{,*/}*.css',
          dest: '.temp/<%= yeoman.styles %>/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: /\.\.\//
      },
      sass: {
        src: ['<%= yeoman.app %>/<%= yeoman.styles %>/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // 注入本地的业务JS文件到HTML
    injector: {
      options: {
        addRootSlash: false,
        lineEnding: grunt.util.linefeed,
        ignorePath: ['<%= yeoman.app %>/'],
        transform: injectorTransform
      },
      localDependencies: {
        files: (injectorGetFiles('app'))
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    compass: {
      options: {
        sassDir: '<%= yeoman.app %>/<%= yeoman.styles %>',
        cssDir: '.temp/<%= yeoman.styles %>',
        generatedImagesDir: '.temp/<%= yeoman.images %>/generated',
        imagesDir: '<%= yeoman.app %>/<%= yeoman.images %>',
        fontsDir: '<%= yeoman.app %>/<%= yeoman.styles %>/fonts',
        importPath: '<%= yeoman.app %>/bower_components',
        httpImagesPath: '/<%= yeoman.images %>',
        httpGeneratedImagesPath: '/<%= yeoman.images %>/generated',
        httpFontsPath: '/<%= yeoman.styles %>/fonts',
        relativeAssets: false,
        assetCacheBuster: false,
        raw: 'Encoding.default_external = \'utf-8\'\n'
      },
      dist: {
        options: {
          generatedImagesDir: '<%= yeoman.dist %>/<%= yeoman.images %>/generated'
        }
      },
      server: {
        options: {
          debugInfo: true
        }
      }
    },


    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        staging: '.temp',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/**/*.html'],
      css: ['<%= yeoman.dist %>/<%= yeoman.styles %>/**/*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>']
      }
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      options: {
        //root: '<%= yeoman.app %>',
        noRebase: true
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
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
                    return moduleName.replace('app/', '');
                }
            },
            files: [{
                src: ['<%= yeoman.app %>/**/*.*.html', '!src/bower_components/**'],
                dest: '<%= yeoman.app %>/money.views.js'
            }]
        }
    },
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '<%= yeoman.images %>/**/*.{png,jpg,jpeg,gif,webp,svg}',
            '*.html',
            'fonts/*',
            '!app/bower_components/**'
          ]
        }, {
          expand: true,
          cwd: '.temp/<%= yeoman.images %>',
          dest: '<%= yeoman.dist %>/<%= yeoman.images %>',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/<%= yeoman.styles %>',
        dest: '.temp/<%= yeoman.styles %>/',
        src: '{,*/}*.css'
      },
      app: {
        expand: true,
        cwd: '<%= yeoman.app %>',
        dest: '<%= yeoman.dist %>/',
        src: [
          '**/*',
          '!**/*.(scss,sass,css)',
          '!**/*.*.html'
        ]
      },
      tmp: {
        expand: true,
        cwd: '.temp',
        dest: '<%= yeoman.dist %>/',
        src: '**/*'
      }
    },

    concurrent: {
      ionic: {
        tasks: [],
        options: {
          logConcurrentOutput: true
        }
      },
      server: [
        'compass:server',
        'copy:styles'
      ],
      dist: [
        'compass:dist',
        'copy:styles'
      ]
    },

    // ngAnnotate tries to make the code safe for minification automatically by
    // using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.temp/concat/<%= yeoman.scripts %>',
          src: '*.js',
          dest: '.temp/concat/<%= yeoman.scripts %>'
        }]
      }
    }

  });

  // Register tasks for all Cordova commands
  _.functions(cordovaCli).forEach(function (name) {
    grunt.registerTask(name, function () {
      this.args.unshift(name.replace('cordova:', ''));
      // Handle URL's being split up by Grunt because of `:` characters
      if (_.contains(this.args, 'http') || _.contains(this.args, 'https')) {
        this.args = this.args.slice(0, -2).concat(_.last(this.args, 2).join(':'));
      }
      var done = this.async();
      var exec = process.platform === 'win32' ? 'cordova.cmd' : 'cordova';
      var cmd = path.resolve('./node_modules/cordova/bin', exec);
      var flags = process.argv.splice(3);
      var child = spawn(cmd, this.args.concat(flags));
      child.stdout.on('data', function (data) {
        grunt.log.writeln(data);
      });
      child.stderr.on('data', function (data) {
        grunt.log.error(data);
      });
      child.on('close', function (code) {
        code = code ? false : true;
        done(code);
      });
    });
  });

  // Since Apache Ripple serves assets directly out of their respective platform
  // directories, we watch all registered files and then copy all un-built assets
  // over to <%= yeoman.dist %>/. Last step is running cordova prepare so we can refresh the ripple
  // browser tab to see the changes. Technically ripple runs `cordova prepare` on browser
  // refreshes, but at this time you would need to re-run the emulator to see changes.
  grunt.registerTask('ripple', ['wiredep', 'newer:copy:app', 'ripple-emulator']);
  grunt.registerTask('ripple-emulator', function () {
    grunt.config.set('watch', {
      all: {
        files: _.flatten(_.pluck(grunt.config.get('watch'), 'files')),
        tasks: ['newer:copy:app', 'prepare']
      }
    });

    var cmd = path.resolve('./node_modules/ripple-emulator/bin', 'ripple');
    var child = spawn(cmd, ['emulate']);
    child.stdout.on('data', function (data) {
      grunt.log.writeln(data);
    });
    child.stderr.on('data', function (data) {
      grunt.log.error(data);
    });
    process.on('exit', function (code) {
      child.kill('SIGINT');
      process.exit(code);
    });

    return grunt.task.run(['watch']);
  });

  // Wrap ionic-cli commands
  grunt.registerTask('ionic', function () {
    var done = this.async();
    var script = path.resolve('./node_modules/ionic/bin/', 'ionic');
    var flags = process.argv.splice(3);
    var child = spawn(script, this.args.concat(flags), {stdio: 'inherit'});
    child.on('close', function (code) {
      code = code ? false : true;
      done(code);
    });
  });

  grunt.registerTask('money.views', function() {
      grunt.file.write('app/money.views.js', 'angular.module(\'money.views\', []);');
  });

  grunt.registerTask('serve', function (target) {
    if (target === 'compress') {
      return grunt.task.run(['compress', 'ionic:serve']);
    }

    grunt.config('concurrent.ionic.tasks', ['ionic:serve', 'watch']);
    grunt.task.run(['init', 'concurrent:ionic']);
  });
  grunt.registerTask('emulate', function () {
    grunt.config('concurrent.ionic.tasks', ['ionic:emulate:' + this.args.join(), 'watch']);
    return grunt.task.run(['init', 'concurrent:ionic']);
  });
  grunt.registerTask('run', function () {
    grunt.config('concurrent.ionic.tasks', ['ionic:run:' + this.args.join(), 'watch']);
    return grunt.task.run(['init', 'concurrent:ionic']);
  });
  grunt.registerTask('build', function () {
    return grunt.task.run(['init', 'ionic:build:' + this.args.join()]);
  });

  grunt.registerTask('init', [
    'clean',
    'ngconstant:development',
    'money.views',
    'injector',
    'wiredep',
    'concurrent:server',
    'autoprefixer',
    'newer:copy:app',
    'newer:copy:tmp'
  ]);


  grunt.registerTask('compress', [
    'clean',
    'ngconstant:production',
    'html2js',
    'injector',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'usemin',
    'htmlmin',
    'money.views'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'compress'
  ]);
};
