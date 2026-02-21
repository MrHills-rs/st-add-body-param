// index.js - Add Body Param extension for SillyTavern
import { SlashCommand } from '../../slash-commands/SlashCommand.js';
import { SlashCommandParser } from '../../slash-commands/SlashCommandParser.js';
import { oai_settings, saveSettingsDebounced } from '../../openai.js';

SlashCommandParser.addCommandObject(SlashCommand.fromProps({
    name: 'AddBodyParam',
    callback: (namedArgs, unnamedArgs) => {
        const text = unnamedArgs;
        if (!text) return 'Error: No text provided.';
        oai_settings.custom_include_body = (oai_settings.custom_include_body || '') + (oai_settings.custom_include_body ? '\n' : '') + text;
        saveSettingsDebounced();
        return `Added to body: ${text}`;
    },
    helpString: 'Appends text to OpenAI custom body settings.',
}));
rgument.fromProps({
            description: 'The line to append (e.g. temperature: 1.2)',
            typeList: [ARGUMENT_TYPE.STRING],
            isRequired: true,
        }),
    ],
    helpString: 'Appends a line to the **custom_include_body** field of the current OpenAI preset. Changes are saved automatically.',
}));

console.log('[AddBodyParam] Command registered');
