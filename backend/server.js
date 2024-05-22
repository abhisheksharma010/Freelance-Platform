const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./config.js/db");


dotenv.config();

connectDb();
console.log("hellod");

const PORT = process.env.PORT | 8080;

const userRouter = require("./routes/userRoutes");
const contractRouter = require("./routes/contractRoutes");
const proposalRouter = require("./routes/proposalRoutes");
const authRouter = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/contracts', contractRouter);
app.use('/proposals', proposalRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Chl raha hai ${PORT}`);
});
