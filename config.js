module.exports = {
    port: 8080,
    db: {
      production: "mongodb+srv://testuser:Test1234@cluster0.y0clo.mongodb.net/StoreDB?retryWrites=true&w=majority",
      development: "mongodb://localhost/devhasastore",
      test: "mongodb://localhost:27017/testhasastore",
    },
    dbParams: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
};