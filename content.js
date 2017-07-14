let state = {
  warningShown: false,
  projectPattern: 'prod',
  warningText: 'PROD',
}

chrome.storage.sync.get({
  projectPattern: 'prod',
  warningText: 'PROD',
}, function(items) {
  state.projectPattern = items.projectPattern;
  state.warningText = items.warningText;
});

const getProjectName = () => (new URL(location)).searchParams.get('project');

const maybeAddWarning = () => {
  const projectPatternRegEx = new RegExp(state.projectPattern);
  if (projectPatternRegEx.test(getProjectName()) && state.warningShown === false) {
    insertWarning();
  }
  else if (!projectPatternRegEx.test(getProjectName()) && state.warningShown === true) {
    removeWarning();
  }
}

const insertWarning = () => {
  var platformbar = document.querySelector('.p6n-content-container');

  var div = document.createElement('div');
  div.id = 'gcp-aware-banner';
  div.innerHTML = state.warningText;

  platformbar.insertBefore(div, platformbar.firstChild);
  state.warningShown = true;
}

const removeWarning = () => {
  document.querySelector('#gcp-aware-banner').remove();
  state.warningShown = false;
}


// Kick off
setInterval(maybeAddWarning, 1000);
