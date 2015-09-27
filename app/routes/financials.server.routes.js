var financials = require('../../app/controllers/financials.server.controller');

module.exports = function(app){
	
	app.route('/api/financials')
		.post(financials.postResults)
		.get(financials.list);	
	
	app.route('/api/financials/:financialsId')
		.get(financials.read);
		
	app.param('financialsId', financials.dataById);
	

};
