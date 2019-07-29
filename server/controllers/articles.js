const Article = require('../models/article');

async function createArticle(req,res){
  if(!req.body.title){
    res
      .status(422)
      .json({
        "errors":[{
          "field": "Title",
          "error": "Title is Required",
        }]
      })
		return
  }
  if(!req.body.body){
    res
      .status(422)
      .json({
        "errors":[{
          "field": "Body",
          "error": "Body is Required",
        }]
      })
    return
  }
  try{
    const userData = await Article.createArticle({
      ...req.body,
      created_at: Date.now(),
      updated_at: Date.now(),
    });
    res
      .status(200)
      .json(userData);
  } catch (error) {
    res
      .status(404)
      .json(error)
  }
}

async function updateArticle(req,res){
	console.log(req.params.id)
	console.log(req.body)
	if(!req.body.title){
		res
			.status(422)
			.json({
				"errors":[{
					"field": "Title",
					"error": "Title is Required",
				}]
			})
    return
	}
	if(!req.body.body){
		res
			.status(422)
			.json({
				"errors":[{
					"field": "body",
					"error": "Body is Required",
				}]
			})
    return
	}
	try{
		const existingData = await Article.findArticleById(req.params.id);
		if(!existingData){
			res
				.status(404)
				.json("Not Found")
		}
		const userData = await Article.updateArticleById(req.params.id, {
			...req.body,
			created_at: existingData.created_at,
			updated_at: Date.now()
		});
		res
			.status(200)
			.json(userData)
	} catch (error) {
		res
			.status(404)
			.json({
				"errors":error,
			})
	}
}

async function getArticlesByQuery(req,res){
  try {
    const foundArticlesCount = (await Article.findArticles()).length;
    let page = req.query.page;
    let limit = req.query.limit;
    if(req.query.limit > 10) limit = 10;
    const data = await Article.findArticles(+page, +limit);
    const pagination = {
      count: foundArticlesCount,
      pageCount: Math.ceil(foundArticlesCount/limit),
      page: page,
      limit: limit,
    };
    res
      .status(200)
      .json({ data, pagination })
  } catch (error) {
  	res
			.status(404)
			.json(error)
	}
}

async function getArticleById(req,res){
	if(!req.params._id){
		res
			.status(422)
			.json({
				"errors":[{
					"field":"Id",
					"error":"Id is Required"
				}]
			})
	}
	try{
		const userData = await Article.findArticleById(req.params._id);
		res
			.status(200)
			.json(userData)
	} catch (error) {
		res
			.status(404)
			.json({
				"errors": [{
					"field": "Id",
					"error": "Not Found"
				}]
			})
	}
}

async function deleteArticleById(req,res){
	if(!req.params._id){
		res
			.status(422)
			.json({
				"errors":[{
					"field":"Id",
					"error":"Id is Required"
				}]
			});
		return
	}
	try {
		const userData = await Article.deleteArticleById(req.params._id);
		res
			.status(200)
			.json({ message: "deleted" })
	} catch (error) {
		res
			.status(404)
			.json({
				"errors": [{
					"field": "Id",
					"error": "Not Found"
				}]
			})
	}
}

module.exports = { createArticle, updateArticle, getArticlesByQuery, getArticleById, deleteArticleById };
