///<reference path="typings/angular.d.ts" />
///<reference path="typings/angular-sanitize.d.ts" />
///<reference path="typings/angular-animate.d.ts" />
var Manoir;
(function (Manoir) {
    var TodoApp;
    (function (TodoApp) {
        class DefaultPage {
            constructor($scope, $http, $timeout) {
                this.scope = $scope;
                this.http = $http;
                this.$timeout = $timeout;
                this.scope.Events = this;
                this.scope.Loading = false;
                let self = this;
                this.RefreshData();
                setInterval(function () { self.RefreshData(); }, 15000);
            }
            RefreshData() {
                let self = this;
                let sc = self.scope;
                sc.Loading = true;
                let src = sc.Search;
                let params = "";
                let url = "api/PrivateChatRefresh?ts=" + (new Date).getTime() + "&channel=" + sc.CurrentChannel;
                fetch(url)
                    .then(res => res.json())
                    .then(json => {
                    sc.CurrentMessages = json;
                    sc.Loading = false;
                    sc.$applyAsync(function () { });
                });
            }
        }
        TodoApp.DefaultPage = DefaultPage;
    })(TodoApp = Manoir.TodoApp || (Manoir.TodoApp = {}));
})(Manoir || (Manoir = {}));
var theApp = angular.module('TodoApp', []);
theApp.controller('DefaultPage', Manoir.TodoApp.DefaultPage);
theApp.filter('trustAsHtml', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html);
    };
});
//# sourceMappingURL=TodoApp.js.map