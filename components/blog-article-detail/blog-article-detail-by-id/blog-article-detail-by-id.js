"use strict"

angular.module('client.layout').component('blogArticlesComponentById', {
    templateUrl: 'client/components/blog-articles-detail/blog-article-detail-by-id/blog-article-detail-by-id.html',
    controller: 'blogArticlesComponentControllerById as baccbid',
    bindings: {
        article: '<',
    }
})

angular.module('client.layout').controller('blogArticlesComponentControllerById', BlogArticlesComponentControllerById)

BlogArticlesComponentControllerById.$inject = ['$sanitize', '$log', '$sce', '$stateParams']

function BlogArticlesComponentControllerById ($sanitize, $log, $sce, $stateParams) {
    const vm = this
    vm.$onInit = _init

    function _init () {
        window.scrollTo(0, 0)
        vm.article.articleContent = $sanitize(vm.article.articleContent)
        vm.article.articleContent = $sce.trustAsHtml(vm.article.articleContent)
    }
}
