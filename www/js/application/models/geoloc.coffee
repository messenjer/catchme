define ["zepto"],($) ->

  class Geolocation

    constructor:() ->
        @position = null
        @setinterval = false

    getPosition:() ->
        @position

    getCurrentPosition:() =>
        if navigator.geolocation
            navigator.geolocation.getCurrentPosition @onPosition, @onError
        else
            alert("No Geolocation")

    onPosition:(pos) =>
        @updatePosition(pos)

    onError:(error) =>
        console.log error
        switch error.code
            when error.PERMISSION_DENIED
                alert("You have canceled location request")
            when error.POSITION_UNAVAILABLE
                alert("Location information is unavailable")
            when error.TIMEOUT
                alert("Location request timed out")
            when error.UNKNOWN_ERROR
                alert("Unknown error happened, oops")

    updatePosition:(pos) ->
        @position = [ pos.coords.latitude, pos.coords.longitude ]
        console.log @position
        if @setinterval 
            @infiniteLoop = setInterval(@getCurrentPosition,60000)

    updatePositionStart:() ->
        @setinterval = true
        @getCurrentPosition()

    updatePositionStop:() ->
        @setinterval = false
        clearInterval @infiniteLoop
