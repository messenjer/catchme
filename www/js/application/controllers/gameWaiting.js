// Generated by CoffeeScript 1.4.0
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["zepto", "application/controllers/controller"], function($, Controller) {
  var gameWaitingController;
  return gameWaitingController = (function(_super) {

    __extends(gameWaitingController, _super);

    function gameWaitingController(view, settings) {
      var availaibleActions;
      this.view = view;
      this.settings = settings;
      this.startGame = __bind(this.startGame, this);

      gameWaitingController.__super__.constructor.call(this, this.view);
      availaibleActions = {
        gamestart: this.startGame
      };
      this.view.bindActions(availaibleActions);
    }

    gameWaitingController.prototype.activate = function() {
      return gameWaitingController.__super__.activate.call(this);
    };

    gameWaitingController.prototype.unload = function() {};

    gameWaitingController.prototype.startGame = function() {
      return $('body').trigger('AppEvent', ['GAMEPLAYING']);
    };

    return gameWaitingController;

  })(Controller);
});