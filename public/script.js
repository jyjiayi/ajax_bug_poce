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
        createPElement(`User: ${response.data.bugs[i].user_id}`, bugListDiv);
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
      bugListDiv.innerHTML = '';
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

const postUser = () => {
  axios
    .post('/createUser', {
      email: document.querySelector('input[name="email"]').value,
      password: document.querySelector('input[name="password"]').value,
    })
    .then((response) => {
      console.log('sign up success!');
    }).catch((error) => {
      console.log(error);
    });
};

// container for the sign up form
const signupDiv = document.createElement('div');

const createSignUp = () => {
  const emailLabel = createLabel('email', 'email', 'Email:      ');
  const emailInput = createInput('text', 'email', 'email', '', 'required');
  const passwordLabel = createLabel('password', 'password', 'Password:      ');
  const passwordInput = createInput('text', 'password', 'password', '', 'required');
  signupDiv.appendChild(emailLabel);
  signupDiv.appendChild(emailInput);
  signupDiv.appendChild(createBrElement());
  signupDiv.appendChild(passwordLabel);
  signupDiv.appendChild(passwordInput);
  signupDiv.appendChild(createBrElement());

  const signUpButton = document.createElement('input');
  signUpButton.setAttribute('type', 'submit');
  signUpButton.setAttribute('value', 'Sign Up');
  signupDiv.appendChild(signUpButton);

  signUpButton.addEventListener('click', () => {
    postUser();
    signupDiv.style.display = 'none';
  });

  document.body.appendChild(signupDiv);
};

// function to login
const getUser = () => {
  axios
    .post('/login', {
      email: document.querySelector('input[name="email2"]').value,
      password: document.querySelector('input[name="password2"]').value,
    })
    .then((response) => {
      axios
        .get('/user')
        .then((response1) => {
          // display the email to show user is logged in
          const dashboardDiv = document.createElement('div');
          createPElement(response1.data.user.email, dashboardDiv);
          document.body.appendChild(dashboardDiv);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

// container for login form
const createLogin = () => {
  const loginDiv = document.createElement('div');

  const emailLabel = createLabel('email2', 'email2', 'Email:      ');
  const emailInput = createInput('text', 'email2', 'email2', '', 'required');
  const passwordLabel = createLabel('password2', 'password2', 'Password:      ');
  const passwordInput = createInput('text', 'password2', 'password2', '', 'required');
  loginDiv.appendChild(emailLabel);
  loginDiv.appendChild(emailInput);
  loginDiv.appendChild(createBrElement());
  loginDiv.appendChild(passwordLabel);
  loginDiv.appendChild(passwordInput);
  loginDiv.appendChild(createBrElement());

  const loginButton = document.createElement('input');
  loginButton.setAttribute('type', 'submit');
  loginButton.setAttribute('value', 'Login');
  loginDiv.appendChild(loginButton);

  loginButton.addEventListener('click', () => {
    getUser();
    loginDiv.style.display = 'none';
    signupDiv.style.display = 'none';
    createBugForm();
    createBugList();
    createFeatureForm();
  });

  document.body.appendChild(loginDiv);
};

// init function when page loads
const main = () => {
  createSignUp();
  createLogin();
};

main();
