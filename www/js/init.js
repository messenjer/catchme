require.config({
    baseUrl: 'js/lib',
    paths: {
      application: '../application'
    }
});

requirejs(['../app']);
