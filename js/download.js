const devicesList = document.querySelector('.devices');
const noDeviceDiv = document.querySelector('.download');
const deviceInfoDiv = document.querySelector('.device-download');
const builds = document.querySelectorAll('.builds');
const device = document.querySelector('#device');
const deviceName = document.querySelectorAll('.device-name');
const deviceCodename = document.querySelectorAll('.device-codename');
let json = {};

const generateBuildCards = (
  variant,
  timestamp,
  size,
  md5,
  filename,
  link,
  changelog,
  index
) => {
  const buildCard = document.createElement('div');
  buildCard.setAttribute('class', 'build-info');
  buildCard.innerHTML = `
    <h1 class="variant">${variant}</h1>
    <div class="info">
    <div class="mt-4 mb-2"><i class="material-icons mr-3 has-text-danger">schedule</i><h1>${Date(
      timestamp
    )}</h1></div>
      <div class="mb-2"><i class="material-icons mr-3 has-text-danger">fingerprint</i><h1>${(
        size / Math.pow(1024, 2)
      ).toFixed(2)} MB</h1></div>
      <div class="mb-2"><i class="material-icons mr-3 has-text-danger">cloud</i><h1>${md5}</h1></div>
      <div class="mb-2"><i class="material-icons mr-3 has-text-danger">published_with_changes</i><a class="has-text-white" href="${changelog}">View Changelog</a></div>
      <div class="mb-2"><i class="material-icons mr-3 has-text-danger">download</i><a class="has-text-danger" href="${link}">${filename}</a></div>
    </div>
    `;
  builds[index].appendChild(buildCard);
};

const showModal = (deviceInfo, phone) => {
  builds[1].innerHTML = '';
  modal.style = window.innerWidth < 600 && 'display: flex !important;';
  deviceName[1].innerText = deviceInfo[0].device_name;
  deviceCodename[1].innerText = `${phone} | ${deviceInfo[0].maintainer_name}`;
  for (let i = 0; i < deviceInfo.length; i++) {
    generateBuildCards(
      deviceInfo[i].variant,
      deviceInfo[i].timestamp,
      deviceInfo[i].size,
      deviceInfo[i].md5sum,
      deviceInfo[i].filename,
      deviceInfo[i].url,
      deviceInfo[i].changelog,
      1
    );
  }
};

const showDeviceInfo = (phone) => {
  builds[0].innerHTML = '';
  noDeviceDiv.style = 'display: none; width: 0;';
  deviceInfoDiv.style = 'display: block';
  const deviceInfo = json[phone];
  deviceName[0].innerText = deviceInfo[0].device_name;
  deviceCodename[0].innerText = `${phone} | ${deviceInfo[0].maintainer_name}`;
  for (let i = 0; i < deviceInfo.length; i++) {
    generateBuildCards(
      deviceInfo[i].variant,
      deviceInfo[i].timestamp,
      deviceInfo[i].size,
      deviceInfo[i].md5sum,
      deviceInfo[i].filename,
      deviceInfo[i].url,
      deviceInfo[i].changelog,
      0
    );
  }
  showModal(deviceInfo, phone);
};

const generateDevice = (phone, codename) => {
  const div = document.createElement('div');
  div.setAttribute('class', 'device');
  div.setAttribute('id', codename);
  const h1 = document.createElement('h1');
  const h4 = document.createElement('h4');
  h1.innerText = phone;
  h4.innerText = codename;
  div.appendChild(h1);
  div.appendChild(h4);
  devicesList.appendChild(div);
  div.addEventListener('click', (e) => showDeviceInfo(e.currentTarget.id));
};

$(document).ready(async function () {
  const res = await fetch('https://harshv23.cf/LegionOS-Website/test.json');
  json = await res.json();
  Object.keys(json).forEach((device) =>
    generateDevice(json[device][0].device_name, device)
  );
});
