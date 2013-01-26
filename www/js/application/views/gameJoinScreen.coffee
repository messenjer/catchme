define ["zepto","underscore","application/views/screen"], ($,_,ScreenView) ->

  class gameJoinScreenView extends ScreenView
    constructor:(@divID)->
      super @divID

    show:()->
      super()

    bindActions:(actions)->
      if actions?.gamestart?
        $("#{@divID} .startGameButton").on 'click',() ->
           actions.gamestart()
