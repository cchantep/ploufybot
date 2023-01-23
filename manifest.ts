import { Manifest } from "deno-slack-sdk/mod.ts";
import { MessageSetupDatastore } from "./datastores/messages.ts";
import { SetupWorkflow } from "./workflows/setup.ts";
import { PloufWorkflow } from "./workflows/prepare.ts";

export default Manifest({
  name: "ploufybot",
  description: "Plouf plouf bot, that prepare a random list of the members.",
  icon: "assets/default_new_app_icon.png",
  workflows: [SetupWorkflow, PloufWorkflow],
  outgoingDomains: [],
  datastores: [MessageSetupDatastore],
  botScopes: [
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
    "channels:read",
    "triggers:write",
  ],
});
