import userModel from "../model/userModel.js";

const addToCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const itemId = req.body.itemId;

        // Find user and retrieve cart data
        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}; // Initialize cartData if it doesn't exist

        // Update cart item quantity
        if (!cartData[itemId]) {
            cartData[itemId] = 1; // Add item to cart
        } else {
            cartData[itemId] += 1; // Increment item quantity
        }

        // Update user document with new cartData
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Error adding to cart. Please try again." });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const itemId = req.body.itemId;

        // Find user and retrieve cart data
        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}; // Initialize cartData if it doesn't exist

        // Check if item exists in cart and decrement quantity
        if (cartData[itemId] && cartData[itemId] > 0) {
            cartData[itemId] -= 1; // Decrement item quantity
        } else {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }

        // Update user document with updated cartData
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ success: false, message: "Error removing from cart. Please try again." });
    }
};

const getCart = async (req, res) => {
    try {
        const userId = req.body.userId;

        // Find user and retrieve cart data
        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}; // Initialize cartData if it doesn't exist

        res.json({ success: true, cartData });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ success: false, message: "Error fetching cart. Please try again." });
    }
};

export { addToCart, removeFromCart, getCart };
