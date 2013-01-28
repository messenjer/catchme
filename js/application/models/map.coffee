define ["zepto"],($) ->

  class Map

    constructor: () ->

    setCentralPosition: (@mapCentralPosition) ->

    init:() ->  
      @myPosition = null
      @othersPosition = null
      @map = L.map('map')
      @map.setView(@mapCentralPosition, 20)

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(@map)
      
    setMyPosition:(@myPosition) ->
      L.marker(@myPosition).addTo(@map)
        .bindPopup("Catch me").openPopup();

    setOthersPosition:(@othersPosition) ->
      L.marker(@othersPosition).addTo(@map)
        .bindPopup("I'll catch you").openPopup();
