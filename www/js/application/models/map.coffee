define ["zepto"],($) ->

  class Map

    constructor:() ->
      @map = L.map('map').setView([48.815695,2.362833], 13)
      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(@map)
