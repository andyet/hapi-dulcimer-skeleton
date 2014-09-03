var dulcimer = require('dulcimer');

module.exports = new dulcimer.Model({
    title: {
        type: 'string'
    },
    user: {
        foreignKey: 'user',
    },
    state: {
        type: 'enum',
        values: ['open', 'closed'],
    },
},
{
    name: 'task',
});
