
angular.module("parkmeApp")
    .controller('ColorMatchSystemController', ['$scope', '$http', '$location', 'MyService', function($scope, $http, $location, MyService) {

        var cmsMxo = sessionStorage.getItem("cms_mxo");
        var cmsFull = sessionStorage.getItem("cms_full");

        // NOTE: database dependency on cms_mxo being false when any other cms val is set (cms_full for now)
        if (cmsMxo != null && cmsMxo === "true") {
            $scope.radioModel = 'MXO';
            document.getElementById("nw").style.display = "none";
            document.getElementById("pi").style.display = "none";
            document.getElementById("exlo").style.display = "none";
            document.getElementById("si").style.display = "none";
        }

        $scope.submit = function() {
            var pms = "";
            var series = "";
            var quantity = "";
            var componentAbvrs = []; // contains component abbreviations.
            var resolvedComponentJson = {};  // final response object containing all components, desc, and quanitites.
            resolvedComponentJson.components = [];
            resolvedComponentJson.quantities = [];
            if ($scope.pms && $scope.radioModel && $scope.quantity) {
                pms = $scope.pms.toUpperCase();
                series = $scope.radioModel; // series
                quantity = $scope.quantity;
                resolvedComponentJson.userRequestQuantity = quantity;

                var url = '/paint/' + pms + "/" + series;
                $http.get(url)
                    .success(function(res) {
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
                            MyService.pmsResult = resolvedComponentJson;
                            $location.path('/colourResult');

                            console.log(resolvedComponentJson);
                        } else {
                            // No result in DB for pms and series combination
                            if (confirm('The requested combination of PMS : ' + pms + ', series: ' + series + ' is not in our system yet. Would you like to send us an email requesting to purchase this ink?')) {
                                window.open('mailto:inkcraft@bellnet.ca?subject=Request%20paint%20colour%20of%20pms%20number%20' + pms + '%20of%20series%20' + series
                                    + '&body=Hello%20Inkcraft,%0AWe%20are%20interested%20in%20purchasing%20the%20ink%20PMS:%20' + pms + ' of%20series:%20' + series + '%0A%0AThank%20you,%0A', "_self");
                            }
                        }

                    }).error(function(res) {

                        alert( "Error getting pms number and series." );
                    });

            } else {
                alert( "Please fill out required fields." );
            }

        };

    }]);

function getComponentDetails(iter, componentVar, finalCompList, httpObj) {
    var componentUrl = '/paintcolor/' + componentVar;
    httpObj.get(componentUrl)
        .success( function( res ) {
            finalCompList.components[iter] = res[0]['description'];
        }).error( function( res ) {
            alert( "Error getting component " + componentVar);
    });
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
