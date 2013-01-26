define ["socket.io"],(io) ->

  class CatchMeServerApi
    constructor:() ->
      @url = "http://localhost:8080/"
      @gameData = {}
      @socket = null;

    init:() ->
      @socket = io.connect(@url)
      @socket.on 'news',(data)->
        console.log data
        @socket.emit('my other event', { my: 'data' })