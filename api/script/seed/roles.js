const roleModel = require('../../models/roles');

module.exports = {
	
	generateRoles: async () => {
		
		const rolesArr = [{ name: 'Moderator' }, { name: 'Admin' }, { name: 'Test' }];
		
		for (newRole of rolesArr) {
			
			console.log(newRole.name);
			
			// const role = await roleModel.findOne({ name: newRole.name });
			
			// console.log(role);

			// console.log("awe");
			
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
					
	}
				
}