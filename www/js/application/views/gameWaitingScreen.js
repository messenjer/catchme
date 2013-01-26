// Generated by CoffeeScript 1.4.0
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["zepto", "underscore", "application/views/screen"], function($, _, ScreenView) {
  var gameWaitingScreenView;
  return gameWaitingScreenView = (function(_super) {

    __extends(gameWaitingScreenView, _super);

    function gameWaitingScreenView(divID) {
      this.divID = divID;
      gameWaitingScreenView.__super__.constructor.call(this, this.divID);
    }

    gameWaitingScreenView.prototype.show = function() {
      return gameWaitingScreenView.__super__.show.call(this);
    };

    gameWaitingScreenView.prototype.bindActions = function(actions) {
      if ((actions != null ? actions.gamestart : void 0) != null) {
        return $("" + this.divID + " .go").on('click', function() {
          return actions.gamestart();
        });
      }
    };

    return gameWaitingScreenView;

  })(ScreenView);
});