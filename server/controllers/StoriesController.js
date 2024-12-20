const Stories = require('../modles/Stories');

const createstories = async (req, res) => {
    try {
        const StoriesData = new Stories(req.body);
        
        if(!StoriesData) {
            return res.status(404).json({msg: "Stories data not found"});
        }

        const saveData = await StoriesData.save();
        res.status(200).json(saveData);
    }
    catch(error) {
        res.status(500).json({error: error});
    }
}

const getAll = async (req, res) => {
    try {
        const StoriesData = await Stories.find();

        if(!StoriesData) {
            return res.status(404).json({msg: "Stories not found"});
        }

        res.status(200).json(StoriesData);
    }
    catch(error) {
        res.status(500).json({msg: "Something went wrong"});
    }
}

const getOne = async (req, res) => {
    try {
        const storyId = req.params.id;
        const storyExists = await Stories.findById(storyId);

        if (!storyExists) {
            return res.status(404).json({ msg: "Story not found" });
        }

        res.status(200).json(storyExists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const storyId = req.params.id;
        const updatedStory = await Stories.findByIdAndUpdate(storyId, req.body, { new: true });

        if (!updatedStory) {
            return res.status(401).json({ msg: "Story not found" });
        }

        res.status(200).json(updatedStory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteStory = async (req, res) => {
    try {
        const storyId = req.params.id;
        const deletedStory = await Stories.findByIdAndDelete(storyId);

        if (!deletedStory) {
            return res.status(404).json({ msg: "Story not found" });
        }

        res.status(200).json({ msg: "Story deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createstories,
    getAll,
    getOne,
    update,
    deleteStory
};
