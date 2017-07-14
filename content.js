let state = {
  warningShown: false,
}

const getProjectName = () => (new URL(location)).searchParams.get('project');

const maybeAddWarning = () => {
  if (getProjectName().indexOf('bw-prod') === 0 && state.warningShown === false) {
    insertWarning();
  }
  else if (getProjectName().indexOf('bw-prod') !==0 && state.warningShown === true) {
    removeWarning();
  }
}

const insertWarning = () => {
  var platformbar = document.querySelector('.p6n-content-container');

  var div = document.createElement('div');
  div.id = 'gcp-aware-banner';
  div.innerHTML = 'PROD';

  platformbar.insertBefore(div, platformbar.firstChild);
  state.warningShown = true;
}

const removeWarning = () => {
  document.querySelector('#gcp-aware-banner').remove();
  state.warningShown = false;
}


// Kick off
setInterval(maybeAddWarning, 1000);
