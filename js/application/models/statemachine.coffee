define ["zepto"],($) ->
  class StateMachine
    constructor: () ->

    add: (controller) ->
      @bind "change",(e,current)->
        if controller is current
          controller.activate()
        else
          controller.deactivate()
      # add a proxied method
      controller.active = $.proxy(
          () ->
            @trigger "change", controller
            return
          ,@)

    bind: () ->
      @o ?= $('body')
      @o.bind.apply @o, arguments

    trigger: () ->
      @o ?= $('body')
      @o.trigger.apply @o, arguments