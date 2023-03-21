const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose.connect(`mongodb+srv://aditya_sinha:adityasinha@cluster0.p5r28rw.mongodb.net/TaskManagement?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log("err", err);
    }
    console.log('Connected')
})