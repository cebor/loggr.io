'use strict';

/**
 * @ngdoc service
 * @name loggrioApp.chartMenu
 * @description
 * # chartMenu
 * Service in the loggrioApp.
 */
angular.module('loggrioApp')
  .service('chartMenu', function () {

    function getDateStamp() {
      var date = new Date();
      var month = parseInt(date.getMonth()) + 1; // <- crazy mf!
      return date.getDate() + '.' + month + '.' + date.getFullYear();
    }

    this.contextMenu = function (charts) {
      return {
        print: {
          label: 'Drucken',
          icon: 'print',
          action :function (chartIndex) {
            charts[chartIndex].print();
          }
        },
        jpg: {
          label: 'Als JPG exportieren',
          icon: 'image',
          action: function (chartIndex) {
            var chart = charts[chartIndex].default.getHighcharts();
            var filename = chart.options.title.text + '_' + getDateStamp();
            chart.exportChart({
              type: 'image/jpg',
              filename: filename
            });
          }
        },
        png: {
          label: 'Als PNG exportieren',
          icon: 'image',
          action: function (chartIndex) {
            var chart = charts[chartIndex].default.getHighcharts();
            var filename = chart.options.title.text + '_' + getDateStamp();
            chart.exportChart({
              type: 'image/png',
              filename: filename
            });
          }
        },
        pdf: {
          label: 'Als PDF exportieren',
          icon: 'picture_as_pdf',
          action: function (chartIndex) {
            var chart = charts[chartIndex].default.getHighcharts();
            var filename = chart.options.title.text + '_' + getDateStamp();
            chart.exportChart({
              type: 'application/pdf',
              filename: filename
            });
          }
        },
        svg: {
          label: 'Als SVG exportieren',
          icon: 'photo_size_select_large',
          action: function (chartIndex) {
            var chart = charts[chartIndex].default.getHighcharts();
            var filename = chart.options.title.text + '_' + getDateStamp();
            chart.exportChart({
              type: 'image/svg+xml',
              filename: filename
            });
          }
        }
      };
    };

  });
