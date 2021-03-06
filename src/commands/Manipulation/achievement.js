const { Command } = require("../../index");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            cooldown: 8,
            aliases: ["mca", "makeachievement", "achievementget"],
            requiredPermissions: ["ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "EMBED_LINKS"],
            description: language => language.get("COMMAND_MCA_DESCRIPTION"),
            extendedHelp: "No extended help available.",
            usage: "<achievement:string{1,20}>"
        });
    }

    async run(msg, [achievement]) {
        const image = await this.client.funcs.images("generate/achievement", { avatar: msg.author.displayAvatarURL({ format: "png", size: 128 }), text: achievement })
            .catch(() => null);
        if (!image) return msg.reply(msg.language.get("ER_TRY_AGAIN"));
        return msg.channel.sendFile(image);
    }

};
