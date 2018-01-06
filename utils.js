(function() {
  /**
   * @param {DOMElement} el
   */
  function hideEl(el) {
    el.style.display = "none";
  }

  /**
   * @param  {DOMElement} el
   * @param  {String} displayStyle - (optional) flex, inline
   */
  function showEl(el, displayStyle) {
    el.style.display = displayStyle ? displayStyle : "block";
  }

  /**
   * show loader, hide forms
   */
  function showLoader(forms, loader) {
    hideEl(forms);
    showEl(loader);
  }

  /**
   * hide loader, show forms
   */
  function hideLoader(forms, loader) {
    hideEl(loader);
    showEl(forms);
  }

  /**
  * Generate append request object - for given sheet and values to append
  * Docs: https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append
  *
  * @param {String} spreadsheetId Expense sheet ID
  * @param {Array} values values to be appended
  * @returns {Object} request object for append
  */
  function appendRequestObj(spreadsheetId, values) {
    return {
      // The ID of the spreadsheet to update.
      spreadsheetId,

      // The A1 notation of a range to search for a logical table of data.
      // Values will be appended after the last row of the table.
      range: "Expenses!A1",

      includeValuesInResponse: true,

      responseDateTimeRenderOption: "FORMATTED_STRING",

      responseValueRenderOption: "FORMATTED_VALUE",

      // How the input data should be interpreted.
      valueInputOption: "USER_ENTERED",

      // How the input data should be inserted.
      insertDataOption: "INSERT_ROWS",

      resource: {
        values
      }
    };
  }

  /**
  * Generate batchGet request object - for given sheet, and range.
  * Docs: https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/batchGet
  *
  * @param {String} sheetID Expense sheet ID
  * @param {Array} ranges List of ranges in A1 notation
  * @returns {Object} request object for batchGet
  */
  function batchGetRequestObj(spreadsheetId, ranges) {
    return {
      spreadsheetId,
      ranges,
      dateTimeRenderOption: "FORMATTED_STRING",
      majorDimension: "COLUMNS",
      valueRenderOption: "FORMATTED_VALUE"
    };
  }

  /**
  * Generate get request object - for given sheet, and range.
  * Docs: https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get
  *
  * @param {String} sheetID Expense sheet ID
  * @param {String} range in A1 notation
  * @returns {Object} request object for get
  */
  function getRequestObj(spreadsheetId, range) {
    return {
      spreadsheetId,
      range,
      dateTimeRenderOption: "SERIAL_NUMBER",
      majorDimension: "ROWS",
      valueRenderOption: "UNFORMATTED_VALUE"
    };
  }

  function wrapInOption(option) {
    return `<option value='${option}'>${option}</option>`;
  }

  /**
   * Excel/Google Sheets returns date in Lotus format.
   * References: https://developers.google.com/sheets/api/reference/rest/v4/DateTimeRenderOption
   *
   * @param {Number} lotusDay - Number of days passed since December 30th 1899.
   * @returns {Date} Javascript date object of the same day
   */
  function convertLotusDayToJSDate(lotusDay) {
    lotusDay = window.parseInt(lotusDay);
    let date = new Date(1899, 11, 30);
    date.setDate(date.getDate() + lotusDay);
    return date;
  }

  window.expenseManager = window.expenseManager || {};
  window.expenseManager.utils = window.expenseManager.utils || {
    showEl,
    hideEl,
    hideLoader,
    showLoader,
    wrapInOption,
    batchGetRequestObj,
    getRequestObj,
    appendRequestObj,
    convertLotusDayToJSDate
  };
})();
