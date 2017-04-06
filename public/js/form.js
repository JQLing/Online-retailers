var myApp=angular.module('myApp',function(){
    
})
.directive('ngFocus', function () {
        var FOCUS_CLASS = "ng-focused";
        return{
            restrict:'A',
            require:'ngModel',
            link: function (scope, element, attrs,ctrl) {
                ctrl.$focused = false;
                element.bind('focus', function (evt) {
                    element.addClass(FOCUS_CLASS);
                    scope.$apply(function () {
                        ctrl.$focused = true;
                    });
                }).bind('blur', function () {
                    element.removeClass(FOCUS_CLASS);
                    scope.$apply(function(){
                        ctrl.$focused = false;
                    })
                });
            }
        }
})
.directive('pwCheck', function () {
     return {
         require: 'ngModel',
		 scope:{
             password:'=match'
         },
         link: function (scope, element, attrs, ngModel) {  
            scope.$watch('password', function(){
                ngModel.$setValidity('matchError',element.val() === scope.password);
            });
            element.on('keyup',function(){ 
              scope.$apply(function () { 
                 ngModel.$setValidity('matchError',element.val() === scope.password);  
              });
     		});
		 } 
	 }
})
.controller('firstController',['$scope',function($scope){
	$scope.submitted = false
	$scope.register = function (data) {
        //表单正常提交
        if($scope.register_form.$valid){
            //正常提交表单
        }else{
            $scope.submitted = true;
        }
    };
}])


















