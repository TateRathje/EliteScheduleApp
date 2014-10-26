(function() {
	'use strict';

	angular.module('eliteApp').controller('TeamsCtrl', ['$scope', 'eliteApi', TeamsCtrl]);

	function TeamsCtrl($scope, eliteApi) {
		var vm = this;

		vm.loadList = function(forceRefresh){	
			eliteApi.getLeagueData(forceRefresh).then(function(data){
				vm.teams = data.teams;
			}).finally(function(){
				$scope.$broadcast('scroll.refreshComplete');
			});
	 	};

	 	vm.loadList(false);
	 };
})();
