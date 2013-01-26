define ["zepto","application/controllers/controller","application/models/api"], ($,Controller,RtbfApi) ->

  class loadingController extends Controller

    constructor:(@view,@settings)->
      super @view
      @connectionOK = false
      @gpsOK = false

    load:() ->
      

    unload:() ->

    activate:() ->
      super()
      setTimeout(@event,5000)

    event:() ->
      $('body').trigger('AppEvent',['GAMESETUP'])

    connectionOK:(@connectionOK=true) =>
      console.log "connection established"
      if(@gpsOk)
        @fireLoadedEvent()

    gpsOK:(@gpsOK=true) =>
      console.log "gps OK"
      if(@connectionOK)
        @fireLoadedEvent()

    fireLoadedEvent:() ->
      $('body').trigger('AppEvent',['GAMESETUP'])