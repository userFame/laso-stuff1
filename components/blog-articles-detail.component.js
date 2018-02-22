"use strict"

angular.module('client.layout').component('blogArticlesComponent', {
    templateUrl: 'client/components/blog-articles-detail/blog-articles-detail-template.html',
    controller: 'blogArticlesComponentController as bacc',
    bindings: {
        blogArticle: '<'
    }
})

angular.module('client.layout').controller('blogArticlesComponentController', BlogArticlesComponentController)

BlogArticlesComponentController.$inject = ['$state','$sanitize', '$log', '$sce']

function BlogArticlesComponentController ($state, $sanitize, $log, $sce) {
    const vm = this
    vm.$onInit = _init

    function _init () {
         vm.blogArticle.articleContent = $sanitize(vm.blogArticle.articleContent)
         vm.blogArticle.articleContent = $sce.trustAsHtml(vm.blogArticle.articleContent)
    }
}
