(function() {
	'use strict';

	angular
		.module('ngInterview.api.students')
		.service('StudentsService', StudentsService);

	StudentsService.$inject = ['$q', '$http'];
	function StudentsService($q, $http) {

		var studentsApiUrl = 'http://il-resume-api.azurewebsites.net/api/students';		

		/**
		 * Exposed functions
		 */
		this.getStudents = getStudents;

		/**
		 * Implementations
		 */

		function getStudents() {
			var defer = $q.defer();
			var counter = 0;
			var maxAttempts = 3;

			
			function getData() {
				$http({
					method: 'GET',
					url: studentsApiUrl
				}).then(
					function(result) {
						if (result.data[0].Id) {
							defer.resolve(result.data);
						} else {
							getData();
							counter++;
						};
					}, 
					function(err) {
						if (err.status === 503 && counter < maxAttempts) {
							getData();
							counter++;
						} else {
							defer.reject(err);
						}
					});
			};

			getData();

			return defer.promise;
		}
	}
})();
