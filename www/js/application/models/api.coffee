define ["socket.io"],(io) ->

  class CatchMeServerApi
    constructor:() ->
      @url = "http://localhost:8080/"
      @gameData = {}
      @socket = null;
      @connectCallback = null;

    setConnectionCallback:(@connectCallback) ->

    init:() ->
      @socket = io.connect(@url)
      @socket.on 'error', @onError
      @socket.on 'connect', @onConnect
      @socket.on 'debug', @onDebug
      @socket.on 'news',(data)->
        console.log data
        @socket.emit('my other event', { my: 'data' })

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