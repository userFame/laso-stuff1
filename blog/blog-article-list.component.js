(function() {
    'use strict'

    angular.module('client.layout').component('blogNewsArticles', {
        templateUrl: 'client/anon-page/blog/blog-article-list.html',
        controller:'blogNewsController as bnc',
        bindings: {
            blogArticles: '<',
        }
    })

    angular.module('client.layout')
        .controller('blogNewsController', BlogNewsController)

    BlogNewsController.$inject = ['$state', '$log', '$sanitize', '$stateParams']

    function BlogNewsController($state, $log, $sanitize, $stateParams) {
        const vm = this

        vm.totalItems = null
        vm.currentPage = null
        vm.pageChanged = _pageChanged

        vm.$onInit = _init

        function _init () {
            vm.totalItems = vm.blogArticles.count
            console.log(`Total Items: ${vm.totalItems}`)
            vm.currentPage = $stateParams.page
        }

        function _pageChanged (currentPage) {
            $state.go(`blog`, { page: currentPage }, {reload: true})
            window.scrollTo(0, 0)
        }        
    }
})()