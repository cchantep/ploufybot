import { Trigger } from "deno-slack-api/types.ts";

const setupTrigger: Trigger = {
  type: "shortcut",
  name: "Setup Plouf Plouf",
  description: "Setup Plouf Plouf for the current channel.",
  workflow: "#/workflows/setup_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
    channel: {
      value: "{{data.channel_id}}",
    },
  },
};

export default setupTrigger;
