<<<<<<< HEAD
// Generated by CoffeeScript 1.3.3
(function() {

  define(["zepto", "application/controllers/loading", "application/views/loadingScreen", "application/controllers/gameSetup", "application/views/gameSetupScreen", "application/controllers/gameCreate", "application/views/gameCreateScreen", "application/controllers/gameJoin", "application/views/gameJoinScreen", "application/controllers/gamePlaying", "application/views/gamePlayingScreen", "application/models/input", "application/models/api", "application/models/settings", "application/models/statemachine"], function($, loadingController, loadingView, gameSetupController, gameSetupView, gameCreateController, gameCreateView, gameJoinController, gameJoinView, gamePlayingController, gamePlayingView, Input, Api, Settings, StateMachine) {
    var Application;
    return Application = (function() {

      function Application() {}

      Application.settings = null;

      Application.prototype.init = function() {
        var _this = this;
        this.api = new Api();
        this.settings = new Settings();
        this.statemachine = new StateMachine();
        this.loadingController = new loadingController(new loadingView("#loading"), this.settings);
        this.loadingController.load();
        this.statemachine.add(this.loadingController);
        this.gameSetupController = new gameSetupController(new gameSetupView("#gameSetup"), this.settings);
        this.statemachine.add(this.gameSetupController);
        this.gameCreateController = new gameCreateController(new gameCreateView("#gameCreate"), this.settings);
        this.statemachine.add(this.gameCreateController);
        this.gameJoinController = new gameJoinController(new gameJoinView("#gameJoin"), this.settings);
        this.statemachine.add(this.gameJoinController);
        this.gamePlayingController = new gamePlayingController(new gamePlayingView("#gamePlaying"), this.settings);
        this.statemachine.add(this.gamePlayingController);
        console.log("Application initialized...");
        $('body').bind('keydown', function(e) {
          return _this.dispatch(Input.keyEventToEvent(e));
        });
        $('body').bind('AppEvent', function(e, action) {
          return _this.dispatch(action);
        });
        return this.loadingController.activate();
      };

      Application.prototype.dispatch = function(e) {
        console.log("dispatch received:");
        console.log(e);
        switch (e) {
=======
// Generated by CoffeeScript 1.4.0

define(["zepto", "application/controllers/loading", "application/views/loadingScreen", "application/controllers/gameSetup", "application/views/gameSetupScreen", "application/controllers/gameCreate", "application/views/gameCreateScreen", "application/controllers/gameJoin", "application/views/gameJoinScreen", "application/models/input", "application/models/api", "application/models/settings", "application/models/statemachine"], function($, loadingController, loadingView, gameSetupController, gameSetupView, gameCreateController, gameCreateView, gameJoinController, gameJoinView, Input, Api, Settings, StateMachine) {
  var Application;
  return Application = (function() {

    function Application() {}

    Application.settings = null;

    Application.prototype.init = function() {
      var _this = this;
      this.api = new Api();
      this.settings = new Settings();
      this.statemachine = new StateMachine();
      this.loadingController = new loadingController(new loadingView("#loading"), this.settings);
      this.loadingController.load();
      this.statemachine.add(this.loadingController);
      this.gameSetupController = new gameSetupController(new gameSetupView("#gameSetup"), this.settings);
      this.statemachine.add(this.gameSetupController);
      this.gameCreateController = new gameCreateController(new gameCreateView("#gameCreate"), this.settings);
      this.statemachine.add(this.gameCreateController);
      this.gameJoinController = new gameJoinController(new gameJoinView("#gameJoin"), this.settings);
      this.statemachine.add(this.gameJoinController);
      console.log("Application initialized...");
      $('body').bind('keydown', function(e) {
        return _this.dispatch(Input.keyEventToEvent(e));
      });
      $('body').bind('AppEvent', function(e, action) {
        return _this.dispatch(action);
      });
      window.onpopstate = function(event) {
        console.log(event);
        console.log("back called");
        return _this.goBack(event);
      };
      return this.loadingController.activate();
    };

    Application.prototype.dispatch = function(e) {
      console.log("dispatch received:");
      console.log(e);
      switch (e) {
        case 'GAMESETUP':
          this.statemachine.trigger("change", this.gameSetupController);
          return history.pushState({
            page: 'GAMESETUP'
          }, "Game Setup", "#gamesetup");
        case 'GAMECREATE':
          this.statemachine.trigger("change", this.gameCreateController);
          return history.pushState({
            page: 'GAMECREATE'
          }, "Game Create", "#gamesetup");
        case 'GAMEJOIN':
          this.statemachine.trigger("change", this.gameJoinController);
          return history.pushState({
            page: 'GAMEJOIN'
          }, "Game Join", "#gamesetup");
      }
    };

    Application.prototype.goBack = function(e) {
      var _ref;
      if ((e != null ? (_ref = e.state) != null ? _ref.page : void 0 : void 0) != null) {
        switch (e.state.page) {
>>>>>>> 04c693ae36d30347d940475bd754332f763115e6
          case 'GAMESETUP':
            return this.statemachine.trigger("change", this.gameSetupController);
          case 'GAMECREATE':
            return this.statemachine.trigger("change", this.gameCreateController);
          case 'GAMEJOIN':
            return this.statemachine.trigger("change", this.gameJoinController);
<<<<<<< HEAD
          case 'GAMEPLAYNG':
            return this.statemachine.trigger("change", this.gamePlayingController);
        }
      };

      return Application;

    })();
  });

}).call(this);
=======
        }
      }
    };

    return Application;

  })();
});
>>>>>>> 04c693ae36d30347d940475bd754332f763115e6
