export function seedDatabase(firebase) {
  function getUUID() {
    // eslint gets funny about bitwise
    /* eslint-disable */
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const piece = (Math.random() * 16) | 0;
      const elem = c === "x" ? piece : (piece & 0x3) | 0x8;
      return elem.toString(16);
    });
    /* eslint-enable */
  }

  /* Series ============================================ */
  // Anime
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "One Piece - We are",
    description: "你渴望寶藏嗎?",
    genre: "Anime",
    maturity: "18",
    slug: "one_piece",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Attack On Titan",
    description: "獻出你們的心臟吧!",
    genre: "Anime",
    maturity: "18",
    slug: "Attack_On_Titan",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Sword Art Online",
    description: "C8763，幫我撐十秒!!!",
    genre: "Anime",
    maturity: "12",
    slug: "Sword_Art",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Tokyo Ghoul - Unravel",
    description: " 1000-7 等於多少?",
    genre: "Anime",
    maturity: "18",
    slug: "Tokyo_Ghoul",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "千と千尋の神隠し",
    description: "請問有人要跟我一起炒水蓮嗎?",
    genre: "Anime",
    maturity: "8",
    slug: "神隱少女",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "鬼滅之刃-紅蓮華",
    description: "豬油骨，拿來滷。",
    genre: "Anime",
    maturity: "12",
    slug: "鬼滅",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "君の名",
    description: "大家好，我叫小白。",
    genre: "Anime",
    maturity: "8",
    slug: "White",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Pokémon - Title Theme",
    description: "出來吧，皮卡丘!",
    genre: "Anime",
    maturity: "8",
    slug: "Pokemon",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Naruto Shippuden - Silhouette",
    description: "啥時給? 拿魯頭!",
    genre: "Anime",
    maturity: "8",
    slug: "Naruto",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Your lie in April - Again",
    description: "我想和，一起上台演奏...",
    genre: "Anime",
    maturity: "8",
    slug: "April",
  });

  //English
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Alan Walker - Faded",
    description: "This is DJ Faded~",
    genre: "English",
    maturity: "8",
    slug: "Alan_Faded",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Imagine Dragons - Believer",
    description: "騷年啊，你相信光嗎?",
    genre: "English",
    maturity: "8",
    slug: "Believer",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Hozier - Take me to church",
    description: "神父不要QQ",
    genre: "English",
    maturity: "8",
    slug: "Hozier_Take_Me",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Avicii - Wake me up",
    description: "早安，今天過的好嗎?",
    genre: "English",
    maturity: "8",
    slug: "A_wake_me_up",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Imagine Dragons - Enemy",
    description: "敵人，bad",
    genre: "English",
    maturity: "8",
    slug: "Enemy",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Counting stars",
    description: "一閃一閃亮晶晶",
    genre: "English",
    maturity: "8",
    slug: "Counting_Star",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Get lucky",
    description: "你渴望運氣嗎?",
    genre: "English",
    maturity: "8",
    slug: "Get_Lucky",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Imagine Dragons - Demons",
    description: "媽媽我怕怕。",
    genre: "English",
    maturity: "8",
    slug: "Demons",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "ABBA - Mamma mia",
    description: "Here we go again.",
    genre: "English",
    maturity: "8",
    slug: "ABBA",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Adele - Rolling In The Deep",
    description: "Rock and rolllllll.",
    genre: "English",
    maturity: "8",
    slug: "Rolling",
  });

  //Meme
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "105°c的你",
    description: "Super idol 的笑容，都沒你的甜; 一天不看，渾身難受。",
    genre: "Meme",
    maturity: "8",
    slug: "OAO105",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Never Gonna Give You Up",
    description: "瑞克永遠不會放棄你，不會就是不會。",
    genre: "Meme",
    maturity: "8",
    slug: "Never_Gonna",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Nyan Cat",
    description: "Nyan Nyan Nyan Nyan Nyan Nyan Nyan Nyan!!!!!!!!",
    genre: "Meme",
    maturity: "8",
    slug: "Nyan_Cat",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Thomas the tank",
    description: "感受過湯瑪士小火車的恐懼嗎?",
    genre: "Meme",
    maturity: "8",
    slug: "Tank",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "We are number one",
    description: "點心不夠，獎金來湊。",
    genre: "Meme",
    maturity: "8",
    slug: "1",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Deja vu",
    description: "被當的情況好像一再發生。",
    genre: "Meme",
    maturity: "8",
    slug: "D",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "The Pink Panther Theme",
    description: "童年最愛。",
    genre: "Meme",
    maturity: "8",
    slug: "Pink",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Yoasobi - 群青",
    description: "啊~",
    genre: "Meme",
    maturity: "8",
    slug: "Yoasobi",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Giorno - Theme",
    description: "JOJO~",
    genre: "Meme",
    maturity: "8",
    slug: "Theme",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Lemon Tree",
    description: "I wander how....",
    genre: "Meme",
    maturity: "8",
    slug: "Lemon",
  });

  //  korea
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "BTS - Fake Love",
    description: "甲的就是甲的。",
    genre: "Korea",
    maturity: "8",
    slug: "BTS1",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Black Pink - How you like that",
    description: "一點都不喜歡。",
    genre: "Korea",
    maturity: "8",
    slug: "Black_Pink",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "BTS - I Need You",
    description: "But I don't like you.",
    genre: "Korea",
    maturity: "8",
    slug: "BTS2",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "TWICE - Cry For ME",
    description: "不哭不哭，眼淚是珍珠。",
    genre: "Korea",
    maturity: "8",
    slug: "Twice",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "BTS - Butter",
    description: "飛行奶油 - Butterfly",
    genre: "Korea",
    maturity: "8",
    slug: "Butter",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Black Pink - Lovesick Girl",
    description: "來生只當小公主，只吃**不吃苦。",
    genre: "Korea",
    maturity: "8",
    slug: "Lovesick",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Happy Birthday",
    description: "好快樂。",
    genre: "Korea",
    maturity: "8",
    slug: "HB",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Black Pink - Rosé",
    description: "是羅絲不是螺絲。",
    genre: "Korea",
    maturity: "8",
    slug: "Rose",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "IU - Eight",
    description: "8啦888",
    genre: "Korea",
    maturity: "8",
    slug: "IU_8",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "TAEYEON - All About You",
    description: "全部都是你。",
    genre: "Korea",
    maturity: "8",
    slug: "TAEYON",
  });

  // Classical
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Beethoven - Für_Elise",
    description: "垃圾車來了，快來丟垃圾喔",
    genre: "Classical",
    maturity: "8",
    slug: "Trash_Car",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Beethoven - 5th_Symphone",
    description: "登登登~登~~~",
    genre: "Classical",
    maturity: "8",
    slug: "Beet_5th",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Mozart - Lacrimosa",
    description: "這很酷。",
    genre: "Classical",
    maturity: "8",
    slug: "Lacrimosa",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Canon",
    description: "音樂人噩夢。",
    genre: "Classical",
    maturity: "8",
    slug: "Canon",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Bach Cello Suit no.1 - Prelude",
    description: "超帥的",
    genre: "Classical",
    maturity: "8",
    slug: "Bach",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Gymnopedie No.1 - Erik Satie",
    description: "我也不知道是啥。",
    genre: "Classical",
    maturity: "8",
    slug: "Erik",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Beethoven - Mondscheinsonate",
    description: "我應該有聽過。",
    genre: "Classical",
    maturity: "8",
    slug: "Mond",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Beethoven-Tempest",
    description: "我只知道templet",
    genre: "Classical",
    maturity: "8",
    slug: "Beet_Temp",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Mozart_Minuet_in_F_Major",
    description: "莫札特，ok的吧。",
    genre: "Classical",
    maturity: "8",
    slug: "Mozart_F",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Beethoven - Moonlight",
    description: "我要代替月亮逞罰你。",
    genre: "Classical",
    maturity: "8",
    slug: "Moon",
  });
}
