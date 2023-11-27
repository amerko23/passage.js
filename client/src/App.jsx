import Passage from './Passage';

function App() {
  const props = {
    // Set to 'inline' for complete form, or 'lightbox' for modal form
    'data-variant': 'inline',
    // Set submit button text, background color, and text color
    'data-submitText': '',
    'data-submitBg': '',
    'data-submitColor': '',
    // Set true or false to show or hide the fields
    'data-valorLogo': true,
    'data-cardholdName': true,
    'data-email': true,
    'data-phone': true,
    'data-billingAddress': true,
    // Set place holder text for each field. If empty, default text will be used. Set string with 1 space to not show placeholder text.
    'data-defaultEmail': '',
    'data-defaultPhone': '',
    'data-defaultAddress1': '',
    'data-defaultAddress2': '',
    'data-defaultCity': '',
    'data-defaultState': '',
    'data-defaultCardholderName': '',
  };
  return (
    <>
      <Passage props={props} />
    </>
  );
}

export default App;
