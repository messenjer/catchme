define ["zepto","application/controllers/controller"], ($,Controller) ->

  class gameCreateController extends Controller

    constructor:(@view,@settings)->
      super @view
      availaibleActions=
        gamestart: @startGame
      @view.bindActions availaibleActions

    activate:() ->
      super()

    unload:() ->

    startGame:() =>
      $('body').trigger('AppEvent',['GAMEWAITING'])