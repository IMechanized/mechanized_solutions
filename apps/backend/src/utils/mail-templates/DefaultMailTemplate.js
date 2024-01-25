"use strict";
exports.__esModule = true;
exports.DefaultMailTemplate = void 0;
var index_1 = require("./index");
var DefaultMailTemplate = function (message) {
    // full html template here
    return "".concat((0, index_1.MailHeader)(), "\n        <!-- Highlight -->\n        <tr>\n            <td style=\"padding-top: 40px; padding-bottom: 120px;\">\n                <table width=\"100%\">\n                    <tr>\n                        <td style=\"padding-top: 40px;\">\n                            <p class=\"highlights\">\n                                ").concat(message, "\n                            </p>\n                        </td>\n                    </tr>\n                </table>\n            </td>\n        </tr>\n        ").concat((0, index_1.MailFooter)());
};
exports.DefaultMailTemplate = DefaultMailTemplate;
