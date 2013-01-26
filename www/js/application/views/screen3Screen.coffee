define ["zepto","underscore","application/views/screen"], ($,_,ScreenView) ->

  class screen3ScreenView extends ScreenView
    constructor:(@divID)->
      super @divID

    show:()->
      super()
