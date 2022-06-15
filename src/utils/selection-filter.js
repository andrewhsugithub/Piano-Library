export default function selectionFilter({ series } = []) {
  return {
    series: [
      {
        title: "Anime",
        data: series?.filter((item) => item.genre === "Anime"),
      },
      {
        title: "Classical",
        data: series?.filter((item) => item.genre === "Classical"),
      },
      {
        title: "English",
        data: series?.filter((item) => item.genre === "English"),
      },
      {
        title: "Meme",
        data: series?.filter((item) => item.genre === "Meme"),
      },
      {
        title: "K-pop",
        data: series?.filter((item) => item.genre === "Korea"),
      },
    ],
  };
}

// {
//   title: "Documentaries",
//   data: series?.filter((item) => item.genre === "documentaries"),
// },
// {
//   title: "Comedies",
//   data: series?.filter((item) => item.genre === "comedies"),
// },
// {
//   title: "Children",
//   data: series?.filter((item) => item.genre === "children"),
// },
// {
//   title: "Crime",
//   data: series?.filter((item) => item.genre === "crime"),
// },
// {
//   title: "Feel Good",
//   data: series?.filter((item) => item.genre === "feel-good"),
// },
