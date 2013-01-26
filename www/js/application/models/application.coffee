define [
  "zepto",
  "application/controllers/loading",
  "application/views/loadingScreen",
  "application/controllers/gameSetup",
  "application/views/gameSetupScreen",
  "application/controllers/gameCreate",
  "application/views/gameCreateScreen",
  "application/controllers/gameJoin",
  "application/views/gameJoinScreen",
  "application/controllers/gamePlaying",
  "application/views/gamePlayingScreen",  
  "application/models/input",
  "application/models/api",
  "application/models/settings",
  "application/models/statemachine"], ($,loadingController,loadingView,gameSetupController,gameSetupView,gameCreateController,gameCreateView,gameJoinController,gameJoinView,gamePlayingController,gamePlayingView,Input,Api,Settings,StateMachine) ->

  class Application
    @settings: null

    init: () ->
      
      @api = new Api()
      @settings = new Settings()
      @statemachine = new StateMachine()
      @loadingController = new loadingController(new loadingView("#loading"),@settings)
      @loadingController.load()
      @statemachine.add(@loadingController)

      @gameSetupController = new gameSetupController(new gameSetupView("#gameSetup"),@settings)
      @statemachine.add(@gameSetupController)
      
      @gameCreateController = new gameCreateController(new gameCreateView("#gameCreate"),@settings)
      @statemachine.add(@gameCreateController)

      @gameJoinController = new gameJoinController(new gameJoinView("#gameJoin"),@settings)
      @statemachine.add(@gameJoinController)
      
      @gamePlayingController = new gamePlayingController(new gamePlayingView("#gamePlaying"),@settings)
      @statemachine.add(@gamePlayingController)      

      console.log("Application initialized...")
      
      
      $('body').bind 'keydown', (e) =>
        @dispatch(Input.keyEventToEvent(e))

      $('body').bind 'AppEvent', (e,action) =>
        @dispatch(action)

      window.onpopstate = (event) =>
        console.log event
        console.log "back called"
        @goBack(event)

      @loadingController.activate()

    dispatch: (e)->
      console.log "dispatch received:"
      console.log e
      switch e
        when 'GAMESETUP' 
          @statemachine.trigger("change",@gameSetupController)
          history.pushState({page: 'GAMESETUP'}, "Game Setup", "#gamesetup")
        when 'GAMECREATE'
          @statemachine.trigger("change",@gameCreateController)
          history.pushState({page: 'GAMECREATE'}, "Game Create", "#gamesetup")
        when 'GAMEJOIN'
          @statemachine.trigger("change",@gameJoinController)
          history.pushState({page: 'GAMEJOIN'}, "Game Join", "#gamesetup")
        when 'GAMEPLAYNG'
          @statemachine.trigger("change",@gamePlayingController)
          history.pushState({page: 'GAMEPLAYING'}, "Game Playing", "#gamesetup")
        
    goBack: (e) ->
      if e?.state?.page?
        switch e.state.page
          when 'GAMESETUP'
            @statemachine.trigger("change",@gameSetupController)
          when 'GAMECREATE'
            @statemachine.trigger("change",@gameCreateController)
          when 'GAMEJOIN'
            @statemachine.trigger("change",@gameJoinController)
          when 'GAMEPLAYNG'
            @statemachine.trigger("change",@gamePlayingController)              
          