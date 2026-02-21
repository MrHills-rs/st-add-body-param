# SillyTavern Add Body Parameters

Adds slash commands to manipulate openai
chat completion body parameters,
allowing to append, clear and get body parameters to the Openai Chat (custom) completion profile. These parameters will be read by backends such as llama.cpp.
These are parameters usually set manually in
the connection profile > additional parameters
window in silly tavern.

## Features

This is meant to be used together with llama.cpp
or ik_llama.cpp to pass additional variables into the request programmatically, generally via
quick replies.

/addbodyparam '<string>'

appends one parameter to the list

/clearbodyparam

clears all parameters from the list

/getbodyparam

outputs body parameters, which can be used via
pipe

## Installation and Usage

### Installation

Copy paste this repo URL into ST's inbuilt
extension installer.

### Example:

/addbodyparam "id_slot: 1"

This will force llama.cpp to use slot 1.

/getbodyparam | /echo {{pipe}}

Outputs all current body parameters and pipes
them into the echo command, displaying them on screen

A full list of commands for llama.cpp server can be found here

https://github.com/ggml-org/llama.cpp/tree/master/tools/server

## Prerequisites

I have literally no idea. I'm using 1.13.5
