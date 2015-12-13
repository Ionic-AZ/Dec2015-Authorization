// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'firebase'])

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
  .factory('Auth', function ($firebaseAuth) {
    var endPoint = "https://ionictodosample.firebaseIO.com";
    var usersRef = new Firebase(endPoint);
    return $firebaseAuth(usersRef);
  })
  .controller('AppCtrl', function ($scope, Auth) {
    $scope.login = function (authMethod) {
      Auth.$authWithOAuthRedirect(authMethod).then(function (authData) {
          
      }).catch(function (error) {
        console.log('login error', error);
        if (error.code === 'TRANSPORT_UNAVAILABLE') {
          Auth.$authWithOAuthPopup(authMethod).then(function (authData) {
          });
        } else {
          console.log(error);
        }
      })
    };

    Auth.$onAuth(function (authData) {
      if (authData === null) {
        console.log('Not Logged in Yet');
      } else {
        console.log('Logged in as ', authData.uid);
      }

      $scope.authData = authData;
    });
  })
