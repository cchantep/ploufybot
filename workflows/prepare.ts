import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { PrepareFunction } from "../functions/prepare.ts";

export const PloufWorkflow = DefineWorkflow({
  callback_id: "plouf_workflow",
  title: "Plouf Plouf",
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

export const PloufForm = PloufWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "Plouf Plouf Form",
    submit_label: "Prepare",
    description: ":wave: Prepare the list of speakers",
    interactivity: PloufWorkflow.inputs.interactivity,
    fields: {
      required: ["missing"],
      elements: [
        {
          name: "missing",
          title: "Missing speakers",
          type: Schema.types.array,
          items: {
            type: Schema.slack.types.user_id,
          },
        },
      ],
    },
  },
);

PloufWorkflow.addStep(PrepareFunction, {
  channel: PloufWorkflow.inputs.channel,
  manager: PloufWorkflow.inputs.interactivity.interactor.id,
  missing: PloufForm.outputs.fields.missing,
});

export default PloufWorkflow;
