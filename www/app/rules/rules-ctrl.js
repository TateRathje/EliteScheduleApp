(function() {
	'use strict';

	angular.module('eliteApp').controller('RulesCtrl', ['eliteApi', RulesCtrl]);

	function RulesCtrl(eliteApi) {
		var vm = this;

		eliteApi.getLeagueData().then(function(data){
			vm.mainContent = data.league.rulesScreen;
		});

	 };
})();
