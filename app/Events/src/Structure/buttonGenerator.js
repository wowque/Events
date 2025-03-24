const appearance = require('../../../../appearance.json'); 


async function conecting() {

    function customButton(style, label, emoji, customId, disabled) {

        if (disabled == true) disabled = false;
        else disabled = true;

        return {
            type: 1,
            components: [
                {
                    type: 2, 
                    style: style,
                    emoji: emoji, 
                    label: label,
                    custom_id: customId,
                    disabled: Boolean(disabled)
                }
            ]  
        };
    
    };

    function buttonsYesNo(customIds, disabled) {

        if (disabled == true) disabled = false;
        else disabled = true;

        return {
            type: 1,
            components: [
                {
                    type: 2, 
                    custom_id: customIds + 'Yes',
                    style: appearance.buttons_menu.Default.styleyes,
                    emoji: appearance.buttons_menu.Yes.emoji, 
                    disabled: Boolean(disabled)
                }
            ]  
        }, {
            type: 1,
            components: [
                {
                    type: 2, 
                    custom_id: customIds + 'No',
                    style: appearance.buttons_menu.Default.styleno,
                    emoji: appearance.buttons_menu.No.emoji, 
                    disabled: Boolean(disabled)
                }
            ]  
        };
    
    };

    function menuUser(customId, emoji, placeholder, disabled) {

        if (disabled == true) disabled = false;
        else disabled = true;

        return {
            type: 1,
            components: [
                {
                    type: 5,
                    custom_id: customId,
                    emoji: emoji || appearance.buttons_menu.menuUser.emoji, 
                    placeholder: placeholder || appearance.buttons_menu.menuUser.defaultTitle, 
                    disabled: Boolean(disabled)
                }
            ]  
        };
    
    };

    function menuRole(customId, emoji, placeholder, disabled) {

        if (disabled == true) disabled = false;
        else disabled = true;

        return {
            type: 1,
            components: [
                {
                    type: 6,
                    custom_id: customId,
                    emoji: emoji || appearance.buttons_menu.menuRole.emoji, 
                    placeholder: placeholder || appearance.buttons_menu.menuRole.defaultTitle, 
                    disabled: Boolean(disabled)
                }
            ]  
        };
    
    };
    
    function menuChannel(customId, emoji, placeholder, disabled) {

        if (disabled == true) disabled = false
        else disabled = true;

        return {
            type: 1,
            components: [
                {
                    type: 8,
                    custom_id: customId,
                    emoji: emoji || appearance.buttons_menu.menuChannel.emoji, 
                    placeholder: placeholder || appearance.buttons_menu.menuChannel.defaultTitle, 
                    disabled: Boolean(disabled)
                }
            ]  
        };
    
    };
    
    function pageChange(disabledLeft, removal, disabledRight, customId, customIdBack) {

        if (disabledLeft == true) disabledLeft = false;
        else disabledLeft = true;

        if (disabledRight == true) disabledRight = false;
        else disabledRight = true;
        
        if (removal == true) {

            return {
                type: 2, 
                custom_id: customId + 'Left',
                style: appearance.buttons_menu.Default.style,
                emoji: appearance.buttons_menu.Left.emoji, 
                disabled: Boolean(disabledLeft)
            },
            {
                type: 2, 
                custom_id: customId + 'Exit',
                style: appearance.buttons_menu.Exit.style,
            },
            {
                type: 2, 
                custom_id: customId + 'Right',
                style: appearance.buttons_menu.Default.style,
                emoji: appearance.buttons_menu.Right.emoji, 
                disabled: Boolean(disabledRight)
            };
                
        }
        
        else if (customIdBack) {

            return {
                type: 1,
                components: [
                     {
                        type: 2, 
                        custom_id: customId + 'Left',
                        style: appearance.buttons_menu.Default.style,
                        emoji: appearance.buttons_menu.Left.emoji, 
                        disabled: Boolean(disabledLeft)
                    },
                    {
                        type: 2, 
                        custom_id: customId + 'Right',
                        style: appearance.buttons_menu.Default.style,
                        emoji: appearance.buttons_menu.Right.emoji, 
                        disabled: Boolean(disabledRight)
                    },                                
                    {
                        type: 2, 
                        style: appearance.buttons_menu.Back.style, 
                        label: 'Назад', 
                        custom_id: customIdBack
                    }
                ]
            };
        
        }

        else if (!customIdBack) {

            return {
                type: 1,
                components: [
                     {
                        type: 2, 
                        custom_id: customId + 'Left',
                        style: appearance.buttons_menu.Default.style,
                        emoji: appearance.buttons_menu.Left.emoji, 
                        disabled: Boolean(disabledLeft)
                    },
                    {
                        type: 2, 
                        custom_id: customId + 'Right',
                        style: appearance.buttons_menu.Default.style,
                        emoji: appearance.buttons_menu.Right.emoji, 
                        disabled: Boolean(disabledRight)
                    }
                ]
            };
        
        }

    };


    module.exports.customButton = customButton;
    module.exports.buttonsYesNo = buttonsYesNo;
    module.exports.menuChannel = menuChannel;
    module.exports.pageChange = pageChange;
    module.exports.menuUser = menuUser;
    module.exports.menuRole = menuRole;
    
};

conecting ();