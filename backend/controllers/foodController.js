import foodModel from "../model/foodModel.js";
import fs from 'fs';

const addFood = async (req, res) => {
    let image_filename = req.file ? req.file.filename : null; // Ensure req.file exists before accessing filename

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ success: false, message: "Error adding food. Please try again." });
    }
};

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error("Error listing food:", error);
        res.status(500).json({ success: false, message: "Error listing food. Please try again." });
    }
};

const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);

        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // Delete image file from uploads directory
        if (food.image) {
            fs.unlink(`uploads/${food.image}`, (err) => {
                if (err) {
                    console.error("Error deleting food image:", err);
                }
            });
        }

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.error("Error removing food:", error);
        res.status(500).json({ success: false, message: "Error removing food. Please try again." });
    }
};

export { addFood, listFood, removeFood };
