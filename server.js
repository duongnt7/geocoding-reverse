`--unhandled-rejections=strict`;

const http = require("http");
const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const axios = require("axios");

let dataResponse = {};
let dataUS = [];
let count = 1;

const hostname = "127.0.0.1";
const port = 3000;

const lineHeader = {
  master_id: "master_id",
  name: "name",
  brand: "brand",
  chain: "chain",
  address: "address",
  city: "city",
  country: "country",
  category: "category",
  postal_code: "postal_code",
  description: "description",
  accommodation_type: "accommodation_type",
  lat: "lat",
  lng: "lng",
};
const csvWriter = createCsvWriter({
  path: "dataUS3.csv",
  header: [
    { id: "master_id", title: "master_id" },
    { id: "name", title: "name" },
    { id: "brand", title: "brand" },
    { id: "chain", title: "chain" },
    { id: "address", title: "address" },
    { id: "city", title: "city" },
    { id: "country", title: "country" },
    { id: "category", title: "category" },
    { id: "postal_code", title: "postal_code" },
    { id: "description", title: "description" },
    { id: "accommodation_type", title: "accommodation_type" },
    { id: "lat", title: "lat" },
    { id: "lng", title: "lng" },
  ],
  fieldDelimiter: ";",
  alwaysQuote: true,
  append: true,
});

////----WRITE CSV-----///////////////////////////////////////////////////////////////
// (async () => {
//   // await csvWriter.writeRecords([lineHeader]);
//   await fs
//     .createReadStream("testUS3.csv")
//     .pipe(csv({ separator: ";" }))
//     .on("data", (row) => {
//       // if (row.country == "US") {
//       console.log(count++);
//       csvWriter.writeRecords([row]);
//       // }
//     })
//     .on("end", () => {
//       console.log("success!");
//     });
// })();
/////////////////////////////////////////////////////////////////////////////////////

////-----READ CSV-----//////////////////////////////////////////////////////////////
fs.createReadStream("./data/dataUS_10k.csv") //file_csv to get geocoder
  .pipe(csv({ separator: ";" })) //
  .on("data", async (row) => {
    dataUS.push(row);
  })
  .on("end", () => {
    let i = 0;
    const getLocation = setInterval(async () => {
      await getGeocodingReverse(
        dataUS[i].master_id,
        dataUS[i].lat,
        dataUS[i].lng
      );
      if (i == dataUS.length - 1) {
        setTimeout(() => {
          saveJson();
        }, 10000);
        clearInterval(getLocation);
      } else {
        console.log(i);
        i++;
      }
    }, 1000);
  });
///////////////////////////////////////////////////////////////////////////////////

//----get code ----/////////////////////////////
function getGeocodingReverse(id, lat, lng) {
  axios
    .get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
    )
    .then((res) => {
      let title = id;
      console.log(id, res.data.address.state);
      dataResponse = { ...dataResponse, [title]: res.data };
    });
}
/////////////////////////////

///---save json----//////////////////////////
const saveJson = () => {
  var jsonData = JSON.stringify(dataResponse);
  fs.writeFile("./data/geocoding-reverse_10k.txt", jsonData, function (err) {
    //file data addresss after geocoding reverse
    if (err) {
      console.log(err);
    } else {
      console.log("sucess!");
    }
  });
};
////////////////////////////////////////////

////-----GET GEOCODING REVERSE-----////////////////////////////////////////////////
// const getState = async (lat, lng) => {
//   let state;
//   let url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;
//   await axios.get(url).then((res) => {
//     // console.log(res.data.pr);
//     // return res.data.address.state;
//     state = res.data.address.state;
//   });
//   return state;
// };
////////////////////////////////////////////////////////////////////////////////

//----test data 3---------------------------/////////////////
// (() => {
//   let data = [];
//   fs.createReadStream("dataUS3.csv")
//     .pipe(csv({ separator: ";" }))
//     .on("data", async (row) => {
//       data.push(row);
//       await console.log(count++);
//     })
//     .on("end", () => {
//       let i = 0;
//       const show = setInterval(() => {
//         console.log(i, data[i]);
//         if (i == data.length - 1) clearInterval(show);
//         else i++;
//       }, 1000);
//     });
// })();
//////////////////////////////////////////////////////////////

/////------JSON DATA----////////////////////////////////////////////////
// let title = "abc";
// let json = {
//   [title]: "tét",
//   t2: "2",
// };

// console.log(json);
// var jsonData = JSON.stringify(json);

// fs.writeFile("test.txt", jsonData, function (err) {
//   if (err) {
//     console.log(err);
//   }
// });
////////////////////////////////////////////////////////////////////

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("<h2>Hello World</h2>");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
