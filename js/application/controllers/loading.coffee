define ["zepto","application/controllers/controller","application/models/api"], ($,Controller,RtbfApi) ->

  class loadingController extends Controller

    constructor:(@view,@settings)->
      super @view
      @connectionEstablished = false
      @gpsAvailable = false

    load:() ->
      

    unload:() ->

    activate:() ->
      super()
      setTimeout(@fireLoadedEvent,5000)

    connectionOK:(@connectionEstablished=true) =>
      @view.connectionOK()
      console.log "connection established"
      if(@gpsAvailable)
        @fireLoadedEvent()

    gpsOK:(@gpsAvailable=true) =>
      @view.gpsOK()
      console.log "gps OK"
      if(@connectionEstablished)
        @fireLoadedEvent()

    fireLoadedEvent:() ->
      $('body').trigger('AppEvent',['GAMESETUP'])