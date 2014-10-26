(function() {
	'use strict';

	angular.module('eliteApp').controller('MyTeamsCtrl', ['$state', 'myTeamsService', 'eliteApi', myTeamsCtrl]);

	function myTeamsCtrl($state, myTeamsService, eliteApi) {
		var vm = this;

		vm.myTeams = myTeamsService.getFollowedTeams();

		vm.goToTeam = function(team){
			eliteApi.setLeagueId(team.leagueId);
			$state.go("app.team-detail", { id: team.id });
		};
	 };
})();
