const file1 = document.getElementById("file1");
const file2 = document.getElementById("file2");
const file3 = document.getElementById("file3");
const file4 = document.getElementById("file4");
const file5 = document.getElementById("file5");
const file6 = document.getElementById("file6");
const btn = document.getElementById("btn");

function base64(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = function () {
      resolve(fileReader.result);
    };
    fileReader.onerror = function () {
      reject("Error");
    };
  });
}

async function getBody() {
  const img1 = file1.files[0];
  const img2 = file2.files[0];
  const img3 = file3.files[0];
  const img4 = file4.files[0];
  const img5 = file5.files[0];
  const img6 = file6.files[0];

  const image1 = await base64(img1)
  const image2 = await base64(img2)
  const image3 = await base64(img3)
  const image4 = await base64(img4)
  const image5 = await base64(img5)
  const image6 = await base64(img6)

  return {
    image1: image1,
    image2: image2,
    image3: image3,
    image4: image4,
    image5: image5,
    image6: image6,
  }
}

btn.addEventListener("click",async (e) => {
    e.preventDefault()
    const myObject = await getBody()
    const data = await fetch("http://localhost:8080/image", {
        method:"POST",
        mode:"cors",
        headers:{
            'Content-Type':"application/json"
        },
        body: JSON.stringify(myObject)
    })
    const response =await data.json()
    console.log(response);
})