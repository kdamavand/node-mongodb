module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      price: Number,
      description: String,
      category: String,
      image: String
      
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Store = mongoose.model("store", schema);
  return Store;
};