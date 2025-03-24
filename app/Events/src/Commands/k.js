module.exports = async (client, appearance, config, db, args, argsF, interaction) => {
    // console.log(interaction.options._hoistedOptions);
};

module.exports.names = ['k'];
module.exports.interaction = {

    name: 'k',
    description: 'Подмигнуть игроку',
    options: [
        {

            name: 'направление',
            description: 'Выберите направление отстука',
            required: true,
            choices: [
                {
                    name: "Влево",
                    value: "left",
                },
                {
                    name: "Вправо",
                    value: "right",
                }
            ],
            type: 3

        },
        {

            name: 'количество',
            description: 'Введите количество стуков',
            required: true,
            max_value: 10,
            min_value: 1,
            type: 10

        },
    ],

    channel_types: 1,
    defaultPermission: true

};