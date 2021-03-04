module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            username: {
                type: String,
                unique: true,
                allowNull: false,
                required: true,
            },
            age: {
                type: Number,
                min: [18, 'You need to be above 18'],
                max: [90, 'Sorry!'],
                required: false
            },
            password: {
                type: String,
                required: true
            }
        }, { timestamps: true }
    );
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const User = mongoose.model("user", schema);
    return User;
  };