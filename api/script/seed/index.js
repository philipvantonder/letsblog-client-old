const roleModel = require('../../models/roles');

module.exports = {
	
	generateRoles: async (req, res) => {
		
		res.send('Seeding Roles...');

		const rolesArr = [{ name: 'Moderator' }, { name: 'Admin' }, { name: 'Test' }];
		
		for (let newRole of rolesArr) {
			
			const role = await roleModel.findOne({ name: newRole.name });
			
			let roleAdded = false;
			if (!role) {
				roleAdded = true;
				
				rolesModelObj = new roleModel({
					name: newRole.name
				});
				
				rolesModelObj.save();
				
				console.log(`New Role added: ${newRole.name}`);
			}
			
			if (!roleAdded) {
				console.log(`There was no new roles added`);
				process.exit();
			}
		}
	}
}