const express = require('express');
const cors = require('cors')
const dotenv = require("dotenv");
const connection = require("./config/database");
const contactRouter = require('./routes/contactRoute');
const authRouter = require('./routes/authRoute');
const blogRouter  = require('./routes/blogRoute');
const categoryRouter = require("./routes/categoryRoute")
const paymentRoute = require("./routes/paymentRoute")
const servicePageRoute = require("./routes/servicePageRoute")
const dashboardRoute = require("./routes/dashBoard")
const subAdminRoute = require("./routes/subAdminRoutes")
const staticContentRoute = require("./routes/staticContentRoute")
const careerRoute = require('./routes/careerRoute')
dotenv.config();
const PORT = process.env.PORT || 3300;
const app = express();
const path = require('path');
app.use(express.json())
app.use(cors());

// Serve uploaded files (PDFs, docs) directly from /uploads folder
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));


app.use("/contact",contactRouter)
app.use("/auth",authRouter)
app.use("/blog", blogRouter)
app.use("/category", categoryRouter)
app.use("/payment", paymentRoute)
app.use("/dashboard", dashboardRoute)
app.use("/service", servicePageRoute)
app.use("/subAdmin",subAdminRoute)
app.use("/staticContent",staticContentRoute)
app.use("/career",careerRoute)
app.get("/test", async (req, res) => {
    return res.status(200).send("Welcome to Microcode 🙋‍♂️");
  });
  

app.listen(PORT, async () => {
    try {
      await connection;
      console.log("MongoDB is connected.");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
    console.log(`Server is running on PORT : ${PORT}`);
  });
  