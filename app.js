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
      totalPrice(array);
    };

    $scope.selectedProductTypes = ['Watch', 'Clock'];

    $scope.filterByProductType = function(product){
        return ($scope.selectedProductTypes.indexOf(product.product_type) !== -1)
    }

    var totalPrice = function(arr){

      // FIX THIS FUNCTION !!!!!!!
      var prices = [];
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].variants.length; j++) {
          prices.push(arr[i].variants[j].price);
        }
      }
      $scope.totalPrice = prices.reduce(add, 0);
    };

    var add = function(a, b) {
      return a + b;
    }

    getAllPagesProducts();
  });

}());
