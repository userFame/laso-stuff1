"use strict"

angular.module('client.layout').component('sideBarComponent', {
    templateUrl: 'client/components/blog-articles-detail/side-bar-component/side-bar.html',
    controller: 'sideBarComponentController as sbcc',
})

angular.module('client.layout').controller('sideBarComponentController', SideBarComponentController)

SideBarComponentController.$inject = ['$log', 'blogArticleService'] 

function SideBarComponentController ($log, blogArticleService) {
    const vm = this
    vm.$onInit = _init
    vm.recent = null

    vm.getRecent = _getRecent

    function _init () {
        _getRecent()
    }

    function _getRecent () {
        blogArticleService.read5recent()
            .then(data => {
                vm.recent = data.items
                $log.log(vm.recent)
            })
            .catch(err => $log.log(err))
    }

}