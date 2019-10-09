const charset = require('superagent-charset');
const request = charset(require('superagent'));
const cheerio = require('cheerio');
const MovieUrl = require('../../app/models/movieUrl');

const BASE_URL = 'https://www.dytt8.net/';

// @TODO: movie details
