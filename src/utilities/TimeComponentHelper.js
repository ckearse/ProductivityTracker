/** @format */

function formatValuePadding(valueToPad, paddingFormat) {
  // ie, valueToPad: 10, paddingFormat: '000' => '010'

  let formatVal = '' + valueToPad;
  while (formatVal.length < paddingFormat.length) {
    formatVal = paddingFormat[0] + formatVal;
  }

  return formatVal;
}

export default function calculateDurationComponents(milliseconds) {
  const millisecondsPerUnit = {
    hours: 60 * 60 * 1000,
    minutes: 60 * 1000,
    seconds: 1000,
  };

  return deriveTimeComponents(milliseconds);

  function deriveTimeComponents(milliseconds) {
    const derivedHours = deriveHours(milliseconds);
    const derivedMinutes = deriveMinutes(derivedHours);
    const derivedSeconds = deriveSeconds(derivedMinutes);

    return derivedSeconds;
  }

  function deriveHours(milliseconds) {
    const hours = Math.floor(milliseconds / millisecondsPerUnit.hours);
    const hour_milliRemainder = milliseconds % millisecondsPerUnit.hours;

    return {
      hours: formatValuePadding(hours, '00'),
      hour_milliRemainder: hour_milliRemainder,
    };
  }

  function deriveMinutes(durationObj) {
    const minutes = Math.floor(
      durationObj.hour_milliRemainder / millisecondsPerUnit.minutes
    );
    const minute_milliRemainder =
      durationObj.hour_milliRemainder % millisecondsPerUnit.minutes;

    return {
      ...durationObj,
      minutes: formatValuePadding(minutes, '00'),
      minute_milliRemainder: minute_milliRemainder,
    };
  }

  function deriveSeconds(durationObj) {
    const seconds = Math.floor(
      durationObj.minute_milliRemainder / millisecondsPerUnit.seconds
    );
    const second_milliRemainder =
      durationObj.minute_milliRemainder % millisecondsPerUnit.seconds;

    return {
      ...durationObj,
      seconds: formatValuePadding(seconds, '00'),
      milliseconds: formatValuePadding(second_milliRemainder, '000'),
    };
  }
}
