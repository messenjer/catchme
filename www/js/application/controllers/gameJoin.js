// Generated by CoffeeScript 1.4.0
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["zepto", "application/controllers/controller"], function($, Controller) {
  var gameJoinController;
  return gameJoinController = (function(_super) {

    __extends(gameJoinController, _super);

    function gameJoinController(view, settings) {
      var availaibleActions;
      this.view = view;
      this.settings = settings;
      this.startGame = __bind(this.startGame, this);

      gameJoinController.__super__.constructor.call(this, this.view);
      availaibleActions = {
        gamestart: this.startGame
      };
      this.view.bindActions(availaibleActions);
    }

    gameJoinController.prototype.activate = function() {
      return gameJoinController.__super__.activate.call(this);
    };

    gameJoinController.prototype.unload = function() {};

    gameJoinController.prototype.startGame = function() {
      return $('body').trigger('AppEvent', ['GAMEWAITING']);
    };

    return gameJoinController;

  })(Controller);
});
