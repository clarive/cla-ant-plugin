
# Ant plugin

Ant plugin will allow you to launch Apache Ant commands from a Clarive instance.

## What is Apache Ant

Apache Ant is a Java library and command-line tool whose mission is to drive processes described in build files as targets and extension points dependent upon each other.
The main known usage of Ant is the build of Java applications.

Ant can also be used effectively to build non Java applications, for instance C or C++ applications.
More generally, Ant can be used to pilot any type of process which can be described in terms of targets and tasks.


## Requirements

Apache Ant is needed in order for it to work properly .

## Installation

To install the plugin, place the cla-ant-plugin folder inside the `CLARIVE_BASE/plugins`
directory in a Clarive instance.

## How to use

Once the plugin is correctly installed, you will have a new palette service called 'Ant task'.

### Ant task service:

This palette service will let you choose the option that you wish to perform with Apache Ant.
The various parameters from the palette service are:

- **Server** - Choose the server where you wish to execute the command. 
- **Project path** - Directory for the build.xml file.
- **Command** - Here you will have different commands to launch with the service or write a custom one.
   - **Build file** - Takes the specified file in the arguments box to build the project.
   - **Project help** - Displays information about the project.
   - **Diagnostics** -  Prints information that might be helpful to diagnose or report problems.
   - **Debug** - Prints debugging information.
   - **Lib** - Specifies a path in the arguments box to search for jars and classes.
   - **Custom command** - Write the ant option in the arguments box. 
- **Custom command or arguments** - Here you can write arguments for the selected command or write the commands you want to perform.
- **Errors and output** - These two fields are related to manage control errors. Options are:
   - **Fail and output error** - Search for configurated error pattern in script output. If found, an error message is
     displayed in monitor showing the match.
   - **Warn and output warn** - Search for configurated warning pattern in script output. If found, an error message is
     displayed in monitor showing the match.
   - **Custom** - In case combo box errors is set to custom a new form is showed to define the behavior with these fields:
   - **OK** - Range of return code values for the script to have succeeded. No message will be displayed in monitor.
   - **Warn** - Range of return code values to warn the user. A warn message will be displayed in monitor.
   - **Error** - Range of return code values for the script to have failed. An error message will be displayed in monitor.


Configuration example:

    Server: Ant-Server
    Path: /home/ant_project/
    Command: Custom
    Custom command or arguments: compile jar run
    Errors: fail
    Output: 

The service will return the console output for the command.
