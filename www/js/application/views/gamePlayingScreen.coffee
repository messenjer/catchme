define ["zepto","underscore","leaflet/leaflet","application/views/screen"], ($,_,L,ScreenView) ->

  class gamePlayingScreenView extends ScreenView
    constructor:(@divID)->
      super @divID

    show:()->
      super()