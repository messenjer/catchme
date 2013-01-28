define ["zepto","underscore","application/views/screen"], ($,_,ScreenView) ->

  class gameSetupScreenView extends ScreenView
    constructor:(@divID)->
      super @divID

    show:()->
      super()

    bindActions:(actions)->
      if actions?.gamecreate?
        $("#{@divID} .createGameButton").on 'click',() ->
           actions.gamecreate()
      if actions?.gamejoin?
        $("#{@divID} .joinGameButton").on 'click',() ->
          actions.gamejoin()
