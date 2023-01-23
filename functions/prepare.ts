import type { SlackFunctionHandler } from "deno-slack-sdk/types.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";
import { DATASTORE_NAME } from "../datastores/messages.ts";
import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

export const PrepareFunction = DefineFunction({
  callback_id: "plouf_prepare_function",
  title: "Prepare speakers",
  description: "Prepare the speakers list",
  source_file: "functions/prepare.ts",
  input_parameters: {
    properties: {
      channel: {
        type: Schema.slack.types.channel_id,
        description: "Channel where the event was triggered",
      },
      manager: {
        type: Schema.slack.types.user_id,
        description: "User that triggered the event",
      },
      missing: {
        type: Schema.types.array,
        items: {
          type: Schema.slack.types.user_id,
        },
        description: "Speakers that are missing today",
      },
    },
    required: ["channel", "manager", "missing"],
  },
});

const setupFunction: SlackFunctionHandler<
  typeof PrepareFunction.definition
> = async (
  { inputs, token },
) => {
  const client = SlackAPI(token, {});

  await client.chat.postEphemeral({
    channel: inputs.channel,
    text: `TODO: ${JSON.stringify(inputs)}`,
    user: inputs.manager,
  });

  return await {
    outputs: {},
  };
};

export default setupFunction;
