// Generated by CoffeeScript 1.4.0

define(["zepto", "application/controllers/loading", "application/views/loadingScreen", "application/controllers/gameSetup", "application/views/gameSetupScreen", "application/controllers/gameCreate", "application/views/gameCreateScreen", "application/controllers/gameJoin", "application/views/gameJoinScreen", "application/controllers/gameWaiting", "application/views/gameWaitingScreen", "application/controllers/gamePlaying", "application/views/gamePlayingScreen", "application/controllers/gameFinish", "application/views/gameFinishScreen", "application/models/input", "application/models/api", "application/models/settings", "application/models/geoloc", "application/models/map", "application/models/statemachine"], function($, loadingController, loadingView, gameSetupController, gameSetupView, gameCreateController, gameCreateView, gameJoinController, gameJoinView, gameWaitingController, gameWaitingView, gamePlayingController, gamePlayingView, gameFinishController, gameFinishView, Input, Api, Settings, Geolocation, Map, StateMachine) {
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
      this.gameWaitingController = new gameWaitingController(new gameWaitingView("#gameWaiting"), this.settings);
      this.statemachine.add(this.gameWaitingController);
      this.gamePlayingController = new gamePlayingController(new gamePlayingView("#gamePlaying"), this.settings);
      this.gamePlayingController.load();
      this.statemachine.add(this.gamePlayingController);
      this.gameFinishController = new gameFinishController(new gameFinishView("#gameFinish"), this.settings);
      this.statemachine.add(this.gameFinishController);
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
      this.loadingController.activate();
      this.geoloc = new Geolocation();
      this.geoloc.updatePositionStart();
      this.geoloc.setAvailableCallback(this.loadingController.gpsOK);
      this.map = new Map();
      this.gamePlayingController.setMap(this.map);
      this.gamePlayingController.setGeoloc(this.geoloc);
      this.gamePlayingController.setApi(this.api);
      this.gameWaitingController.setApi(this.api);
      this.gameWaitingController.setGeoloc(this.geoloc);
      this.api.setConnectionCallback(this.loadingController.connectionOk);
      this.api.setGeoloc(this.geoloc);
      return this.api.init();
    };

    Application.prototype.dispatch = function(e) {
      console.log("dispatch received:");
      console.log(e);
      switch (e) {
        case 'GAMESETUP':
          this.statemachine.trigger("change", this.gameSetupController);
          history.pushState({
            page: 'GAMESETUP'
          }, "Game Setup", "#gamesetup");
          this.geoloc.setAvailableCallback(null);
          this.map.setCentralPosition(this.geoloc.getPosition());
          return this.geoloc.getPosition();
        case 'GAMECREATE':
          this.statemachine.trigger("change", this.gameCreateController);
          return history.pushState({
            page: 'GAMECREATE'
          }, "Game Create", "#gamecreate");
        case 'GAMEJOIN':
          this.statemachine.trigger("change", this.gameJoinController);
          return history.pushState({
            page: 'GAMEJOIN'
          }, "Game Join", "#gamejoin");
        case 'GAMEWAITING':
          this.statemachine.trigger("change", this.gameWaitingController);
          return history.pushState({
            page: 'GAMEWAITING'
          }, "Game Playing", "#gameplaying");
        case 'GAMEPLAYING':
          this.statemachine.trigger("change", this.gamePlayingController);
          return history.pushState({
            page: 'GAMEPLAYING'
          }, "Game Playing", "#gameplaying");
        case 'GAMEFINISH':
          this.statemachine.trigger("change", this.gameFinishController);
          return history.pushState({
            page: 'GAMEFINISH'
          }, "Game Playing", "#gameplaying");
      }
    };

    Application.prototype.goBack = function(e) {
      var _ref;
      if ((e != null ? (_ref = e.state) != null ? _ref.page : void 0 : void 0) != null) {
        switch (e.state.page) {
          case 'GAMESETUP':
            return this.statemachine.trigger("change", this.gameSetupController);
          case 'GAMECREATE':
            return this.statemachine.trigger("change", this.gameCreateController);
          case 'GAMEJOIN':
            return this.statemachine.trigger("change", this.gameJoinController);
          case 'GAMEWAITING':
            return this.statemachine.trigger("change", this.gameWaitingController);
          case 'GAMEPLAYING':
            return this.statemachine.trigger("change", this.gamePlayingController);
          case 'GAMEFINISH':
            return this.statemachine.trigger("change", this.gameFinishController);
        }
      }
    };

    return Application;

  })();
});
