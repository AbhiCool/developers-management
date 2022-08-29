const {Model} = require('objection');

class UserProfile extends Model {
    static get tableName() {
        return 'user_profile'; 
    }
}

module.exports = UserProfile;