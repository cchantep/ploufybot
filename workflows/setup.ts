import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { SetupFunction } from "../functions/setup.ts";

export const SetupWorkflow = DefineWorkflow({
  callback_id: "setup_workflow",
  title: "Setup Plouf",
  description: "Prepare a random list of speakers.",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
    },
    required: ["interactivity"],
  },
});

export const SetupForm = SetupWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Plouf Plouf Setup Form",
    submit_label: "Setup",
    description: "Setup Plouf Plouf on the current channel",
    interactivity: SetupWorkflow.inputs.interactivity,
    fields: {
      required: ["msg_template"],
      elements: [
        {
          name: "msg_template",
          title: "Message template",
          type: Schema.types.string,
          hint: "Template for the default message",
        },
      ],
    },
  },
);

SetupWorkflow.addStep(SetupFunction, {
  msg_template: SetupForm.outputs.fields.msg_template,
  channel: SetupWorkflow.inputs.channel,
  author: SetupWorkflow.inputs.interactivity.interactor.id,
});

export default SetupWorkflow;
