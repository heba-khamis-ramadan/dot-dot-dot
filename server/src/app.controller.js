import connectDB from "./db/db.connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import userRouter from "./modules/user/user.controller.js";
import postRouter from "./modules/post/post.controller.js";
import { globalError, notFound } from "./utils/index.js";

const bootstrap = async (app, express, cors) => {
    // allow frontend to communicate
    app.use(cors({
        origin: "http://127.0.0.1:5500",
        allowedHeaders: ["Content-Type", "Authorization"]
    }));
    // parse JSON data
    app.use(express.json());

    // handle static files
    app.use("/uploads", express.static("uploads"));

    // connect to db
    await connectDB();

    //=== routers ===//
    //auth
    app.use("/auth", authRouter);
    //users
    app.use("/users", userRouter);
    //posts
    app.use("/posts", postRouter);

    // handle invalid req
    app.all("*",notFound);

    //=== global error handler ===//
    app.use(globalError);
};

export default bootstrap;