const fs = require('fs');
const { Client, GatewayIntentBits } = require('discord.js');
const path = require('path'); // لإدارة المسارات بسهولة

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);
});

// Command to process and dump JSON file
client.on('messageCreate', (message) => {
  if (message.content.startsWith('!dump')) {
    const args = message.content.split(' ');
    const cfxAddress = args[1];

    if (!cfxAddress) {
      return message.reply('❌ Please provide a valid cfx.re address!');
    }

    const trimmedAddress = cfxAddress.substring(12); // مثل ما تعمل في الكودا
    const apiUrl = `https://servers-frontend.fivem.net/api/servers/single/${trimmedAddress}`;

    message.reply('ثواني يا قلبي قاعد اسحب لك');

    // Fetching JSON data
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        // تحديد المسار الذي سيتم فيه حفظ الملف
        const outputDirectory = path.join(__dirname, 'dumps'); // المجلد "dumps" في نفس مجلد السكربت
        const outputFileName = `dump_${trimmedAddress}.json`;
        const outputFilePath = path.join(outputDirectory, outputFileName);

        // التأكد من أن المجلد موجود، وإذا لم يكن كذلك يتم إنشاؤه
        if (!fs.existsSync(outputDirectory)) {
          fs.mkdirSync(outputDirectory, { recursive: true });
        }

        // كتابة البيانات إلى الملف
        fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));

        // إرسال الملف إلى المستخدم في رسالة خاصة
        message.author.send({
          content: `تم سحب الملفات من قبل الزعابي تفضل لا تنسي تشنر الدس عند ربعك`,
          files: [outputFilePath],
        }).then(() => {
          message.reply('شيك فل الخاص وصلك');
        }).catch((error) => {
          console.error(error);
          message.reply('❌ لم أستطع إرسال الملف إلى رسائلك الخاصة. تأكد من أنك تسمح بالرسائل الخاصة من البوت.');
        });
      })
      .catch((error) => {
        console.error(error);
        message.reply('❌ حدث خطأ أثناء جلب البيانات.');
      });
  }
});

// Replace 'your-bot-token-here' with your actual bot token
client.login('MTMwNTkzNzYwMjkwNTUwOTk4OA.Gjcrk9.sBwGwNoZwmwxBQkZ1OK_aKcV7wnNKY5NVxZHoA');
const express = require("express")
const app = express();
var listener = app.listen(process.env.PORT || 2000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
app.listen(() => console.log("I'm Ready To Work..! 24H"));
app.get('/', (req, res) => {
  res.send(`
  <body>
  <center><h1>Bot 24H ON!</h1></center
  </body>`)
});
