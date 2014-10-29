var app = angular.module('app',["ngAnimate"]);


app.factory('ConnectionManagerInterceptor', ["$window", "$q", function ($window, $q) {
    return {
        request: function (config) {
            return config || $q.when(config);
        },
        response: function (response) {
            return response || $q.when(response);
        }, responseError: function (rejection) {
            alert("Problem retrieving the information");
            return $q.reject(rejection);
        }
    };
}]);

app.config(["$httpProvider", function ($httpProvider) {
    $httpProvider.interceptors.push('ConnectionManagerInterceptor');
}]);
