import User from "../models/userModel.js";

export const getMatches = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).populate("matches", "name image");
        return res.status(200).json(user.matches);
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}

export const getUserProfiles = async (req, res) => {
    try{
        const currentUser = await User.findById(req.user.id)

        const users = await User.find({
            $and: [
                { _id: { $ne: currentUser.id } },
                { _id: { $nin: currentUser.likes } },
                { _id: { $nin: currentUser.dislikes } },
                { _id: { $nin: currentUser.matches } },
                {
                    gender: currentUser.genderPreference === "both" ? { $in: ["male", "female"]} : currentUser.genderPreference
                },
                {
                    genderPreference: {$in: [currentUser.gender, "both"]}
                }
            ]
        })

        return res.status(200).json(users);
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}

export const swipeLeft = async (req, res) => {
    try{
        const { dislikedUserId } = req.params;
        const currentUser = await User.findById(req.user.id);

        if(!currentUser.dislikes.includes(dislikedUserId)) {
            currentUser.dislikes.push(dislikedUserId);
            await currentUser.save();
        }

        return res.status(200).json(currentUser);
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}

export const swipeRight = async (req, res) => {
    try{
        const { likedUserId } = req.params;
        const currentUser = await User.findById(req.user.id);
        const likedUser = await User.findById(likedUserId);

        if(!likedUser) {
            return res.status(400).json({message: "User not found"});
        }

        if(!currentUser.likes.includes(likedUserId)) {
            currentUser.likes.push(likedUserId);
            await currentUser.save();

            if(likedUserId.includes(currentUser.id)) {
                currentUser.matches.push(likedUserId);
                likedUser.matches.push(currentUser.id);

                await Promise.all(
                    [
                        await currentUser.save(),
                        await likedUser.save(),
                    ]
                )
            }

            return res.status(200).json(currentUser);
        }

        return res.status(200).json(currentUser);
    }catch(error) {
        return res.status(500).json({message: error.message})
    }
}