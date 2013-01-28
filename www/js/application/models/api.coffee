define ["socket.io"],(io) ->

  class CatchMeServerApi
    constructor:() ->
      @url = "http://tranquil-earth-2452.herokuapp.com/"
      @gameData = {}
      @socket = null
      @connectCallback = null;
      @id = null
      @callbackGameOn = null

    setConnectionCallback:(@connectCallback) ->

    setGeoloc:(@geoloc) ->

    setCallbackGameOn:(@callbackGameOn) ->
      console.log "game on callback"

    init:() ->
      @socket = io.connect(@url)
      @socket.on 'id', @onId
      @socket.on 'error', @onError
      @socket.on 'connect', @onConnect
      @socket.on 'debug', @onDebug
      @socket.on 'gameon', @onGameon
      @socket.on 'news',(data)->
        console.log data
        @socket.emit('my other event', { my: 'data' })

    sendPosition:(position)->
      @socket.emit('position',position)

    whoAmi:() ->
      @socket.emit('whoami')

    onId:(@id) =>

    onError:(error) =>
      console.log error
      alert("Connection error")

    onConnect:(message) =>
      console.log "Connected"
      console.log message
      @connectCallback?()

    onDebug:(message) =>
      console.log "debug message received:"
      console.log message

    onGameon:(@gameData) =>
      console.log "gameon received"
      console.log @gameData
      @callbackGameOn?()

    getOthersPosition:() ->
      for key,value of @gameData
        if key is @id
          console.log "same id"
        else
          return value.position
