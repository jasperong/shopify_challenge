(function(){

  var app = angular.module('shopifyChallengeApp', []);

  app.controller('ProductsController', function($http, $scope, $filter){


    var getProducts = function(pageNumber){
      $http.get('http://shopicruit.myshopify.com/products.json?page=' + pageNumber)
            .then(onProductSuccess, onError)
    };

    var onProductSuccess = function(response){
      console.log('success');
      $scope.products = response.data.products;
    };

    var onError = function(reason){
      console.log("Error:" + reason);
    };

    // var getAllPagesProducts = function(){
    //   var productsArray = []
    //   for (var i = 1; i < 6; i++) {
    //     productsArray.concat(getProducts(i));
    //     console.log(productsArray);
    //   }
    //   $scope.array = productsArray;
    // };

    console.log(getProducts(2));
    getProducts(1);
  });

}());
