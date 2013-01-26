define ["zepto","application/controllers/controller"], ($,Controller) ->

  class gameSetupController extends Controller
    constructor:(@view,@settings)->
      super @view
      availaibleActions=
        gamecreate: @createGame
        gamejoin: @joinGame
      @view.bindActions availaibleActions

    activate:() ->
      super()

    createGame:() ->
      $('body').trigger('AppEvent',['GAMECREATE'])

    joinGame:() ->
      $('body').trigger('AppEvent',['GAMEJOIN'])
