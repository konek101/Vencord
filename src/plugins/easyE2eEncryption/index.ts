import { Devs } from "@utils/constants";
import definePlugin, { OptionType, PluginNative } from "@utils/types";
import { UserProfileStore, UserStore, GuildStore } from "@webpack/common";
import { Settings } from "Vencord";
import { getKeyPair } from "./native";
const Native = VencordNative.pluginHelpers.SimpleE2EEncryption as PluginNative<typeof import("./native")>;
let bio: String;
const serverid = '1270364103747178549';
function addPublicKey() {
    const guildids = GuildStore.getGuildIds();
    const publickey = Settings.plugins.SimpleE2EEncryption.PublckKey;
    if (Settings.plugins.SimpleE2EEncryption.StoreType === "server") {
        if (guildids.indexOf(serverid) > -1) {

        } else {
            //add to server

        }
    } else if (Settings.plugins.SimpleE2EEncryption.StoreType === "bio") {

    }
    getKeyPair();


    bio = UserProfileStore.getUserProfile(UserStore.getCurrentUser().id).bio
}



export default definePlugin({
    name: "SimpleE2EEncryption",
    description: "Automatically encrypts dms if both users are using this plugin",
    authors: [Devs.Koxek],
    options: {
        StoreType: {
            type: OptionType.SELECT,
            description: "Select the place to store your public key",
            options: [
                { label: "A public server", value: "server", default: true },
                { label: "Your bio", value: "bio" },
            ]
        },
        PrivateKey: {
            type: OptionType.STRING,
            description: "Your private key you can use a custom one if you want to its 2048 bits long else leave blank to autogenerate it when sending your first message"
        },
        PublckKey: {
            type: OptionType.STRING,
            description: "Your public key you can use a custom one if you want to its 2048 bits long else leave blank to autogenerate it when sending your first message"
        }
    },
    start: () => addPublicKey(),

});
