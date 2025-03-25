
export const updateProfile = async (req, res) => {
    try{
        const {image, ...data} = req.body;
        let updatedData = data;

        if(image) {
            if(image.startsWith("data:image")) {
                const result = await cloudinary.uploader.upload(image);
                updatedData.image = result.secure_url;
            }
        }

        const updatedUser = await User.findByIdAndUpdate(req.user._id, updatedData, {new: true});
        return res.status(200).json(updatedUser);
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}