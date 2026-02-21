import { SlashCommand } from '../../../slash-commands/SlashCommand.js';
import { SlashCommandParser } from '../../../slash-commands/SlashCommandParser.js';
import { oai_settings, saveSettingsDebounced } from '../../../openai.js';

(function() {
    console.log("AddBodyParam: Loading from third-party folder...");

    const registerCommand = () => {
        try {
            SlashCommandParser.addCommandObject(SlashCommand.fromProps({
                name: 'addbodyparam',
                callback: (namedArgs, unnamedArgs) => {
                    const text = unnamedArgs;
                    if (!text) return 'Error: No text provided.';
                    
                    // Initialize if undefined/null
                    if (typeof oai_settings.custom_include_body !== 'string') {
                        oai_settings.custom_include_body = '';
                    }

                    // Append the new line
                    oai_settings.custom_include_body += (oai_settings.custom_include_body ? '\n' : '') + text;
                    
                    // Trigger the save to settings.json
                    saveSettingsDebounced();
                    
                    return `Added to body: ${text}`;
                },
                helpString: 'Appends text to the OpenAI Custom Include Body setting.',
            }));
            console.log("AddBodyParam: Command /addbodyparam registered.");
        } catch (e) {
            console.error("AddBodyParam: Failed to register command", e);
        }
    };

    // Use jQuery ready to ensure the rest of the ST core is loaded
    // @ts-ignore
    jQuery(() => {
        registerCommand();
    });
})();
