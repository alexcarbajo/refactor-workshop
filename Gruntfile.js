'use strict';

module.exports = function (grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['*.scss'],
          dest: './public/css',
          ext: '.css'
        }]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 5 versions', 'ie 8', 'ie 9']
      },
      dist: {
        expand: true,
        flatten: true,
        cwd: "./public/css",
        src: ["*.css"],
        dest: "./public/css/"
      }
    },
    cssnano: {
      options: {
        sourcemap: false
      },
      dist: {
        files: {
          './public/css/styles.css': './public/css/styles.css'
        }
      }
    },
    watch: {
      styles: {
        files: ['sass/**/*.scss', 'views/**/*.hbs', 'views/pages/**', 'views/data/*.json'],
        tasks: ['sass', 'autoprefixer', 'cssnano', 'reload'],
        options: {
          nospawn: true
        }
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          env: {
            PORT: '3000',
            NODE_ENV: 'dev'
          },
          ignore: ['node_modules/**']
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'watch:styles'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    reload: {
      port: 3000
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-cssnano');

  grunt.registerTask('default', ['sass', 'autoprefixer', 'cssnano', 'concurrent:dev']);
};
