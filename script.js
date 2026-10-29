const button = document.getElementById("downloadBtn");

window.addEventListener("keydown", (e) => {
  const roomName = document.getElementById("roomName").value;
  const roomDescription = document.getElementById("roomDescription").value;
  const notes = document.getElementById("notes").value;
  const roomType = document.getElementById("roomType").value;
  const dimension = document.getElementById("dimension").value;
  const xSpawn = document.getElementById("xSpawn").value;
  const ySpawn = document.getElementById("ySpawn").value;
  const zSpawn = document.getElementById("zSpawn").value;
  const xRot = document.getElementById("xRot").value;
  const yRot = document.getElementById("yRot").value;
  const zRot = document.getElementById("zRot").value;

  if (e.key === "Enter") {
    const prevBox = document.getElementById("prevBox");
    prevBox.textContent = JSON.stringify(
      {
        name: roomName,
        description: roomDescription,
        extraNotes: notes,
        type: roomType,
        dimension: dimension,
        spawnPoint: {
          x: xSpawn,
          y: ySpawn,
          z: zSpawn,
        },
        spawnRotation: {
          x: xRot,
          y: yRot,
          z: zRot,
        },
      },
      null,
      "    ",
    ).replaceAll('""', '"null"');
  }
});

function download() {

  const roomName = document.getElementById("roomName").value;
  const roomDescription = document.getElementById("roomDescription").value;
  const notes = document.getElementById("notes").value;
  const roomType = document.getElementById("roomType").value;
  const dimension = document.getElementById("dimension").value;
  const xSpawn = document.getElementById("xSpawn").value;
  const ySpawn = document.getElementById("ySpawn").value;
  const zSpawn = document.getElementById("zSpawn").value;
  const xRot = document.getElementById("xRot").value;
  const yRot = document.getElementById("yRot").value;
  const zRot = document.getElementById("zRot").value;

  const jsonData = JSON.stringify(
    {
      name: roomName,
      description: roomDescription,
      extraNotes: notes,
      type: roomType,
      dimension: dimension,
      spawnPoint: {
        x: xSpawn,
        y: ySpawn,
        z: zSpawn,
      },
      spawnRotation: {
        x: xRot,
        y: yRot,
        z: zRot,
      },
    },
    null,
    "\t",
  ).replaceAll('""', '"null"');

  const blob = new Blob([jsonData], { type: "application/json" });

  // 2. Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob);

  // 3. Create a temporary anchor element and trigger the download
  const a = document.createElement("a");
  a.href = url;
  a.download = `${roomName.replaceAll(" ", "_")}.json`; // The name of the file to be downloaded
  document.body.appendChild(a);
  a.click();

  // 4. Clean up by removing the element and revoking the object URL
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  const currentNotification = document.getElementById("notification");
  
  if (currentNotification) {
    currentNotification.style.display = "block";
    console.log("Download complete! Notification shown.");

    setTimeout(() => {
      currentNotification.style.display = "none";
      console.log("3 seconds are up. Notification hidden.");
    }, 10000);
  }
}

const keys = {};

window.addEventListener("keydown", (e) => {
  keys[e.code] = true;

  if (e.code === "KeyD" && e.ctrlKey) {
    e.preventDefault();
    download();
  }
});

window.addEventListener("keyup", (e) => {
  keys[e.code] = false;
});