/*
 * hljsVideo.js initializes a hls.js video player to play streaming video from a video server url that is compatible with the html5 <video> tag
 * It will allow for the toggleVideo to stop the current feed and start a new feed with a new url from outside the directive
 * Copyright (C) 2017 Jeff Patterson, Amanda Murphy, Paolo Villanueva, Patrick Overton, Connor Picken, Yun Cong Chen, Seth Amundsen
 * Michael Ohl, Mathew Tighe
 *
 * This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either vesion 2 of the License, or (at our option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY of FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
 *
 * ALL RIGHTS RESERVED
 * This program is licensed under the "GNU General Public License"
 * Please see the file COPYING in the source
 * distribution of this software for license terms.
 */

"use strict"

app.directive("hlsjsVideo", function() {
    return {
        restrict: 'E',
        transclude: false,  // Allows scope outside the directive to use directive variables and functions
        controller: ['$scope', 'config', function hlsjsVideoController($scope, config) {
            // Set the current feed to the configured default feed index
            $scope.currentFeed = config.defaultFeed;

            // The video player is initialized and the default video is loaded and played
            if(Hls.isSupported()) {
                $scope.video = document.getElementById('video');
                $scope.hls = new Hls(config.hlsConfig);
                $scope.hls.attachMedia($scope.video);
                $scope.hls.on(Hls.Events.MEDIA_ATTACHED,function() {
                    $scope.hls.loadSource(config.videoFeeds[$scope.currentFeed]);
                    $scope.hls.on(Hls.Events.MANIFEST_PARSED, function() {
                        video.play();
                    });
                });
            }

            // Loads a new video feed url from the array of feeds.
            $scope.toggleVideo = function () {
                if(Hls.isSupported()) {
                    $scope.hls.destroy();
                    $scope.hls = new Hls(config.hlsConfig);
                    $scope.hls.attachMedia($scope.video);
                    $scope.hls.on(Hls.Events.MEDIA_ATTACHED,function() {
                        $scope.hls.loadSource(config.videoFeeds[++$scope.currentFeed%config.numFeeds]);
                        $scope.hls.on(Hls.Events.MANIFEST_PARSED, function() {
                            video.play();
                        });
                    });
                }
            };
        }],
        templateUrl: 'directives/hlsjsVideo.html'
    }
});
