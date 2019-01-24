"use strict";

let axios = require('axios'),
    cheerio = require('cheerio'),
    $ = cheerio,
    { trimObj } = require("./util")

let scrapeSince = async (minDate, maxArticles = 100, startPage = 1) => {
  if (maxArticles <= 0) return []

  let articles = await scrapePage(startPage)

  if (articles.length === 0) return []

  let newerThanMinDate = articles.filter(a => a.date.getTime() > minDate.getTime()),
      done = newerThanMinDate.length !== articles.length
  
  return done
    ? newerThanMinDate
    : newerThanMinDate.concat(await scrapeSince(minDate, maxArticles - newerThanMinDate.length, startPage + 1))
}

let scrapePage = async page => {
  let response = await axios.get("https://www.sugarpub.com/news/previous/" + page),
      $ = cheerio.load(response.data)

  return $(".blog-post").get().map(scrapeArticle)
}

let scrapeArticle = article => {
  let el = $(article),
  
      title = el.find(".blog-title").text().trim(),

      link = "http://" + el.find(".blog-link").attr('href').slice(2),

      dateText = el.find(".blog-date").text(),
      [_, month, day, year] = dateText.match(/(\d+)\/(\d+)\/(\d\d\d\d)/),
      date = new Date(year, month - 1, day),

      imgSrc = el.find(".blog-content").find("img").attr('src'),

      image = imgSrc && (imgSrc[0] === '/' ? "http://www.sugarpub.com" + imgSrc : imgSrc)

  return trimObj({ title, link, date, image })
}

module.exports = scrapeSince