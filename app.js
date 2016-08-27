(function(){

  var app = angular.module('shopifyChallengeApp', []);

  app.controller('ProductsController', function($http, $scope, $filter){

    var getProducts = function(pageNumber){
      $http.get('http://shopicruit.myshopify.com/products.json?page=' + pageNumber)
            .then(onSuccess, onError)
            return array;
    };

    var array = [];

    var onSuccess = function(response){
      console.log('success');
      $scope.products = response.data.products;
      array.push(response.data.products);
    };

    var onError = function(reason){
      console.log("Error:" + reason);
    };

    var getAllPagesProducts = function(){
      for (var i = 1; i < 6; i++) {
        getProducts(i);
        console.log(i);
      }
      $scope.arrays = array;
    };

    console.log(getAllPagesProducts());
  });

}());
