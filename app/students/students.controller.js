(function() {
	'use strict';

	angular
		.module('ngInterview.students')
		.controller('StudentsController', StudentsController);

	StudentsController.$inject = ['StudentsService'];
	function StudentsController(StudentsService) {

		/**
		 * Model
		 */

		var vm = this;

		/**
		 * Initialization
		 */

		activate();

		/**
		 * Implementations
		 */

		function activate() {
			// Initialization code goes here
			StudentsService.getStudents()
			.then(function(result) {
				vm.students = result;
			});
		}
	}
})();
