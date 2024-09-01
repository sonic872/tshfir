const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const {Discord, Client, MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent} = require("discord.js")
const client = new Client({intents: 7753})

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.username}!`)
}).login("") //توكين البوت

const prefix = "!" // البريفكس

const replace = [ //التشفير
  {
    word: "حساب",
    replace: "7ـساب"
  },
   {
    word: "نيترو",
    replace: "نيتر9"
  },
   {
    word: "ديسكورد",
    replace: "ديسكـ9ـرد"
  },
   {
    word: "شوب",
    replace: "شـ9ـب"
   },
  {
    word: "بروجكت",
    replace: "بر9جكت"
  },
    {
    word: "ستور",
    replace: "ستـ9ـر"
  },
    {
    word: "توكن",
    replace: "تـ9ـكن"
  },
    {
    word: "بوت",
    replace: "ب9ت"
  },
    {
    word: "توكنات",
    replace: "تـ9ـكنات"
  },
    {
    word: "بروجكت",
    replace: "بر9جكت"
  },
    {
    word: "بروجكتات",
    replace: "بر9جكتات"
  },
    {
    word: "سعر",
    replace: "سـ3ـر"
  },
    {
    word: "متوفر",
    replace: "متـ9ـفر"
  },
    {
    word: "شراء",
    replace: "شر|ء"
  },
    {
    word: "اشتري",
    replace: "اشـtـري"
  },
    {
    word: "للبيع",
    replace: "للبيـ3"
  },
    {
    word: "ابيعه",
    replace: "ابيـ3ـه"
  },
    {
    word: "ينباع",
    replace: "ينبا3"
  },
    {
    word: "اشتريه",
    replace: "اشـtـريه"
  },
    {
    word: "سيرفر",
    replace: "سيـrـفر"
  },
    {
    word: "سيرفرات",
    replace: "سيـrـفرات"
  },
    {
    word: "بوست",
    replace: "بـ9ـست"
  },
    {
    word: "بوستات",
    replace: "بـ9ـستات"
  },
    {
    word: "نيتروهات",
    replace: "نيتر9هات"
  },
    {
    word: "اسعار",
    replace: "اسـ3ـار"
  },
    {
    word: "دفع",
    replace: "دفـ3"
  },
    {
    word: "مدفوع",
    replace: "مدفو3"
  },
    {
    word: "نتفليكس",
    replace: "نـtـفليكس"
  },
      
]
     //امر وضع رساله التشفير
client.on("messageCreate", async message => {  
  if (message.content.startsWith(prefix + "replacer")) {
  if(!message.member.permissions.has("ADMINISTRATOR")) return;
    const embed = new MessageEmbed()
    .setTitle("تشفير")
    .setDescription("**لتشفير منشورك قم بالضغط على الزر و ضع منشورك.**")
    .setThumbnail(message.guild.iconURL())
    
      const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setStyle("SECONDARY")
            .setLabel("تشفير")
            .setCustomId('replace')
        )
    message.channel.send({embeds: [embed], components: [row]})
  }
})


client.on("interactionCreate", async i => {
  if (!i.isButton()) return;
  if (i.customId == "replace") {
            const modal = new Modal()
            .setTitle('تشفير')
            .setCustomId('rep')

   const replacer = new TextInputComponent()
            .setCustomId('replacetext')
            .setLabel(`قم ب وضع منشورك هنا لتشفيره`)
            .setMaxLength(2000)
            .setRequired(true)
            .setStyle("PARAGRAPH")
    
       const rows = [replacer].map(
                (component) => new MessageActionRow().addComponents(component)
            )
            modal.addComponents(...rows);
            i.showModal(modal);
        
  }
  
})

client.on("interactionCreate", async i => {
  if (!i.isModalSubmit()) return;
  if (i.customId == "rep") {
    let text = i.fields.getTextInputValue('replacetext');
    let replaced = false;

    replace.forEach(t => {
      const regex = new RegExp(t.word, 'g');
      if (regex.test(text)) {
        text = text.replace(regex, t.replace);
        replaced = true;
      }
    });

    if (replaced) {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setStyle("SECONDARY")
            .setLabel("نسخ منشورك")
            .setCustomId('copy')
        );

      i.reply({
        content: `\`المنشور بعد التشفير :\`\n\n ${text}`,
        ephemeral: true,
        components: [row]
      });

      client.on("interactionCreate", async interaction => {
        if (!interaction.isButton()) return;
        if (interaction.customId == 'copy') {
          try {
            await interaction.user.send(`المنشور بعد التشفير:\n\n${text}`);
            await interaction.reply({ content: "تم إرسال المنشور المشفر إلى رسائلك الخاصة.", ephemeral: true });
          } catch (error) {
            await interaction.reply({ content: "تعذر إرسال الرسالة إلى الخاص. تأكد من أن رسائلك الخاصة مفتوحة.", ephemeral: true });
          }
        }
      });

    } else {
      i.reply({ content: "**منشورك لا يحتاج للتشفير**", ephemeral: true });
    }
  }
});

process.on("unhandledRejection", e => {
  console.log(e)
})