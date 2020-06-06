const userRolesModel = require('../models/userRoles');
const rolesModel = require('../models/roles');

module.exports = {

	getUserRolesById: async (id) => {

		const userRolesArr = await userRolesModel.find({ user: id });

		let userRoles = [];

		for (let userRole of userRolesArr) {

			let role = await rolesModel.findOne({ _id: userRole.role });

			userRoles.push(role.name.toLowerCase());

		}

		return { userRoles };

	}

};