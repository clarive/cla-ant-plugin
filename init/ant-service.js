var reg = require("cla/reg");

reg.register('service.ant.task', {
    name: _('Ant task'),
    icon: '/plugin/cla-ant-plugin/icon/ant.svg',
    form: '/plugin/cla-ant-plugin/form/ant-service-form.js',
    rulebook: {
        moniker: 'ant_task',
        description: _('Executes Ant commands'),
        required: [ 'server', 'command', 'path'],
        allow: ['server', 'command', 'path', 'custom_args', 'user', 'errorType'],
        mapper: {
            'server':'antServer',
            'custom_args':'custom'
        },
        examples: [{
            ant_task: {
                server: 'ant_server',
                user: 'clarive_user',
                command: 'custom',
                path: "/projects/ant_project/",
                custom_args: ['-version'],
                errorType: "fail"
            }
        }]
    },
    handler: function(ctx, params) {

        var reg = require('cla/reg');
        var fs = require('cla/fs');
        var log = require('cla/log');

        var server = params.antServer;
        var path = params.path || "";
        var errors = params.errors || 'fail';
        var command = params.command || "";
        var customParams = params.custom;
        var fullCommand = "";
        var user = params.user || "";


        if (server == "") {
            log.fatal(_("No server selected"));
        }

        function remoteCommand(params, command, server, errors, user) {
            var output = reg.launch('service.scripting.remote', {
                name: _('Ant task'),
                config: {
                    errors: errors,
                    server: server,
                    user: user,
                    path: command,
                    output_error: params.output_error,
                    output_warn: params.output_warn,
                    output_capture: params.output_capture,
                    output_ok: params.output_ok,
                    meta: params.meta,
                    rc_ok: params.rcOk,
                    rc_error: params.rcError,
                    rc_warn: params.rcWarn
                }
            });
            return output;
        }

        if (command == "custom") {
            fullCommand = "cd " + path + " && ant " + customParams.join(" ");
        } else if (command == "") {
            log.fatal(_("No option selected"));
        } else {
            fullCommand = "cd " + path + " && ant " + command + " " + customParams.join(" ");
        }

        log.info(_("Starting Apache Ant task"));
        var response = remoteCommand(params, fullCommand, server, errors, user);
        log.info(_("Apache Ant task finished"));
        return response.output;
    }
});