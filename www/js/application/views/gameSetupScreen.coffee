define ["zepto","underscore","application/views/screen"], ($,_,ScreenView) ->

  class gameSetupScreenView extends ScreenView
    constructor:(@divID)->
      super @divID

    show:()->
      super()

    bindActions:(actions)->
      if(actions)
        if(actions.gamecreate)
          console.log "gamecreate bound"
          $("#{@divID} .createGameButton").on('click',() => actions.gamecreate)
        if(actions.gamejoin)
          console.log "gamejoin bound"
          $("#{@divID} .joinGameButton").on('click',() => actions.gamejoin)