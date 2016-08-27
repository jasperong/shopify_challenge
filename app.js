(function(){

  var app = angular.module('shopifyChallengeApp', []);

  app.controller('ProductsController', function($http, $scope, $filter){

    var getProducts = function(pageNumber){
      $http.get('http://shopicruit.myshopify.com/products.json?page=' + pageNumber)
            .then(onSuccess, onError)
            .then(totalPrice)
            .then(productTax)
            return array;
    };

    var array = [];

    var onSuccess = function(response){
      console.log('success');

      for (var i = 0; i < response.data.products.length; i++) {
        array.push(response.data.products[i]);
      }
      return array;
      // array.push(response.data.products);
    };

    var onError = function(reason){
      console.log("Error:" + reason);
    };

    var getAllPagesProducts = function(){
      for (var i = 1; i < 6; i++) {
        getProducts(i);
        console.log(i);
      }
      $scope.products = array;
      // totalPrice(array);
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
          if ($scope.selectedProductTypes.indexOf(arr[i].product_type) !== -1){
            prices.push(parseFloat(arr[i].variants[j].price));
          }
        }
      }
      $scope.totalPrice = prices.reduce(add, 0);
      return arr;
    };

    var add = function(a, b) {
      return a + b;
    }

    var productTax = function(arr){
      var taxes = []
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].variants.length; j++) {
          if (arr[i].variants[j].taxable && ($scope.selectedProductTypes.indexOf(arr[i].product_type)) !== -1){
            taxes.push(parseFloat(arr[i].variants[j].price * 0.13));
          }
        }
      }
      $scope.totalTax = taxes.reduce(add, 0);
    };

    getAllPagesProducts();
  });

}());
