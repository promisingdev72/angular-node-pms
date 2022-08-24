angular.module("parkmeApp")

.controller('MainPageController', ['$scope', '$http', function($scope, $http)
{

    $(function () {
        $('[data-toggle="popover"]').popover()
    })

    $scope.init = function () {
        var isUser = sessionStorage.getItem("isUser");
        var isAdmin = sessionStorage.getItem("isAdmin");
        var sds = sessionStorage.getItem("sds");
        var testing = sessionStorage.getItem("testing");
        var cmsMxo = sessionStorage.getItem("cms_mxo");
        var cmsFull = sessionStorage.getItem("cms_full");


        // buttons only show for admin user
        if (isAdmin == null || isAdmin === "false") {
        }

        if(sds == null || sds === "false") {
            document.getElementById("sds").style.display = "none";
        }

        if(testing == null || testing === "false") {
            document.getElementById("testing").style.display = "none";
        }

        if((cmsFull == null || cmsFull === "false") && (cmsMxo == null || cmsMxo === "false")) {
            document.getElementById("cms").style.display = "none";
        }
    };

}]);