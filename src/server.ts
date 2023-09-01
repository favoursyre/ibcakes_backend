//This handles the file for the server

//Libraries -->
import express, {Application, Request, Response, NextFunction} from "express"
import mongoose from "mongoose"
import "dotenv/config";
import cors from "cors"
import pageRoutes from "./routes/pageRoute"
import adminRoutes from "./routes/adminRoute"
import userRoutes from "./routes/userRoute"
import bodyParser from 'body-parser';
import hbs from "handlebars"
import exphbs from "express-handlebars"
import path from "path"

//Commencing the code
const app: Application = express()
const PORT: number = Number(process.env.PORT);
//console.log("mongo: ", process.env.MONGO_URL)
const MONGO_URL: string = process.env.MONGO_URL!;

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//middleware
// app.engine(
//   'hbs',
//   exphbs({
//     extname: '.hbs',
//   })
// );
app.set('views', path.join(__dirname, 'emails'));
app.set('view engine', 'hbs');
app.use(bodyParser.json({ limit: "20mb" }))

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  //console.log("Middleware: ", req.path, req.method, res);
  next();
});

app.use(cors(corsOptions));

//routes
app.use("/", pageRoutes);
app.use("/", adminRoutes);
app.use("/", userRoutes);

//connect to db
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URL)
  .then(() => {
    //Listen for requests
    app.listen(PORT, () => {
      console.log(`MongoDB connected and Server has started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
