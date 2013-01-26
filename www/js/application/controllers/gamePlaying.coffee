define ["zepto","application/controllers/controller","application/models/map"], ($,Controller,Map) ->

  class gamePlayingController extends Controller
    constructor:(@view,@settings)->
      super @view

    load:() ->

    activate:() ->
      super()
      @map = new Map()
      console.log "init map"