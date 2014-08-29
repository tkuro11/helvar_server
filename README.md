# Helvar Server
2 dirs and 2 text file.

## ./helvar_server
A web server for controling Helvar Router. Listen on port 8000,

### Configuration
settings for server are in the file "server.json".

| key            | description                     |
|:---------------|:------------------------------- |
|default_color   | color for empty position        |
|MACDICT         | MACaddress -> phone   id table  |
|router_address  | address for Helvar router       |
|ecoselector_colors| color table for eco-selector(in #hex format)|
|scene_colors    | color table for scenes(in #hex format)  |

### Web I/F
| URL    |method| description                     |
|:-------|:----:|:------------------------------- |
|/       | GET  | main page                       |
|/scene  | GET  | scene selector                  |
|/colors | GET  | get eco-selector(internal use)  |
|/pattern| GET  | lighting pattern select(param: ?pat=)|
|/       | POST | send id and vitals (XML)|
|/updatecolor|POST| change phone's associated color|

## ./virtual_helvar
A virtual Helvar router server.  
only support DirectLevel HelvarNet command.  
 I/F for virutal helvar router is listening on port 50000.  
 console listen on port 3000 to virtual light console

## ./Helvar_server_spec.txt(in Japanese)
 specification for Helvar server & virtual helvar

## ./README.md
this file
