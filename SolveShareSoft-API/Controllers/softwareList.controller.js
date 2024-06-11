
const softwareListController = {
    getAllSoftList: async (req, res, next) => {
        return res.status(501).json({msg: 'get all'});
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