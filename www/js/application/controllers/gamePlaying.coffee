define ["zepto","application/controllers/controller","application/models/map"], ($,Controller,Map) ->

  class gamePlayingController extends Controller
    constructor:(@view,@settings)->
      super @view
      @geoloc = null

    load:() ->

    setGeoloc:(@geoloc) ->
    setMap:(@map) ->
    setApi:(@api) ->

    activate:() ->
      super()
      @map.init()
      @map.setMyPosition(@geoloc.getPosition())
      @map.setOthersPosition(@api.getOthersPosition())
      console.log "init map"