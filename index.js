// Extension: Add Body Param Slash Command
// Location: scripts/extensions/third-party/st-add-body-param.js

import { saveSettingsDebounced } from '../../../../script.js';
import { SlashCommand } from '../../../slash-commands/SlashCommand.js';
import { SlashCommandParser } from '../../../slash-commands/SlashCommandParser.js';
import { ARGUMENT_TYPE, SlashCommandArgument } from '../../../slash-commands/SlashCommandArgument.js';
import { oai_settings } from '../../../openai.js';

/**
 * Appends text to the OpenAI 'custom_include_body' setting.
 */
function addBodyParamCallback(namedArgs, unnamedArgs) {
    const textToAdd = unnamedArgs;

    if (!textToAdd || typeof textToAdd !== 'string') {
        return 'Error: Please provide a string to add to the body params.';
    }

    // Ensure the setting is a string before appending
    if (typeof oai_settings.custom_include_body !== 'string') {
        oai_settings.custom_include_body = '';
    }

    // Append the text. If there is already content, add a newline first.
    const separator = oai_settings.custom_include_body.length > 0 ? '\n' : '';
    oai_settings.custom_include_body += separator + textToAdd;

    // Persist the change to settings.json
    saveSettingsDebounced();

    return `Added to OpenAI Body Params: ${textToAdd}`;
}

/**
 * Clears the OpenAI 'custom_include_body' setting.
 */
function clearBodyParamCallback() {
    oai_settings.custom_include_body = '';
    
    // Persist the change to settings.json
    saveSettingsDebounced();

    return 'Cleared OpenAI Body Params.';
}

/**
 * Returns the current contents of the OpenAI 'custom_include_body' setting.
 */
function getBodyParamCallback() {
    // Ensure the setting is a string
    if (typeof oai_settings.custom_include_body !== 'string') {
        oai_settings.custom_include_body = '';
    }

    const content = oai_settings.custom_include_body;

    if (!content || content.length === 0) {
        return 'OpenAI Body Params are currently empty.';
    }

    return `Current OpenAI Body Params:\n${content}`;
}

// Register the commands when module loads
SlashCommandParser.addCommandObject(SlashCommand.fromProps({
    name: 'addbodyparam',
    callback: addBodyParamCallback,
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The string/JSON snippet to append to the custom body',
            typeList: [ARGUMENT_TYPE.STRING],
            isRequired: true,
        }),
    ],
    helpString: '/addbodyparam <text> - Appends text to the "custom_include_body" field in OpenAI settings.',
}));

SlashCommandParser.addCommandObject(SlashCommand.fromProps({
    name: 'clearbodyparam',
    callback: clearBodyParamCallback,
    unnamedArgumentList: [],
    helpString: '/clearbodyparam - Clears all content from the "custom_include_body" field.',
}));

SlashCommandParser.addCommandObject(SlashCommand.fromProps({
    name: 'getbodyparam',
    callback: getBodyParamCallback,
    unnamedArgumentList: [],
    helpString: '/getbodyparam - Displays the current content of the "custom_include_body" field.',
}));

console.log('Extension: AddBodyParam loaded successfully.');
