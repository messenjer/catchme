define ["zepto","underscore","application/views/screen"], ($,_,ScreenView) ->

  class gameFinishScreenView extends ScreenView
    constructor:(@divID)->
      super @divID

    show:()->
      super()
