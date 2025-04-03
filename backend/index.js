import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import path from 'path'
const __dirname = path.resolve()

const app = express()
const port = 3000

// Cors config
app.use(cors({ origin: '*' }))

// Default route
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Tell express to use fileUpload
app.use(fileUpload())

app.post('/fileupload', (req, res) => {
  // Get the file that was set to our field named "image"
  const { image } = req.files

  // If no image submitted, exit
  if (!image) return res.sendStatus(400)

  // Move the uploaded image to our files folder
  image.mv(__dirname + '/files/' + image.name)

  res.sendStatus(200)
})

// Start server
app.listen(port, () => {
  console.log(`File upload app listening on port ${port}`)
})
