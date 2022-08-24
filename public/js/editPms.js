angular.module("parkmeApp")

    .controller('EditPmsController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location)
    {
        var pms = $routeParams.pmsIden;
        $scope.pms = pms;
        var series = $routeParams.series;
        $scope.radioModel = series;
        //document.getElementById("seriesRadio").disabled = true;

        var url = '/paint/' + pms + "/" + series;
        var componentAbvrs = []; // contains component abbreviations of the actual pms color (NOT all the color components from the db).
        var resolvedComponentJson = {};  // final response object containing all components, desc, and quanitites.
        resolvedComponentJson.components = [];
        resolvedComponentJson.quantities = [];

        var components = [];
        $http.get('/getallcomponents')
            .success( function( res ) {
                for (var i = 0; i < res.length; i++) {
                    var comp = {};
                    comp.abvr = res[i]['abrv'];
                    comp.component = res[i]['abrv'] + " - " + res[i]['description'];
                    components.push(comp);
                }
                $scope.paintColors = components;
            }).error( function( res ) {
            alert( "Error getting all components");
        });


        $http.get(url)
            .success( function( res ) {
                // If database has result, the response will be non-empty
                if (!isEmpty(res)) {

                    // Iterate 15 times once for each component, increase if necessary.
                    // starts at 1 due to db structure.
                    for (var i = 1; i <= 15; i++) {
                        var key = res[0]['component' + i];
                        var value = res[0]['quantity' + i];
                        if (value !== null) {
                            // TODO: Potential for mismatch between keys and values if data entered wrong.
                            componentAbvrs.push(key);
                            resolvedComponentJson.quantities.push(value);
                        }
                    }
                    // push user entered color description.
                    resolvedComponentJson.description = res[0]['description'];
                    console.log(componentAbvrs);

                    // Resolve component descriptions from database.
                    for (var j = 0; j < componentAbvrs.length; j++) {
                        getComponentDetails(j, componentAbvrs[j], resolvedComponentJson, $http);
                    }

                    console.log(JSON.stringify(resolvedComponentJson));
                    //assign scope variables
                    $scope.description = resolvedComponentJson.description;
                    //document.getElementById("compOption1").value = componentAbvrs[0];
                    //console.log("First comp is " + $scope.component1);
                    $scope.component1 = componentAbvrs[0];
                    $scope.component2 = componentAbvrs[1];
                    $scope.component3 = componentAbvrs[2];
                    $scope.component4 = componentAbvrs[3];
                    $scope.component5 = componentAbvrs[4];
                    $scope.component6 = componentAbvrs[5];
                    $scope.component7 = componentAbvrs[6];
                    $scope.component8 = componentAbvrs[7];
                    $scope.component9 = componentAbvrs[8];
                    $scope.component10 = componentAbvrs[9];
                    $scope.component11 = componentAbvrs[10];
                    $scope.component12 = componentAbvrs[11];
                    $scope.component13 = componentAbvrs[12];
                    $scope.component14 = componentAbvrs[13];
                    $scope.component15 = componentAbvrs[14];

                    $scope.quantity1 = parseInt(resolvedComponentJson['quantities'][0]);
                    $scope.quantity2 = parseInt(resolvedComponentJson.quantities[1]);
                    $scope.quantity3 = parseInt(resolvedComponentJson.quantities[2]);
                    $scope.quantity4 = parseInt(resolvedComponentJson.quantities[3]);
                    $scope.quantity5 = parseInt(resolvedComponentJson.quantities[4]);
                    $scope.quantity6 = parseInt(resolvedComponentJson.quantities[5]);
                    $scope.quantity7 = parseInt(resolvedComponentJson.quantities[6]);
                    $scope.quantity8 = parseInt(resolvedComponentJson.quantities[7]);
                    $scope.quantity9 = parseInt(resolvedComponentJson.quantities[8]);
                    $scope.quantity10 = parseInt(resolvedComponentJson.quantities[9]);
                    $scope.quantity11 = parseInt(resolvedComponentJson.quantities[10]);
                    $scope.quantity12 = parseInt(resolvedComponentJson.quantities[11]);
                    $scope.quantity13 = parseInt(resolvedComponentJson.quantities[12]);
                    $scope.quantity14 = parseInt(resolvedComponentJson.quantities[13]);
                    $scope.quantity15 = parseInt(resolvedComponentJson.quantities[14]);
                }

            }).error(function(res) {

            alert( "Error getting pms number and series." );
        });

        $scope.deletePms = function(pms, series) {

            var url = '/paintColorDelete/' + pms + "/" + series;

            $http.get(url)
                .success( function( res ) {
                    alert("The pms entry for " + pms + " " + series + " has been deleted");
                    $location.path('/viewPmsEntries');
                }).error( function( res ) {
                    alert( "Error submitting pms color " + res);
            });
        };


        $scope.submit = function() {
                var pmsData = {
                    pms_number:$scope.pms,
                    series:$scope.radioModel,
                    description:$scope.description,
                    component1:$scope.component1,
                    component2:$scope.component2,
                    component3:$scope.component3,
                    component4:$scope.component4,
                    component5:$scope.component5,
                    component6:$scope.component6,
                    component7:$scope.component7,
                    component8:$scope.component8,
                    component9:$scope.component9,
                    component10:$scope.component10,
                    component11:$scope.component11,
                    component12:$scope.component12,
                    component13:$scope.component13,
                    component14:$scope.component14,
                    component15:$scope.component15,
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
                console.log(pmsData);
                $http.post('/paintColorUpdate',JSON.stringify(pmsData))
                    .success( function( res ) {
                        alert("The pms entry for " + pmsData.description + " has been successfully updated");
                        $location.path('/viewPmsEntries');
                    }).error( function( res ) {
                    alert( "Error updating pms color " + res);
                });
        }

    }]);

function getComponentDetails(iter, componentVar, finalCompList, httpObj) {
    var componentUrl = '/paintcolor/' + componentVar;
    httpObj.get(componentUrl)
        .success( function( res ) {
            finalCompList.components[iter] = res[0]['description'];
            console.log(finalCompList.components[iter])
        }).error( function( res ) {
        alert( "Error getting component " + componentVar);
    });
}