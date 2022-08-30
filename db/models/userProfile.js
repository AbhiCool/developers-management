const {Model} = require('objection');

class UserProfile extends Model {
    static get tableName() {
        return 'user_profile'; 
    }

    static get idColumn() {
        return 'user_id';
    }
}

module.exports = UserProfile;