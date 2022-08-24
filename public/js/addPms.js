angular.module("parkmeApp")

    .controller('AddPmsController', ['$scope', '$http', function($scope, $http) {
        var components = [];
        $scope.currentDate = new Date();
        $http.get('/getallcomponents')
            .success( function( res ) {
                for (var i = 0; i < res.length; i++) {
                    var comp = {};
                    comp.abvr = res[i]['abrv'];
                    comp.component = res[i]['abrv'] + " - " + res[i]['description'];
                    components.push(comp);
                }
                console.log(components);
                $scope.paintColors = components;
            }).error( function( res ) {
            alert( "Error getting all components");
        });

        $scope.validatePms = function () {
            if ($scope.pms != null && $scope.radioModel != null) {
                var url = '/paint/' + $scope.pms + "/" + $scope.radioModel;
                $http.get(url)
                    .success( function( res ) {
                        // If database has result, the response will be non-empty
                        $scope.alert = {type: isEmpty(res) ? "success" : "danger" , msg: isEmpty(res) ? 'The pms and series combination are good' : 'The pms and series combination already exists'};
                        console.log($scope.alert);
                    }).error(function(res) {

                    alert( "Error getting pms number and series." );
                });
            }
        };

        $scope.addAlert = function(isValid) {
            $scope.alert({type: isValid ? "success" : "danger" , msg: isValid ? 'The pms and series combination are good' : 'The pms and series combination already exists'});
        };

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };


        $scope.submit = function() {
            console.log("Submit called");
            if ($scope.pms && $scope.radioModel && $scope.params.component1 && $scope.quantity1) {
                var pmsData = {
                    pms_number:$scope.pms,
                    series:$scope.radioModel,
                    description:$scope.description,
                    component1:$scope.params.component1,
                    component2:$scope.params.component2,
                    component3:$scope.params.component3,
                    component4:$scope.params.component4,
                    component5:$scope.params.component5,
                    component6:$scope.params.component6,
                    component7:$scope.params.component7,
                    component8:$scope.params.component8,
                    component9:$scope.params.component9,
                    component10:$scope.params.component10,
                    component11:$scope.params.component11,
                    component12:$scope.params.component12,
                    component13:$scope.params.component13,
                    component14:$scope.params.component14,
                    component15:$scope.params.component15,
                    quantity1: $scope.quantity1,
                    quantity2: $scope.quantity2,
                    quantity3: $scope.quantity3,
                    quantity4: $scope.quantity4,
                    quantity5: $scope.quantity5,
                    quantity6: $scope.quantity6,
                    quantity7: $scope.quantity7,
                    quantity8: $scope.quantity8,
                    quantity9: $scope.quantity9,
                    quantity10: $scope.quantity10,
                    quantity11: $scope.quantity11,
                    quantity12: $scope.quantity12,
                    quantity13: $scope.quantity13,
                    quantity14: $scope.quantity14,
                    quantity15: $scope.quantity15
                };

                $http.post('/paintcolor',JSON.stringify(pmsData))
                    .success( function( res ) {
                        alert("The pms entry for " + pmsData.description + " has been successfully added");
                        window.location.reload();
                    }).error( function( res ) {
                        alert( "Error submitting pms color " + res);
                });

            } else {
                alert( "Please fill out the pms, series, at least 1 component and quantity." );
            }

            }

        }]);