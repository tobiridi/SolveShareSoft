const softwareListService = require("../Services/softwareList.service");

const softwareListController = {
    getAllPublicSoftList: async (req, res, next) => {
        //get from database
        const dbResult = await softwareListService.getAllPublicList();

        if (dbResult) {
            return res.status(200).json({ status: 200, data: dbResult });
        }

        return res.status(500).json({ status: 500, message: `Can not get software list` });
    },

    createSoftList: async (req, res, next) => {
        return res.status(501).json({msg: 'create'});
    },

    updateSoftList: async (req, res, next) => {
        return res.status(501).json({msg: 'update'});
    },

    deleteSoftList: async (req, res, next) => {
        return res.status(501).json({msg: 'delete'});
    },
};


module.exports = softwareListController;