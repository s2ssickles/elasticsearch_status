import uiModules from 'ui/modules';
import uiRoutes from 'ui/routes';

// Kibana version v4.5.4 does not have autoload available
import 'ui/share/styles';
import './less/main.less';
import overviewTemplate from './templates/index.html';
import detailTemplate from './templates/detail.html';

import chrome from 'ui/chrome';

uiRoutes.enable();
uiRoutes
.when('/', {
  template: overviewTemplate,
  controller: 'elasticsearchStatusController',
  controllerAs: 'ctrl'
})
.when('/index/:name', {
  template: detailTemplate,
  controller: 'elasticsearchDetailController',
  controllerAs: 'ctrl'
});

uiModules
.get('app/elasticsearch_status')
.controller('elasticsearchStatusController', function ($http) {
  $http.get('../api/elasticsearch_status/indices').then((response) => {
    this.indices = response.data;
  });
})
.controller('elasticsearchDetailController', function($routeParams, $http) {
  this.index = $routeParams.name;

  $http.get(`../api/elasticsearch_status/index/${this.index}`).then((response) => {
    this.status = response.data;
  });
});

//chrome
//.setNavBackground('#FF00FF')
//.addTab(
//    {
//        id: 'netdefense',
//        title: 'Network Defense'
//    }
//)

console.log("Tabs: " + chrome.getTabs())
