define ["zepto","underscore","application/views/screen"], ($,_,ScreenView) ->

  class gameJoinScreenView extends ScreenView
    constructor:(@divID)->
      super @divID

    show:()->
      super()