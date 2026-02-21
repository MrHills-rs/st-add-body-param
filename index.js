// We go up 3 levels: st-add-body-param -> third-party -> extensions -> scripts
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

    // Persist the change to your settings.json
    saveSettingsDebounced();

    return `Added to OpenAI Body Params: ${textToAdd}`;
}

// Register the command using the official Parser method
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
    helpString: 'Appends text to the "custom_include_body" field in OpenAI settings.',
}));

console.log('Extension: AddBodyParam loaded successfully.');
   // Use jQuery ready to ensure the rest of the ST core is loaded
    // @ts-ignore
    jQuery(() => {
        registerCommand();
    });
})();
