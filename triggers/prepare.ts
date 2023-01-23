import { Trigger } from "deno-slack-api/types.ts";

const prepareTrigger: Trigger = {
  type: "shortcut",
  name: "Prepare Plouf Plouf",
  description: "Prepare Plouf Plouf for the current channel.",
  workflow: "#/workflows/plouf_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
    channel: {
      value: "{{data.channel_id}}",
    },
  },
};

export default prepareTrigger;
