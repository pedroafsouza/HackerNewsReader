//Hacker Service
// We should be careful with the user of the string injected since that in the future we can use minification
angular.module('app').service('hackerService', ["$http", "$q",
    function($http, $q) {

        var baseUrlHackerNews = "https://hacker-news.firebaseio.com/v0/topstories.json";


        var hackerNews = [];


        this.getTop10Hacks = function(successCallback) {
            $http.get(baseUrlHackerNews).success(function(news) {
                //Take the safe size 10 or the minimun lenght
                var maxSize = Math.min(10, news.length);

                //Array of promisses to assure that the things will be only showed when everything is finished!
                var storePromisses = [];

                //Story info
                for (var c = 0; c < maxSize; c++) {
                    storePromisses.push($http.get("https://hacker-news.firebaseio.com/v0/item/" + news[c] + ".json"));
                }

                // wait for all http returns
                $q.all(storePromisses).then(function(retStorePromisses) {

                    var userPromisses = [];
                    for (var i = 0; i < retStorePromisses.length; i++) {
                        hackerNews.push(retStorePromisses[i].data);
                        userPromisses.push($http.get("https://hacker-news.firebaseio.com/v0/user/" + retStorePromisses[i].data.by + ".json"));
                    }


                    // wait for all http promises
                    $q.all(userPromisses).then(function(retUserPromisses) {
                        for (var i = 0; i < retUserPromisses.length; i++) {
                            if (retUserPromisses[i]) {
                                hackerNews[i].user = retUserPromisses[i].data;
                            }
                        }

                        console.log(hackerNews);
                        
                        //call the callback function, in that way I won't show nothing before the system is loaded
                        successCallback(hackerNews);

                    });
                });
            });
        };
}]);