const {Model} = require('objection');
const UserProfile = require('./userProfile');

class Users extends Model {
    static get tableName() {
        return 'users'; 
    }

    static get idColumn() {
        return 'user_id';
    }

    static get relationMappings() {
        return {
            userProfile : {
                relation: Model.HasOneRelation,
                modelClass: UserProfile,
                join : {
                    from: 'users.user_id',
                    to : 'user_profile.user_id'
                }
            }
        }
    }
}

module.exports = Users;