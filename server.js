const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// GET Method
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST Method
app.post("/bfhl", (req, res) => {
    try {
        const { data } = req.body;
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: "Invalid input format" });
        }

        const numbers = data.filter(item => !isNaN(item)).map(String);
        const alphabets = data.filter(item => isNaN(item) && typeof item === "string");
        const highestAlphabet = alphabets.length ? [alphabets.sort().pop()] : [];

        res.json({
            is_success: true,
            user_id: "22bcs17240_cuchd",  // Change if needed
            email: "22bcs17240@cuchd.in",
            roll_number: "22BCS17240",
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, message: "Server error" });
    }
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});

