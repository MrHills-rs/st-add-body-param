// index.js - Add Body Param extension for SillyTavern
// Appends a line to the current OpenAI preset's custom_include_body field

import { SlashCommand } from '../../../slash-commands/SlashCommand.js';
import { SlashCommandParser } from '../../../slash-commands/SlashCommandParser.js';
import { ARGUMENT_TYPE, SlashCommandArgument } from '../../../slash-commands/SlashCommandArgument.js';
import { oai_settings, saveSettingsDebounced } from '../../../openai.js';

console.log('[AddBodyParam] Extension script loaded');

SlashCommandParser.addCommandObject(SlashCommand.fromProps({
    name: 'addbodyparam',
    aliases: ['addbp', 'bodyparam', 'addparam'],
    callback: (namedArgs, unnamedArgs) => {
        console.log('[AddBodyParam] Command executed');

        const textToAdd = (unnamedArgs || '').trim();

        if (!textToAdd) {
            return 'Error: Provide text to add.\nExample: /addbodyparam temperature: 1.2';
        }

        // Safe init + append (avoids null/undefined issues)
        if (!oai_settings.custom_include_body) {
            oai_settings.custom_include_body = '';
        }

        if (oai_settings.custom_include_body.trim()) {
            oai_settings.custom_include_body += '\n';
        }

        oai_settings.custom_include_body += textToAdd;

        saveSettingsDebounced();

        return `Added to custom_include_body:\n\( {textToAdd}\n\nCurrent value:\n \){oai_settings.custom_include_body || '(empty)'}`;
    },
    unnamedArgumentList: [
        SlashCommandArgument.fromProps({
            description: 'The line to append (e.g. temperature: 1.2 or stop: ["\n"] )',
            typeList: [ARGUMENT_TYPE.STRING],
            isRequired: true,
        }),
    ],
    helpString: 'Appends a line (usually YAML/JSON) to the **custom_include_body** field of the current OpenAI preset. Changes are saved automatically.',
}));

console.log('[AddBodyParam] Command registered');
