import Passage from './Passage';

function App() {
  const props = {
    'data-variant': 'inline',
    'data-submitText': '',
    'data-submitBg': '',
    'data-submitColor': '',
    'data-valorLogo': true,
    'data-cardholdName': true,
    'data-email': true,
    'data-phone': true,
    'data-billingAddress': true,
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
