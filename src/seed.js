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
  // Documentaries
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "One piece - We are",
    description:
      "An exploration of big cat breeding and its bizarre underworld, populated by eccentric characters.",
    genre: "Anime",
    maturity: "18",
    slug: "one_piece",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Attack on titan",
    description:
      "",
    genre: "Anime",
    maturity: "18",
    slug: "",
  });
  firebase.firestore().collection("series").add({
    id: getUUID(),
    title: "Sword art",
    description:
      "",
    genre: "Anime",
    maturity: "",
    slug: "",
  });
