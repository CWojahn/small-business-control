module.exports = function(sequelize,Sequelize){

	const Privilege = sequelize.define('privilege',{
		id: {
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER
		},

		privilege: {
			type: Sequelize.INTEGER,
			notEmpty: true
		}

	});

	return Privilege;
}