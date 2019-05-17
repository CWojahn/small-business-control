module.exports = function(sequelize,Sequelize){

	const Areas = sequelize.define('areas',{
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		area: {
			type: Sequelize.STRING,
			notEmpty: true
		}
	});

	return Areas;
}