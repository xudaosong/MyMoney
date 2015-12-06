module.exports = function (grunt) {
    // 自动加载Grunt插件
    require('load-grunt-tasks')(grunt);
    // 计算grunt任务的运行时间
    require('time-grunt')(grunt);
    grunt.initConfig({
        env: {
            test: {
                NODE_ENV: 'test',
                TMPDIR : 'E:/github/myMoney/temp'
            },
            dev: {
                NODE_ENV: 'development',
                TMPDIR : 'E:/github/myMoney/temp'
            },
            production: {
                NODE_ENV: 'production',
                TMPDIR : 'E:/github/myMoney/temp'
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    ext: 'js,html',
                    watch: ['server.js', '**/*.js', '!node_modules/**']
                }
            },
            debug: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: ['server.js', '**/*.js', '!node_modules/**']
                }
            },
			production:{
                script: 'server.js'
			}
        },
        'node-inspector': {
            debug: {}
        },
        concurrent: {
            dev:{
                tasks: ['nodemon:dev'],
                options: {
                    logConcurrentOutput: true
                }
            },
            debug: {
                tasks: ['nodemon:debug', 'node-inspector'],
                options: {
                    logConcurrentOutput: true
                }
            },
            production: {
                tasks: ['nodemon:production'],
                options: {
                }
            }
        }
    });
    grunt.registerTask('default', ['env:dev', 'concurrent:dev']);
    grunt.registerTask('debug', ['env:dev', 'concurrent:debug']);
    grunt.registerTask('production', ['env:production', 'concurrent:production']);
};