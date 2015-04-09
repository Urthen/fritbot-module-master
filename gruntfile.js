function genConfigJson() {
    var prompt = require('sync-prompt').prompt;
    var fs = require('fs');

    console.log("It doesn't look like you have a .config.json file. Describe your information so this script can template it into modules.\n");
    var name = prompt('What is the name you wish to use as the Author? ');
    var username = prompt('What is your github username? ');
    var config = {
        name : name,
        username : username
    };

    fs.writeFileSync('.config.json', JSON.stringify(config, null, 4));
    console.log('\nOk! Wrote that out to .config.json, edit it there if you wish.\n');
    return config;
}

module.exports = function (grunt) {
    var config;
    try {
        config = require('./.config');
    } catch (e) {
        config = genConfigJson();
    }

    config.name = grunt.option('name') || 'wrong';
    config.year = (new Date()).getFullYear();

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-template');

    grunt.initConfig({
        config : config,
        jshint : {
            options : {
                jshintrc : 'files/.jshintrc'
            },
            src : [ 'gruntfile.js', 'files/**/*.js' ]
        },
        jscs : {
            options : {
                config : 'files/.jscsrc'
            },
            src : [ 'gruntfile.js', 'files/**/*.js' ]
        },
        clean : ['build'],
        copy : {
            create : {
                cwd : 'files/',
                src : ['**', '!.git/**'],
                dot : true,
                expand : true,
                dest : 'build/'
            },
            install : {
                cwd : 'build/',
                src : '**',
                dot : true,
                expand : true,
                dest : '../<%= config.name %>/'
            }
        },
        template : {
            create : {
                options : {
                    data : config
                },
                files : {
                    'build/LICENSE' : ['templates/LICENSE.tpl'],
                    'build/README.md' : ['templates/README.md.tpl'],
                    'build/package.json' : ['templates/package.json.tpl']
                }
            }

        }
    });

    grunt.registerTask('style', ['jshint', 'jscs']);

    grunt.registerTask('create', ['clean', 'copy:create', 'template:create', 'copy:install', 'clean']);
};
