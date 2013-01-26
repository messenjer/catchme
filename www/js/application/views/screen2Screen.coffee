define ["zepto","underscore","application/views/screen"], ($,_,ScreenView) ->

  class screen2ScreenView extends ScreenView
    constructor:(@divID)->
      super @divID

    show:()->
      super()
