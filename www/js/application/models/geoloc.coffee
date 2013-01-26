define ["zepto"],($) ->

  class Geolocation

    constructor:() ->
        @position = null

    getCurrentPosition:() ->
        if navigator.geolocation
            navigator.geolocation.getCurrentPosition @onPosition, @onError
        else
            alert("No Geolocation")

    onPosition:(pos) =>
        @updatePosition(pos)
        #watch = setInterval( @updatePosition(pos) , 60000)

    onError:(error) =>
        errMsgDOM = $(".error")
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
        @position =
            lat : pos.coords.latitude
            lon : pos.coords.longitude
        console.log @position