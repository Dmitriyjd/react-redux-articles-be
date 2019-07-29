const mongoose = require('mongoose');

const schema = mongoose.Schema( {
	id: mongoose.Schema.Types.ObjectId,
	title: {
		type: String,
		required: true,
		minlength: 1,
	},
	body: {
		type: String,
		required: true,
		minlength: 1,
	},
	updated_at: Date,
	created_at: Date,
}, {
	versionKey: false
}
);

const Article = mongoose.model('Article', schema);

async function findArticles(page, limit){
	try {
		return await Article.find({ }, null, { limit, skip: (page - 1) * limit });
	} catch (error) {
		return error
	}
}

async function createArticle(userData) {
	try {
		return await Article.create(userData);
	} catch (error) {
		return error
	}
}

async function findArticleById(id) {
	try {
		return await Article.findOne({ _id: id })
	} catch (error) {
		return error
	}
}

async function updateArticleById(id, newData) {
	try {
		return await Article.findOneAndUpdate({ _id: id }, newData)
	}catch (error) {
		return error;
	}
}

async function deleteArticleById(id) {
	try {
		return await Article.findOneAndDelete({_id: id})
	} catch (error) {
		return error
	}
}

module.exports = { createArticle, findArticleById, updateArticleById, findArticles, deleteArticleById };
