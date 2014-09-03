var dulcimer = require('dulcimer');

module.exports = new dulcimer.Model({
    name_given: {
        type: 'string'
    },
    name_family: {
        type: 'string'
    },
    name: {
        type: 'string',
        derive: function () {
            return [this.name_given, this.name_family].join(' ');
        },
    },
    username: {
        type: 'string',
        required: true,
    },
    email: {
        type: 'email',
        required: true,
    }
},
{
    name: 'user',
});
