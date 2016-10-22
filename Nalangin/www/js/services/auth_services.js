angular.module('app.services', [])
.service('AuthService', function($q, $http) {
    var userData = {};

    var authToken;

    function isAuthUser() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            return true;
        } else {
            return false;
        }
    }

    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            useCredentials(token);
        }
    }

    var storeUserCredentials = function(token) {
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentials(token);
    }


    function useCredentials(token) {
        list            = token.split('#')[0];

        userData.userID          = list.split('~')[0];
        userData.username        = list.split('~')[1];
        userData.name            = list.split('~')[2];
        userData.email           = list.split('~')[3];
        userData.sex             = list.split('~')[4];
        userData.age             = list.split('~')[5];
        userData.password        = list.split('~')[6];
        userData.profpicURL      = list.split('~')[7];
        userData.isAuthenticated = true;
        userData.authToken       = token.split('#')[1];

        console.log(userData)

        $http.defaults.headers.common['X-Auth-Token'] = authToken + '|' + NalanginVersion;
    }

    function destroyUserCredentials() {
        userData = {}
        $http.defaults.headers.common['X-Auth-Token'] = undefined;
        window.localStorage.clear();
    }
   
    var login = function(name, pw) {
        return $q(function(resolve, reject) {
            var data_user = {
                'username'  : name,
                'password'  : pw
            };

            //console.log($http.defaults.headers.common['X-Auth-UserId']);
            var login_base = $http.post(base_url+'/users/login',data_user,{
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).success(function(response, status, headers){
                    if(status == '201' || status == '200'){
                        if(response.success == true){
                            console.log("success Login With Username : " + response.data.username)
                            storeUserCredentials(
                                response.data.id + '~' +
                                response.data.username + '~' +
                                response.data.name + '~' +
                                response.data.email + '~' +
                                response.data.sex + '~' +
                                response.data.age + '~' +
                                response.data.password + '~' +
                                base_url+response.data.profpicURL + '~' +
                                '#' + response.data.password);
                            resolve(response.data);
                        } else {
                            console.log("Login Failed")
                            reject(status);
                        }
                    }
                    else if(status == '401') {
                        //evacuation('logout');
                        reject(status);
                    }
                    else if(status == '404') {
                        //evacuation('update');
                        reject(status);
                    }
                    else if(status == '503') {
                        //evacuation('maintenance');
                        reject(status);
                    }
                    else {
                        reject('Login Failed.');
                    }
                }).error(function(data, status){
                    reject('Login Failed.');
                });
        });
    };

    var signup = function(signupData) {
        return $q(function(resolve, reject) {
            //console.log($http.defaults.headers.common['X-Auth-UserId']);
            var login_base = $http.post(base_url+'users/signup',signupData,{
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).success(function(response, status, headers){
                    if(status == '201' || status == '200'){
                        if(response.success == true){
                            console.log("success SignUp")
                            resolve('SignUp success.');
                        } else {
                            console.log("SignUp Failed")
                            reject(status);
                        }
                    }
                    else if(status == '401') {
                        //evacuation('logout');
                        reject(status);
                    }
                    else if(status == '404') {
                        //evacuation('update');
                        reject(status);
                    }
                    else if(status == '503') {
                        //evacuation('maintenance');
                        reject(status);
                    }
                    else {
                        reject('SignUp Failed.');
                    }
                }).error(function(data, status){
                    reject('SignUp Failed.');
                });
        });
    };

    loadUserCredentials()

    return {
        login       : login,
        signup      : signup,
        getUserData : function () {
            return userData;
        },
    }
})