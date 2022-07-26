
module.exports = {
    url : 'mongodb+srv://hrk01:GihfnPdgRDStLxYa@cluster0.p5qhb.mongodb.net/cluster0?retryWrites=true&w=majority',
    options: {
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
};

