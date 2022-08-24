angular.module("parkmeApp")

    .controller('AllPmsController', ['$scope', '$http', function($scope, $http)
    {
        $http.get('/getAllPmsEntries')
            .success( function( res ) {
                $scope.pmsEntries = res;
            }).error( function( res ) {
            alert( "Error getting all components");
        });

    }]);