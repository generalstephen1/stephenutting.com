module.exports = function(grunt){

  // get the jsonFile data from external json file
  var jsonFile = grunt.file.readJSON("src/projects.json");
  var base_url = "~/projects/_personal/stephenutting.com/docs";

  // set up preset grunt config - bake on index.html, docs folder clean and assets copying
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
      construct: [ "construct/projects" ],
      release: [ "docs" ]
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
            dest: 'docs/'
          },{
            expand: true,
            flatten: false,
            cwd: "construct/js/lib",
            src: ['TweenLite.min.js', 'plugins/CSSPlugin.min.js','TimelineLite.js'],
            dest: 'docs/greensock/'
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
      },
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
          "docs/index.html":"construct/index.html"
        }
      }
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
      },
      target: {
        files: {
          'docs/All.min.css': [
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
          'docs/All.min.js': [
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
          'docs/Main.min.js': [
            "construct/js/js_projFilter.js",
            "construct/js/js_siteMain.js"
          ],
          'docs/Proj.min.js': [
            "construct/js/js_projectMain.js"
          ]
        }
      }
    },

    replace: {
      build: {
        src: ['docs/All.min.css'],             // source files array (supports minimatch)
        dest: 'docs/All.min.css',             // destination directory or file
        replacements: [{
          from: '../',                   // string replacement
          to: './'
        }]
      }
    },

  less: {
      normal: {
        options: {
          paths: ['construct/css'],
        modifyVars: {
          imgPath: '"http://mycdn.com/path/to/images"',
          bgColor: 'red'
        }
      },
      files: {
        'construct/css/*.css': 'construct/less/*.less'
      }
    }
  }


  }


  // define the tasks to run
  var tasks = ["copy:construct", "bake:index", "pngmin" ];
  var targetList = {
    'docs/index.html': 'construct/index.html',
  }



  // add bake tasks for each jsonFile item to generate a new page
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

    grunt_config.targethtml.dist.files["docs/projects/" + projectName + "/" + projectName + ".html"] = "construct/projects/" + projectName + "/" + projectName + ".html"
  }
  grunt.initConfig(grunt_config);

 var npmTasks = [
   'grunt-bake',
   'grunt-contrib-clean',
   'grunt-contrib-copy',
   'grunt-pngmin',
   'grunt-targethtml',
   'grunt-contrib-cssmin',
   'grunt-contrib-uglify',
   'grunt-text-replace',
   ]

for (var i = 0; i < npmTasks.length; i++){
  grunt.loadNpmTasks(npmTasks[i]);
}



  //this will contain concat and uglify etc
  var justProd = ["clean:release", "copy:release", "targethtml", "cssmin", "uglify", "replace"];
  var prodTasks = tasks.concat(justProd)

  grunt.registerTask( "default", tasks);
  grunt.registerTask( "prod", prodTasks);
  grunt.registerTask( "justProd", justProd);
};
