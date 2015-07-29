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
      construct: [ "construct/projects" ],
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
            cwd: "construct",
            src: ['css/**', 'js/**','img/**'],
            dest: 'build/'
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
            cwd: 'src/img/', // required option
            dest: 'construct/img'
          },
        ]
      }
    }

  }


  // define the tasks to run
  var tasks = [ "clean:construct", "copy:construct", "bake:index", "pngmin" ];


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
    task.files["construct/projects/" + projectName + ".html"] = "src/templates/defaultProj.html";
    grunt_config.bake[projectName] = task;
    tasks.push("bake:"+projectName);
  }

  getTemplate = function(){
    return "src/templates/projectMain.html"
  }


  grunt.initConfig(grunt_config);

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-pngmin');
  grunt.loadNpmTasks('grunt-bake');

  grunt.registerTask( "default", tasks);

  //this will contain concat and uglify etc
  grunt.registerTask( "prod", ["clean:release", "copy:release"]);
};
