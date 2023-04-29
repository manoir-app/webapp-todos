///<reference path="typings/angular.d.ts" />
///<reference path="typings/angular-sanitize.d.ts" />
///<reference path="typings/angular-animate.d.ts" />

module Manoir.TodoApp {

    interface IDefaultPageScope extends ng.IScope {
        Loading: boolean;
    }

    interface UserPresent {

    }

    export class DefaultPage {
        scope: IDefaultPageScope;
        $timeout: ng.ITimeoutService;
        http: any;
        constructor($scope: IDefaultPageScope, $http: any, $timeout: ng.ITimeoutService) {
            this.scope = $scope;
            this.http = $http;
            this.$timeout = $timeout;
            this.scope.Events = this;
            this.scope.Loading = false;
            let self = this;
            this.RefreshData();
            setInterval(function () { self.RefreshData(); }, 15000);
        }

        public RefreshData(): void {
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
                })
        }
         
    }
}

var theApp = angular.module('TodoApp', []);

theApp.controller('DefaultPage', Manoir.TodoApp.DefaultPage);
theApp.filter('trustAsHtml', function ($sce) {
    return function (html) {
        return $sce.trustAsHtml(html);
    } 
});
