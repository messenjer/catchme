define ["zepto","application/controllers/controller"], ($,Controller) ->

  class screen1Controller extends Controller
    constructor:(@view,@settings)->
      super @view

    activate:() ->
      super()
