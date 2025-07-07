export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUser = req.user;
        const filteredUsers = await User.find({
            _id: { $ne: loggedInUser._id }
        }).select("-password");

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.log("Error in getUserForSidebar controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const sendMessage = async (req, res) => {
    try {
        const {id: receiverId} = req.params;
        const {text, image} = req.body;
        const senderId = req.user._id;

        let imageUrl;

        if (image) {
            // upload image to cloudinary
           const uploadResponse = await cloudinary.uploader.upload(image);
           imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl 
        });

        await newMessage.save();

        // Emit the new message to the receiver's socket

        res.status(201).json(newMessage);   
    } catch (error) {
        console.log("Error in sendMessage controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};