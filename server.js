const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));
app.use(express.json({ strict: false })); // Ensure JSON is parsed correctly

// GET Method
app.get("/bfhl", (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// POST Method
app.post("/bfhl", (req, res) => {
    try {
        if (!req.body || !req.body.data || !Array.isArray(req.body.data)) {
            return res.status(400).json({ is_success: false, message: "Invalid JSON format" });
        }

        const data = req.body.data;
        const numbers = data.filter(item => !isNaN(item)).map(String);
        const alphabets = data.filter(item => isNaN(item) && typeof item === "string");
        const highestAlphabet = alphabets.length ? [alphabets.sort().pop()] : [];

        res.json({
            is_success: true,
            user_id: "22bcs17240_cuchd",
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

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
