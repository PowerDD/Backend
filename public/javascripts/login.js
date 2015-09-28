var app = angular.module('PowerDD', ['ngStorage']);

app.controller('Auth', function($scope, $http, $localStorage) {
	$scope.checkLogin = function() {
		$scope.hasError = false;
		var param = $.param({apiKey: $scope.apiKey, shop: $scope.shop, username:$scope.formLogin.username.$viewValue, password:$scope.formLogin.password.$viewValue });
		$http({
			method: 'POST',
			url: $scope.apiUrl+'/member/login',
			data: param,
			headers: {'Content-Type': 'application/x-www-form-urlencoded'}
		})
		.success(function (data) {
			if ( data.success ){
			}
			else {
				$scope.hasError = true;
				$scope.errorHeader = data.error;
				$scope.errorDetail = data.errorMessage;
			}
			console.log(data.success);
         })
		.error(function (data, status, headers, config) {
			 console.log(data);
		 });
	}
});