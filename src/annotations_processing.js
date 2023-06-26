const fs = require("fs");

const data = [
  require("./1.json"),
  require("./2.json"),
  require("./3.json"),
  require("./4.json"),
  require("./5.json"),
  require("./6.json"),
  require("./7.json"),
  require("./8.json"),
  require("./9.json"),
  require("./10.json"),
  require("./11.json"),
  require("./12.json"),
  require("./13.json"),
  require("./14.json"),
  require("./15.json"),
  require("./16.json"),
  require("./17.json"),
  require("./18.json"),
  require("./19.json"),
  require("./20.json"),
  require("./21.json"),
  require("./22.json"),
  require("./23.json"),
];

let final = {
  info: { description: "my-project-name" },
  categories: [{ id: 1, name: "1" }],
  images: [],
  annotations: [],
};

let imageIdMap = {};

data.forEach((json, fileNumber) => {
  json.images.forEach((image) => {
    let a = `${fileNumber}_${image.id}`;
    let id = final.images.length + 1;
    imageIdMap[a] = id;
    final.images.push({
      ...image,
      id: id,
    });
  });
  json.annotations.forEach((annotation) => {
    if (imageIdMap[`${fileNumber}_${annotation.image_id}`] != undefined) {
      final.annotations.push({
        ...annotation,
        id: final.annotations.length,
        category_id: 1,
        image_id: imageIdMap[`${fileNumber}_${annotation.image_id}`],
      });
    }
  });
});

fs.writeFileSync("annotations.json", JSON.stringify(final));
console.log(final);
console.log(final.images.length);
