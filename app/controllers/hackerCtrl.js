//Hacker Controller

// We should be careful with the user of the string injected since that in the future we can use minification
angular.module('app').controller('hackerCtrl',["$scope","hackerService",
    function ($scope,hackerService) {
        
        $scope.news = [];
        $scope.isLoading = true;
        
        $scope.selectedItem;
        
        hackerService.getTop10Hacks(function(news){
            $scope.news = news;
            $scope.isLoading = false;
            $scope.selectedItem = news[0];
        });
      
        $scope.openLink = function(item){
           $scope.selectedItem = item;
        };

    }                                                     
]);
        