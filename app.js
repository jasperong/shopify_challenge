(function(){

  var app = angular.module('shopifyChallengeApp', []);

  app.controller('ProductsController', function($http, $scope, $filter){
    // Hardcoded values for product types list
    $scope.availableProductTypes = ['Watch', 'Clock', 'Pants', 'Bottle', 'Keyboard', 'Wallet', 'Knife', 'Car', 'Coat',
                                    'Lamp', 'Table', 'Chair', 'Computer', 'Hat', 'Shoes', 'Plate', 'Gloves', 'Bag', 'Bench',
                                    'Shirt'];

    // AJAX call to API which calls onSuccess Function
    var getProducts = function(pageNumber){
      $http.get('http://shopicruit.myshopify.com/products.json?page=' + pageNumber)
            .then(onSuccess, onError)
            .then(totalPrice)
    };

    // Success function after API call, grabs products array and pushes to empty array
    var onSuccess = function(response){
      for (var i = 0; i < response.data.products.length; i++) {
        array.push(response.data.products[i]);
      }
      return array;
    };

    // Error function in case of 404 from API
    var onError = function(reason){
      console.log("Error:" + reason);
    };

    // Filters search results to only selected product types
    $scope.filterByProductType = function(product){
      return ($scope.selectedProductTypes.indexOf(product.product_type) !== -1)
    }

    // Calculates total price of filtered items, needs refactoring
    var totalPrice = function(arr){
      // FIX THIS FUNCTION !!!!!!!
      var prices = [];
      var taxes = [];
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
      }

      $scope.totalTax = taxes.reduce(add, 0);
      $scope.totalPrice = prices.reduce(add, 0);

      return arr;
    };

    // Helper function for getting the total from array
    var add = function(a, b) {
      return a + b;
    };

    // Main function which gets fired on form submission
    $scope.getAllPagesProducts = function(pageCount){
      resetScopeData();
      for (var i = 1; i <= pageCount; i++) {
        getProducts(i);
      }
      $scope.products = array;
    };

    var array = [];
    var array_ = angular.copy(array);

    // Resets $scope.products in case of multiple submissions
    var resetScopeData = function(){
      array = angular.copy(array_)
    };

    $scope.selectedProductTypes = [];
    // Function to push selected product types from checkbox to array
    $scope.toggleSelection = function toggleSelection(productType) {
      var index = $scope.selectedProductTypes.indexOf(productType);   
      // is currently selected or not
       if (index > -1) {
        $scope.selectedProductTypes.splice(index, 1);
      } else {
        $scope.selectedProductTypes.push(productType);
      }
    };

    $scope.submit = function(){
      $scope.submitted = true;
    };

  // End of module
  });

}());
