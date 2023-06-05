import express from "express";
import router from "./routes/index.js";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use("/api", router);

const start = async () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();
