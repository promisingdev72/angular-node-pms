angular.module("parkmeApp").controller("LoginController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.submit = function () {
      var user = "";
      var pass = "";

      if ($scope.username && $scope.password) {
        user = $scope.username;
        user = user.toLowerCase();
        pass = $scope.password;
        var loginData = {
          user: user,
          password: pass,
        };
        console.log(JSON.stringify(loginData));
        $http
          .post("/userlogin", JSON.stringify(loginData))
          .success(function (res) {
            console.log(JSON.stringify(res));
            if (isEmpty(res)) {
              alert("Username and password combination are incorrect");
            } else {
              res = res[0];
              sessionStorage.setItem("username", res.name);
              sessionStorage.setItem("id", res.id);
              sessionStorage.setItem("isAdmin", "" + res.isadmin);
              sessionStorage.setItem("isUser", "" + res.isuser);
              sessionStorage.setItem("sds", "" + res.sds);
              sessionStorage.setItem("testing", "" + res.testing);
              sessionStorage.setItem("cms_mxo", "" + res.cms_mxo);
              sessionStorage.setItem("cms_full", "" + res.cms_full);

              window.location.href = "#/";
              location.reload();
            }
          })
          .error(function (res) {
            alert("Server error occurred contact admin");
          });
      } else {
        alert("Please fill out both fields.");
      }
    };
  },
]);

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
