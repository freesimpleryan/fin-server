var mongoose = require('mongoose'),
Financials = mongoose.model('Financials');

var getErrorMessage = function(err){
	if(err.errors){
		for(var errName in err.errors){
			if(err.errors[errName].message) return err.errors[errName].message;		
		}	
	}
	else{
		return 'Unknown server error';	
	}

};

exports.postResults = function(req, res){
	var financials = new Financials(req.body);
	
	financials.save(function(err){
			if(err){				
				return res.status(400).send({message:getErrorMessage(err)});			
			}
			else{
				res.json(financials);	
			}
	})
};

exports.renderData = function(req, res, next){
	return res.send({message: "renderData function"});
};

exports.read = function(req, res){
	res.json(req.financials);
};

exports.list = function(req, res){
	Financials.find().sort('-created')
	.exec(function(err, financials){
			if(err){
				return res.status(400).send({message:getErrorMessage(err)});		
			}
			else{
				res.json(financials);			
			}
	});
}

exports.dataById = function(req, res, next, id){
	Financials.findById(id)
	.exec(function(err, financials){
		if(err) return next(err);
		if(!financials) return next(new Error('Failed to load financials ' + id));
		
		req.financials = financials;
		next();	
	});
};