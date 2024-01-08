const mongoose = require("mongoose");

module.exports.dbConnect = async () => {
  try {
    const data = await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Mongodb connected with server running on : ${data.connection.host}`
    );
  } catch (error) {
    console.log(error.message);
  }
};
