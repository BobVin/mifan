// Generated by CoffeeScript 1.7.1
Mifan.controller("homeReply", function($scope, $http) {
  var API, news;
  $scope.$emit("clearReplyRemind");
  API = $scope.API;
  $scope.content = "";
  $scope.newsCollect = [];
  news = {
    init: function() {
      $scope.getPage = news.get;
      return news.get(1);
    },
    get: function(page) {
      var cb, url;
      if ($scope.isPageLoading) {
        return false;
      }
      url = "" + API.commentme + $scope.privacyParamDir + "/page/" + page;
      if (IsDebug) {
        url = API.commentme;
      }
      $scope.$emit("onPaginationStartChange", page);
      cb = function(data) {
        var newsCollect, pageData, ret, _i, _len;
        ret = data['ret'];
        if (String(ret) === "100000") {
          newsCollect = data['result']['list'];
          for (_i = 0, _len = newsCollect.length; _i < _len; _i++) {
            news = newsCollect[_i];
            news.feedMod = "replyme";
            news["commentList"] = [news.comment];
          }
          $scope.newsCollect = newsCollect;
          pageData = data['result']['page'];
          if (pageData) {
            $scope.$emit("onPaginationGeted", pageData);
          }
          return $scope.dataLoaded = true;
        }
      };
      return $http.get(url).success(cb);
    }
  };
  return news.init();
});