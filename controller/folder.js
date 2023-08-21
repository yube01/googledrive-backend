import { Folder } from "../model/folder.js";

export const getFolder = async (req, res) => {
  try {
    const uFolder = await Folder.find({ owner: req.params.owner });

    if (uFolder) {
      return res.status(200).json(uFolder);
    } else {
      return res.status(500).json("Folder has not been created");
    }
  } catch (error) {
    console.log(error);
  }
};


export const createFolder = async (req, res) => {
    try {
      const { folderName, owner } = req.body;
  
      let newFolderName = folderName;
      let counter = 1;
  
      while (true) {
        const existingFolder = await Folder.findOne({ folderName: newFolderName, owner });
  
        if (!existingFolder) {
          const newFolder = new Folder({ folderName: newFolderName, owner });
          const user = await newFolder.save();
          res.status(200).json("Folder created");
          break;
        }
  
        newFolderName = `${folderName} (${counter})`;
        counter++;
      }
    } catch (error) {
      console.log(error);
    }
  };
  

export const editFolder = async (req, res) => {
  try {
    const { id } = req.params;

    const { rename } = req.body;

    const edit = await Folder.updateOne(
      { _id: id },
      {
        $set: {
          folderName: rename,
        },
      }
    );

    if (!edit) return res.status(500).json("Folder not found");
    res.status(200).json("Folder name updated");
  } catch (error) {
    console.log(error);
  }
};

export const deleteFolder = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteFolder = await Folder.findByIdAndDelete(id);

    if (!deleteFolder) return res.status(500).json("Folder not found");

    res.status(200).json(deleteFolder);
  } catch (error) {
    console.log(error);
  }
};
