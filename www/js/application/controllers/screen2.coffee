define ["zepto","application/controllers/controller"], ($,Controller) ->

  class screen2Controller extends Controller

    constructor:(@view,@settings)->
      super @view
      @unit = 'metric'
      @energy = 'K'

    activate:() ->
      super()

    unload:() ->

