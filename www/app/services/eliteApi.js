(function() {
	'use strict';

	angular.module('eliteApp').factory('eliteApi', ['$http', '$q', '$ionicLoading', 'DSCacheFactory', eliteApi]);

	function eliteApi($http, $q, $ionicLoading, DSCacheFactory) {

			var currentLeagueId;

			self.leaguesCache = DSCacheFactory.get("leaguesCache");
			self.leagueDataCache = DSCacheFactory.get("leagueDataCache");

			function getLeagues(){
				var deferred = $q.defer(),
						cacheKey = "leagues",
						leaguesData = self.leaguesCache.get(cacheKey);

				if (leaguesData) {
						console.log("Found data inside cache", leaguesData);
						deferred.resolve(leaguesData);
				} else {
					$http.get("http://elite-schedule.net/api/leaguedata")
						.success(function(data){
							console.log("Received data via HTTP");
							self.leaguesCache.put(cacheKey, data);
							deferred.resolve(data);
						})
						.error(function(){
							console.log("Error while making HTTP call.");
							deferred.reject();
						});
					}
					return deferred.promise;
			  }

			function getLeagueData(){
				var deferred = $q.defer(),
					cacheKey = "leagueData-" + currentLeagueId,
					leagueData = self.leagueDataCache.get(cacheKey);

				if (leagueData) {
					console.log("Found data in cache", leagueData);
					deferred.resolve(leagueData);
				} else {
					$ionicLoading.show({ template: 'Loading...'});

					$http.get("http://elite-schedule.net/api/leaguedata/" + currentLeagueId)
						.success(function(data, status){
							console.log("Received schedule data via HTTP.", data, status);
								self.leagueDataCache.put(cacheKey, data);
								$ionicLoading.hide();
							  deferred.resolve(data);
						})
						.error(function(){
							console.log("Error while making HTTP call.");
							$ionicLoading.hide();
							deferred.reject();
						});
					}
					return deferred.promise;
			  };

			function setLeagueId(leagueId){
				currentLeagueId = leagueId;
			}

			return {
				getLeagues: getLeagues,
				getLeagueData: getLeagueData,
				setLeagueId: setLeagueId
			};
	 };
})();
