'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.zoom
 * @description
 * # zoom
 * Service in the loggrioApp.
 */
angular.module('loggrioApp')
  .service('zoom', function () {
    var MONTH = 30 * 24 * 3600 * 1000;
    var WEEK = 7 * 24 * 3600 * 1000;
    var DAY = 24 * 3600 * 1000;
    var HOUR = 3600 * 1000;
    var LAST_5 = 5 * 60 * 1000;

    var SINGLE_STEP_RATIO = 0.25;

    function singleStep(min, max) {
      return (max - min) * SINGLE_STEP_RATIO;
    }

    this.ranges = [
      {
        name: 'M',
        value: MONTH
      },
      {
        name: 'W',
        value: WEEK
      },
      {
        name: 'T',
        value: DAY
      },
      {
        name: 'S',
        value: HOUR
      },
      {
        name: '5m',
        value: LAST_5
      }
    ];

    this.getZoomNavigation = function (charts) {
      return {
        selectRange: function (chartIndex, value) {
          var chart = charts[chartIndex].default.getHighcharts();
          if (!chart) {
            return;
          }
          var max = chart.series[0].xAxis.dataMax;
          var min = max - value;
          chart.xAxis[0].setExtremes(min, max);
        },
        zoomIn: function (chartIndex) {
          var chart = charts[chartIndex].default.getHighcharts();
          if (!chart) {
            return;
          }
          var extremes = chart.xAxis[0].getExtremes();
          var max = extremes.max;
          var min = extremes.min;
          chart.xAxis[0].setExtremes(min + singleStep(min,max), max - singleStep(min,max));
        },
        zoomOut: function (chartIndex) {
          var chart = charts[chartIndex].default.getHighcharts();
          if (!chart) {
            return;
          }
          var extremes = chart.xAxis[0].getExtremes();
          var max = extremes.max;
          var min = extremes.min;
          chart.xAxis[0].setExtremes(min - singleStep(min,max), max + singleStep(min,max));
        },
        navigateLeft: function (chartIndex) {
          var chart = charts[chartIndex].default.getHighcharts();
          if (!chart) {
            return;
          }
          var extremes = chart.xAxis[0].getExtremes();
          var max = extremes.max;
          var min = extremes.min;
          chart.xAxis[0].setExtremes(min - singleStep(min,max), max - singleStep(min,max));
        },
        navigateRight: function (chartIndex) {
          var chart = charts[chartIndex].default.getHighcharts();
          if (!chart) {
            return;
          }
          var extremes = chart.xAxis[0].getExtremes();
          var max = extremes.max;
          var min = extremes.min;
          chart.xAxis[0].setExtremes(min + singleStep(min,max), max + singleStep(min,max));
        },
        resetZoom: function (chartIndex) {
          var chart = charts[chartIndex].default.getHighcharts();
          if (!chart) {
            return;
          }
          chart.zoomOut();
        }
      };
    };

    this.shift = function (chart, lastPoint) {
      if (!chart) {
        return;
      }
      var extremes = chart.xAxis[0].getExtremes();
      var max = extremes.max;
      var min = extremes.min;
      var xData = chart.series[0].xData;
      var beforeLastPoint = xData[xData.length - 1];
      var diff = lastPoint - beforeLastPoint;
      chart.xAxis[0].setExtremes(min + diff, max + diff, false);
    };
  });
