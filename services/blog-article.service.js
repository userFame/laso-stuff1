/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#data-services */
(function () {
    'use strict'

    angular.module('client.services')
        .factory('blogArticleService', BlogArticleServiceFactory)

    BlogArticleServiceFactory.$inject = ['$http', '$q']

    function BlogArticleServiceFactory($http, $q) {
        return {
            readAll: _readAll,
            read5recent: _read5recent,
            readById: _readById,
            create: _create,
            update: _update,
            deactivate: _deactivate
        }

        function _readAll(page) {
            //default to page 1 if no page query provided
            if (!page) {
                page = 1
            }
            return $http.get(`/api/blog-articles?page=${page}`)
                .then(dateChange => convertAllDates(dateChange))
                .catch(postError)
        }

        function _read5recent() {
            return $http.get('/api/blog-articles/blog-entries/recent')
                .then(dateChange => convertAllDates(dateChange))
                .catch(postError)
        }

        function _readById(id) {
            return $http.get(`/api/blog-articles/${id}`)
                .then(dateChange =>
                    convertDate(dateChange)
                )
        }

        function _create(article) {
            return $http.post('/api/blog-articles', article)
                .then(postSuccess)
                .catch(postError)
        }

        function _update(article) {
            return $http.put(`/api/blog-articles/${article._id}`, article)
                .then(postSuccess)
                .catch(postError)
        }

        function _deactivate(id) {
            return $http.delete(`/api/blog-articles/${id}`)
                .then(console.log('successfully deleted'))
                .catch(postError)
        }

        function postSuccess(response) {
            return response.data
        }

        function convertAllDates(dateChange) {
            for (let x = 0; x < dateChange.data.items.blogArticles.length; x++) {
                dateChange.data.items.blogArticles[x].dateCreated = new Date(dateChange.data.items.blogArticles[x].dateCreated)     
                dateChange.data.items.blogArticles[x].dateModified = new Date(dateChange.data.items.blogArticles[x].dateModified)
                dateChange.data.items.blogArticles[x].datePublished = new Date(dateChange.data.items.blogArticles[x].datePublished)
                if (dateChange.data.items.blogArticles[x].dateDeactivated !== null) {
                    dateChange.data.items.blogArticles[x].dateDeactivated = new Date(dateChange.data.items.blogArticles[x].dateDeactivated)
                }

            }
            return dateChange.data
        }

        function convertDate(dateChange) {
            dateChange.data.item.dateCreated = new Date(dateChange.data.item.dateCreated)
            dateChange.data.item.dateModified = new Date(dateChange.data.item.dateModified)
            dateChange.data.item.datePublished = new Date(dateChange.data.item.datePublished)
            if (dateChange.data.item.dateDeactivated !== null) {
                dateChange.data.item.dateDeactivated = new Date(dateChange.data.item.dateDeactivated)
            }
            return dateChange.data
        }

        function postError(error) {
            console.log(error.data)
            return $q.reject(error.data)
        }
    }
})()

