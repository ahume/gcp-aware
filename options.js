const saveOptions = () => {
  const status = document.getElementById('status');
  const projectPattern = document.getElementById('project-pattern').value;
  const warningText = document.getElementById('warning-text').value;

  if (!checkRegex(projectPattern)) {
    status.textContent = 'Invalid regex pattern';
    return;
  }

  chrome.storage.sync.set({
    projectPattern: projectPattern,
    warningText: warningText,
  }, function() {
    status.textContent = 'Saved successfully';
    setTimeout(() => { status.textContent = ''; }, 1500);
  });
}

const restoreOptions = () => {
  chrome.storage.sync.get({
    projectPattern: 'prod',
    warningText: 'PROD',
  }, items => {
    document.getElementById('project-pattern').value = items.projectPattern;
    document.getElementById('warning-text').value = items.warningText;
  });
}

const checkRegex = (re) => {
  let isValid = true;
  try {
    new RegExp(re);
  } catch(e) {
    isValid = false;
  }

  return isValid;
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
