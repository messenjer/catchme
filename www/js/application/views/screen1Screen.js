// Generated by CoffeeScript 1.4.0
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["zepto", "underscore", "application/views/screen"], function($, _, ScreenView) {
  var screen1ScreenView;
  return screen1ScreenView = (function(_super) {

    __extends(screen1ScreenView, _super);

    function screen1ScreenView(divID) {
      this.divID = divID;
      screen1ScreenView.__super__.constructor.call(this, this.divID);
    }

    screen1ScreenView.prototype.show = function() {
      return screen1ScreenView.__super__.show.call(this);
    };

    return screen1ScreenView;

  })(ScreenView);
});
