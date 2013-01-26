define ["zepto","underscore","application/views/screen"], ($,_,ScreenView) ->

  class gameCreateScreenView extends ScreenView
    constructor:(@divID)->
      super @divID

    show:()->
      super()
