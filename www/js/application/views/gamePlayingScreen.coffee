define ["zepto","underscore","application/views/screen"], ($,_,ScreenView) ->

  class gamePlayingScreenView extends ScreenView
    constructor:(@divID)->
      super @divID

    show:()->
      super()