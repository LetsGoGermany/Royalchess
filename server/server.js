import app from './src/app.js'

const PORT = process.env.PORT || 1844

app.listen(PORT, () => {
    console.log(`Server startet on PORT: ${PORT}`)
})