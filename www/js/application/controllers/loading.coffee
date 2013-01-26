define ["zepto","application/controllers/controller","application/models/api"], ($,Controller,RtbfApi) ->

  class loadingController extends Controller

    constructor:(@view,@settings)->
      super @view

    load:() ->
      

    unload:() ->

    activate:() ->
      super()
      setTimeout(@event,1000)

    event:() ->
      $('body').trigger('AppEvent',['SCREEN1'])