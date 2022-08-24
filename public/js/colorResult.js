angular.module("parkmeApp")

    .controller('ColorResultController', ['$scope', '$http', 'MyService', function($scope, $http, MyService)
    {
        $scope.data = MyService.pmsResult;
        $scope.currentDate = new Date();
        var totalWeight = 0;

        for (var i = 0; i < $scope.data.quantities.length; i++) {
            console.log("The quantity is " + $scope.data.quantities[i]);
               totalWeight += parseInt($scope.data.quantities[i]);
        }
        $scope.userRatio = parseInt($scope.data.userRequestQuantity) / totalWeight;
    }]);

window.onbeforeprint = function(event) {
    var bottomFooter = document.getElementById("footer");
    bottomFooter.classList.add("footer");
    bottomFooter.classList.add("navbar-fixed-bottom");
};


window.onafterprint = function(event) {
    var bottomFooter = document.getElementById("footer");
    bottomFooter.classList.remove("footer");
    bottomFooter.classList.remove("navbar-fixed-bottom");
};
