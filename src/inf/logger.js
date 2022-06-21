/**
 * Use to format and controll the logs across the app
 * @param {string} message Message that will be printed
 * @param {object} any optional - object that will be printed
 */
export const logger = (message, any) => {
  console.log(
    `Logger: ${message} ${
      any != null ? ', Object: ' + JSON.stringify(any) : ''
    }`,
  );
};
