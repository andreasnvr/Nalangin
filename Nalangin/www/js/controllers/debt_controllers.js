angular.module('app.controllers')
         
 /*
 * Controller for Login.
 * using Parameter : loginData.username, loginData.password
 * POST to API to Check credential
 */
.controller('debtCtrl', function($scope, $state, $ionicPopup,$location,$ionicHistory, AuthService) {
    console.log(AuthService.getUserData())
    $scope.userData = AuthService.getUserData();
    $scope.items = [];
    for(var i = 0; i < 10; i++) {
      $scope.items.push('Card ' + i);
    }
    $scope.login = function() {
        
    };
})
