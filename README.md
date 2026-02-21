# SillyTavern Add Body Parameters

Adds the /addbodyparam slash command,
allowing to append body parameters to the
Openai custom Chat completion profile. 

## Features

This is meant to be used together with llama.cpp
or ik_llama.cpp to pass additional variables into
the request programmatically.
Will add more commands soon.

## Installation and Usage

### Installation

Copy paste this repo URL into ST's inbuilt
extension installer.

### Usage

/addbodyparam "<string>"

Example:

/addbodyparam "id_slot: 1"

This will force llama.cpp to use slot 1.
A full list of commands here. 
https://github.com/ggml-org/llama.cpp/tree/master/tools/server

## Prerequisites

I have literally no idea. I'm using 1.13.5
