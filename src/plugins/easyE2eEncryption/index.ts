import { Devs } from "@utils/constants";
import definePlugin, { OptionType, PluginNative } from "@utils/types";
import { filters, find, findByCode, findByCodeLazy, findByProps, findByPropsLazy, findComponentByCode, findComponentLazy, findModuleFactory, findStoreLazy, waitFor } from "@webpack";
import { UserProfileStore, UserStore, GuildStore, ChannelStore} from "@webpack/common";
import { Settings } from "Vencord";
import { Channel } from "discord-types/general";
import { MessageStore } from "@webpack/common";
import { useAuthorizationStore } from "plugins/decor/lib/stores/AuthorizationStore";
const Native = VencordNative.pluginHelpers.SimpleE2EEncryption as PluginNative<typeof import("./native")>;
let bio: String;
const serverid = '1270364103747178549';

function getKeyFromServer(userid: string) {
    const channels: Record<string, Channel> = ChannelStore.getMutableGuildChannelsForGuild(serverid);
    const array = Object.values(channels).map((value) => ({ ...value }));
    const channel = array.find((obj) => obj.name === userid) as Channel;
    const message = MessageStore.getMessages(channel.id)[0];
    return message.content;
}

function joinServer() {
    const guildjoin = findByProps('acceptInvite', 'createInvite', 'transitionToInvite');
    console.log(guildjoin.acceptInvite({
        inviteKey: 'Vw5JD4xr'
      }));
}
function sendKey(key : string) {
    const channels: Record<string, Channel> = ChannelStore.getMutableGuildChannelsForGuild(serverid);
    const array = Object.values(channels).map((value) => ({ ...value }));
    const channel: Channel = array.find((obj) => obj.name === UserStore.getCurrentUser().id) as Channel;

    const msgthing = findByPropsLazy('sendMessage')
    if (!channel) return;
    msgthing.sendMessage(
        channel.id,
        {
            content: key,
            tts: false,
            invalidEmojis: [],
            validNonShortcutEmojis: [],
        }
    );
}
export interface Session {
    sessionId: string;
    status: string;
    active: boolean;
    clientInfo: {
        version: number;
        os: string;
        client: string;
    };
}


function addPublicKey(key : string) {
    const guildids = GuildStore.getGuildIds();
    if (Settings.plugins.SimpleE2EEncryption.StoreType === "server") {
        if (guildids.indexOf(serverid) > -1) {
            //send key
            console.log("sending key")
            sendKey(key);
        } else {
            //add to server
            console.log("joining server and sending key")
            joinServer();
            sendKey(key);
        }
    } else if (Settings.plugins.SimpleE2EEncryption.StoreType === "bio") {

    }

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
    start: () => addPublicKey("skibidi"),

});
