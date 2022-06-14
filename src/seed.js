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

  /* Series
                          ============================================ */
  // Anime
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "One Piece - We are",
    description:
      "描述海賊蒙其·D·魯夫想要得到「ONE PIECE」（一個大秘寶）和成為「海賊王」為夢想而出海向「偉大的航道」航行的海洋冒險故事。",
    genre: "Anime",
    maturity: "18",
    slug: "one_piece",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Attack On Titan",
    description:
      "《進擊的巨人》情節始於一個存在於三堵同心圓形城牆內的文明，當地居民的知識讓他們認為自己是世上僅存的人類文明，並相信在百餘年前，人類遭到會吃人的巨人攻擊後退到了這三堵牆內，並享受的一世紀的和平。為了對抗巨人，該文明開發出立體機動裝置供軍方使用，該裝置固定於腰間、可供士兵進行三維空間移動。隨著劇情進展，故事也揭露關於巨人的真實歷史及該島以外的其它文明。",
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
    description: "",
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
    description: "大家好，我叫小白",
    genre: "Anime",
    maturity: "8",
    slug: "White",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Pokémon_Red_and_Blue_-_Title_Theme",
    description: "",
    genre: "Anime",
    maturity: "8",
    slug: "Pokemon",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Naruto_Shippuden - Silhouette",
    description: "",
    genre: "Anime",
    maturity: "8",
    slug: "Naruto",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Your lie in April - Again",
    description: "",
    genre: "Anime",
    maturity: "8",
    slug: "April",
  });

  //English
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Alan Walker - Faded",
    description: "",
    genre: "English",
    maturity: "8",
    slug: "Alan_Faded",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Imagine Dragons - Believer",
    description: "",
    genre: "English",
    maturity: "8",
    slug: "Believer",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Hozier - Take me to church",
    description: "",
    genre: "English",
    maturity: "8",
    slug: "Hozier_Take_Me",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Avicii - Wake me up",
    description: "",
    genre: "English",
    maturity: "8",
    slug: "A_wake_me_up",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Imagine Dragons - Enemy",
    description: "",
    genre: "English",
    maturity: "8",
    slug: "Enemy",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Counting stars",
    description: "",
    genre: "English",
    maturity: "8",
    slug: "Counting_Star",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Get lucky",
    description: "",
    genre: "English",
    maturity: "8",
    slug: "Get_Lucky",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Imagine Dragons - Demons",
    description: "",
    genre: "English",
    maturity: "8",
    slug: "Demons",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "ABBA - Mamma mia",
    description: "",
    genre: "English",
    maturity: "8",
    slug: "ABBA",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Adele - Rolling In The Deep",
    description: "",
    genre: "English",
    maturity: "8",
    slug: "Rolling",
  });

  //Meme
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "105°c的你",
    description: "Super idol 的笑容，都沒你的甜;一天不看，渾身難受",
    genre: "Meme",
    maturity: "8",
    slug: "OAO105",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Never Gonna Give You Up",
    description: "瑞克永遠不會放棄你，不會就是不會",
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
    description: "",
    genre: "Meme",
    maturity: "8",
    slug: "Tank",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "We are number one",
    description: "",
    genre: "Meme",
    maturity: "8",
    slug: "1",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Deja vu",
    description: "",
    genre: "Meme",
    maturity: "8",
    slug: "D",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "The Pink Panther Theme",
    description: "",
    genre: "Meme",
    maturity: "8",
    slug: "Pink",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Yoasobi - 群青",
    description: "",
    genre: "Meme",
    maturity: "8",
    slug: "Yoasobi",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Giorni - Theme",
    description: "",
    genre: "Meme",
    maturity: "8",
    slug: "Theme",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Lemon Tree",
    description: "",
    genre: "Meme",
    maturity: "8",
    slug: "Lemon",
  });

  //  korea
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "BTS - Fake Love",
    description: "",
    genre: "Korea",
    maturity: "8",
    slug: "BTS1",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Black Pink - How you like that",
    description: "",
    genre: "Korea",
    maturity: "8",
    slug: "Black_Pink",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "BTS - I Need You",
    description: "",
    genre: "Korea",
    maturity: "8",
    slug: "BTS2",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "TWICE - Cry For ME",
    description: "",
    genre: "Korea",
    maturity: "8",
    slug: "Twice",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "BTS - Butter",
    description: "",
    genre: "Korea",
    maturity: "8",
    slug: "Butter",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Black Pink - Lovesick Girl",
    description: "",
    genre: "Korea",
    maturity: "8",
    slug: "Lovesick",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Happy Birthday",
    description: "",
    genre: "Korea",
    maturity: "8",
    slug: "HB",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Black Pink - Rosé",
    description: "",
    genre: "Korea",
    maturity: "8",
    slug: "Rose",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "IU - Eight",
    description: "",
    genre: "Korea",
    maturity: "8",
    slug: "IU_8",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "TAEYEON - All About You",
    description: "",
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
    description: "",
    genre: "Classical",
    maturity: "8",
    slug: "Lacrimosa",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Canon",
    description: "",
    genre: "Classical",
    maturity: "8",
    slug: "Canon",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Bach Cello Suit no.1 - Prelude",
    description: "",
    genre: "Classical",
    maturity: "8",
    slug: "Bach",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Gymnopedie No.1 - Erik Satie",
    description: "",
    genre: "Classical",
    maturity: "8",
    slug: "Erik",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Beethoven - Mondscheinsonate",
    description: "",
    genre: "Classical",
    maturity: "8",
    slug: "Mond",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Beethoven-Tempest",
    description: "",
    genre: "Classical",
    maturity: "8",
    slug: "Beet_Temp",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Mozart_Minuet_in_F_Major",
    description: "",
    genre: "Classical",
    maturity: "8",
    slug: "Mozart_F",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Beethoven - Moonlight",
    description: "",
    genre: "Classical",
    maturity: "8",
    slug: "Moon",
  });
}
