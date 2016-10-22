angular.module('app.controllers')
         
 /*
 * Controller for Login.
 * using Parameter : loginData.username, loginData.password
 * POST to API to Check credential
 */
.controller('loginCtrl', function($scope, $state, $ionicPopup,$location,$ionicHistory, AuthService,$http) {
    $scope.loginData  = {};
    $scope.signupData  = {};
    $scope.login = function() {
        var username = $scope.loginData.username;
        var password = $scope.loginData.password;
        var loginTxt = $('#login-button').html();
        $('#login-button').html('Bentar Cek dl');

        if( validation($ionicPopup, 'Username', username, 'string') == false
            || validation($ionicPopup, 'Password', password, 'string') == false
        ) {return;};
        AuthService.login( username, password ).then(function(data) {
            console.log(data);

            $('#login-button').html(loginTxt);
            $ionicHistory.nextViewOptions({
                disableBack   : true
            });
            $state.go('tabsController.cameraTabDefaultPage')
        }, function(err) {
            $('#login-button').html(loginTxt);
            var alertPopup = $ionicPopup.alert({
                title   : 'Login Gagal!',
                template: 'Pastikan email dan password benar!'
            });
        });
        
    };

    $scope.signup = function() {
        var username = $scope.signupData.username;
        var password = $scope.signupData.password;
        var name     = $scope.signupData.password;
        var male     = $scope.signupData.male;
        var birth    = $scope.signupData.password;

        console.log($scope.signupData)

        var signupTxt = $('#btnSignup').html();
        $('#btnSignup').html('Bentar Regis dl');
        
        if( validation($ionicPopup, 'Username', username, 'string') == false
            || validation($ionicPopup, 'Password', password, 'string') == false
        ) {return;};

        var signupData= {
           "username"     : username,
           "password"     : password,
           "gender"       : 'M',
           "name"         : name,
           "birth"        : birth
        };

        AuthService.signup(signupData).then(function(authenticated) {
            console.log(authenticated);
            /*$('#login-button').html(signupTxt);
            $ionicHistory.nextViewOptions({
                disableBack   : true
            });
            $state.go('tabsController.cameraTabDefaultPage')*/
        }, function(err) {
            $('#login-button').html(signupTxt);/*
            var alertPopup = $ionicPopup.alert({
                title   : 'Login Gagal!',
                template: 'Pastikan email dan password benar!'
            });*/
        });
        
    };
})
