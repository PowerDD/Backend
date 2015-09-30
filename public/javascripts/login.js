var app = angular.module('PowerDD', []);

app.controller('Auth', function($scope, $http, $localStorage) {
	$scope.login = function() {
		$scope.hasError = false;
		var param = $.param({apiKey: $scope.apiKey, shop: $scope.shop, username:$scope.formLogin.username.$viewValue, password:$scope.formLogin.password.$viewValue });
		$http({headers: {'Content-Type': 'application/x-www-form-urlencoded'}, method: 'POST', data: param, url: $scope.apiUrl+'/member/login' })
		.success(function (data) {
			if ( data.success ){
				$scope.loginSuccess = true;
				setLoginCookie($scope.formLogin.username.$viewValue);
			}
			else {
				$scope.hasError = true;
				$scope.error = data.error;
			}
         })
		.error(function (data, status, headers, config) {
			 console.log(data);
		 });
	}

	$scope.register = function() {
		$scope.hasError = false;
		var json = {};
		json.username = $scope.formRegister.username.$viewValue;
		json.password = $scope.formRegister.password.$viewValue;
		json.mobile = $scope.formRegister.mobile.$viewValue;
		json.email = $scope.formRegister.email.$viewValue;
		var param = $.param({apiKey: $scope.apiKey, shop: $scope.shop, 
			type:'Web',
			value: JSON.stringify(json)
		});
		$http({headers: {'Content-Type': 'application/x-www-form-urlencoded'}, method: 'POST', data: param, url: $scope.apiUrl+'/member/register' })
		.success(function (data) {
			if ( data.success ){
				$scope.registerSuccess = true;
				$scope.action = 'login';
			}
			else {
				$scope.hasError = true;
				$scope.error = data.error;
			}
         })
		.error(function (data, status, headers, config) {
			 console.log(data);
		 });
	}

});

function setLoginCookie(username){
	Cookies.set('username', username, { expires: 365, secure: true });
}