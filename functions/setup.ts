import type { SlackFunctionHandler } from "deno-slack-sdk/types.ts";
import { SlackAPI } from "deno-slack-api/mod.ts";
import { DATASTORE_NAME } from "../datastores/messages.ts";
import { DefineFunction, Schema } from "deno-slack-sdk/mod.ts";

export const SetupFunction = DefineFunction({
  callback_id: "plouf_setup_function",
  title: "Plouf Plouf Setup",
  description: "Setup Plouf Plouf",
  source_file: "functions/setup.ts",
  input_parameters: {
    properties: {
      msg_template: {
        type: Schema.types.string,
        description: "Template for the default message",
      },
      channel: {
        type: Schema.slack.types.channel_id,
        description: "Channel to post in",
      },
      author: {
        type: Schema.slack.types.user_id,
        description: "The user ID of the manager",
      },
    },
    required: ["msg_template", "channel"],
  },
});

const setupFunction: SlackFunctionHandler<
  typeof SetupFunction.definition
> = async (
  { inputs, token },
) => {
  const client = SlackAPI(token, {});

  const uuid = crypto.randomUUID();

  const putResponse = await client.apps.datastore.put({
    datastore: DATASTORE_NAME,
    item: {
      id: uuid,
      channel: inputs.channel,
      msgTemplate: inputs.msg_template,
      author: inputs.author,
    },
  });

  if (!putResponse.ok) {
    return await {
      error: putResponse.error,
      outputs: {},
    };
  }

  // ---

  /* create link trigger
  const triggerResponse = await client.workflows.triggers.create({
    type: "event",
    name: "Member joined response",
    description: "Triggers when member joined",
    workflow: "#/workflows/send_welcome_message",
    event: {
      event_type: "slack#/events/user_joined_channel",
      channel_ids: [inputs.channel],
    },
    inputs: {
      channel: {
        value: "{{data.channel_id}}",
      },
      triggered_user: {
        value: "{{data.user_id}}",
      },
    },
  })

  console.log(triggerResponse)
  */

  return await {
    outputs: {},
  };
};

export default setupFunction;
