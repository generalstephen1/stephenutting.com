

var topSecret = require("./topSecret");
var fs = require('fs');

module.exports = function(grunt){

  // get the jsonFile data from external json file
  var jsonFile = grunt.file.readJSON("src/projects.json");
  var base_url = "/Users/SuperMac3/Desktop/_localjsonFile/stephenutting.com/build";

  // set up preset grunt config - bake on index.html, build folder clean and assets copying
  var grunt_config = {

    /*
     * BAKE
     */
    bake: {
      index: {
        options: {
          content: {
            base_url: base_url,
            project_items: jsonFile.projects,
            config_vars: jsonFile.config
          }
        },
        files: {
          "construct/index.html": "src/index.html"
        }
      }
    },

    /*
     * CLEAN
     */
    clean: {
      // construct: [ "construct/projects" ],
      release: [ "build" ]
    },

    /*
     * COPY
     */
    copy: {
      release: {
        files: [
          {
            expand: true,
            flatten: false,
            cwd: "construct",
            src: ['projects/**/**.*', '**.ico','docs/**.*', 'img/**/**.*', 'img/**.*'],
            dest: 'build/'
          },{
            expand: true,
            flatten: false,
            cwd: "construct/js/lib",
            src: ['TweenLite.min.js', 'plugins/CSSPlugin.min.js','TimelineLite.js'],
            dest: 'build/greensock/'
          },
        ]
      },
      construct: {
        files: [
          {
            expand: true,
            cwd: "src",
            src: ['css/**', 'js/**','img/**/*.jpg'],
            dest: 'construct/'
          },
        ]
      }
    },

    pngmin: {
      compile: {
        options: {
          ext: ".png"
        },
        files: [
          {
            expand: true,
            cwd: "src",
            src: ['**/*.png'],
            cwd: 'construct/img/', // required option
            dest: 'construct/img'
          },
        ]
      }
    },

    targethtml: {
      dist: {
        files: {
          "build/index.html":"construct/index.html"
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
      },
      target: {
        files: {
          'build/All.min.css': [
            "construct/css/lib/skeleton.css",
      		  "construct/css/css_globals.css",
      		  "construct/css/css_projects.css",
      		  "construct/css/css_siteMain.css",
      		  "construct/css/css_mediaQueries.css"
          ]
        }
      }
    },

    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      my_target: {
        files: {
          'build/All.min.js': [
            "construct/js/lib/masonry.min.js",

            // "construct/js/lib/superTween.min.js",

            // "construct/js/lib/TweenLite.min.js",
            // "construct/js/lib/plugins/CSSPlugin.min.js",
            // "construct/js/lib/TimelineLite.js",

      			"construct/js/js_utils.js",
      			"construct/js/js_animation.js",
      			"construct/js/js_globalListeners.js",
      			"construct/js/js_headerControl.js",
      			"construct/js/js_scrollControl.js",
          ],
          'build/Main.min.js': [
            "construct/js/js_projFilter.js",
            "construct/js/js_siteMain.js"
          ],
          'build/Proj.min.js': [
            "construct/js/js_projectMain.js"
          ]
        }
      }
    },

    replace: {
      build: {
        src: ['build/All.min.css'],             // source files array (supports minimatch)
        dest: 'build/All.min.css',             // destination directory or file
        replacements: [{
          from: '../',                   // string replacement
          to: './'
        }]
      }
    },

    environments: {
      options: {
        local_path: 'build',
        current_symlink: 'html',
        deploy_path: '/var/www/stephenutting.com'
      },
      work: {
        options: {
            host: topSecret.host,
            username: topSecret.username,
            privateKey: fs.readFileSync(topSecret.workSSHLocation),
            password: topSecret.passwd,
            port: topSecret.port,
            releases_to_keep: '5',
            // release_subdir: 'myapp'
          }
      },
      home: {
        options: {
            host: topSecret.host,
            username: topSecret.username,
            privateKey: fs.readFileSync(topSecret.homeSSHLocation),
            password: topSecret.passwd,
            port: topSecret.port,
            releases_to_keep: '5',
            // release_subdir: 'myapp'
          }
      }
    },

  }


  // define the tasks to run
  var tasks = ["copy:construct", "bake:index", "pngmin" ];
  var targetList = {
    'build/index.html': 'construct/index.html',
  }



  //add bake tasks for each jsonFile item to generate a new page
  for(var i = 0; i < jsonFile.projects.length; i++){
    var task = {
      options: {
        content: {
          base_url: base_url,
          project_item: jsonFile.projects[i]
        }
      },
      files: {}
    };

    var projectName = jsonFile.projects[i].projectID;
    task.files["construct/projects/" + projectName + "/" + projectName + ".html"] = "src/templates/defaultProj.html";
    grunt_config.bake[projectName] = task;
    tasks.push("bake:"+projectName);

    grunt_config.targethtml.dist.files["build/projects/" + projectName + "/" + projectName + ".html"] = "construct/projects/" + projectName + "/" + projectName + ".html"
  }


  grunt.initConfig(grunt_config);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-pngmin');
  grunt.loadNpmTasks('grunt-bake');
  grunt.loadNpmTasks('grunt-targethtml');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-ssh-deploy');

  grunt.registerTask( "default", tasks);

  //this will contain concat and uglify etc
  var justProd = ["clean:release", "copy:release", "targethtml", "cssmin", "uglify", "replace"];
  var prodTasks = tasks.concat(justProd)

  grunt.registerTask( "prod", prodTasks);
  // grunt.registerTask( "deploy", ["environments:production"]);

  grunt.registerTask( "justProd", justProd);
};
