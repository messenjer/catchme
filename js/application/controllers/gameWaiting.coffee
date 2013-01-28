define ["zepto","application/controllers/controller"], ($,Controller) ->

  class gameWaitingController extends Controller

    constructor:(@view,@settings)->
      super @view
      availaibleActions=
        gamestart: @startGame
      @view.bindActions availaibleActions
      
    activate:() ->
      super()
      if @geoloc?.getPosition?
        @api?.setCallbackGameOn(@startGame)
        @api?.whoAmi()
        @api?.sendPosition(@geoloc.getPosition())

    setGeoloc:(@geoloc) ->

    setApi:(@api) ->

    unload:() ->

    startGame:() =>
      $('body').trigger('AppEvent',['GAMEPLAYING'])