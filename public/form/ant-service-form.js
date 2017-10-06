(function(params) {

    var data = params.data;

    var antServerCombo = Cla.ui.ciCombo({
        name: 'antServer',
        role: 'Server',
        fieldLabel: _('Server'),
        value: data.antServer || '',
        allowBlank: false,
        with_vars: 1
    });

    var commandComboBox = Cla.ui.comboBox({
        name: 'command',
        fieldLabel: _('Command'),
        data: [
            ['-buildfile',_('Build file')],
            ['-projecthelp',_('Project help')],
            ['-diagnostics',_('Diagnostics')],
            ['-debug',_('Debug')],
            ['-lib',_('Lib')],
            ['custom',_('Custom command')]
        ],
        value: data.command || '-buildfile',
        allowBlank: false,
        anchor: '100%',
        singleMode: true
    });

    var customParams = Cla.ui.arrayGrid({
            fieldLabel: _('Custom commands or arguments'),
            name: 'custom',
            value: data.custom,
            description: _('Custom commands or arguments'),
            default_value: '.'
    });

    var pathText = Cla.ui.textField({
            name: 'path',
            fieldLabel: _('Project Path'),
            value: data.path || '',
            allowBlank: false
        });


    var errorBox = Cla.ui.errorManagementBox({
        errorTypeName: 'errors',
        errorTypeValue: data.errors || 'fail',
        rcOkName: 'rcOk',
        rcOkValue: data.rcOk,
        rcWarnName: 'rcWarn',
        rcWarnValue: data.rcWarn,
        rcErrorName: 'rcError',
        rcErrorValue: data.rcError,
        errorTabsValue: data
    })

    var panel = Cla.ui.panel({
        layout: 'form',
        items: [
            antServerCombo,
            pathText,
            commandComboBox,
            customParams,
            errorBox
        ]
    });

    return panel;
})