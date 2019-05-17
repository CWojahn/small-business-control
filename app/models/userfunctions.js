module.exports = function(sequelize,Sequelize){

	const userFunction = sequelize.define('userfunction',{
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		function: {
			type: Sequelize.STRING,
			notEmpty: true
		}
	});

	return userFunction;
}