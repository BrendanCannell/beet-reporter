"use strict";

let mongoose = require('mongoose'),
    db = require("./models"),
    MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines"

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true })

let express = require('express'),
    path = require('path'),
    PORT = process.env.PORT || 3001

let catchErrors = fn => async (req, res) => {
  try {
    await fn(req, res)
  } catch (e) {
    console.error(e)
    res.sendStatus(500)
  }
}

express()
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(express.static(path.resolve(__dirname, '../react-ui/build')))

  .get("/api", catchErrors(async (req, res) => {
    let articles = await db.Article.find()
    let notes = await db.Note.find()

    res.json({articles, notes})
  }))

  .post("/api/notes", catchErrors(async (req, res) => {
    let note = await db.Note.create(req.body)

    res.json(note)
  }))

  .put("/api/notes/:id", catchErrors(async (req, res) => {
    let updated = await db.Note.findOneAndUpdate(
      {_id: req.params.id},
      {body: req.body.body},
      {new: true})

    res.json(updated)
  }))

  .delete("/api/notes/:id", catchErrors(async (req, res) =>
    await db.Note.findByIdAndDelete(req.params.id)
      ? res.end()
      : res.sendStatus(500)
  ))

  .put("/api/articles", catchErrors(async (req, res) => {
    console.log("scraping...")

    let latestArticle = (await db.Article.find().sort({ date: 'desc' }).limit(1))[0],

        minScrapeDate = latestArticle ? latestArticle.date : new Date(0),

        newArticles = await require("./scrapeSince")(minScrapeDate)

    await db.Article.create(newArticles)
    res.end()
  }))

  .get('*', (req, res) => 
    res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'))
  )

  .listen(PORT, () => console.log(`Listening on port ${PORT}...`))