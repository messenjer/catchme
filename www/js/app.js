require(["application/models/application","zepto","install"],function(Application, $, Install) {

  console.log("Bootstrap");
  $(function(){
      application = new Application();
      application.init();
  });
});