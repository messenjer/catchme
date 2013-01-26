define ["zepto","application/views/screen"], ($,ScreenView) ->

  class loadingScreenView extends ScreenView
    @NumberOfDots = 5


    constructor:(@divID)->
      super @divID
      @dots = ''

    show: () ->
      super()
      @interval = setInterval(@dotsLoading,500)

    hide: () ->
      super()
      clearInterval(@interval)

    dotsLoading: () =>
      if (@dots.length < loadingScreenView.NumberOfDots)
        @dots += '.'
      else
        @dots = '.'
      $("#{@divID} .loading .dots").html("#{@dots}")

    gpsOK: () ->
      $("#{@divID} .gpsAvailable").show()

    connectionOK: () ->
      $("#{@divID} .connectionEstablished").show()