(function(){

  var app = angular.module('shopifyChallengeApp', []);

  app.controller('ProductsController', function($http, $scope, $filter){
    $scope.availableProductTypes = ['Watch', 'Clock', 'Pants', 'Bottle', 'Keyboard', 'Wallet', 'Knife', 'Car', 'Coat',
                                    'Lamp', 'Table', 'Chair', 'Computer', 'Hat', 'Shoes', 'Plate', 'Gloves', 'Bag', 'Bench',
                                    'Shirt']

    var getProducts = function(pageNumber){
      $http.get('http://shopicruit.myshopify.com/products.json?page=' + pageNumber)
            .then(onSuccess, onError)
            .then(totalPrice)

      return array;
    };

    var array = [];

    var onSuccess = function(response){
      console.log('success');

      for (var i = 0; i < response.data.products.length; i++) {
        array.push(response.data.products[i]);
      }

      return array;
    };

    var onError = function(reason){
      console.log("Error:" + reason);
    };


    $scope.filterByProductType = function(product){
        return ($scope.selectedProductTypes.indexOf(product.product_type) !== -1)
    }

    var totalPrice = function(arr){
      // FIX THIS FUNCTION !!!!!!!
      var prices = [];
      var taxes = [];
      var availableProductTypes = []
      // FIX THIS LOOP !!!!
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].variants.length; j++) {
          if ($scope.selectedProductTypes.indexOf(arr[i].product_type) !== -1){
            if (arr[i].variants[j].taxable) {
              taxes.push(parseFloat(arr[i].variants[j].price * 0.13));
            }
            prices.push(parseFloat(arr[i].variants[j].price));
          }
        }
        availableProductTypes.push(arr[i].product_type)
      }

      $scope.totalTax = taxes.reduce(add, 0);
      $scope.totalPrice = prices.reduce(add, 0);

      return arr;
    };

    var add = function(a, b) {
      return a + b;
    };

    var getAllPagesProducts = function(pageCount){
      for (var i = 1; i <= pageCount; i++) {
        getProducts(i);
        console.log(i);
      }
      $scope.products = array;
    };

    $scope.selectedProductTypes = [];

    // Function to push selected product types from checkbox to array
    $scope.toggleSelection = function toggleSelection(productType) {
      var index = $scope.selectedProductTypes.indexOf(productType);   
      // is currently selected or not
       if (index > -1) {
        $scope.selectedProductTypes.splice(idx, 1);
      } else {
        $scope.selectedProductTypes.push(productType);
      }
    };
  });

}());
