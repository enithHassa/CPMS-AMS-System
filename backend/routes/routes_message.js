const express = require('express');
const router = express.Router();
const Message = require('../models/model_message');

// Send a new message
router.post("/send", async (req, res) => {
    try {
        const { userId, userMsg, lawyerMsg } = req.body; // You can remove lawyerMsg too if it's not needed

        const newMessage = new Message({
            userId,
            userMsg,
            lawyerMsg // Remove this if you're not sending lawyer messages anymore
        });

        await newMessage.save();
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error sending message' });
    }
});

// Get all messages for a client
router.get("/getMessages/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        // Populate the userId field with the corresponding Client document
        const messages = await Message.find({ userId })
            .populate('userId', 'name email') // Specify the fields you want to populate
            .sort({ dateTime: 1 });

        res.status(200).json(messages);
    } catch (err) {
        console.error(err); // Log the error for better debugging
        res.status(500).json({ error: 'Error fetching messages' });
    }
});

// Delete a specific message by its ID
router.delete("/delete/:messageId", async (req, res) => {
    try {
        const { messageId } = req.params;
        await Message.findByIdAndDelete(messageId);
        res.status(200).json({ message: 'Message deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting message' });
    }
});

module.exports = router;
