// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova', 'ngCordovaOauth'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .controller('AppCtrl', function ($scope, $cordovaOauth, $ionicPlatform, $http) {
      function QueryStringToJSON(txt) {            
    var pairs = txt.split('&');
    
    var result = {};
    pairs.forEach(function(pair) {
        pair = pair.split('=');
        result[pair[0]] = decodeURIComponent(pair[1] || '');
    });

    return JSON.parse(JSON.stringify(result));
    }

    $scope.login = function (authMethod) {
      $ionicPlatform.ready(function () {
        if (authMethod === "google") {

        } else if (authMethod === "github") {
          //https://developer.github.com/v3/oauth/#scopes
          $cordovaOauth.github("client id", 'client service id', ["user:email"]).then(function (result) {
            $scope.githubraw = result;
            $scope.githubjson = QueryStringToJSON(result);
            console.log('githubjson', $scope.githubjson);            
            console.log('githubraw', $scope.githubraw);
            
            var access_token = $scope.githubjson.access_token;
            console.log("access token", access_token);
            
            $http.get('https://api.github.com/user?access_token=' + access_token)
              .then(function (authdata) {
                $scope.github = authdata;
              });
          }, function (error) {
            console.log(error);
          });
        } else if (authMethod === "facebook") {

        } else if (authMethod === "twitter") {

        }
      });
    }
  });
