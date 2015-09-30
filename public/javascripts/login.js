var app = angular.module('PowerDD', ['ngStorage']);

app.controller('Auth', function($scope, $http, $localStorage) {

	$http({headers: {'Content-Type': 'application/x-www-form-urlencoded'}, method: 'GET', data: param, url: $scope.apiUrl+'/ip/118.174.101.81' })
	.success(function (data) {
		 console.log(data);
	 })
	.error(function (data, status, headers, config) {
		 console.log(data);
	 });


	$scope.login = function() {
		$scope.hasError = false;
		var param = $.param({apiKey: $scope.apiKey, shop: $scope.shop, 
			username:$scope.formLogin.username.$viewValue,
			password:$scope.formLogin.password.$viewValue, 
			remember:$scope.formLogin.remember.$viewValue ? 1 : 0
		});
		$http({headers: {'Content-Type': 'application/x-www-form-urlencoded'}, method: 'POST', data: param, url: $scope.apiUrl+'/member/login' })
		.success(function (data) {
			if ( data.success ){
				$scope.loginSuccess = true;
				if ($scope.formLogin.remember.$viewValue) {
					Cookies.set('memberKey', data.result, { expires: 365, secure: true });
				}
				else {
					Cookies.set('memberKey', data.result, { secure: true });
				}
				Cookies.set('username', $scope.formLogin.username.$viewValue, { expires: 365, secure: true });
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