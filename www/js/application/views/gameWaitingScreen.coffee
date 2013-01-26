define ["zepto","underscore","application/views/screen"], ($,_,ScreenView) ->

  class gameWaitingScreenView extends ScreenView
    constructor:(@divID)->
      super @divID

    show:()->
      super()

    bindActions:(actions)->
      if actions?.gamestart?
        $("#{@divID} .go").on 'click',() ->
           actions.gamestart()
