import { initDB } from "./database/initDB.js";
import { app } from "./app.js";

import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 8000

initDB()
.then(() => {
    app.listen(PORT, () =>{
        console.log(`Server is running on http://localhost:${PORT}`);
        
    })
})
.catch((err) =>{
    console.log("Supabase initialization failed:", err.message);
})