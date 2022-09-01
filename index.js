const mongoose = require('mongoose')
const app = require('./src/server')
const {KEYS} = require('./src/common/config/configConstants')

mongoose
    .connect(KEYS.mongoURI,{
        // useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: true
    })
    .then(()=>{
        const PORT = process.env.PORT || 3000
        const server = app.listen(PORT, () => {
            console.log(`Kitchen sever started on port: ${PORT}`);
        })
    })