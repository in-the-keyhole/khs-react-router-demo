const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const igdb = require('igdb-api-node').default

const client = igdb('a5459455d670bd3cc53f1693a486ab16')

app.get('/games', cors(corsOptions), (req, res) => {
  if (!req.query.q) {
    res.send(null)
    return
  }
  client
    .games(
      {
        search: req.query.q,
        limit: 1 // Limit to 5 results
      },
      ['name', 'url', 'summary', 'cover', 'rating']
    )
    .then(response => {
      // response.body contains the parsed JSON response to this query
      const result = response.body && response.body[0]
      result.imageUrl = client.image(
        {
          cloudinary_id: result.cover.cloudinary_id
        },
        'logo_med',
        'png'
      )
      res.send(result)
    })
    .catch(error => {
      throw error
    })
})

app.listen(1338, () => console.log('Games detail endpoint listening on port 1338!'))
