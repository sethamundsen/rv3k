/**
 * Copyright (c) 2017 Jeff Patterson, Amanda Murphy, Paolo Villanueva, Patrick Overton, Connor Picken, Yun Cong Chen, Seth Amundsen, Michael Ohl, Matthew Tighe
 * ALL RIGHTS RESERVED
 * [This program is licensed under the "GNU General Public License"]
 * Please see the file COPYING in the source
 * distribution of this software for license terms.
 */

'use strict'

angular.module("rvtk").directive("videojsVideo", function() {
    return {
        restrict: 'E',
        scope: {},
        controller: ['$scope', function videojsVideoController($scope) {
            var player = videojs('video2', {
                autoplay: true,
                loadingSpinner: false
            });
        }],
        templateUrl: 'directives/videojsVideo.html'
    }
});