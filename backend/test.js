const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://scoopsyadmin:Scoopsy12345@cluster-1.mytg6ev.mongodb.net/scoopsy?retryWrites=true&w=majority&appName=Cluster-1"
)
.then(() => {
  console.log("CONNECTED");
  process.exit(0);
})
.catch(err => {
  console.error(err);
  process.exit(1);
});