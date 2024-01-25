"use strict";
exports.__esModule = true;
exports.ConfirmMailTemplate = void 0;
var index_1 = require("./index");
var ConfirmMailTemplate = function (message, confirmUrl) {
    // full html template here
    return "".concat((0, index_1.MailHeader)(), "\n        <!-- Highlight -->\n        <tr>\n            <td style=\"padding-top: 40px;\">\n                <table width=\"100%\">\n                    <tr>\n                        <td style=\"padding-top: 40px;\">\n                            <p class=\"highlights\">\n                                ").concat(message, "\n                            </p>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n\n        <!-- Button -->\n        <tr>\n            <td style=\"padding-bottom: 100px;\">\n                <table width=\"100%\">\n                    <tr>\n                        <td style=\"padding: 0 40px; text-align: center;\">\n                            <a href=\"").concat(confirmUrl, "\">\n                                <button>\n                                    Confirm\n                                </button>\n                            </a>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n        ").concat((0, index_1.MailFooter)());
};
exports.ConfirmMailTemplate = ConfirmMailTemplate;
