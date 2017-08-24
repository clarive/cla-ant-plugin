var reg = require("cla/reg");

reg.register('service.ant.task', {
    name: _('Ant task'),
    icon: '/plugin/cla-ant-plugin/icon/ant.svg',
    form: '/plugin/cla-ant-plugin/form/ant-service-form.js',
    handler: function(ctx, params) {

        var reg = require('cla/reg');
        var fs = require('cla/fs');
        var log = require('cla/log');

        var server = params.antServer;
        var path = params.path;
        var errors = params.errors || 'fail';
        var command = params.command;
        var customParams = params.custom;
        var fullCommand = "";

        if (server == "") {
            log.fatal(_("No server selected"));
        }

        function remoteCommand(params, command, server, errors) {
            var output = reg.launch('service.scripting.remote', {
                name: _('Ant task'),
                config: {
                    errors: errors,
                    server: server,
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
        var response = remoteCommand(params, fullCommand, server, errors);
        log.info(_("Apache Ant task finished"));
        return response.output;
    }
});