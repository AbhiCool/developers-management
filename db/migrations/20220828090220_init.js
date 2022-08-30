
exports.up = function(knex) {
  return knex.schema
    .createTable('users', (table) => {
        table.increments('user_id').primary();

        table.string('first_name', 50).notNullable();

        table.string('last_name', 50).notNullable();

        table.string('email_id', 50).notNullable().unique();

        table.string('phone', 10).unique();

        table.string('email_otp', 4).notNullable();

        table.string('phone_otp', 4).notNullable();

        table.boolean('email_otp_verified');

        table.boolean('phone_otp_verified');

        table.boolean('isAdmin')
    })
    .createTable('user_profile', (table) => {
        table.integer('user_id').references('user_id').inTable('users');

        table.string('profile_pic_url', 100);

        table.text('address');

        table.integer('age');

        table.enu('gender', ['M','F']);
       
        table.string('work_exp');
        
        table.string('present_company');
        
        table.string('current_ctc');

        table.enu('employment_status', ['Employed','Unemployed']);

        table.boolean('available_to_hire');
        
        table.boolean('available_to_freelance');

        table.string('company_applied_for');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('user_profile')
    .dropTableIfExists('users');
    
};
