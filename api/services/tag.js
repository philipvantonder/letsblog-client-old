const TagModel = require('../models/tag');

module.exports = {

	create: async (postDTO) => {

		const checkTag = await TagModel.findOne({ name: postDTO.name });

		if (checkTag) {
			return { code: 1, message: 'Tag already exists' };
		}

		const tag = new TagModel({
			name: postDTO.name
		});

		await tag.save();

		return { code: 0, message: 'Tag have been added' };

	}

}