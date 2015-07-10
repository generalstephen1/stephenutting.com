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
            project_items: jsonFile
          }
        },
        files: {
          "build/index.html": "src/index.html"
        }
      }
    },

    /*
     * CLEAN
     */
    clean: [ "build" ],

    /*
     * COPY
     */
    copy: {
      default: {
        files: [
          {
            expand: true,
            cwd: "src",
            src: ['assets/css/**', 'assets/js/**','images/fulls/**', 'images/thumbs/**', 'LICENSE.txt', 'README.txt'],
            dest: 'build/'
          },
        ]
      }
    },

    pngmin: {
      compile: {
        options: {},
        files: [
          {
            expand: true,
            cwd: "src",
            src: ['**/*.png'],
            cwd: 'src/img/', // required option
            dest: 'build/img'
          },
        ]
      }
    }

  }


  // define the tasks to run
  var tasks = [ "clean", "copy", "bake:index", "pngmin" ];


  //add bake tasks for each jsonFile item to generate a new page
  for(var project in jsonFile){

    var task = {
      options: {
        content: {
          base_url: base_url,
          project_item: jsonFile[project]
        }
      },
      files: {}
    };

    var projectName = jsonFile[project].projectID;

    task.files["build/projects/" + projectName + ".html"] = "src/templates/projectMain.html";
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
};
