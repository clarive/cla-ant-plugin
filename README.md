# Ant plugin

<img src="https://cdn.rawgit.com/clarive/cla-ant-plugin/master/public/icon/ant.svg?sanitize=true" alt="Ant Plugin" title="Ant Plugin" width="120" height="120">

Ant plugin will allow you to launch Apache Ant commands from a Clarive instance.

## What is Apache Ant

Apache Ant is a Java library and command-line tool whose mission is to drive processes described in build files as targets and extension points dependent upon each other.
The main known usage of Ant is the build of Java applications.

Ant can also be used effectively to build non Java applications, for instance C or C++ applications.
More generally, Ant can be used to pilot any type of process which can be described in terms of targets and tasks.


## Requirements

Apache Ant is needed in order for it to work properly .

## Installation

To install the plugin, place the cla-ant-plugin folder inside the `$CLARIVE_BASE/plugins`
directory in a Clarive instance.

## Ant task

The various parameters are:

- **Server (variable name: server)** - Choose the server where you wish to execute the command. 
- **User (user)** - User which will be used to connect to the server.
- **Project path (path)** - Directory for the `build.xml` file.
- **Command (command)** - Here you will have different commands to launch with the service or write a custom one.
   - **Build file ("-buildfile")** - Takes the specified file in the arguments box to build the project.
   - **Project help ("-projecthelp")** - Displays information about the project.
   - **Diagnostics ("-diagnostics")** -  Prints information that might be helpful to diagnose or report problems.
   - **Debug ("-debug")** - Prints debugging information.
   - **Lib ("-lib")** - Specifies a path in the arguments box to search for jars and classes.
   - **Custom command ("custom")** - Write the ant option in the arguments box. 
- **Custom command or arguments (custom_args)** - Here you can write arguments for the selected command or write the commands you want to perform.

**Only Clarive EE**

- **Errors and output** - These two fields are related to manage control errors. Options are:
   - **Fail and output error** - Search for configurated error pattern in script output. If found, an error message is
     displayed in monitor showing the match.
   - **Warn and output warn** - Search for configurated warning pattern in script output. If found, an error message is
     displayed in monitor showing the match.
   - **Custom** - In case combo box errors is set to custom a new form is showed to define the behavior with these fields:
   - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in monitor.
   - **Warn** - Range of return code values to warn the user. A warn message will be displayed in monitor.
   - **Error** - Range of return code values for the script to have failed. An error message will be displayed in monitor.

## How to use

### In Clarive EE

Once the plugin is placed in its folder, you can find this service in the palette in the section of generic service and can be used like any other palette op.

Op Name: **Ant task**

Example:

```yaml
    Server: Ant-Server
    Path: /home/ant_project/
    Command: Custom
    Custom command or arguments: compile jar run
    Errors: fail
``` 

### In Clarive SE

#### Rulebook

If you want to use the plugin through the Rulebook, in any `do` block, use this ops as examples to configure the different parameters:

```yaml
rule: Ant demo
do:
   - ant_task:
       server: ant_server   # Required. Use the mid set to the resource you created
       user: ${username}
       command: "custom"    # Required
       path: "/projects/ant_project/"   # Required
       custom_args: ['-version']
```

##### Outputs

###### Success

The service will return the console output for the command.

```yaml
do:
    - ant_task:
       server: ant_server   # use the mid set to the resource you created
       user: "clarive_user"
       command: "custom"
       path: "/projects/ant_project/"
       custom_args: ['-version']
```

For this command the output will be similar to this one:

```yaml
Apache Ant(TM) version 1.9.2 compiled on June 10 2014 
```

###### Possible configuration failures

**Build failed**

```yaml
Buildfile: build.xml does not exist!
Build failed
```

Make sure that the option is available for Ant, and also that you set the correct project path and the build.xml file exist.

**Variable required**

```yaml
Error in rulebook (compile): Required argument(s) missing for op "ant_task": "command"
```

Make sure you have all required variables defined.

**Not allowed variable**

```yaml
Error in rulebook (compile): Argument `Command` not available for op "ant_task"
```

Make sure you are using the correct paramaters (make sure you are writing the variable names correctly).

## More questions?

Feel free to join **[Clarive Community](https://community.clarive.com/)** to resolve any of your doubts.