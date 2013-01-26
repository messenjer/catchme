require(["application/models/application","zepto"],function(Application, $) {

  console.log("Bootstrap");
  $(function(){
      application = new Application();
      application.init();
  });
});