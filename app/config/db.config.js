import mongoose from "mongoose";
const serverURL =
  "mongodb+srv://<username>:<password>@cluster0.hjcm0.mongodb.net/<dbName>?retryWrites=true&w=majority";

const connect = async () => {
  try {
    await mongoose.connect(serverURL);
    console.log("Connected to database server");
  } catch (error) {
    console.log("Fail to connect to database server: " + error);
  }
};

export default connect;
