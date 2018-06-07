
var promise = require('bluebird');
var request = promise.promisify(require('request'));
var cheerio = cheerio = require('cheerio');
var debug = require('debug')('torfeat:piratebay');

var provider = function (options) {


    var domain = 'https://pirateproxy.cam';

    if (options) {
        debug('options:', JSON.stringify(options));
        domain = options.domain || domain;
    }

    function search(searchText, callback) {

        var url = domain + '/search/' + searchText + '/0/99/0'

        debug('search url:', url);
        return request({ uri: url })
            .then(function (response) {
                var $ = cheerio.load(response.body);
                var data = [];

                $('table#searchResult tr').each(function (index) {
                    if ($(this).find('a.detLink').text()) {
                        data[index] = {
                            title: $(this).find('a.detLink').text(),
                            link: domain + $(this).find('a.detLink').attr('href'),
                            seeds: $(this).children('td:nth-child(3)').text(),
                            peers: $(this).children('td:nth-child(4)').text(),
                            size: $(this).find('font.detDesc').text().match(/Size ([0-9.]+\s+([G|M|K][i])?[B])/)[1],
                            date: $(this).find('font.detDesc').text().match(/Uploaded (.+?),/)[1],
                            file: $(this).find('a[href^="magnet"]').attr('href')
                        }
                    }
                });

                return promise.resolve(data.slice(1)).asCallback(callback);
            }).catch(function (error) {
                return promise.reject(error).asCallback(callback);
            });
    }

    return {
        search: search
    }
}

module.exports = function (options) {
    return new provider(options);
}