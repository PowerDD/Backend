var app = angular.module('PowerDD', ['ngStorage']);

app.controller('Auth', function($scope, $http, $localStorage) {
	$scope.login = function() {
		$scope.hasError = false;
		var param = $.param({apiKey: $scope.apiKey, shop: $scope.shop, username:$scope.formLogin.username.$viewValue, password:$scope.formLogin.password.$viewValue });
		$http({headers: {'Content-Type': 'application/x-www-form-urlencoded'}, method: 'POST', data: param, url: $scope.apiUrl+'/member/login' })
		.success(function (data) {
			if ( data.success ){
			}
			else {
				$scope.hasError = true;
				$scope.errorHeader = data.error;
				$scope.errorDetail = data.errorMessage;
			}
         })
		.error(function (data, status, headers, config) {
			 console.log(data);
		 });
	}

	$scope.register = function() {
		$scope.hasError = false;
		var param = $.param({apiKey: $scope.apiKey, shop: $scope.shop, 
			username:$scope.formRegister.username.$viewValue, 
			password:$scope.formRegister.password.$viewValue, 
			mobile:$scope.formRegister.mobile.$viewValue, 
			email:$scope.formRegister.email.$viewValue 
		});
		$http({headers: {'Content-Type': 'application/x-www-form-urlencoded'}, method: 'POST', data: param, url: $scope.apiUrl+'/member/register' })
		.success(function (data) {
			if ( data.success ){
			}
			else {
				$scope.hasError = true;
				$scope.errorHeader = data.error;
				$scope.errorDetail = data.errorMessage;
			}
         })
		.error(function (data, status, headers, config) {
			 console.log(data);
		 });
	}

});

app.directive('numericOnly', function(){
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, modelCtrl) {

            modelCtrl.$parsers.push(function (inputValue) {
                var transformedInput = inputValue ? inputValue.replace(/[^\d.-]/g,'') : null;

                if (transformedInput!=inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    };
});