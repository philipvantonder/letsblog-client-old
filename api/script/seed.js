const roleModel = require('../models/roles');
// const userRolesModel = require('../models/userRoles');

async function generateRoles() {
	
	const rolesArr = [{ name: 'Moderator' }, { name: 'Admin' }, { name: 'Test' }];
	
	let added = false;
	
	for (newRole of rolesArr) {
		
		console.log(newRole.name);
		
		const role = await roleModel.findOne({ name: newRole.name });

		console.log("awe");
		console.log(role);
		
		// if (!role) {

			// console.log(newRole.name);

			// rolesModelObj = new RoleModel({
			// 	name: newRole.name
			// });
			
			// rolesModelObj.save();

			// console.log(`New Role added: ${newRole.name}`);

			// added = true;
			
		// }

	}

	if (!added) {
		console.log("There was no new Roles added.");
	}

}

generateRoles();

// userRolesModelObj = new userRolesModel({
// 	user: "5e9b2503ee770d423cdb48a6",
// 	role: "5eda845c653add4ac0c04a70"
// });

// userRolesModelObj.save();