define ["zepto"],($) ->

  class Map

    constructor:(position) ->
      
      position = [48.8151459,2.3631692]

      @map = L.map('map')
      @map.setView(position, 20)

      L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(@map)


      L.marker(position).addTo(@map)
        .bindPopup("Catch me").openPopup();

