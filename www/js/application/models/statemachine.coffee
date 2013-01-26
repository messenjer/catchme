define ["zepto"],($) ->
  class StateMachine
    constructor: () ->

    add: (controller) ->
      console.log "Adding controller ${controller}"
      @bind "change",(e,current)->
        console.log "Binded ${controller}"
        if controller is current
          controller.activate()
        else
          controller.deactivate()
      # add a proxied method
      controller.active = $.proxy(
          () ->
            console.log "Change triggered ${controller}"
            @trigger "change", controller
            return
          ,@)

    bind: () ->
      @o ?= $('body')
      @o.bind.apply @o, arguments

    trigger: () ->
      @o ?= $('body')
      @o.trigger.apply @o, arguments