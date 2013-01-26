define [],() ->

  class Input

    @dictionnary = 
      37: 'KEY_LEFT'
      38: 'KEY_UP'
      39: 'KEY_RIGHT'
      40: 'KEY_DOWN'

    @keyEventToEvent:(e) ->
      key = if e.keyCode then e.keyCode else if e.charCode then e.charCode else e.which
      @dictionnary[key] if @dictionnary[key]?

