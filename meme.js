// code support for Vietnamese code support English in https://github.com/XaviaTeam/XaviaBotPlugins/blob/main/commands/Media/meme.js
const config = {
  name: "meme",
  description: "a lot of meme (language Vietnamese)",
  aliases: ["meme", "mim", "mimi", "mêm"],
  cooldown: 5,
  version: "1.1.0",
  credits: "Xavia Team"
}

const langData = {
  "vi_VN": {
    "invalidCategory": "Không hợp lệ! các danh mục hiện có:\n {categories}",
    "error": "Đã có lỗi xảy ra!"
  },
  "en_US": {
    "invalidCategory": "Invalid! Current categories are:\n {categories}",
    "error": "An error occurred!"
  },
  "ar_SY": {
    "invalidCategory": "غير صالح! الفئات الحالية هي:\n {categories}",
    "error": "حدث خطأ!"
  }
};


const endpoints = ["typical", "dark", "nhanvan", "lord"]

async function onCall({ message, args, getLang }) {
    try {
        const input = args[0]?.toLowerCase();
        if (!endpoints.includes(input)) return message.reply(getLang("invalidCategory", { categories: endpoints.join(", ") }));
      const res = await global.GET(`https://project-api.tanphatt.repl.co/meme/${input}`);
        const data = res.data;

        if (!data.url) return message.reply(getLang("error"));

        const imageStream = await global.getStream(data.url);
        await message.reply({
            attachment: [imageStream]
        });
    } catch (e) {
        console.error(e);
        message.reply(getLang("error"));
    }
}

export default {
    config,
    langData,
    onCall
}
