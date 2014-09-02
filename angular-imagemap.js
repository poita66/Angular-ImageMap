'use strict';
angular.module('imagemap', []).directive('imageMap', function () {
    return {
        restrict: 'E',
        scope: {
            mapImageUrl: "=",
            mapHtml: "=",
            getAreaClick: "&areaClick"
        },
        template: '<div id="imageMapDiv"></div><img usemap="#Map" src="{{mapImageUrl}}" />',
        link: function (scope, elem) {
            scope.$watch('mapHtml', function () {
                if (angular.isDefined(scope.mapHtml)) {
                    var map = $('#imageMapDiv', elem[0]).html(scope.mapHtml).find('map');

                    map.attr('name', 'Map');
                    map.find('area').each(function (index, elem) {
                        $(elem).click(function (event) {
                            var areaClick = scope.getAreaClick();
                            areaClick(event);
                            event.preventDefault();
                        });
                    });
                    if (angular.isDefined($.fn.rwdImageMaps)) {
                        var img = $('img', elem[0]);
                        img.rwdImageMaps();
                        img.css('width', '100%');
                    }
                }
            });
        }
    };
});