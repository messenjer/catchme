// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["zepto", "underscore", "application/views/screen"], function($, _, ScreenView) {
    var gamePlayingScreenView;
    return gamePlayingScreenView = (function(_super) {

      __extends(gamePlayingScreenView, _super);

      function gamePlayingScreenView(divID) {
        this.divID = divID;
        gamePlayingScreenView.__super__.constructor.call(this, this.divID);
      }

      gamePlayingScreenView.prototype.show = function() {
        return gamePlayingScreenView.__super__.show.call(this);
      };

      return gamePlayingScreenView;

    })(ScreenView);
  });

}).call(this);
