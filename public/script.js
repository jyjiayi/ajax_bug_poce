// to create and return a p html element
const createPElement = (pText, div) => {
  const pElement = document.createElement('p');
  pElement.innerHTML = pText;
  div.appendChild(pElement);
};

// to create and return a br html element
const createBrElement = () => {
  const brElement = document.createElement('br');
  return brElement;
};

// to create and return a label html element
const createLabel = (labelFor, labelId, labelText) => {
  const labelElement = document.createElement('label');
  labelElement.for = labelFor;
  labelElement.id = labelId;
  labelElement.innerHTML = labelText;
  return labelElement;
};

// to create and return an input html element
const createInput = (inputType, inputName, inputId, inputValue, inputRequired) => {
  const inputElement = document.createElement('input');
  inputElement.type = inputType;
  inputElement.name = inputName;
  inputElement.id = inputId;
  inputElement.value = inputValue;
  inputElement.required = inputRequired;
  return inputElement;
};

// div container for the bug list
const bugListDiv = document.createElement('div');

// ajax get request to show all bug list data
const renderBugListData = () => {
  axios
    .get('/bugs')
    .then((response) => {
      for (let i = 0; i < response.data.bugs.length; i += 1) {
        createPElement(i + 1, bugListDiv);
        createPElement(`Problem: ${response.data.bugs[i].problem}`, bugListDiv);
        createPElement(`Error Text: ${response.data.bugs[i].error_text}`, bugListDiv);
        createPElement(`Commit: ${response.data.bugs[i].commit}`, bugListDiv);
        createPElement(`Feature: ${response.data.bugs[i].feature.name}`, bugListDiv);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// ajax post request to insert a bug in to sql data
const postBug = () => {
  console.log(document.querySelector('input[name="problem"]').value);
  console.log(document.querySelector('input[name="errorText"]').value);
  console.log(document.querySelector('input[name="commit"]').value);
  console.log(document.querySelector('input[name="featureBtn"]:checked').value);
  axios
    .post('/createBug', {
      problem: document.querySelector('input[name="problem"]').value,
      errorText: document.querySelector('input[name="errorText"]').value,
      commit: document.querySelector('input[name="commit"]').value,
      featureId: Number(document.querySelector('input[name="featureBtn"]:checked').value),
    })
    .then((response) => {
      renderBugListData();
    }).catch((error) => {
      console.log(error);
    });
};

const featureDiv = document.createElement('div');
createPElement('Features:', featureDiv);

// ajax get request to display all features from SQL Features table
const renderFeatureListData = () => {
  axios
    .get('/features')
    .then((response) => {
      for (let i = 0; i < response.data.features.length; i += 1) {
        const featureName = response.data.features[i].name;
        const featureLabel = createLabel(featureName, featureName, featureName);
        const featureInput = createInput('radio', 'featureBtn', featureName, response.data.features[i].id);
        featureDiv.appendChild(featureLabel);
        featureDiv.appendChild(featureInput);
        featureDiv.appendChild(createBrElement());
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// to create all html elements within the bug form div container
const createBugForm = () => {
  const createBugDiv = document.createElement('div');
  createPElement('Create Bug Form', createBugDiv);

  const problemDiv = document.createElement('div');
  const problemLabel = createLabel('problem', 'problem', 'Problem:   ');
  const problemInput = createInput('text', 'problem', 'problem', '', 'required');
  problemDiv.appendChild(problemLabel);
  problemDiv.appendChild(problemInput);
  createBugDiv.appendChild(problemDiv);

  const errorTextDiv = document.createElement('div');
  const errorTextLabel = createLabel('errorText', 'errorText', 'ErrorText:   ');
  const errorTextInput = createInput('text', 'errorText', 'errorText', '', 'required');
  errorTextDiv.appendChild(errorTextLabel);
  errorTextDiv.appendChild(errorTextInput);
  createBugDiv.appendChild(errorTextDiv);

  const commitDiv = document.createElement('div');
  const commitLabel = createLabel('commit', 'commit', 'Commit:   ');
  const commitInput = createInput('text', 'commit', 'commit', '', 'required');
  commitDiv.appendChild(commitLabel);
  commitDiv.appendChild(commitInput);
  createBugDiv.appendChild(commitDiv);

  renderFeatureListData();
  createBugDiv.appendChild(featureDiv);

  const submitButton = document.createElement('input');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('value', 'Create Bug');
  submitButton.addEventListener('click', postBug);
  createBugDiv.appendChild(submitButton);

  document.body.appendChild(createBugDiv);
};

// function to form the bug list div container
const createBugList = () => {
  createPElement('Bug List', bugListDiv);
  document.body.appendChild(bugListDiv);

  renderBugListData();
};

// ajax post request to insert a feature in to sql data
const postFeature = () => {
  console.log(document.querySelector('input[name="feature"]').value);

  axios
    .post('/createFeature', {
      feature: document.querySelector('input[name="feature"]').value,
    })
    .then((response) => {
      // clear the feature list
      featureDiv.innerHTML = '';
      renderFeatureListData();
    }).catch((error) => {
      console.log(error);
    });
};

// function to form the feature div container
const createFeatureForm = () => {
  const createFeatureDiv = document.createElement('div');
  createPElement('Create Feature Form', createFeatureDiv);

  const featureDiv2 = document.createElement('div');

  const featureLabel = createLabel('feature', 'feature', 'Feature:    ');
  const featureInput = createInput('text', 'feature', 'feature', '', 'required');
  featureDiv2.appendChild(featureLabel);
  featureDiv2.appendChild(featureInput);
  createFeatureDiv.appendChild(featureDiv2);

  const submitFeatureButton = document.createElement('input');
  submitFeatureButton.setAttribute('type', 'submit');
  submitFeatureButton.setAttribute('value', 'Create Feature');
  submitFeatureButton.addEventListener('click', postFeature);
  featureDiv2.appendChild(submitFeatureButton);

  document.body.appendChild(createFeatureDiv);
  createFeatureDiv.style.display = 'none';

  // button that render the create feature form
  const getFeatureForm = document.createElement('button');
  getFeatureForm.setAttribute('type', 'button');
  getFeatureForm.innerHTML = 'Create Feature Form';
  getFeatureForm.addEventListener('click', () => {
    createFeatureDiv.style.display = '';
    getFeatureForm.style.display = 'none';
  });
  document.body.appendChild(getFeatureForm);
};

// init function when page loads
const main = () => {
  createBugForm();
  createBugList();
  createFeatureForm();
};

main();
