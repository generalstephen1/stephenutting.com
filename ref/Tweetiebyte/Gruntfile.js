module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //// AMEND HTML FILES TO LOOK TO COMPRESSED ASSETS ////
    targethtml: {
      dist: {
        files: {
          'build/index.html': 'index.html', 
          'build/results.html': 'results.html'
        }
      }
    },

    //// CSS CONCAT + MINIFICATION ////
    cssmin: {
      combine: {
  			files: {
  				'build/App.min.css': ['css/main.css', 'css/grid.css', 'css/modules.css', 'css/global.css', 'css/onResize.css',
  				 	'css/module_followers.css', 'css/module_geo.css', 'css/module_hashtags.css', 'css/module_inTheBeginning.css',
  				 	'css/module_popularTweets.css', 'css/module_timeOfDay.css', 'css/module_timesRetweeted.css', 'css/module_totalTweets.css',
  				 	'css/module_tweetDay.css', 'css/module_tweetTime.css', 'css/module_typeOfData.css', 'css/module_userMentions.css']
  			}
  		}
    },

    //// JAVASCRIPT CONCAT ////
    concat: {
      options: {
        //separator: ';'
      },
      dist: {
        src: ['js/lib/*.js', 'js/mod/handlebars.js', 'js/mod/utils.js', 'js/mod/dateLogic.js', 'js/mod/tweetProcessor.js', 'js/mod/ajax.js', 
        		'js/mod/tweetieGraphs.js', 'js/mod/app.js', 'js/mod/tracking.js', 'js/mod/tweetieMap.js', 'js/mod/tracking.js'],
        dest: 'build/App.js'
      }
    },

    //// JAVASCRIPT UGLIFY ////
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'build/App.min.js': ['build/App.js']
        }
      }
    },
  });

  //grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-targethtml');

  grunt.registerTask('default', ['cssmin', 'concat', 'uglify', 'targethtml']);

};
